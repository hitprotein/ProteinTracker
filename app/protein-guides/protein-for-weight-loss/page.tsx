import type { Metadata } from "next";
import GuidePageTemplate from "../GuidePageTemplate";

export const metadata: Metadata = {
  title: "Protein For Weight Loss — Why It Matters More Than You Think",
  description:
    "Why protein needs rise during weight loss, how it helps with hunger and muscle preservation, and practical ways to hit a higher target on fewer calories.",
  alternates: { canonical: "/protein-guides/protein-for-weight-loss" },
};

export default function ProteinForWeightLossGuide() {
  return (
    <GuidePageTemplate
      h1="Protein For Weight Loss"
      subtitle="Why protein is arguably the most important macronutrient to get right while dieting."
      sections={[
        {
          heading: "Protein and muscle preservation",
          body: (
            <p>
              Weight loss happens when you eat fewer calories than you
              burn — but "weight" lost isn't automatically all fat. Without
              enough protein, a meaningful share of that loss can come from
              muscle tissue instead. Adequate protein intake, ideally
              combined with some resistance training, helps signal to your
              body to preserve muscle and draw more of the energy deficit
              from fat stores.
            </p>
          ),
        },
        {
          heading: "Protein and hunger",
          body: (
            <p>
              Of the three macronutrients, protein has the strongest effect
              on satiety — it tends to keep you feeling fuller for longer
              per calorie than carbohydrate or fat. This matters more during
              a diet than at any other time, since hunger is usually the
              main reason diets fail. A higher-protein meal at the same
              calorie count as a lower-protein one will generally leave you
              less hungry a few hours later.
            </p>
          ),
        },
        {
          heading: "How much protein for weight loss, specifically",
          body: (
            <p>
              Research on dieting populations generally supports higher
              protein intakes than for simple weight maintenance — often in
              the 2.0–2.4g per kilogram range calculated off a
              partially-adjusted reference weight, particularly for people
              with meaningful fat to lose. Our{" "}
              <a
                href="/protein-calculator/weight-loss"
                className="font-semibold text-pt-black underline"
              >
                protein calculator for weight loss
              </a>{" "}
              calculates this automatically based on your current weight,
              goal weight and activity level.
            </p>
          ),
        },
        {
          heading: "Practical ways to hit a higher target on fewer calories",
          body: (
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Choose leaner protein sources (chicken breast, white fish,
                egg whites, non-fat Greek yoghurt) to raise protein without
                raising calories much
              </li>
              <li>
                Put protein on your plate first, then build the rest of the
                meal around it, rather than treating it as an afterthought
              </li>
              <li>
                Spread protein across meals rather than loading it all into
                one — this also helps manage hunger throughout the day
              </li>
              <li>
                Track your intake rather than estimating — most people
                underestimate how far short of their target they actually
                are
              </li>
            </ul>
          ),
        },
      ]}
      faqs={[
        {
          q: "Why does protein matter so much for weight loss specifically?",
          a: "It helps preserve muscle mass during a calorie deficit and keeps you fuller for longer than the same calories from carbs or fat — both of which make the deficit easier to sustain and improve the quality of the weight lost.",
        },
        {
          q: "Will more protein help me lose weight faster on its own?",
          a: "Protein itself doesn't burn fat — you still need a calorie deficit to lose weight. What higher protein does is make that deficit easier to sustain and helps ensure more of the loss is fat rather than muscle.",
        },
        {
          q: "Should I eat more protein than the calculator suggests, just to be safe?",
          a: "Not necessary — the ranges used here already sit at the higher end of what research supports for weight loss. Going meaningfully higher doesn't appear to provide additional benefit for most people.",
        },
      ]}
      ctaHeading="Know your weight-loss protein target?"
      ctaBody="HitProtein tracks it automatically and can scan your meals with AI to estimate protein without manual logging."
    />
  );
}
