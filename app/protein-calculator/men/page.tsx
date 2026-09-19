import type { Metadata } from "next";
import CalculatorPageTemplate from "../CalculatorPageTemplate";

export const metadata: Metadata = {
  title: "Protein Calculator for Men — Daily Protein Intake Calculator",
  description:
    "Calculate how much protein you need per day. A protein calculator built around your weight, activity level and goal — get your personalised target.",
  alternates: { canonical: "/protein-calculator/men" },
};

export default function MenCalculatorPage() {
  return (
    <CalculatorPageTemplate
      h1="Protein Calculator for Men"
      subtitle="Work out your daily protein target based on your weight, activity level and goal."
      defaultGoalType="maintain"
      defaultActivityLevel="active"
      sections={[
        {
          heading: "What actually determines your protein target",
          body: (
            <p>
              Protein needs come down to bodyweight, activity level, age and
              goal — not sex on its own. Two people at the same weight,
              training the same way, with the same goal, land on very
              similar protein-per-kilogram targets regardless of sex. Men's
              total gram targets often look higher on average mainly because
              average male bodyweight is higher, not because the underlying
              per-kilogram calculation changes.
            </p>
          ),
        },
        {
          heading: "Matching your target to your actual training",
          body: (
            <p>
              The activity level you select matters more than most people
              expect. Someone doing regular strength training needs
              meaningfully more protein than someone who's largely sedentary,
              even at the same bodyweight and goal — because harder training
              creates more muscle breakdown that needs repairing. Pick the
              activity level that matches what you're actually doing each
              week, not what you're aiming for.
            </p>
          ),
        },
        {
          heading: "If your main goal is building muscle or losing fat",
          body: (
            <p>
              This calculator handles both — select "Build muscle" or "Lose
              weight" from the goal dropdown above for a target adjusted to
              that specific goal. For more detail on either, see the
              dedicated{" "}
              <a
                href="/protein-calculator/muscle-gain"
                className="font-semibold text-pt-black underline"
              >
                muscle gain calculator
              </a>{" "}
              or{" "}
              <a
                href="/protein-calculator/weight-loss"
                className="font-semibold text-pt-black underline"
              >
                weight loss calculator
              </a>
              .
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "How much protein does the average man need per day?",
          a: "It depends heavily on weight, activity and goal, but most men land somewhere between 1.6g and 2.4g per kilogram of bodyweight per day. Use the calculator above for a number based on your own details rather than a generic average.",
        },
        {
          q: "Do men need more protein than women?",
          a: "Not per kilogram of bodyweight — the calculation is identical. Men often land on a higher total gram figure simply because average male bodyweight is higher.",
        },
        {
          q: "Is it possible to eat too much protein?",
          a: "For most healthy adults, the ranges this calculator suggests are well within normal safe limits. If you have a kidney condition or another relevant medical concern, check with your doctor before making a significant change to your protein intake.",
        },
      ]}
    />
  );
}
