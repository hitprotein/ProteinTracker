import type { Metadata } from "next";
import CalculatorPageTemplate from "../CalculatorPageTemplate";

export const metadata: Metadata = {
  title: "Protein Calculator for Muscle Gain — How Much Protein to Build Muscle",
  description:
    "Calculate how much protein you need to build muscle. Get a personalised daily protein target based on your weight, training and goal.",
  alternates: { canonical: "/protein-calculator/muscle-gain" },
};

export default function MuscleGainCalculatorPage() {
  return (
    <CalculatorPageTemplate
      h1="Protein Calculator for Muscle Gain"
      subtitle="Building muscle takes more than lifting — your body needs the raw material to actually grow. Here's your target."
      defaultGoalType="build_muscle"
      defaultActivityLevel="strength_training"
      sections={[
        {
          heading: "Why muscle gain needs more protein than maintenance",
          body: (
            <p>
              Building new muscle tissue is a constant process of breaking
              down muscle protein through training and rebuilding it
              slightly bigger and stronger — a process called muscle protein
              synthesis. That rebuilding requires a steady supply of amino
              acids from food. Without enough protein, your body simply
              doesn't have the raw material to build new tissue, no matter
              how hard or consistently you train. That's why this calculator
              uses the highest baseline protein-per-kg figure of any goal
              for muscle gain.
            </p>
          ),
        },
        {
          heading: "Training intensity matters as much as the number on the scale",
          body: (
            <p>
              Someone doing regular strength training or high-performance
              training gets more benefit from additional protein than
              someone training lightly, because harder training creates more
              muscle breakdown that needs repairing. This calculator adjusts
              your target upward for strength training or high-performance
              activity levels — select the one that best matches your actual
              training, not your goal, for the most accurate number.
            </p>
          ),
        },
        {
          heading: "Building muscle usually means eating slightly more overall",
          body: (
            <p>
              If you enter a goal weight above your current weight, this
              calculator nudges your reference weight up — halfway toward
              your goal, capped at 10% above your current weight — since a
              body that's actively gaining muscle needs to be fed slightly
              ahead of where it is today, not exactly at today's weight.
            </p>
          ),
        },
        {
          heading: "Best protein sources for muscle gain",
          body: (
            <p>
              Chicken breast, lean beef, eggs, Greek yoghurt, cottage cheese
              and salmon all provide a complete amino acid profile in a
              reasonably calorie-efficient package — useful since building
              muscle also usually means eating in a slight calorie surplus.
              See{" "}
              <a href="/protein-meals" className="font-semibold text-pt-black underline">
                40g and 50g protein meal ideas
              </a>{" "}
              for meals sized around a muscle-building target.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "How much protein do I need to build muscle?",
          a: "Most people building muscle need somewhere around 2.0–2.4g of protein per kilogram of bodyweight per day, depending on training intensity and age — use the calculator above for a number based on your specific details.",
        },
        {
          q: "Can I build muscle without eating more calories overall?",
          a: "It's possible in some circumstances (especially for beginners or when returning to training), but building muscle is generally easier in a slight calorie surplus. Protein alone won't build muscle without enough total energy to support the process.",
        },
        {
          q: "Does age affect how much protein I need to build muscle?",
          a: "Yes — older adults need more protein per kilogram to build or even maintain the same amount of muscle, since the body responds less efficiently to protein intake as it ages. This calculator accounts for that automatically based on the age you enter.",
        },
      ]}
    />
  );
}
