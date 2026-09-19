import type { Metadata } from "next";
import GuidePageTemplate from "../GuidePageTemplate";

export const metadata: Metadata = {
  title: "How Much Protein Do I Need? A Complete Guide",
  description:
    "How much protein you actually need per day, why the standard RDI is a minimum rather than a target, and what actually determines the right number for you.",
  alternates: { canonical: "/protein-guides/how-much-protein-do-i-need" },
};

export default function HowMuchProteinGuide() {
  return (
    <GuidePageTemplate
      h1="How Much Protein Do I Need?"
      subtitle="The RDI, why it's a floor rather than a target, and what actually determines the right number for you."
      sections={[
        {
          heading: "The official RDI is lower than most people think",
          body: (
            <p>
              Australia's Nutrient Reference Values set the Recommended
              Dietary Intake for protein at roughly 0.75–0.84g per kilogram
              of bodyweight for most adults — a figure designed to prevent
              deficiency in a sedentary population, not to optimise health,
              body composition or performance. For an 80kg adult, that's
              around 60–67g per day. In practice, most nutrition research on
              body composition, muscle maintenance and satiety points to
              meaningfully higher intakes — commonly 1.6–2.2g per
              kilogram — being more useful targets for anyone with a
              specific goal.
            </p>
          ),
        },
        {
          heading: "Four things actually change your number",
          body: (
            <>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Your goal.</strong> Weight maintenance, weight
                  loss and muscle gain all call for different intakes —
                  losing weight and building muscle both raise the target
                  above simple maintenance.
                </li>
                <li>
                  <strong>Activity level.</strong> Someone doing regular
                  resistance training breaks down and repairs more muscle
                  tissue than someone largely sedentary, and needs more
                  protein to support that.
                </li>
                <li>
                  <strong>Age.</strong> From around 50 onward, the body
                  becomes less efficient at using dietary protein to build
                  and maintain muscle — a phenomenon researchers call
                  anabolic resistance — so older adults need more per
                  kilogram to achieve the same effect.
                </li>
                <li>
                  <strong>Body composition.</strong> Protein needs track
                  more closely with lean mass than total bodyweight, which
                  is why two people at the same weight but different body
                  compositions can have meaningfully different actual needs.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Is eating a lot of protein actually risky?",
          body: (
            <p>
              For healthy adults with normal kidney function, there's no
              strong evidence that the intakes discussed here (up to around
              2.2g per kilogram) pose a health risk — concerns about protein
              and kidney damage largely come from studies on people who
              already have kidney disease, not from healthy populations.
              That said, if you have an existing kidney condition or another
              relevant medical concern, check with your doctor before
              making a significant change to your protein intake.
            </p>
          ),
        },
        {
          heading: "A rule of thumb vs. an actual number",
          body: (
            <p>
              General ranges are useful for understanding the topic, but
              they're not a substitute for a number based on your actual
              weight, age, activity and goal. Our{" "}
              <a href="/protein-calculator" className="font-semibold text-pt-black underline">
                protein calculator
              </a>{" "}
              runs the same calculation used in the HitProtein app to give
              you a specific daily target rather than a broad range.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Is the RDI enough protein?",
          a: "The RDI is set to prevent deficiency in a sedentary population — it's a floor, not an optimal target. Most people with a specific fitness or body composition goal benefit from intakes above it.",
        },
        {
          q: "Can eating too much protein damage your kidneys?",
          a: "For healthy adults with normal kidney function, there's no strong evidence that higher protein intakes (within the ranges discussed here) cause kidney damage. The concern mainly applies to people who already have kidney disease.",
        },
        {
          q: "Does everyone need the same amount of protein?",
          a: "No — it varies significantly based on weight, activity level, age and goal. A generic average doesn't reflect any specific person's actual need.",
        },
      ]}
    />
  );
}
