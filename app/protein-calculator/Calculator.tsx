"use client";

import { useState } from "react";
import {
  calculateProteinTarget,
  type ActivityLevel,
  type GoalType,
  type ProteinCalculatorResult,
} from "@/lib/protein-calculator";

const GOAL_OPTIONS: { value: GoalType; label: string }[] = [
  { value: "maintain", label: "Maintain weight" },
  { value: "lose_weight", label: "Lose weight" },
  { value: "build_muscle", label: "Build muscle" },
  { value: "athletic", label: "Improve fitness / athletic performance" },
];

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = [
  { value: "sedentary", label: "Sedentary (little to no exercise)" },
  { value: "active", label: "Active (light exercise a few times a week)" },
  { value: "strength_training", label: "Strength training (regular resistance training)" },
  { value: "high_performance", label: "High performance (intense training / athlete)" },
];

export default function ProteinCalculator() {
  const [age, setAge] = useState("30");
  const [heightCm, setHeightCm] = useState("175");
  const [weightKg, setWeightKg] = useState("80");
  const [goalWeightKg, setGoalWeightKg] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("active");
  const [goalType, setGoalType] = useState<GoalType>("maintain");
  const [result, setResult] = useState<ProteinCalculatorResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const weight = parseFloat(weightKg);
    if (!weight || weight <= 0) return;

    setResult(
      calculateProteinTarget({
        weightKg: weight,
        goalType,
        age: age ? parseInt(age, 10) : null,
        goalWeightKg: goalWeightKg ? parseFloat(goalWeightKg) : null,
        activityLevel,
        heightCm: heightCm ? parseFloat(heightCm) : null,
      })
    );
  }

  return (
    <div className="rounded-card border border-pt-black/10 bg-pt-white p-6 shadow-sm md:p-8">
      <form onSubmit={handleCalculate} className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Age
          <input
            type="number"
            min={13}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="rounded-lg border border-pt-black/20 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-semibold">
          Height (cm)
          <input
            type="number"
            min={100}
            max={250}
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            className="rounded-lg border border-pt-black/20 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-semibold">
          Weight (kg)
          <input
            type="number"
            min={25}
            max={350}
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="rounded-lg border border-pt-black/20 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-semibold">
          Goal weight (kg) — optional
          <input
            type="number"
            min={25}
            max={350}
            value={goalWeightKg}
            onChange={(e) => setGoalWeightKg(e.target.value)}
            placeholder="Leave blank if not applicable"
            className="rounded-lg border border-pt-black/20 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-semibold sm:col-span-2">
          Activity level
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
            className="rounded-lg border border-pt-black/20 px-3 py-2 font-normal"
          >
            {ACTIVITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-semibold sm:col-span-2">
          Goal
          <select
            value={goalType}
            onChange={(e) => setGoalType(e.target.value as GoalType)}
            className="rounded-lg border border-pt-black/20 px-3 py-2 font-normal"
          >
            {GOAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="rounded-card bg-pt-black px-6 py-3 font-heading font-bold text-pt-white transition hover:bg-pt-green hover:text-pt-black sm:col-span-2"
        >
          Calculate My Protein Target
        </button>
      </form>

      {result && (
        <div className="mt-8 rounded-card bg-pt-black p-8 text-center text-pt-white">
          <p className="text-sm uppercase tracking-wide text-pt-white/60">
            Your recommended protein target
          </p>
          <p className="mt-2 font-heading text-5xl font-extrabold text-pt-green">
            {result.proteinGoal}g <span className="text-2xl text-pt-white">per day</span>
          </p>
          <p className="mt-2 text-sm text-pt-white/60">
            ≈ {result.proteinPerKg}g per kg of reference bodyweight (
            {result.referenceWeightKg}kg)
          </p>

          <div className="mt-8 border-t border-pt-white/10 pt-6 text-left">
            <p className="font-heading text-lg font-bold text-pt-white">
              Now that you know your target, the next step is actually hitting it.
            </p>
            <p className="mt-2 text-sm text-pt-white/70">
              HitProtein sets this goal for you automatically, tracks what you
              eat, and can scan a photo of your meal to estimate its protein
              with AI.
            </p>
            <a
              href="https://hitprotein.com.au/download"
              className="mt-4 inline-block rounded-card bg-pt-green px-6 py-3 font-heading font-bold text-pt-black transition hover:opacity-90"
            >
              Track Your Protein With HitProtein
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
