// Protein ranges for people eating less while on a GLP-1-based medicine, taken directly from published guidance:
//  - Active weight loss: 1.2–1.5 g/kg of actual body weight per day (2025 Delphi expert consensus).
//  - Weight maintenance: at least 0.8 g/kg/day (same consensus); older adults at least 1.0–1.2 g/kg/day
//    (ESPEN-endorsed recommendation cited in the consensus).
//  - The 2025 joint advisory also describes a practical absolute target of 80–120 g/day.
// Deliberately NOT the HitProtein algorithm: different population, different evidence base.

export type Glp1Phase = "losing" | "maintaining";

export interface Glp1Result {
  kind: "range" | "minimum";
  low: number; // g/day, rounded to nearest 5
  high: number; // g/day (equals low when kind === "minimum" for under-65s)
  perMealLow: number; // split over 4 eating occasions
  perMealHigh: number;
  basis: string; // human-readable g/kg basis shown under the result
  largeBodyNote: boolean; // weight-based upper bound is above the 80–120 g absolute range
}

const r5 = (n: number) => Math.max(5, Math.round(n / 5) * 5);

export function calculateGlp1Protein(weightKg: number, age: number, phase: Glp1Phase): Glp1Result {
  const older = age >= 65;
  let lowPerKg: number, highPerKg: number, kind: Glp1Result["kind"], basis: string;

  if (phase === "losing") {
    lowPerKg = 1.2; highPerKg = 1.5; kind = "range";
    basis = "1.2–1.5 g per kg of body weight per day (published guidance during active weight loss)";
  } else if (older) {
    lowPerKg = 1.0; highPerKg = 1.2; kind = "minimum";
    basis = "at least 1.0–1.2 g per kg of body weight per day (published guidance for adults 65+)";
  } else {
    lowPerKg = 0.8; highPerKg = 0.8; kind = "minimum";
    basis = "at least 0.8 g per kg of body weight per day (published guidance during weight maintenance)";
  }

  const low = r5(weightKg * lowPerKg);
  const high = r5(weightKg * highPerKg);
  return {
    kind, low, high,
    perMealLow: r5(low / 4),
    perMealHigh: r5(high / 4),
    basis,
    largeBodyNote: phase === "losing" && high > 120,
  };
}
