"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

// Protein-per-100g figures match the individual food pages under
// /protein-foods — keep these in sync if those numbers change.
const PRIMARY_FOODS = [
  { value: "chicken_breast", label: "Chicken breast", proteinPer100g: 31 },
  { value: "steak", label: "Lean steak", proteinPer100g: 31 },
  { value: "beef_mince", label: "Lean beef mince", proteinPer100g: 26 },
  { value: "salmon", label: "Salmon", proteinPer100g: 23 },
  { value: "tuna", label: "Tuna (drained)", proteinPer100g: 25 },
  { value: "tofu", label: "Firm tofu", proteinPer100g: 8 },
] as const;

const SECONDARY = { label: "Greek yoghurt", proteinPer100g: 10 };
const SECONDARY_ALT = { label: "Cottage cheese", proteinPer100g: 11 };

function roundToNearest(value: number, step: number) {
  return Math.max(step, Math.round(value / step) * step);
}

export default function MealCalculator() {
  const [target, setTarget] = useState("45");
  const [primaryKey, setPrimaryKey] = useState<(typeof PRIMARY_FOODS)[number]["value"]>(
    "chicken_breast"
  );
  const [result, setResult] = useState<{
    primaryLabel: string;
    primaryGrams: number;
    secondaryLabel: string;
    secondaryGrams: number;
    total: number;
  } | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const targetGrams = parseFloat(target);
    if (!targetGrams || targetGrams <= 0) return;

    const primary = PRIMARY_FOODS.find((f) => f.value === primaryKey)!;
    const secondary = primary.label === SECONDARY.label ? SECONDARY_ALT : SECONDARY;

    // Primary food covers roughly 75% of the target, secondary tops up the rest.
    const primaryGrams = roundToNearest(
      (targetGrams * 0.75) / (primary.proteinPer100g / 100),
      10
    );
    const primaryProtein = (primaryGrams * primary.proteinPer100g) / 100;

    const remaining = Math.max(targetGrams - primaryProtein, 0);
    const secondaryGrams = roundToNearest(remaining / (secondary.proteinPer100g / 100), 10);
    const secondaryProtein = (secondaryGrams * secondary.proteinPer100g) / 100;

    setResult({
      primaryLabel: primary.label,
      primaryGrams,
      secondaryLabel: secondary.label,
      secondaryGrams,
      total: Math.round(primaryProtein + secondaryProtein),
    });
  }

  return (
    <div className="rounded-card border border-pt-black/10 bg-pt-white p-6 shadow-sm md:p-8">
      <form onSubmit={handleCalculate} className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-semibold">
          How much protein do you want in this meal?
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={5}
              max={150}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full rounded-lg border border-pt-black/20 px-3 py-2 font-normal"
            />
            <span className="font-normal text-pt-black/60">g</span>
          </div>
        </label>

        <label className="flex flex-col gap-1 text-sm font-semibold">
          Main protein source
          <select
            value={primaryKey}
            onChange={(e) => setPrimaryKey(e.target.value as typeof primaryKey)}
            className="rounded-lg border border-pt-black/20 px-3 py-2 font-normal"
          >
            {PRIMARY_FOODS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="rounded-card bg-pt-black px-6 py-3 font-heading font-bold text-pt-white transition hover:bg-pt-green hover:text-pt-black sm:col-span-2"
        >
          Suggest a Meal
        </button>
      </form>

      {result && (
        <div className="mt-8 rounded-card bg-pt-black p-8 text-pt-white">
          <p className="text-sm uppercase tracking-wide text-pt-white/60">
            {target}g protein meal
          </p>
          <ul className="mt-3 space-y-1 text-lg">
            <li>
              {result.primaryGrams}g {result.primaryLabel}
            </li>
            <li>Rice or a carb of your choice</li>
            <li>Vegetables</li>
            <li>
              {result.secondaryGrams}g {result.secondaryLabel}
            </li>
          </ul>
          <p className="mt-3 font-heading text-2xl font-extrabold text-pt-green">
            ≈{result.total}g protein
          </p>
          <p className="mt-2 text-xs text-pt-white/50">
            Rice and vegetables add a small amount of protein too — this
            estimate is based on the two main protein sources above.
          </p>

          <div className="mt-6 border-t border-pt-white/10 pt-6">
            <p className="text-sm text-pt-white/70">
              Want personalised meal ideas throughout the day instead of
              calculating manually?
            </p>
            <div className="mt-4">
              <CtaButton href="https://hitprotein.com.au/download">
                Try Protein Coach in HitProtein
              </CtaButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
