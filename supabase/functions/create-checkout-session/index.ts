// ──────────────────────────────────────────────────────────────
// Edge Function: create-checkout-session
// Recebe os dados da reserva do browser, RECALCULA o preço no
// servidor e cria uma Stripe Checkout Session (página de pagamento
// alojada pela Stripe). Devolve o URL para o qual o browser redireciona.
//
// Segredos necessários (supabase secrets set ...):
//   STRIPE_SECRET_KEY   -> chave secreta Stripe (sk_test_... / sk_live_...)
//   SITE_URL            -> ex.: https://tours.lisbontuk4u.com (sem / final)
// ──────────────────────────────────────────────────────────────
import { corsHeaders } from "../_shared/cors.ts";
import { computeAmountCents } from "../_shared/pricing.ts";

const STRIPE_SECRET = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const SITE_URL = (Deno.env.get("SITE_URL") ?? "https://tours.lisbontuk4u.com")
  .replace(/\/$/, "");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Método não permitido." }, 405);
  }

  try {
    if (!STRIPE_SECRET) throw new Error("STRIPE_SECRET_KEY não configurada.");

    const { tourId, durationHours, passengers, date, time, customer } =
      await req.json();

    if (!tourId || !date || !time || !passengers) {
      throw new Error("Dados da reserva em falta.");
    }

    const { amountCents, tourName, tuks } = computeAmountCents(
      String(tourId),
      Number(durationHours) || 0,
      Number(passengers),
    );

    // ── Monta a Checkout Session via REST (sem SDK) ──
    const p = new URLSearchParams();
    p.set("mode", "payment");
    p.set("locale", "pt");
    p.set(
      "success_url",
      `${SITE_URL}/reserva-confirmada.html?session_id={CHECKOUT_SESSION_ID}`,
    );
    p.set("cancel_url", `${SITE_URL}/index.html#passeios`);
    if (customer?.email) p.set("customer_email", String(customer.email));

    p.set("line_items[0][quantity]", "1");
    p.set("line_items[0][price_data][currency]", "eur");
    p.set("line_items[0][price_data][unit_amount]", String(amountCents));
    p.set(
      "line_items[0][price_data][product_data][name]",
      `Tour ${tourName} — ${date} ${time}`,
    );
    p.set(
      "line_items[0][price_data][product_data][description]",
      `${passengers} passageiro(s)${tuks > 1 ? ` · ${tuks} tuk-tuks` : ""} · LisbonTuk4U`,
    );

    // Metadados -> usados pelo webhook para gravar a reserva
    const meta: Record<string, string> = {
      tourId: String(tourId),
      tourName,
      date: String(date),
      time: String(time),
      passengers: String(passengers),
      tuks: String(tuks),
      customerName: `${customer?.name ?? ""} ${customer?.surname ?? ""}`.trim(),
      customerPhone: String(customer?.phone ?? ""),
      customerCountry: String(customer?.country ?? ""),
    };
    for (const [k, v] of Object.entries(meta)) p.set(`metadata[${k}]`, v);
    // Cancelamento gratuito até 48h -> reembolsável; guardamos o método para o caso
    p.set("payment_intent_data[metadata][tourId]", String(tourId));

    const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${STRIPE_SECRET}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: p.toString(),
    });

    const session = await resp.json();
    if (!resp.ok) {
      throw new Error(session?.error?.message ?? "Erro ao criar o pagamento.");
    }

    return json({ url: session.url, id: session.id }, 200);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 400);
  }
});

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
