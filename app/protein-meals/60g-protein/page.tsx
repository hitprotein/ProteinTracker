import type { Metadata } from "next";
import Link from "next/link";
import MealsPageTemplate from "../MealsPageTemplate";

export const metadata: Metadata = {
  title: "60g Protein Meals — Meal Ideas With 60g of Protein",
  description:
    "High-protein meal ideas with around 60g of protein each — for big appetites and high daily targets — with ingredients, method and substitutions.",
  alternates: { canonical: "/protein-meals/60g-protein" },
};

export default function SixtyGramMealsPage() {
  return (
    <MealsPageTemplate
      h1="60g Protein Meals"
      targetProtein={60}
      subtitle="The biggest meals on the site — for high daily targets, bigger bodies or heavy training days."
      intro={
        <p>
          60g in a single meal makes sense if your daily target is high and
          you'd rather eat fewer, larger meals. Each of these is built
          around ingredients from our{" "}
          <Link href="/protein-foods" className="font-semibold text-pt-black underline">
            protein foods guide
          </Link>{" "}
          — scale portions down if you're splitting your protein across
          more meals.
        </p>
      }
      meals={[
        {
          name: "Smoked Salmon, Eggs and Cottage Cheese on Toast",
          description:
            "A big weekend breakfast of scrambled eggs, smoked salmon and cottage cheese on wholegrain toast.",
          category: "Breakfast",
          protein: 58,
          calories: 695,
          prepMinutes: 5,
          cookMinutes: 5,
          serves: "Serves 1",
          ingredients: [
            "3 large eggs",
            "100g smoked salmon",
            "100g cottage cheese",
            "2 slices wholegrain toast",
            "1 tsp butter",
          ],
          method:
            "Scramble the eggs gently in butter, then pile onto toast with the smoked salmon and a spoonful of cottage cheese.",
          substitutions:
            "Hot-smoked salmon or canned salmon work in place of smoked salmon for a similar protein total.",
        },
        {
          name: "Chicken and Tomato Pasta",
          description:
            "Pan-fried chicken breast tossed through pasta with a simple tomato sauce and parmesan.",
          category: "Dinner",
          cuisine: "Italian",
          protein: 61,
          calories: 660,
          prepMinutes: 5,
          cookMinutes: 15,
          serves: "Serves 1",
          ingredients: [
            "140g chicken breast (cooked weight), diced",
            "80g dry pasta",
            "150g tomato passata",
            "15g grated parmesan",
            "1 tsp olive oil",
          ],
          method:
            "Cook the pasta. Meanwhile pan-fry the chicken in oil until cooked through, add the passata and simmer for a few minutes, then toss through the drained pasta and top with parmesan.",
          substitutions:
            "Lean beef mince works in place of chicken; legume-based pasta adds extra protein.",
        },
        {
          name: "Beef and Broccoli Stir-Fry",
          description:
            "Quick-seared lean beef strips and broccoli in a soy glaze, served over rice.",
          category: "Dinner",
          protein: 62,
          calories: 630,
          prepMinutes: 10,
          cookMinutes: 10,
          serves: "Serves 1",
          ingredients: [
            "170g lean beef strips, rump or sirloin (cooked weight)",
            "150g broccoli florets",
            "1 cup cooked rice",
            "1 tbsp soy sauce",
            "1 tsp oil",
          ],
          method:
            "Sear the beef in a very hot pan with oil, remove, then stir-fry the broccoli for a few minutes. Return the beef, toss with soy sauce and serve over rice.",
          substitutions:
            "Chicken breast strips work in place of beef at a similar weight for a similar protein total.",
        },
        {
          name: "Chicken Burrito Bowl",
          description:
            "Sliced grilled chicken layered over rice and black beans with cheese, salsa, lettuce and lime.",
          category: "Dinner",
          cuisine: "Mexican",
          image: { src: "/meals/chicken-burrito-bowl.jpg", width: 1408, height: 768 },
          protein: 65,
          calories: 640,
          prepMinutes: 10,
          cookMinutes: 15,
          serves: "Serves 1",
          ingredients: [
            "160g chicken breast (cooked weight)",
            "3/4 cup cooked rice",
            "1/2 cup black beans",
            "20g shredded cheese",
            "Salsa, lettuce, lime",
          ],
          method:
            "Grill chicken and slice, layer rice, beans, chicken, cheese and toppings in a bowl.",
          substitutions:
            "Swap chicken for beef mince or firm tofu; swap black beans for kidney beans.",
        },
      ]}
    />
  );
}
