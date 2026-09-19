import type { Metadata } from "next";
import FoodPageTemplate from "../FoodPageTemplate";

export const metadata: Metadata = {
  title: "Protein in Greek Yoghurt — Per 100g and Per Serving",
  description:
    "How much protein is in Greek yoghurt? About 10g per 100g for plain, natural Greek yoghurt. See protein by serving size.",
  alternates: { canonical: "/protein-foods/greek-yoghurt" },
};

export default function GreekYoghurtPage() {
  return (
    <FoodPageTemplate
      h1="Protein in Greek Yoghurt"
      proteinPer100g={10}
      prepDescription="plain, natural, unsweetened"
      servings={[
        { label: "100g", grams: 100 },
        { label: "150g", grams: 150 },
        { label: "200g", grams: 200 },
        { label: "300g", grams: 300 },
      ]}
      intro={
        <p>
          Greek yoghurt is strained more than regular yoghurt, which removes
          much of the liquid whey and concentrates the protein — that's why
          it has roughly double the protein of standard yoghurt at a
          similar calorie count. A 200g tub of plain Greek yoghurt is a
          convenient way to add a meaningful amount of protein to breakfast
          or a snack.
        </p>
      }
      varianceNote={
        <>
          <p>
            The 10g/100g figure is for plain, unsweetened Greek yoghurt.
            Flavoured varieties often have less protein per 100g because
            fruit, sugar or flavouring syrup displaces some of the yoghurt —
            check the label rather than assuming a flavoured tub matches
            plain.
          </p>
          <p>
            Full-fat, low-fat and non-fat Greek yoghurt all have similar
            protein content per 100g, since removing fat doesn't remove
            protein — the main difference between them is calories, not
            protein.
          </p>
        </>
      }
      usageTips={[
        "Use as a base for a protein-boosted smoothie",
        "Add to overnight oats to increase protein without extra bulk",
        "Swap in for sour cream or mayonnaise in savoury dishes for a protein upgrade",
      ]}
      relatedFoods={[
        { name: "Cottage Cheese", href: "/protein-foods/cottage-cheese" },
        { name: "Eggs", href: "/protein-foods/eggs" },
        { name: "Milk", href: "/protein-foods/milk" },
      ]}
      relatedMeal={{ name: "High Protein Breakfast Ideas", href: "/protein-meals/high-protein-breakfast" }}
      faqs={[
        {
          q: "Is Greek yoghurt higher in protein than regular yoghurt?",
          a: "Yes — the straining process that makes Greek yoghurt thicker also concentrates the protein, giving it roughly double the protein of regular yoghurt for a similar serving size.",
        },
        {
          q: "Does low-fat Greek yoghurt have less protein?",
          a: "No — protein content stays similar across full-fat, low-fat and non-fat versions. The fat content mainly affects calories, not protein.",
        },
      ]}
    />
  );
}
