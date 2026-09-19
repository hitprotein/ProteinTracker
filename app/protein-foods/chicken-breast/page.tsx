import type { Metadata } from "next";
import FoodPageTemplate from "../FoodPageTemplate";

export const metadata: Metadata = {
  title: "Protein in Chicken Breast — Per 100g and by Serving Size",
  description:
    "How much protein is in chicken breast? 31g per 100g cooked, skinless. See protein by serving size and how cooking method changes the number.",
  alternates: { canonical: "/protein-foods/chicken-breast" },
};

export default function ChickenBreastPage() {
  return (
    <FoodPageTemplate
      h1="Protein in Chicken Breast"
      proteinPer100g={31}
      prepDescription="grilled or baked, skinless, no added fat"
      servings={[
        { label: "100g", grams: 100 },
        { label: "150g", grams: 150 },
        { label: "200g", grams: 200 },
        { label: "250g", grams: 250 },
      ]}
      intro={
        <p>
          Chicken breast is one of the most efficient protein sources
          available — high in protein, low in fat, and neutral enough to fit
          almost any meal. A standard 150–200g cooked breast (roughly what
          you'd get from one chicken breast fillet) covers a substantial
          share of most people's daily protein target in a single meal.
        </p>
      }
      varianceNote={
        <>
          <p>
            The 31g/100g figure above is for cooked, skinless chicken
            breast. Raw chicken breast measures lower — closer to 22–23g per
            100g — because cooking drives off water weight, concentrating
            the protein into less mass. If you're weighing chicken raw
            before cooking, use the raw figure; if you're weighing it cooked
            on your plate, use the cooked one. Mixing the two up is the most
            common reason people's tracked numbers don't match what they
            expected.
          </p>
          <p>
            Cooking method makes a smaller difference than raw-vs-cooked —
            grilled, baked and pan-fried (without added fat) all land in a
            similar range. Skin-on chicken breast has meaningfully more fat
            and slightly less protein per 100g, since skin adds weight
            without adding protein.
          </p>
        </>
      }
      usageTips={[
        "Grill or bake in bulk at the start of the week and portion out for quick, ready-to-eat protein",
        "Slice into strips for stir-fries, wraps or salads",
        "Poach and shred for meal-prepped bowls or sandwiches",
      ]}
      relatedFoods={[
        { name: "Beef Mince", href: "/protein-foods/beef-mince" },
        { name: "Eggs", href: "/protein-foods/eggs" },
        { name: "Tuna", href: "/protein-foods/tuna" },
      ]}
      relatedMeal={{ name: "40g Protein Meals", href: "/protein-meals/40g-protein" }}
      faqs={[
        {
          q: "How much protein is in 100g of chicken breast?",
          a: "Around 31g for cooked, skinless chicken breast. Raw chicken breast is lower — around 22–23g per 100g — since cooking removes water and concentrates the protein.",
        },
        {
          q: "Does chicken skin reduce protein content?",
          a: "Skin adds fat and calories without adding meaningful protein, so skin-on chicken breast has a slightly lower protein percentage per 100g than skinless, even though the total protein in the piece of meat itself is similar.",
        },
      ]}
    />
  );
}
