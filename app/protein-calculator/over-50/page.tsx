import type { Metadata } from "next";
import CalculatorPageTemplate from "../CalculatorPageTemplate";

export const metadata: Metadata = {
  title: "Protein Calculator Over 50 — Protein Intake for Healthy Ageing",
  description:
    "Calculate your daily protein target for over 50. Protein needs rise with age to help protect muscle mass — get your personalised number here.",
  alternates: { canonical: "/protein-calculator/over-50" },
};

export default function Over50CalculatorPage() {
  return (
    <CalculatorPageTemplate
      h1="Protein Calculator Over 50"
      subtitle="Protein needs rise with age. Here's your target, adjusted for it."
      defaultGoalType="maintain"
      defaultActivityLevel="active"
      defaultAge="55"
      sections={[
        {
          heading: "Why protein needs increase after 50",
          body: (
            <p>
              From around age 50 onward, muscle responds less efficiently to
              the same amount of dietary protein — a process researchers
              call anabolic resistance. In practical terms, that means
              eating the same amount of protein you did at 30 may no longer
              be enough to maintain the same muscle mass at 55, 65 or 75.
              This calculator increases your protein-per-kilogram target
              gradually from age 50, and again at 60, 75 and 85, to reflect
              this.
            </p>
          ),
        },
        {
          heading: "Why muscle mass matters more as you get older",
          body: (
            <p>
              Muscle isn't just about strength or appearance — it plays a
              direct role in mobility, balance, metabolic health and
              recovery from illness or injury. Age-related muscle loss
              (sarcopenia) is a normal part of ageing, but adequate protein
              intake, combined with resistance activity where possible, is
              one of the most effective ways to slow it down.
            </p>
          ),
        },
        {
          heading: "Getting enough protein without overeating",
          body: (
            <p>
              Appetite often decreases with age, which can make it harder to
              eat enough protein through meals alone. Prioritising
              protein-dense foods — eggs, Greek yoghurt, fish, lean meat,
              cottage cheese — earlier in the day, and spreading intake
              across 3–4 meals rather than one large one, tends to work
              better than trying to eat a large amount in a single sitting.
              See our{" "}
              <a href="/protein-foods" className="font-semibold text-pt-black underline">
                protein foods guide
              </a>{" "}
              for protein-dense options.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "How much protein should someone over 50 eat per day?",
          a: "More than the standard adult baseline, generally — often somewhere around 1.8–2.0g per kilogram of bodyweight for weight maintenance, higher again for weight loss or muscle-building goals. Use the calculator above for a target based on your specific age, weight and goal.",
        },
        {
          q: "Why do protein needs increase with age?",
          a: "As we age, the body becomes less efficient at using dietary protein to build and maintain muscle (anabolic resistance), so more protein is needed to achieve the same muscle-preserving effect that a smaller amount would have provided at a younger age.",
        },
        {
          q: "Is a higher protein diet safe for older adults?",
          a: "For most healthy older adults, yes — the amounts this calculator suggests are within normal safe ranges. If you have kidney disease or another relevant condition, check with your doctor before making a significant change to your protein intake.",
        },
      ]}
    />
  );
}
