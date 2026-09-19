import type { Metadata } from "next";
import CalculatorPageTemplate from "./CalculatorPageTemplate";

export const metadata: Metadata = {
  title: "Protein Calculator — Daily Protein Intake Calculator (Australia)",
  description:
    "Calculate exactly how much protein you need per day based on your weight, age, activity level and goal. Free protein calculator for weight loss, muscle gain and general health.",
  alternates: { canonical: "/protein-calculator" },
};

export default function ProteinCalculatorPage() {
  return (
    <CalculatorPageTemplate
      h1="Protein Calculator"
      subtitle="Work out exactly how much protein you need per day, based on your weight, age, activity level and goal."
      sections={[
        {
          heading: "What is protein and why does it matter?",
          body: (
            <p>
              Protein is one of the three macronutrients (alongside
              carbohydrates and fat) and the main building block your body
              uses to repair and build muscle, produce enzymes and hormones,
              and support your immune system. Unlike fat, the body doesn't
              store much protein for later — which is why getting enough of
              it consistently, day after day, matters more than most other
              nutrients.
            </p>
          ),
        },
        {
          heading: "How is your protein target calculated?",
          body: (
            <>
              <p>
                This calculator starts from a baseline amount of protein per
                kilogram of bodyweight, and adjusts it based on:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Your goal</strong> — building muscle and losing
                  weight both raise protein needs above simple weight
                  maintenance.
                </li>
                <li>
                  <strong>Your activity level</strong> — regular strength
                  training or high-performance training increases the amount
                  your body can put to use.
                </li>
                <li>
                  <strong>Your age</strong> — protein needs per kilogram rise
                  gradually from around age 50, since muscle responds less
                  efficiently to the same intake as we get older.
                </li>
                <li>
                  <strong>Your height and weight together</strong> — rather
                  than weight alone, since two people at the same weight but
                  very different heights can have very different amounts of
                  lean mass to support.
                </li>
                <li>
                  <strong>A goal weight</strong>, if you have one — your
                  target is calculated partway toward it, not entirely off
                  your current weight or entirely off an aspirational one.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Protein per kg of bodyweight",
          body: (
            <>
              <p>As a general guide (before the adjustments above are applied):</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Weight maintenance: around 1.6g per kg</li>
                <li>Weight loss: around 2.0g per kg</li>
                <li>Building muscle: around 2.2g per kg</li>
                <li>General fitness / athletic performance: around 1.8g per kg</li>
              </ul>
              <p className="text-sm text-pt-black/50">
                These are starting points, not fixed rules — individual needs
                vary, and the calculator above refines these based on your
                specific details.
              </p>
            </>
          ),
        },
        {
          heading: "Examples of high-protein foods",
          body: (
            <p>
              Chicken breast, eggs, Greek yoghurt, lean beef, tuna, salmon,
              cottage cheese, milk and tofu are all efficient ways to hit a
              daily protein target without excess calories. See our{" "}
              <a href="/protein-foods" className="font-semibold text-pt-black underline">
                protein foods guide
              </a>{" "}
              for exact amounts per serving.
            </p>
          ),
        },
        {
          heading: "How to spread protein throughout the day",
          body: (
            <p>
              Rather than eating most of your protein in one meal, aim to
              spread it fairly evenly across 3–4 meals. Muscle protein
              synthesis responds better to repeated moderate doses through
              the day than to one very large serving. If you're not sure
              what that looks like in practice, our{" "}
              <a
                href="/protein-meal-calculator"
                className="font-semibold text-pt-black underline"
              >
                protein meal calculator
              </a>{" "}
              can suggest food combinations for a specific per-meal target.
            </p>
          ),
        },
        {
          heading: "Calculators for specific goals",
          body: (
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>
                <a href="/protein-calculator/weight-loss" className="font-semibold text-pt-black underline">
                  Protein calculator for weight loss
                </a>
              </li>
              <li>
                <a href="/protein-calculator/muscle-gain" className="font-semibold text-pt-black underline">
                  Protein calculator for muscle gain
                </a>
              </li>
              <li>
                <a href="/protein-calculator/women" className="font-semibold text-pt-black underline">
                  Protein calculator for women
                </a>
              </li>
              <li>
                <a href="/protein-calculator/men" className="font-semibold text-pt-black underline">
                  Protein calculator for men
                </a>
              </li>
              <li>
                <a href="/protein-calculator/over-50" className="font-semibold text-pt-black underline">
                  Protein calculator over 50
                </a>
              </li>
            </ul>
          ),
        },
      ]}
      faqs={[
        {
          q: "How much protein do I need per day?",
          a: "It depends on your body weight, activity level, age and goal. Most adults need somewhere between 1.6g and 2.2g of protein per kilogram of bodyweight per day, with higher needs for people building muscle, losing weight, or over 60. Use the calculator above for a number based on your own details.",
        },
        {
          q: "Is more protein always better?",
          a: "No. Protein needs plateau once you're eating enough to support your goal — there's a sensible range for your body and activity level, not an amount where more automatically means better results. The calculator above returns a target within that healthy range rather than a maximum.",
        },
        {
          q: "Do I need more protein if I'm trying to lose weight?",
          a: "Yes. Protein needs go up during a calorie deficit — it helps preserve muscle mass while you lose fat, and helps with satiety. That's why this calculator uses a higher multiplier for a weight-loss goal than for simple maintenance.",
        },
        {
          q: "Does age change how much protein I need?",
          a: "Yes. As people get older, muscle responds less efficiently to the same amount of protein (a process called anabolic resistance), so older adults generally need more protein per kilogram of bodyweight to maintain the same muscle mass. This calculator increases your target gradually from age 50 onward.",
        },
        {
          q: "What's the easiest way to actually track my protein?",
          a: "Most people find manual tracking tedious. HitProtein lets you set this target automatically, log food quickly, and even take a photo of a meal for an AI estimate of its protein content — removing most of the manual effort.",
        },
      ]}
    />
  );
}
