"use client";

import { useState } from "react";
import { calculateGlp1Protein, type Glp1Phase, type Glp1Result } from "@/lib/glp1-protein";
import { GLP1_DISCLAIMER } from "@/lib/glp1-sources";

type Outcome = { type: "result"; result: Glp1Result } | { type: "referral"; reason: string } | null;

export default function Glp1Calculator() {
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [phase, setPhase] = useState<Glp1Phase>("losing");
  const [kidney, setKidney] = useState(false);
  const [pregnant, setPregnant] = useState(false);
  const [error, setError] = useState("");
  const [outcome, setOutcome] = useState<Outcome>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const w = parseFloat(weight);
    const a = parseInt(age, 10);
    if (!(w >= 30 && w <= 300)) return setError("Enter your weight in kg (30–300).");
    if (!(a >= 1 && a <= 110)) return setError("Enter your age.");
    setError("");
    // Safety gates: groups where general ranges don't apply. No number is shown.
    if (a < 18) return setOutcome({ type: "referral", reason: "This calculator is for adults. Protein needs for people under 18 should be set with a doctor or dietitian." });
    if (kidney) return setOutcome({ type: "referral", reason: "Protein needs with kidney disease, or when you've been told to limit protein, are individual and can differ a lot from general ranges. Please ask your doctor or an Accredited Practising Dietitian for your target." });
    if (pregnant) return setOutcome({ type: "referral", reason: "Protein needs during pregnancy and breastfeeding are different. Please ask your doctor, midwife or an Accredited Practising Dietitian for your target." });
    setOutcome({ type: "result", result: calculateGlp1Protein(w, a, phase) });
  }

  const field = "rounded-lg border border-pt-black/20 px-3 py-2 font-normal";
  const label = "flex flex-col gap-1 text-sm font-semibold";

  return (
    <div className="rounded-card border border-pt-black/10 bg-pt-white p-6 shadow-sm md:p-8">
      <form onSubmit={handleCalculate} className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Weight (kg)
          <input inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 95" className={field} />
        </label>
        <label className={label}>
          Age
          <input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 45" className={field} />
        </label>
        <label className={`${label} sm:col-span-2`}>
          Where are you at right now?
          <select value={phase} onChange={(e) => setPhase(e.target.value as Glp1Phase)} className={field}>
            <option value="losing">Currently losing weight</option>
            <option value="maintaining">Maintaining my weight</option>
          </select>
        </label>
        <fieldset className="space-y-2 text-sm sm:col-span-2">
          <legend className="font-semibold">Do any of these apply to you?</legend>
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={kidney} onChange={(e) => setKidney(e.target.checked)} className="mt-1" />
            I have kidney disease, or I&apos;ve been told to limit protein
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={pregnant} onChange={(e) => setPregnant(e.target.checked)} className="mt-1" />
            I&apos;m pregnant or breastfeeding
          </label>
        </fieldset>
        {error && <p className="text-sm font-semibold text-red-600 sm:col-span-2">{error}</p>}
        <button type="submit" className="rounded-card bg-pt-black px-6 py-3 font-heading font-bold text-pt-white transition hover:bg-pt-green hover:text-pt-black sm:col-span-2">
          Calculate my protein range
        </button>
      </form>

      {outcome?.type === "referral" && (
        <div className="mt-8 rounded-card border border-pt-black/10 bg-pt-offwhite p-6">
          <p className="font-heading text-lg font-bold">Best to get a personal target</p>
          <p className="mt-2 text-sm text-pt-black/75">{outcome.reason}</p>
        </div>
      )}

      {outcome?.type === "result" && (
        <div className="mt-8 rounded-card bg-pt-black p-8 text-center text-pt-white">
          <p className="text-sm uppercase tracking-wide text-pt-white/60">
            {outcome.result.kind === "range" ? "Published guidance suggests" : "Published guidance suggests at least"}
          </p>
          <p className="mt-2 font-heading text-5xl font-extrabold text-pt-green">
            {outcome.result.kind === "range" || outcome.result.high !== outcome.result.low
              ? `${outcome.result.low}–${outcome.result.high}g`
              : `${outcome.result.low}g`}
            <span className="text-2xl text-pt-white"> per day</span>
          </p>
          <p className="mt-3 text-sm text-pt-white/70">
            About {outcome.result.perMealLow === outcome.result.perMealHigh ? outcome.result.perMealLow : `${outcome.result.perMealLow}–${outcome.result.perMealHigh}`}g
            per meal if spread across four meals or snacks.
          </p>
          <p className="mt-4 text-xs text-pt-white/50">Based on {outcome.result.basis}.</p>
          {outcome.result.largeBodyNote && (
            <p className="mt-4 rounded-lg bg-pt-white/10 p-3 text-left text-xs text-pt-white/75">
              Weight-based ranges can come out high for larger bodies. The same guidance also describes a practical
              target of 80–120g a day, and many clinicians use an adjusted body weight. Your dietitian can help you pick
              a number that suits you.
            </p>
          )}
          <p className="mt-6 border-t border-pt-white/10 pt-4 text-left text-xs leading-relaxed text-pt-white/55">{GLP1_DISCLAIMER}</p>
        </div>
      )}
    </div>
  );
}
