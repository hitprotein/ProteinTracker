import type { Metadata } from "next";
import MealCalculator from "./MealCalculator";

export const metadata: Metadata = {
  title: "Protein Meal Calculator — What Can I Eat For X Grams of Protein?",
  description:
    "Enter a protein target and get a food combination that gets you there. A meal calculator for a specific per-meal protein goal.",
  alternates: { canonical: "/protein-meal-calculator" },
};

export default function ProteinMealCalculatorPage() {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">
            Protein Meal Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            "I need X grams of protein. What can I eat?" — enter your
            target and pick a main protein source.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-2xl px-6 pb-24">
        <MealCalculator />

        <div className="mt-10 space-y-4 text-pt-black/80">
          <h2 className="text-2xl font-bold">How this works</h2>
          <p>
            Enter how much protein you want in a single meal and choose a
            main protein source you have or feel like eating. The calculator
            works out roughly how much of that food gets you most of the
            way to your target, then suggests a smaller side (Greek yoghurt
            or cottage cheese) to close the gap — a combination similar to
            how the meal ideas on our{" "}
            <a href="/protein-meals" className="font-semibold text-pt-black underline">
              protein meals pages
            </a>{" "}
            are built.
          </p>
          <p className="text-sm text-pt-black/50">
            This gives a genuinely useful starting combination, not an exact
            prescription — actual protein content varies by brand and exact
            serving size, as explained on each food's page in our{" "}
            <a href="/protein-foods" className="font-semibold text-pt-black underline">
              protein foods guide
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
