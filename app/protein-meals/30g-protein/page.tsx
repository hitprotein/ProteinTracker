import type { Metadata } from "next";
import Link from "next/link";
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
      targetProtein={30}
      subtitle="Solid meals or snack-sized portions that add up quickly across a day."
      intro={
        <p>
          30g of protein is a reasonable target for a lighter meal, a
          bigger snack, or a breakfast you don't want to spend much time on.
          Each of these is built around ingredients from our{" "}
          <Link href="/protein-foods" className="font-semibold text-pt-black underline">
            protein foods guide
          </Link>
          , so the numbers line up with what you'd see there.
        </p>
      }
      meals={[
        {
          name: "Greek Yoghurt Protein Bowl",
          description:
            "A no-cook breakfast bowl of thick Greek yoghurt swirled with peanut butter and topped with berries.",
          category: "Breakfast",
          image: { src: "/meals/greek-yoghurt-protein-bowl.jpg", width: 1408, height: 768 },
          protein: 30,
          calories: 460,
          prepMinutes: 5,
          serves: "Serves 1",
          ingredients: [
            "250g plain Greek yoghurt (full-fat)",
            "1 tbsp peanut butter",
            "Handful of berries",
            "1 tsp honey (optional)",
          ],
          method:
            "Spoon yoghurt into a bowl, swirl through peanut butter, and top with berries.",
          substitutions:
            "Swap peanut butter for any nut butter; swap berries for any fruit without changing the protein much. Reduced-fat yoghurt has the same protein and about 135 fewer calories.",
        },
        {
          name: "3-Egg Veggie Omelette with Cheddar",
          description:
            "A quick omelette with an extra egg white, spinach, mushrooms and melted cheddar.",
          category: "Breakfast",
          image: { src: "/meals/3-egg-veggie-omelette.jpg", width: 1408, height: 768 },
          protein: 32,
          calories: 415,
          prepMinutes: 5,
          cookMinutes: 10,
          serves: "Serves 1",
          ingredients: [
            "3 large eggs + 1 extra egg white",
            "30g shredded cheddar",
            "Handful spinach",
            "2–3 mushrooms, sliced",
            "1 tsp olive oil",
          ],
          method:
            "Whisk eggs and egg white, cook spinach and mushrooms briefly, pour in egg mixture, top with cheddar and fold once set.",
          substitutions:
            "Any hard cheese works in place of cheddar; any quick-cooking vegetable works in place of spinach and mushroom.",
        },
        {
          name: "Tuna and Cottage Cheese Salad",
          description:
            "A no-cook salad of tuna and cottage cheese over mixed greens with a lemon and olive oil dressing.",
          category: "Lunch",
          image: { src: "/meals/tuna-cottage-cheese-salad.jpg", width: 1408, height: 768 },
          protein: 32,
          calories: 320,
          prepMinutes: 10,
          serves: "Serves 1",
          ingredients: [
            "80g tuna, drained",
            "100g cottage cheese",
            "Mixed salad greens",
            "1 tbsp olive oil and a squeeze of lemon",
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
