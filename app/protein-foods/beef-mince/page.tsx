import type { Metadata } from "next";
import FoodPageTemplate from "../FoodPageTemplate";

export const metadata: Metadata = {
  title: "Protein in Beef Mince — Per 100g and by Serving Size",
  description:
    "How much protein is in beef mince? Around 26g per 100g for lean mince, cooked. See protein by serving size and how fat content changes the number.",
  alternates: { canonical: "/protein-foods/beef-mince" },
};

export default function BeefMincePage() {
  return (
    <FoodPageTemplate
      h1="Protein in Beef Mince"
      proteinPer100g={26}
      prepDescription="lean beef mince, cooked, drained of fat"
      servings={[
        { label: "100g", grams: 100 },
        { label: "150g", grams: 150 },
        { label: "200g", grams: 200 },
        { label: "500g", grams: 500 },
      ]}
      intro={
        <p>
          Beef mince is one of the most versatile protein sources — cheap,
          quick to cook, and adaptable to almost any cuisine, from bolognese
          to tacos to a simple stir-fry.
        </p>
      }
      varianceNote={
        <>
          <p>
            Fat content is the biggest variable with mince. Standard mince
            (around 15–20% fat) has noticeably less protein per 100g than
            lean or extra-lean mince (around 5–10% fat), since fat displaces
            lean meat in the same weight. If protein-per-gram matters to
            you, lean or extra-lean mince is worth the small price
            difference.
          </p>
          <p>
            Draining cooked mince of rendered fat also changes the
            protein-per-100g figure slightly, since some of the weight
            (fat) has been removed. If you weigh mince before cooking rather
            than after, expect a slightly different number.
          </p>
        </>
      }
      usageTips={[
        "Cook a large batch and portion into meals for the week",
        "Bulk out with lentils or extra vegetables to stretch a pack further without losing much protein density",
        "Choose lean or extra-lean mince if you're targeting a higher protein-to-calorie ratio",
      ]}
      relatedFoods={[
        { name: "Steak", href: "/protein-foods/steak" },
        { name: "Chicken Breast", href: "/protein-foods/chicken-breast" },
        { name: "Tofu", href: "/protein-foods/tofu" },
      ]}
      relatedMeal={{ name: "40g Protein Meals", href: "/protein-meals/40g-protein" }}
      faqs={[
        {
          q: "How much protein is in 200g of beef mince?",
          a: "Around 52g for lean mince, cooked and drained — roughly 26g per 100g scaled up. Standard (higher-fat) mince will be somewhat lower.",
        },
        {
          q: "Is lean mince significantly higher in protein than regular mince?",
          a: "Yes, noticeably — the extra fat in standard mince takes up space that would otherwise be lean, protein-containing meat, so lean and extra-lean mince come out ahead per 100g.",
        },
      ]}
    />
  );
}
