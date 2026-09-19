import type { Metadata } from "next";
import MealsPageTemplate from "../MealsPageTemplate";

export const metadata: Metadata = {
  title: "30g Protein Meals — Meal Ideas With 30g of Protein",
  description:
    "Meal and snack ideas with around 30g of protein each, with ingredients, method and substitutions.",
  alternates: { canonical: "/protein-meals/30g-protein" },
};

export default function ThirtyGramMealsPage() {
  return (
    <MealsPageTemplate
      h1="30g Protein Meals"
      subtitle="Solid meals or snack-sized portions that add up quickly across a day."
      intro={
        <p>
          30g of protein is a reasonable target for a lighter meal, a
          bigger snack, or a breakfast you don't want to spend much time on.
          Each of these is built around ingredients from our{" "}
          <a href="/protein-foods" className="font-semibold text-pt-black underline">
            protein foods guide
          </a>
          , so the numbers line up with what you'd see there.
        </p>
      }
      meals={[
        {
          name: "Greek Yoghurt Protein Bowl",
          protein: 30,
          serves: "Serves 1",
          ingredients: [
            "250g plain Greek yoghurt",
            "1 tbsp peanut butter",
            "Handful of berries",
            "1 tsp honey (optional)",
          ],
          method:
            "Spoon yoghurt into a bowl, swirl through peanut butter, and top with berries.",
          substitutions:
            "Swap peanut butter for any nut butter; swap berries for any fruit without changing the protein much.",
        },
        {
          name: "3-Egg Veggie Omelette with Cheddar",
          protein: 30,
          serves: "Serves 1",
          ingredients: [
            "3 large eggs + 1 extra egg white",
            "30g shredded cheddar",
            "Handful spinach",
            "2–3 mushrooms, sliced",
          ],
          method:
            "Whisk eggs and egg white, cook spinach and mushrooms briefly, pour in egg mixture, top with cheddar and fold once set.",
          substitutions:
            "Any hard cheese works in place of cheddar; any quick-cooking vegetable works in place of spinach and mushroom.",
        },
        {
          name: "Tuna and Cottage Cheese Salad",
          protein: 30,
          serves: "Serves 1",
          ingredients: [
            "80g tuna, drained",
            "100g cottage cheese",
            "Mixed salad greens",
            "Olive oil and lemon dressing",
          ],
          method:
            "Toss salad greens with olive oil and lemon, top with tuna and cottage cheese.",
          substitutions:
            "Swap tuna for canned salmon; swap cottage cheese for Greek yoghurt for a slightly different texture.",
        },
      ]}
    />
  );
}
