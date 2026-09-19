import type { Metadata } from "next";
import FoodPageTemplate from "../FoodPageTemplate";

export const metadata: Metadata = {
  title: "Protein in Salmon — Per 100g and by Serving Size",
  description:
    "How much protein is in salmon? Around 23g per 100g for cooked salmon fillet. See protein by serving size.",
  alternates: { canonical: "/protein-foods/salmon" },
};

export default function SalmonPage() {
  return (
    <FoodPageTemplate
      h1="Protein in Salmon"
      proteinPer100g={23}
      prepDescription="cooked fillet, skin off"
      servings={[
        { label: "100g", grams: 100 },
        { label: "150g", grams: 150 },
        { label: "200g", grams: 200 },
        { label: "250g", grams: 250 },
      ]}
      intro={
        <p>
          Salmon combines a strong protein content with omega-3 fats that
          most other protein sources don't offer — a typical 150–200g fillet
          is both a solid protein contribution and one of the better fat
          sources in a high-protein diet.
        </p>
      }
      varianceNote={
        <>
          <p>
            Farmed and wild salmon have broadly similar protein content —
            the bigger difference between them is fat content and type, not
            protein. Farmed salmon tends to be higher in total fat, which
            slightly lowers its protein percentage per 100g compared to
            leaner wild salmon.
          </p>
          <p>
            As with other meat and fish, cooked salmon has a higher
            protein-per-100g figure than raw, since cooking removes water
            weight and concentrates the protein into a smaller final
            portion.
          </p>
        </>
      }
      usageTips={[
        "Bake or grill in bulk and keep in the fridge for quick protein additions to salads or bowls",
        "Pair with vegetables and a small carb portion for a balanced dinner",
        "Use canned salmon as a cheaper, no-cook alternative with similar protein content",
      ]}
      relatedFoods={[
        { name: "Tuna", href: "/protein-foods/tuna" },
        { name: "Chicken Breast", href: "/protein-foods/chicken-breast" },
        { name: "Steak", href: "/protein-foods/steak" },
      ]}
      relatedMeal={{ name: "High Protein Dinner Ideas", href: "/protein-meals/high-protein-dinner" }}
      faqs={[
        {
          q: "How much protein is in a 150g salmon fillet?",
          a: "Around 35g, cooked — roughly 23g per 100g scaled up to a typical fillet size.",
        },
        {
          q: "Is farmed salmon lower in protein than wild salmon?",
          a: "Only slightly, if at all — the main difference is fat content, not protein. Farmed salmon tends to have more fat, which can marginally lower the protein percentage per 100g.",
        },
      ]}
    />
  );
}
