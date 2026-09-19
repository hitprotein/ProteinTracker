// SHARED PROTEIN CALCULATOR ENGINE
//
// Exact port of `calculate_protein_target()` from the HitProtein app's
// server.py (single source of truth there too — the app never computes
// a target itself, it posts to /protein-target and renders the result).
// Every calculator page on this site (main, weight-loss, muscle-gain,
// women, men, over-50) must import and call this one function — only
// page copy, defaults and framing differ. If server.py's algorithm
// changes, this file needs the same change or the site and app will
// quote different numbers for the same person.
//
// NOTE: the algorithm does not use sex as an input. Goal-specific pages
// (e.g. "for women") should vary copy/imagery/defaults only, never the
// math — do not add a sex-based adjustment here without also adding it
// in server.py first.

export type GoalType = "build_muscle" | "lose_weight" | "maintain" | "athletic";

export type ActivityLevel =
  | "sedentary"
  | "active"
  | "strength_training"
  | "high_performance";

const GOAL_BASE: Record<GoalType, number> = {
  build_muscle: 2.2,
  lose_weight: 2.0,
  maintain: 1.6,
  athletic: 1.8,
};

// Ceilings sit ABOVE each baseline so the adjustments below have room to
// move (capping a goal at its own baseline would make age/activity do
// nothing for it).
const GOAL_MAX: Record<GoalType, number> = {
  build_muscle: 2.4,
  lose_weight: 2.2,
  maintain: 1.8,
  athletic: 2.0,
};

const ACTIVITY_ADJUSTMENT: Record<ActivityLevel, number> = {
  sedentary: 0.0,
  active: 0.05,
  strength_training: 0.1,
  high_performance: 0.15,
};

// Protein needs rise with age as muscle responds less readily to the same
// intake, so older adults need more per kg to hold the same muscle.
const AGE_BANDS: [number, number][] = [
  [50, 0.0],
  [60, 0.05],
  [75, 0.1],
  [85, 0.15],
];
const AGE_ADJUSTMENT_MAX = 0.2;

// Sanity ceiling — nothing in normal ranges reaches this, but a target
// beyond it isn't a plan anyone can follow.
const ABSOLUTE_MAX_GRAMS = 300;

// Protein need scales with lean mass; fat above a point adds almost none.
// Without this, two very different bodies at the same weight would get
// identical targets.
const BMI_CAP_DEFAULT = 27.5;
const BMI_CAP_TRAINED = 30.0;
const TRAINED_ACTIVITY = new Set<ActivityLevel>(["strength_training", "high_performance"]);

function ageAdjustment(age?: number | null): number {
  if (!age) return 0.0;
  for (const [threshold, adj] of AGE_BANDS) {
    if (age < threshold) return adj;
  }
  return AGE_ADJUSTMENT_MAX;
}

/**
 * Trim a reference weight to a plausible lean-mass-bearing frame.
 * No-op without height, which is why height is worth collecting: bodyweight
 * alone cannot tell a tall heavy person from a short heavier one.
 */
function bmiCapped(
  weightKg: number,
  heightCm?: number | null,
  activityLevel?: ActivityLevel | null
): number {
  if (!heightCm || heightCm <= 0) return weightKg;
  const cap =
    activityLevel && TRAINED_ACTIVITY.has(activityLevel) ? BMI_CAP_TRAINED : BMI_CAP_DEFAULT;
  const metres = heightCm / 100.0;
  return Math.min(weightKg, cap * metres * metres);
}

/**
 * Weight the target is calculated from — not simply current weight.
 * For someone with a lot to lose, fat mass barely contributes to protein
 * need, so scaling off total bodyweight overshoots. Someone bulking is
 * feeding a body slightly larger than today's. Both move PARTWAY toward
 * the goal, never all the way.
 */
function referenceWeight(currentKg: number, goalKg?: number | null): number {
  if (!goalKg || goalKg === currentKg) return currentKg;

  if (goalKg < currentKg) {
    const diff = currentKg - goalKg;
    const pct = diff / currentKg;
    // Continuous ramp rather than tiers — runs to 1.0 (full goal weight)
    // at 40% intended loss.
    let factor: number;
    if (pct <= 0.1) factor = 0.0;
    else if (pct >= 0.4) factor = 1.0;
    else factor = (pct - 0.1) / 0.3;
    return currentKg - diff * factor;
  }

  // Gaining: halfway toward the goal, capped at +10% of current weight.
  const gain = goalKg - currentKg;
  return currentKg + Math.min(gain * 0.5, currentKg * 0.1);
}

export interface ProteinCalculatorInput {
  weightKg: number;
  goalType: GoalType;
  age?: number | null;
  goalWeightKg?: number | null;
  activityLevel?: ActivityLevel | null;
  heightCm?: number | null;
}

export interface ProteinCalculatorResult {
  proteinGoal: number;
  proteinPerKg: number;
  referenceWeightKg: number;
}

export function calculateProteinTarget(
  input: ProteinCalculatorInput
): ProteinCalculatorResult {
  const goal: GoalType = GOAL_BASE[input.goalType] !== undefined ? input.goalType : "maintain";

  let coefficient =
    GOAL_BASE[goal] +
    ageAdjustment(input.age) +
    ACTIVITY_ADJUSTMENT[input.activityLevel ?? "sedentary"];
  coefficient = Math.min(coefficient, GOAL_MAX[goal]);

  let reference = referenceWeight(input.weightKg, input.goalWeightKg);
  // Applied after the goal-weight ramp so whichever produces the lower
  // reference wins.
  reference = bmiCapped(reference, input.heightCm, input.activityLevel);

  // Rounded to the nearest whole gram, not the nearest 5 — a target of
  // 167g reads as calculated for one person; 165g reads as a bracket.
  const grams = Math.min(Math.round(reference * coefficient), ABSOLUTE_MAX_GRAMS);

  return {
    proteinGoal: grams,
    proteinPerKg: Math.round(coefficient * 100) / 100,
    referenceWeightKg: Math.round(reference * 10) / 10,
  };
}
