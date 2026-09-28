import type { Metadata } from "next";
import Link from "next/link";
import MealsPageTemplate from "../MealsPageTemplate";

export const metadata: Metadata = {
  title: "40g Protein Meals — Meal Ideas With 40g of Protein",
  description:
    "Meal ideas with around 40g of protein each — a solid standard main-meal target — with ingredients, method and substitutions.",
  alternates: { canonical: "/protein-meals/40g-protein" },
};

export default function FortyGramMealsPage() {
  return (
    <MealsPageTemplate
      h1="40g Protein Meals"
      targetProtein={40}
      subtitle="A solid main-meal protein target — enough to make real progress toward most people's daily goal in one sitting."
      intro={
        <p>
          40g is a common target for a standard lunch or dinner. These meals
          use everyday ingredients from our{" "}
          <Link href="/protein-foods" className="font-semibold text-pt-black underline">
            protein foods guide
          </Link>{" "}
          — swap freely based on what you have.
        </p>
      }
      meals={[
        {
          name: "Cottage Cheese Scrambled Eggs on Toast",
          description:
            "Soft scrambled eggs with cottage cheese and spinach folded through, served on wholegrain toast.",
          category: "Breakfast",
          protein: 39,
          calories: 555,
          prepMinutes: 5,
          cookMinutes: 5,
          serves: "Serves 1",
          ingredients: [
            "3 large eggs",
            "100g cottage cheese",
            "2 slices wholegrain toast",
            "Handful spinach",
            "1 tsp butter",
          ],
          method:
            "Whisk the eggs, cook gently in butter over low heat, then stir through the cottage cheese and spinach just before they set. Serve on toast.",
          substitutions:
            "Ricotta works in place of cottage cheese but has a little less protein; any bread works in place of wholegrain.",
        },
        {
          name: "Chicken Salad Wrap",
          description:
            "A quick no-cook lunch of sliced chicken breast and crunchy salad rolled in a wholemeal wrap.",
          category: "Lunch",
          protein: 41,
          calories: 420,
          prepMinutes: 10,
          serves: "Serves 1",
          ingredients: [
            "110g chicken breast (cooked weight), sliced",
            "1 large wholemeal wrap",
            "Lettuce, tomato and cucumber",
            "1 tbsp light mayonnaise",
          ],
          method:
            "Spread the mayonnaise over the wrap, layer the salad and chicken down the middle, then fold in the ends and roll up.",
          substitutions:
            "Leftover roast chicken works well; swap the mayonnaise for Greek yoghurt to add a little more protein.",
        },
        {
          name: "Tofu and Edamame Stir-Fry",
          description:
            "A plant-based stir-fry of crispy tofu and edamame with vegetables over rice.",
          category: "Dinner",
          protein: 39,
          calories: 650,
          prepMinutes: 10,
          cookMinutes: 15,
          serves: "Serves 1",
          ingredients: [
            "170g firm tofu, cubed",
            "100g shelled edamame",
            "1 cup cooked rice",
            "Stir-fry vegetables (broccoli, capsicum, snow peas)",
            "1 tbsp soy sauce",
            "1 tsp oil",
          ],
          method:
            "Pan-fry the tofu in oil until golden, add the vegetables and edamame and stir-fry for a few minutes, then toss with soy sauce and serve over rice.",
          substitutions:
            "Extra-firm tofu has more protein per 100g than firm; frozen edamame works straight from the freezer.",
        },
      ]}
    />
  );
}
