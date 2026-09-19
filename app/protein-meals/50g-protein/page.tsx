import type { Metadata } from "next";
import MealsPageTemplate from "../MealsPageTemplate";

export const metadata: Metadata = {
  title: "50g Protein Meals — Meal Ideas With 50g of Protein",
  description:
    "Larger meal ideas with around 50g of protein each — useful for higher daily targets — with ingredients, method and substitutions.",
  alternates: { canonical: "/protein-meals/50g-protein" },
};

export default function FiftyGramMealsPage() {
  return (
    <MealsPageTemplate
      h1="50g Protein Meals"
      subtitle="Bigger meals for higher protein targets — useful if you're building muscle or have a demanding daily goal."
      intro={
        <p>
          50g in one meal is achievable without feeling excessive if you
          build around a solid primary protein source. These use
          ingredients from our{" "}
          <a href="/protein-foods" className="font-semibold text-pt-black underline">
            protein foods guide
          </a>{" "}
          — adjust portion sizes to fit your own target exactly.
        </p>
      }
      meals={[
        {
          name: "Chicken Burrito Bowl",
          protein: 50,
          serves: "Serves 1",
          ingredients: [
            "160g grilled chicken breast",
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
        {
          name: "Steak with Roasted Vegetables",
          protein: 50,
          serves: "Serves 1",
          ingredients: [
            "160g lean steak (rump or eye fillet)",
            "Roasted potato or sweet potato",
            "Roasted vegetables (pumpkin, zucchini, capsicum)",
            "Side salad",
          ],
          method:
            "Grill steak to preference, rest for a few minutes, serve with roasted vegetables and a side salad.",
          substitutions:
            "Swap steak for a thick salmon fillet at a similar weight for a similar protein total.",
        },
        {
          name: "Tuna and Egg Salad",
          protein: 50,
          serves: "Serves 1",
          ingredients: [
            "150g tuna, drained",
            "2 boiled eggs",
            "Mixed salad greens, cucumber, tomato",
            "Olive oil and vinegar dressing",
          ],
          method:
            "Boil and peel eggs, toss salad ingredients together, top with tuna and halved eggs.",
          substitutions:
            "Swap tuna for canned salmon or leftover cooked chicken.",
        },
      ]}
    />
  );
}
