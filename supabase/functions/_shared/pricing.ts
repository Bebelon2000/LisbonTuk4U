// ──────────────────────────────────────────────────────────────
// Tabela de preços do lado do SERVIDOR (fonte de verdade).
// NUNCA confiar no valor enviado pelo browser — o preço é sempre
// recalculado aqui antes de criar o pagamento.
// Tem de espelhar os preços de js/main.js (TOUR_DATA).
// ──────────────────────────────────────────────────────────────
interface TourPrice {
  name: string;
  basePrice: number;        // €, por tuk (até 5 pax)
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
  "belem": { name: "Belém", basePrice: 180 },
  "half-day": { name: "Half Day", basePrice: 300 },
  "centro-historico": { name: "Centro Histórico", basePrice: 180 },
  "miradouros": { name: "Lisboa Miradouros", basePrice: 240 },
  "full-lisboa": { name: "Full Lisboa", basePrice: 360 },
};

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
