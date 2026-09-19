import type { Metadata } from "next";
import FoodPageTemplate from "../FoodPageTemplate";

export const metadata: Metadata = {
  title: "Protein in Eggs — Per Egg and Per 100g",
  description:
    "How much protein is in eggs? About 6g per large egg (~12.5g per 100g). See protein for 1, 2, 3 and 4 eggs.",
  alternates: { canonical: "/protein-foods/eggs" },
};

export default function EggsPage() {
  return (
    <FoodPageTemplate
      h1="Protein in Eggs"
      proteinPer100g={12.5}
      prepDescription="whole egg, boiled or poached, based on a 50g large egg"
      servings={[
        { label: "1 egg", grams: 50 },
        { label: "2 eggs", grams: 100 },
        { label: "3 eggs", grams: 150 },
        { label: "4 eggs", grams: 200 },
      ]}
      intro={
        <p>
          Eggs are one of the most complete and convenient protein sources —
          cheap, quick to prepare, and containing every essential amino acid
          your body needs. A large Australian egg weighs around 50–60g and
          provides roughly 6–7g of protein, making a two- or three-egg meal
          a solid protein contribution without much effort.
        </p>
      }
      varianceNote={
        <>
          <p>
            Egg size varies — a "large" egg in Australia is typically 50–60g,
            but jumbo eggs can weigh 68g or more, and small eggs less than
            50g. If your carton specifies a weight range, use that rather
            than assuming every egg is exactly 50g.
          </p>
          <p>
            Almost all of an egg's protein is in the white, but the yolk
            still contributes a meaningful share alongside most of the
            vitamins and fat. Egg whites alone are higher in protein per
            100g than whole eggs (since they're mostly water and protein,
            with no fat), which is why some people use extra egg whites to
            boost a meal's protein without adding much fat.
          </p>
        </>
      }
      usageTips={[
        "Boiled eggs make an easy grab-and-go protein source with no prep at meal time",
        "Add an extra egg white or two to an omelette to boost protein without much extra fat",
        "Combine with Greek yoghurt or cottage cheese at breakfast to hit a higher target without a large meal",
      ]}
      relatedFoods={[
        { name: "Greek Yoghurt", href: "/protein-foods/greek-yoghurt" },
        { name: "Cottage Cheese", href: "/protein-foods/cottage-cheese" },
        { name: "Chicken Breast", href: "/protein-foods/chicken-breast" },
      ]}
      relatedMeal={{ name: "High Protein Breakfast Ideas", href: "/protein-meals/high-protein-breakfast" }}
      faqs={[
        {
          q: "How much protein is in 2 eggs?",
          a: "Around 12–13g, based on two 50g large eggs — roughly 6g per egg.",
        },
        {
          q: "How much protein is in 3 eggs?",
          a: "Around 18–19g, based on three 50g large eggs.",
        },
        {
          q: "Is most of an egg's protein in the yolk or the white?",
          a: "The white contains more protein by weight than the yolk, but the yolk still contributes a meaningful amount alongside most of the egg's fat and micronutrients — a whole egg gives you both.",
        },
      ]}
    />
  );
}
