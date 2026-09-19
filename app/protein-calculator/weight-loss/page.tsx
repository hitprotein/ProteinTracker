import type { Metadata } from "next";
import CalculatorPageTemplate from "../CalculatorPageTemplate";

export const metadata: Metadata = {
  title: "Protein Calculator for Weight Loss — Protein Intake for Fat Loss",
  description:
    "Calculate how much protein you need for weight loss. Protein needs increase during a calorie deficit to protect muscle — get your personalised target here.",
  alternates: { canonical: "/protein-calculator/weight-loss" },
};

export default function WeightLossCalculatorPage() {
  return (
    <CalculatorPageTemplate
      h1="Protein Calculator for Weight Loss"
      subtitle="Losing weight means eating fewer calories than you burn — but protein needs actually go up, not down. Here's your target."
      defaultGoalType="lose_weight"
      defaultActivityLevel="active"
      sections={[
        {
          heading: "Why protein needs increase during weight loss",
          body: (
            <p>
              When you eat in a calorie deficit, your body is short on fuel —
              and without enough protein, some of the weight you lose comes
              from muscle, not just fat. Eating more protein relative to your
              total calories helps signal to your body to preserve muscle
              tissue while it draws energy from fat stores instead. This is
              why this calculator uses a higher protein-per-kg figure for a
              weight-loss goal than it does for simple weight maintenance.
            </p>
          ),
        },
        {
          heading: "Protein also helps with the hardest part of dieting",
          body: (
            <p>
              Protein is the most filling macronutrient gram-for-gram, which
              matters most when you're eating less overall. Meals built
              around a solid protein source tend to keep hunger down for
              longer than the same number of calories from carbs or fat
              alone — which is a big part of why high-protein diets are
              easier to stick to than low-protein ones at the same calorie
              level.
            </p>
          ),
        },
        {
          heading: "How your weight-loss target is calculated here",
          body: (
            <p>
              If you enter a goal weight below your current weight, this
              calculator doesn't simply use your current weight or jump
              straight to your goal weight — it moves your reference weight
              partway toward your goal, scaled to how much you have to lose.
              Someone with a small amount to lose sees almost no change;
              someone with a lot to lose has their target calculated closer
              to the body they're working toward, since carrying a lot of
              excess fat doesn't raise protein needs the way carrying more
              muscle does.
            </p>
          ),
        },
        {
          heading: "What to eat to hit a higher protein target on fewer calories",
          body: (
            <p>
              Lean, low-fat protein sources let you hit a higher gram target
              without blowing your calorie budget — think chicken breast,
              white fish, egg whites, non-fat Greek yoghurt and lean beef
              mince. See our{" "}
              <a href="/protein-foods" className="font-semibold text-pt-black underline">
                protein foods guide
              </a>{" "}
              for protein-per-calorie comparisons, or browse{" "}
              <a href="/protein-meals" className="font-semibold text-pt-black underline">
                high-protein meal ideas
              </a>{" "}
              built for exactly this.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Do I need more protein when losing weight?",
          a: "Yes — protein needs go up, not down, during a calorie deficit. It helps preserve muscle mass and keeps you feeling fuller on fewer calories, both of which matter more while dieting than while maintaining weight.",
        },
        {
          q: "Will eating more protein help me lose fat faster?",
          a: "Protein itself doesn't burn fat, but hitting a higher protein target makes it easier to stay in a calorie deficit consistently (through better fullness) and helps ensure more of the weight you lose is fat rather than muscle — both of which support better results over time.",
        },
        {
          q: "Should I use my current weight or goal weight in the calculator?",
          a: "Enter both if you have a specific goal weight — the calculator blends the two rather than using either one alone, weighted by how much you have to lose.",
        },
      ]}
    />
  );
}
