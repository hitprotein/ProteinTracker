import type { Metadata } from "next";
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
      subtitle="A solid main-meal protein target — enough to make real progress toward most people's daily goal in one sitting."
      intro={
        <p>
          40g is a common target for a standard lunch or dinner. These meals
          use everyday ingredients from our{" "}
          <a href="/protein-foods" className="font-semibold text-pt-black underline">
            protein foods guide
          </a>{" "}
          — swap freely based on what you have.
        </p>
      }
      meals={[
        {
          name: "Chicken and Rice Bowl",
          protein: 40,
          serves: "Serves 1",
          ingredients: [
            "130g grilled chicken breast",
            "1 cup cooked rice",
            "Mixed vegetables (capsicum, broccoli, carrot)",
            "Soy sauce or a sauce of your choice",
          ],
          method:
            "Grill or pan-fry chicken breast, serve over rice with steamed or stir-fried vegetables.",
          substitutions:
            "Swap chicken for turkey breast; swap rice for quinoa or noodles without changing the protein much.",
        },
        {
          name: "Beef Mince Tacos",
          protein: 39,
          serves: "Serves 1 (2–3 tacos)",
          ingredients: [
            "150g lean beef mince, cooked",
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
          name: "Grilled Salmon with Quinoa",
          protein: 39,
          serves: "Serves 1",
          ingredients: [
            "170g salmon fillet",
            "3/4 cup cooked quinoa",
            "Steamed greens (broccolini, beans or spinach)",
            "Lemon wedge",
          ],
          method:
            "Grill or bake salmon skin-side down until just cooked through, serve over quinoa with steamed greens.",
          substitutions:
            "Swap salmon for any firm white fish; swap quinoa for rice or couscous.",
        },
      ]}
    />
  );
}
