import type { Metadata } from "next";
import FoodPageTemplate from "../FoodPageTemplate";

export const metadata: Metadata = {
  title: "Protein in Cottage Cheese — Per 100g and by Serving Size",
  description:
    "How much protein is in cottage cheese? Around 11g per 100g. See protein by serving size and why it's a useful high-protein, low-calorie food.",
  alternates: { canonical: "/protein-foods/cottage-cheese" },
};

export default function CottageCheesePage() {
  return (
    <FoodPageTemplate
      h1="Protein in Cottage Cheese"
      proteinPer100g={11}
      prepDescription="plain, standard fat content"
      servings={[
        { label: "100g", grams: 100 },
        { label: "150g", grams: 150 },
        { label: "200g", grams: 200 },
        { label: "250g", grams: 250 },
      ]}
      intro={
        <p>
          Cottage cheese is one of the better protein-to-calorie ratios in
          dairy — a decent serving delivers a substantial protein hit for
          relatively few calories, which is part of why it's a common
          choice for people tracking protein closely.
        </p>
      }
      varianceNote={
        <>
          <p>
            Protein content stays fairly consistent between full-fat,
            reduced-fat and low-fat cottage cheese — as with Greek yoghurt,
            removing fat mostly affects calories rather than protein. The
            bigger variable is brand: curd size, added cream, and moisture
            content differ enough between brands that checking the label is
            worth it if precision matters to you.
          </p>
        </>
      }
      usageTips={[
        "Eat straight with fruit for a quick high-protein snack",
        "Blend into smoothies for a thicker texture and a protein boost with less added sugar than protein powder",
        "Use as a base for a high-protein dip mixed with herbs",
      ]}
      relatedFoods={[
        { name: "Greek Yoghurt", href: "/protein-foods/greek-yoghurt" },
        { name: "Eggs", href: "/protein-foods/eggs" },
        { name: "Milk", href: "/protein-foods/milk" },
      ]}
      relatedMeal={{ name: "High Protein Snacks", href: "/protein-meals/high-protein-snacks" }}
      faqs={[
        {
          q: "How much protein is in a 250g tub of cottage cheese?",
          a: "Around 27–28g, based on a standard 11g-per-100g figure — a substantial amount for a relatively low-calorie food.",
        },
        {
          q: "Is low-fat cottage cheese lower in protein?",
          a: "Not meaningfully — protein content stays similar across full-fat and low-fat versions. The fat content mainly changes the calorie count.",
        },
      ]}
    />
  );
}
