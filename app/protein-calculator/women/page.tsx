import type { Metadata } from "next";
import CalculatorPageTemplate from "../CalculatorPageTemplate";

export const metadata: Metadata = {
  title: "Protein Calculator for Women — Daily Protein Intake Calculator",
  description:
    "Calculate how much protein you need per day. A protein calculator built around your weight, activity level and goal — get your personalised target.",
  alternates: { canonical: "/protein-calculator/women" },
};

export default function WomenCalculatorPage() {
  return (
    <CalculatorPageTemplate
      h1="Protein Calculator for Women"
      subtitle="Work out your daily protein target based on your weight, activity level and goal."
      defaultGoalType="maintain"
      defaultActivityLevel="active"
      sections={[
        {
          heading: "What actually determines your protein target",
          body: (
            <p>
              Protein needs are driven mainly by bodyweight, activity level,
              age and goal — not by sex directly. A woman and a man at the
              same weight, doing the same type of training, with the same
              goal, need very similar amounts of protein per kilogram of
              bodyweight. Where the numbers commonly look different between
              women and men on average is simply that average bodyweights
              differ — the underlying per-kilogram target is the same
              calculation either way, which is exactly what this calculator
              uses.
            </p>
          ),
        },
        {
          heading: "Common reasons women look for a protein target",
          body: (
            <p>
              Whether you're trying to lose fat while preserving muscle,
              build strength, support a running or training habit, or simply
              eat in a way that keeps you fuller for longer, the starting
              point is the same: knowing your actual daily target rather
              than guessing. Use the goal dropdown above to match your
              specific situation — maintaining, losing weight, building
              muscle, or general fitness all use a different baseline.
            </p>
          ),
        },
        {
          heading: "Pregnancy, breastfeeding and other special cases",
          body: (
            <p>
              This calculator is built for general healthy adults and does
              not account for pregnancy, breastfeeding, or specific medical
              conditions — all of which can genuinely change protein needs.
              If any of those apply to you, a GP, dietitian or your
              obstetric care provider is the right source for a target
              specific to your situation, rather than a general calculator.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Do women need less protein than men?",
          a: "Not per kilogram of bodyweight — the calculation is the same. Women often need fewer total grams than men simply because average bodyweights differ, not because the underlying protein-per-kg target is lower.",
        },
        {
          q: "How much protein should a woman eat to lose weight?",
          a: "Generally more than for weight maintenance — protein needs rise during a calorie deficit to help preserve muscle. Select 'Lose weight' as your goal above for a target that accounts for this, or see our dedicated protein calculator for weight loss.",
        },
        {
          q: "Is a high-protein diet safe for women?",
          a: "For most healthy adults, yes — the amounts this calculator suggests sit well within normal safe ranges. If you have a kidney condition or another relevant medical concern, check with your doctor before significantly changing your protein intake.",
        },
      ]}
    />
  );
}
