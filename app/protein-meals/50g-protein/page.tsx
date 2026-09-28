import type { Metadata } from "next";
import Link from "next/link";
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
      targetProtein={50}
      subtitle="Bigger meals for higher protein targets — useful if you're building muscle or have a demanding daily goal."
      intro={
        <p>
          50g in one meal is achievable without feeling excessive if you
          build around a solid primary protein source. These use
          ingredients from our{" "}
          <Link href="/protein-foods" className="font-semibold text-pt-black underline">
            protein foods guide
          </Link>{" "}
          — adjust portion sizes to fit your own target exactly.
        </p>
      }
      meals={[
        {
          name: "Chicken and Rice Bowl",
          description:
            "Grilled chicken breast over rice with capsicum, broccoli and carrot — an easy meal-prep staple.",
          category: "Dinner",
          image: { src: "/meals/chicken-rice-bowl.jpg", width: 1408, height: 768 },
          protein: 48,
          calories: 530,
          prepMinutes: 10,
          cookMinutes: 15,
          serves: "Serves 1",
          ingredients: [
            "130g chicken breast (cooked weight)",
            "1 cup cooked rice",
            "Mixed vegetables (capsicum, broccoli, carrot)",
            "Soy sauce or a sauce of your choice",
            "1 tsp olive oil",
          ],
          method:
            "Grill or pan-fry chicken breast, serve over rice with steamed or stir-fried vegetables.",
          substitutions:
            "Swap chicken for turkey breast; swap rice for quinoa or noodles without changing the protein much.",
        },
        {
          name: "Grilled Salmon with Quinoa",
          description:
            "Grilled salmon on quinoa with steamed greens and a squeeze of lemon.",
          category: "Dinner",
          image: { src: "/meals/grilled-salmon-quinoa.jpg", width: 1408, height: 768 },
          protein: 48,
          calories: 540,
          prepMinutes: 5,
          cookMinutes: 15,
          serves: "Serves 1",
          ingredients: [
            "170g salmon fillet (cooked weight)",
            "3/4 cup cooked quinoa",
            "Steamed greens (broccolini, beans or spinach)",
            "Lemon wedge",
          ],
          method:
            "Grill or bake salmon skin-side down until just cooked through, serve over quinoa with steamed greens.",
          substitutions:
            "Swap salmon for any firm white fish; swap quinoa for rice or couscous.",
        },
        {
          name: "Beef Mince Tacos",
          description:
            "Two tacos filled with seasoned lean beef mince, salsa, lettuce, tomato and cheese.",
          category: "Dinner",
          cuisine: "Mexican",
          image: { src: "/meals/beef-mince-tacos.jpg", width: 1408, height: 768 },
          protein: 50,
          calories: 595,
          prepMinutes: 10,
          cookMinutes: 10,
          serves: "Serves 1 (2 tacos)",
          ingredients: [
            "150g lean beef mince (cooked weight)",
            "2 small tortillas",
            "Lettuce, tomato, salsa",
            "20g shredded cheese",
          ],
          method:
            "Brown mince with taco seasoning, fill tortillas with mince, lettuce, tomato, salsa and cheese.",
          substitutions:
            "Swap beef mince for chicken mince or lentils for a lower-fat or plant-based version.",
        },
        {
          name: "Tuna and Egg Salad",
          description:
            "A filling salad of tuna and boiled eggs with greens, cucumber and tomato.",
          category: "Lunch",
          image: { src: "/meals/tuna-egg-salad.jpg", width: 1408, height: 768 },
          protein: 52,
          calories: 470,
          prepMinutes: 10,
          cookMinutes: 10,
          serves: "Serves 1",
          ingredients: [
            "150g tuna, drained",
            "2 boiled eggs",
            "Mixed salad greens, cucumber, tomato",
            "1 tbsp olive oil and vinegar dressing",
          ],
          method:
            "Boil and peel eggs, toss salad ingredients together, top with tuna and halved eggs.",
          substitutions:
            "Swap tuna for canned salmon or leftover cooked chicken.",
        },
        {
          name: "Steak with Roasted Vegetables",
          description:
            "Grilled lean steak with roasted potato, pumpkin, zucchini and capsicum, plus a side salad.",
          category: "Dinner",
          image: { src: "/meals/steak-roasted-vegetables.jpg", width: 1408, height: 768 },
          protein: 56,
          calories: 535,
          prepMinutes: 10,
          cookMinutes: 40,
          serves: "Serves 1",
          ingredients: [
            "160g lean steak, rump or eye fillet (cooked weight)",
            "Roasted potato or sweet potato",
            "Roasted vegetables (pumpkin, zucchini, capsicum)",
            "Side salad",
            "2 tsp olive oil (for roasting)",
          ],
          method:
            "Grill steak to preference, rest for a few minutes, serve with roasted vegetables and a side salad.",
          substitutions:
            "Swap steak for a thick salmon fillet at a similar weight for a similar protein total.",
        },
      ]}
    />
  );
}
