// ──────────────────────────────────────────────────────────────
// Edge Function: get-session-summary
// Devolve um RESUMO NÃO-SENSÍVEL de uma sessão de pagamento Stripe, para
// a página de confirmação registar a conversão no GA4 (evento `purchase`)
// com o valor real. Recebe o session_id (que só o próprio comprador tem,
// vindo do URL de sucesso) e devolve apenas valor/moeda/tour — NUNCA
// nome, e-mail ou telefone.
//
// Pedido:  POST { "session_id": "cs_live_..." }
// Resposta: { "amount": 240, "currency": "eur", "tourName": "...",
//             "tourId": "...", "paid": true }
// ──────────────────────────────────────────────────────────────
import { corsHeaders } from "../_shared/cors.ts";

const STRIPE_SECRET = Deno.env.get("STRIPE_SECRET_KEY") ?? "";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Método não permitido." }, 405);
  }

  try {
    if (!STRIPE_SECRET) throw new Error("STRIPE_SECRET_KEY não configurada.");
    const { session_id } = await req.json();
    if (!session_id || !/^cs_(live|test)_[A-Za-z0-9]+$/.test(String(session_id))) {
      throw new Error("session_id inválido.");
    }

    const resp = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${session_id}`,
      { headers: { "Authorization": `Bearer ${STRIPE_SECRET}` } },
    );
    const s = await resp.json();
    if (!resp.ok) throw new Error(s?.error?.message ?? "Sessão não encontrada.");

    const m = s.metadata ?? {};
    return json({
      amount: typeof s.amount_total === "number" ? s.amount_total / 100 : null,
      currency: s.currency ?? "eur",
      tourId: m.tourId ?? null,
      tourName: m.tourName ?? null,
      paid: s.payment_status === "paid",
    }, 200);
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
