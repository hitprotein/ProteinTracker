import type { Metadata } from "next";
import GuidePageTemplate from "../GuidePageTemplate";

export const metadata: Metadata = {
  title: "How Much Protein Per Meal? The Leucine Threshold Explained",
  description:
    "How much protein your body can actually use per meal, why spreading protein across the day beats one large meal, and how much that changes with age.",
  alternates: { canonical: "/protein-guides/how-much-protein-per-meal" },
};

export default function HowMuchProteinPerMealGuide() {
  return (
    <GuidePageTemplate
      h1="How Much Protein Per Meal?"
      subtitle="There's a practical ceiling on how much protein one meal can put to use — here's what determines it."
      sections={[
        {
          heading: "The leucine threshold",
          body: (
            <p>
              Muscle protein synthesis is triggered largely by leucine, one
              of the essential amino acids found in protein-rich food. Most
              research suggests you need somewhere around 2.5–3g of leucine
              in a single meal to maximally trigger that response — which
              works out to roughly 25–40g of high-quality protein per meal
              for most adults, depending on body size and the specific
              protein source.
            </p>
          ),
        },
        {
          heading: "Why one big meal isn't as effective as spreading it out",
          body: (
            <p>
              Eating 120g of protein in one sitting doesn't trigger four
              times the muscle-building response of a 30g meal — once
              you're past the threshold that meal has already maximised its
              contribution, and the excess is used for other things
              (energy, or general amino acid needs) rather than an extra
              boost to muscle repair. Spreading the same total protein
              across 3–4 meals through the day, each individually crossing
              that threshold, generally produces a better result than one
              or two very large meals.
            </p>
          ),
        },
        {
          heading: "This threshold rises with age",
          body: (
            <p>
              Older adults generally need a larger dose of protein per meal
              to trigger the same muscle protein synthesis response — a
              consequence of the same anabolic resistance that raises
              overall daily protein needs after age 50. Where a 25-year-old
              might reliably cross the threshold with 25g of protein, someone
              in their 60s or 70s may need closer to 35–40g in a single meal
              to get the same effect.
            </p>
          ),
        },
        {
          heading: "Putting this into practice",
          body: (
            <p>
              Rather than guessing, aim for a rough per-meal target based on
              your daily total split across 3–4 meals, and check it against
              real food combinations. Our{" "}
              <a href="/protein-meals" className="font-semibold text-pt-black underline">
                30g, 40g and 50g protein meal pages
              </a>{" "}
              show exactly what that looks like with real ingredients, and
              the{" "}
              <a
                href="/protein-meal-calculator"
                className="font-semibold text-pt-black underline"
              >
                protein meal calculator
              </a>{" "}
              can suggest a combination for any specific gram target.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "What is the leucine threshold?",
          a: "It's the amount of the amino acid leucine (found in protein-rich food) needed in a single meal to maximally trigger muscle protein synthesis — roughly 2.5–3g of leucine, which works out to about 25–40g of protein for most adults.",
        },
        {
          q: "Is it wasteful to eat more than 40g of protein in one meal?",
          a: "Not wasteful exactly — the extra protein is still used by the body for other purposes — but it doesn't produce a proportionally bigger muscle-building response compared to spreading that protein across another meal instead.",
        },
        {
          q: "Do older adults need more protein per meal?",
          a: "Generally yes — due to anabolic resistance, older adults often need a larger per-meal dose (closer to 35–40g) to trigger the same muscle protein synthesis response that a smaller amount would produce in a younger adult.",
        },
      ]}
      ctaHeading="Want your daily target split into real meals?"
      ctaBody="HitProtein's Protein Coach can suggest meals sized to hit your target evenly across the day."
    />
  );
}
