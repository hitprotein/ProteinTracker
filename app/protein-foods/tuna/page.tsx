import type { Metadata } from "next";
import FoodPageTemplate from "../FoodPageTemplate";

export const metadata: Metadata = {
  title: "Protein in Tuna — Per 100g and Per Can",
  description:
    "How much protein is in tuna? Around 25g per 100g for canned tuna in springwater, drained. See protein by can size.",
  alternates: { canonical: "/protein-foods/tuna" },
};

export default function TunaPage() {
  return (
    <FoodPageTemplate
      h1="Protein in Tuna"
      proteinPer100g={25}
      prepDescription="canned in springwater or brine, drained"
      servings={[
        { label: "Small can (95g)", grams: 95 },
        { label: "100g", grams: 100 },
        { label: "Large can (185g)", grams: 185 },
        { label: "200g", grams: 200 },
      ]}
      intro={
        <p>
          Canned tuna is about as convenient as protein gets — no cooking,
          long shelf life, and a genuinely high protein-to-calorie ratio.
          A standard small can (around 95g drained) is an easy way to add
          20g-plus of protein to a meal in seconds.
        </p>
      }
      varianceNote={
        <>
          <p>
            Tuna canned in springwater or brine has a higher protein
            percentage than tuna canned in oil, simply because oil adds
            calories and weight without adding protein. If you're comparing
            cans, check whether it's packed in water or oil before comparing
            protein-per-100g figures directly.
          </p>
          <p>
            Drained weight matters — the protein figures above are for
            tuna after draining, since that's what you actually eat. The
            weight printed on the can is usually the undrained weight, which
            will overstate the amount of tuna (and protein) you're actually
            getting.
          </p>
        </>
      }
      usageTips={[
        "Keep a few cans on hand for a fast, no-cook protein top-up",
        "Mix with Greek yoghurt instead of mayonnaise for a higher-protein tuna salad",
        "Add to a rice or pasta salad to boost the protein of an otherwise carb-heavy meal",
      ]}
      relatedFoods={[
        { name: "Salmon", href: "/protein-foods/salmon" },
        { name: "Chicken Breast", href: "/protein-foods/chicken-breast" },
        { name: "Eggs", href: "/protein-foods/eggs" },
      ]}
      relatedMeal={{ name: "High Protein Lunch Ideas", href: "/protein-meals/high-protein-lunch" }}
      faqs={[
        {
          q: "How much protein is in a can of tuna?",
          a: "Around 23–24g for a standard small can (95g drained) in springwater or brine. Larger 185g cans provide roughly 46g drained.",
        },
        {
          q: "Does tuna in oil have less protein than tuna in water?",
          a: "Per 100g, yes slightly — the oil adds weight and calories without adding protein, which lowers the protein percentage compared to tuna packed in water or brine.",
        },
      ]}
    />
  );
}
