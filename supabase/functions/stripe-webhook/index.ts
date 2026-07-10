// ──────────────────────────────────────────────────────────────
// Edge Function: stripe-webhook
// Recebe os eventos da Stripe (servidor -> servidor), verifica a
// assinatura e, quando um pagamento é concluído, grava a reserva
// na tabela `bookings`.
//
// IMPORTANTE: faz o deploy com --no-verify-jwt (a Stripe não envia JWT):
//   supabase functions deploy stripe-webhook --no-verify-jwt
//
// Segredos necessários:
//   STRIPE_WEBHOOK_SECRET -> "Signing secret" do webhook (whsec_...)
//   RESEND_API_KEY         -> chave da API Resend (re_...) para notificar a Susane
//   NOTIFY_EMAIL           -> opcional, e-mail que recebe a notificação
//                             (default: lisbontuk4u@gmail.com)
//   (SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são injetados automaticamente)
// ──────────────────────────────────────────────────────────────
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") ?? "lisbontuk4u@gmail.com";
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

// Envia um e-mail à Susane a avisar de uma nova reserva paga.
// Falhas aqui não devem derrubar o webhook (a reserva já foi gravada).
async function sendBookingNotification(
  m: Record<string, string>,
  s: Record<string, any>,
) {
  if (!RESEND_API_KEY) return;
  const amount = typeof s.amount_total === "number"
    ? (s.amount_total / 100).toFixed(2)
    : "?";
  const email = s.customer_details?.email ?? s.customer_email ?? "-";
  const html = `
    <h2>🛺 Nova reserva paga — LisbonTuk4U</h2>
    <p><strong>Tour:</strong> ${m.tourName ?? "-"}</p>
    <p><strong>Data:</strong> ${m.date ?? "-"} às ${m.time ?? "-"}</p>
    <p><strong>Passageiros:</strong> ${m.passengers ?? "-"} (${m.tuks ?? "1"} tuk-tuk(s))</p>
    <p><strong>Valor pago:</strong> ${amount} ${(s.currency ?? "eur").toUpperCase()}</p>
    <hr>
    <p><strong>Cliente:</strong> ${m.customerName ?? "-"}</p>
    <p><strong>Telefone:</strong> ${m.customerPhone ?? "-"}</p>
    <p><strong>País:</strong> ${m.customerCountry ?? "-"}</p>
    <p><strong>E-mail:</strong> ${email}</p>
  `;
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "LisbonTuk4U <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject: `Nova reserva: ${m.tourName ?? "Tour"} — ${m.date ?? ""} ${m.time ?? ""}`,
        html,
      }),
    });
    if (!resp.ok) {
      console.error("Erro ao enviar notificação Resend:", await resp.text());
    }
  } catch (e) {
    console.error("Erro ao enviar notificação Resend:", e);
  }
}

// Verifica a assinatura Stripe (esquema t=...,v1=...) com HMAC-SHA256.
async function verifySignature(
  payload: string,
  sigHeader: string | null,
): Promise<boolean> {
  if (!sigHeader || !WEBHOOK_SECRET) return false;
  const parts: Record<string, string> = {};
  for (const item of sigHeader.split(",")) {
    const [k, v] = item.split("=");
    if (k && v) parts[k] = v;
  }
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;

  // Tolerância de 5 minutos para evitar ataques de repetição
  if (Math.abs(Math.floor(Date.now() / 1000) - Number(t)) > 300) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(`${t}.${payload}`));
  const hex = [...new Uint8Array(sigBuf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Comparação em tempo (quase) constante
  if (hex.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (req: Request) => {
  const body = await req.text();
  const valid = await verifySignature(body, req.headers.get("stripe-signature"));
  if (!valid) return new Response("Assinatura inválida.", { status: 400 });

  const event = JSON.parse(body);

  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const m = s.metadata ?? {};
    const { error } = await supabase.from("bookings").upsert({
      stripe_session_id: s.id,
      tour_id: m.tourId ?? null,
      tour_name: m.tourName ?? null,
      tour_date: m.date ?? null,
      tour_time: m.time ?? null,
      passengers: Number(m.passengers ?? 0),
      tuks: Number(m.tuks ?? 1),
      amount_total: s.amount_total ?? null,
      currency: s.currency ?? "eur",
      customer_name: m.customerName ?? null,
      customer_email: s.customer_details?.email ?? s.customer_email ?? null,
      customer_phone: m.customerPhone ?? null,
      customer_country: m.customerCountry ?? null,
      payment_status: "paid",
    }, { onConflict: "stripe_session_id" });

    if (error) {
      console.error("Erro ao gravar booking:", error.message);
      return new Response("Erro a gravar.", { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
