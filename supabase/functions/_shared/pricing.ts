// ──────────────────────────────────────────────────────────────
// Tabela de preços do lado do SERVIDOR (fonte de verdade).
// NUNCA confiar no valor enviado pelo browser — o preço é sempre
// recalculado aqui antes de criar o pagamento.
// Tem de espelhar os preços de js/main.js (TOUR_DATA).
//
// ⚠️ Mexer aqui NÃO chega: este ficheiro vive nas Edge Functions, não no site.
// Depois de editar é preciso redeployar, senão o site mostra o tour novo mas o
// checkout rejeita-o com "Tour inválido.":
//   npx supabase functions deploy create-checkout-session get-availability get-availability-range
// ──────────────────────────────────────────────────────────────
interface TourPrice {
  name: string;
  basePrice: number;        // €, por tuk (até 5 pax)
  durationHours?: number;   // duração fixa (tours não-à-la-carte)
  isALaCarte?: boolean;
  durationOptions?: Record<number, number>; // horas -> € por tuk
}

export const TOUR_PRICING: Record<string, TourPrice> = {
  "a-la-carte": {
    name: "Lisboa à la Carte",
    basePrice: 0,
    isALaCarte: true,
    durationOptions: { 1: 120, 2: 180, 3: 240, 4: 300, 5: 360 },
  },
  "lisboa-autentica": { name: "Lisboa Autêntica", basePrice: 150, durationHours: 1.5 },
  "belem": { name: "Belém", basePrice: 180, durationHours: 2 },
  "half-day": { name: "Half Day", basePrice: 300, durationHours: 4 },
  "centro-historico": { name: "Centro Histórico", basePrice: 180, durationHours: 2 },
  "miradouros": { name: "Lisboa Miradouros", basePrice: 240, durationHours: 3 },
  "full-lisboa": { name: "Full Lisboa", basePrice: 360, durationHours: 5 },
};

// Deriva a duração (em horas) de uma reserva já paga, SEM precisar de a
// gravar na BD: para tours fixos vem da tabela; para o à la carte, o preço
// por tuk identifica de forma única a duração escolhida.
export function getTourDurationHours(
  tourId: string,
  amountCents: number,
  tuks: number,
): number {
  const t = TOUR_PRICING[tourId];
  if (!t) return 3; // fallback prudente
  if (t.isALaCarte) {
    const perTuk = Math.round(amountCents / Math.max(1, tuks) / 100);
    for (const [h, price] of Object.entries(t.durationOptions ?? {})) {
      if (price === perTuk) return Number(h);
    }
    return 5; // não reconhecido -> assume o máximo (mais seguro)
  }
  return t.durationHours ?? 3;
}

export interface PriceResult {
  amountCents: number;
  tourName: string;
  tuks: number;
  baseEuros: number;
}

// Calcula o valor total (em cêntimos) com a regra multi-tuk: 1 tuk por cada 5 pax.
export function computeAmountCents(
  tourId: string,
  durationHours: number,
  passengers: number,
): PriceResult {
  const t = TOUR_PRICING[tourId];
  if (!t) throw new Error("Tour inválido.");
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > 50) {
    throw new Error("Número de passageiros inválido.");
  }

  let base: number;
  if (t.isALaCarte) {
    base = t.durationOptions?.[durationHours] ?? 0;
    if (!base) throw new Error("Duração inválida para o tour à la carte.");
  } else {
    base = t.basePrice;
  }

  const tuks = Math.ceil(passengers / 5);
  const euros = base * tuks;
  return { amountCents: euros * 100, tourName: t.name, tuks, baseEuros: euros };
}
