// ──────────────────────────────────────────────────────────────
// Edge Function: get-availability-range
// Como o get-availability, mas para vários dias de uma só vez (usado
// pelo calendário de disponibilidade da homepage). Uma única query à
// BD em vez de N pedidos separados.
//
// Pedido:  POST { "from": "2026-07-16", "days": 14 }
// Resposta: {
//   "2026-07-16": { "busy": [...], "status": "disponivel" },
//   "2026-07-17": { "busy": [...], "status": "poucas_vagas" },
//   ...
// }
//   status ∈ "disponivel" | "poucas_vagas" | "lotado"
// ──────────────────────────────────────────────────────────────
import { corsHeaders } from "../_shared/cors.ts";
import { getTourDurationHours } from "../_shared/pricing.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

const BOOKING_BUFFER_MIN = 90;
const FIRST_START = 8 * 60 + 30; // 08:30
const LATEST_START = 19 * 60; // 19:00
const DAY_END = 22 * 60; // 22:00

// Duração mais curta possível (1h, à la carte) -- usada só para testar se
// existe ALGUM horário livre no dia, o teste mais otimista possível.
const SHORTEST_DURATION_MIN = 60;

function toMinutes(hhmm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm).trim());
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

function dateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${
    String(d.getDate()).padStart(2, "0")
  }`;
}

function slotIsFree(
  startMin: number,
  durationMin: number,
  busy: { startMin: number; durationMin: number }[],
): boolean {
  const ce = startMin + durationMin;
  return !busy.some((b) =>
    startMin < b.startMin + b.durationMin + BOOKING_BUFFER_MIN &&
    ce + BOOKING_BUFFER_MIN > b.startMin
  );
}

// Conta quantos horários de SHORTEST_DURATION_MIN ainda cabem no dia,
// dado o que já está ocupado -- usado para decidir "poucas vagas".
function countFreeSlots(busy: { startMin: number; durationMin: number }[]): {
  free: number;
  total: number;
} {
  let total = 0;
  let free = 0;
  const lastStart = Math.min(LATEST_START, DAY_END - SHORTEST_DURATION_MIN);
  for (let t = FIRST_START; t <= lastStart; t += 30) {
    total += 1;
    if (slotIsFree(t, SHORTEST_DURATION_MIN, busy)) free += 1;
  }
  return { free, total };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método não permitido." }, 405);

  try {
    const body = await req.json();
    const from = String(body?.from ?? "");
    const days = Math.min(Math.max(Number(body?.days ?? 14), 1), 30);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(from)) throw new Error("Data inválida.");

    const [y, m, d] = from.split("-").map(Number);
    const fromDate = new Date(y, m - 1, d);
    const toDate = new Date(y, m - 1, d + days - 1);

    const { data, error } = await supabase
      .from("bookings")
      .select("tour_date, tour_id, tour_time, amount_total, tuks, payment_status")
      .gte("tour_date", dateStr(fromDate))
      .lte("tour_date", dateStr(toDate))
      .eq("payment_status", "paid");

    if (error) throw new Error(error.message);

    const busyByDate: Record<string, { startMin: number; durationMin: number }[]> = {};
    for (const b of data ?? []) {
      const startMin = toMinutes(b.tour_time ?? "");
      if (startMin === null) continue;
      const hours = getTourDurationHours(
        String(b.tour_id ?? ""),
        Number(b.amount_total ?? 0),
        Number(b.tuks ?? 1),
      );
      const key = String(b.tour_date);
      (busyByDate[key] ??= []).push({ startMin, durationMin: hours * 60 });
    }

    const result: Record<string, { busy: unknown[]; status: string }> = {};
    for (let i = 0; i < days; i++) {
      const day = new Date(y, m - 1, d + i);
      const key = dateStr(day);
      const busy = busyByDate[key] ?? [];
      const { free, total } = countFreeSlots(busy);
      const status = free === 0 ? "lotado" : free / total <= 0.25 ? "poucas_vagas" : "disponivel";
      result[key] = { busy, status };
    }

    return json(result, 200);
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
