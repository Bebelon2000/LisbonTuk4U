// ──────────────────────────────────────────────────────────────
// Edge Function: get-availability
// Devolve os intervalos JÁ OCUPADOS numa data (para o site esconder os
// horários indisponíveis). Lê a tabela `bookings` com a service_role
// (contorna o RLS) mas devolve APENAS horas/durações — nunca nomes,
// e-mails ou telefones dos clientes.
//
// Pedido:  POST { "date": "2026-07-12" }
// Resposta: { "busy": [ { "startMin": 630, "durationMin": 180 } ] }
//   startMin = minutos desde a meia-noite; durationMin = duração do tour.
//   A margem entre tours (buffer) é aplicada no cliente.
// ──────────────────────────────────────────────────────────────
import { corsHeaders } from "../_shared/cors.ts";
import { getTourDurationHours } from "../_shared/pricing.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

function toMinutes(hhmm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm).trim());
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Método não permitido." }, 405);
  }

  try {
    const { date } = await req.json();
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(String(date))) {
      throw new Error("Data inválida.");
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("tour_id, tour_time, amount_total, tuks, payment_status")
      .eq("tour_date", date)
      .eq("payment_status", "paid");

    if (error) throw new Error(error.message);

    const busy = (data ?? [])
      .map((b) => {
        const startMin = toMinutes(b.tour_time ?? "");
        if (startMin === null) return null;
        const hours = getTourDurationHours(
          String(b.tour_id ?? ""),
          Number(b.amount_total ?? 0),
          Number(b.tuks ?? 1),
        );
        return { startMin, durationMin: hours * 60 };
      })
      .filter((x): x is { startMin: number; durationMin: number } => x !== null);

    return json({ busy }, 200);
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
