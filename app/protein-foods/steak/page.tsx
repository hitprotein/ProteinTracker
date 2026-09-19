import type { Metadata } from "next";
import FoodPageTemplate from "../FoodPageTemplate";

export const metadata: Metadata = {
  title: "Protein in Steak — Per 100g and by Serving Size",
  description:
    "How much protein is in steak? Around 31g per 100g for lean beef steak, grilled. See protein by serving size and how cut affects the number.",
  alternates: { canonical: "/protein-foods/steak" },
};

export default function SteakPage() {
  return (
    <FoodPageTemplate
      h1="Protein in Steak"
      proteinPer100g={31}
      prepDescription="lean beef steak, grilled, trimmed of visible fat"
      servings={[
        { label: "100g", grams: 100 },
        { label: "150g", grams: 150 },
        { label: "200g", grams: 200 },
        { label: "250g", grams: 250 },
      ]}
      intro={
        <p>
          Steak is a dense, complete protein source — a typical 200–250g
          serving (a reasonably sized dinner steak) covers a large share of
          most people's daily protein target in one meal, along with iron,
          zinc and B12.
        </p>
      }
      varianceNote={
        <>
          <p>
            Protein content varies more by leanness than by cut name. A
            trimmed, lean cut (like eye fillet, rump or lean scotch fillet)
            will sit close to the 31g/100g figure above, while a fattier,
            heavily marbled cut has more calories from fat and slightly less
            protein per 100g, simply because fat is taking up some of that
            100g instead of lean meat.
          </p>
          <p>
            Cooking method and doneness change moisture content, which
            changes the protein-per-100g figure slightly — a well-done steak
            has lost more water than a rare one, concentrating the protein a
            little further. The difference is small enough that it's not
            usually worth adjusting for day-to-day.
          </p>
        </>
      }
      usageTips={[
        "Pair with a carb source and vegetables for a balanced, high-protein dinner",
        "Slice leftover steak cold into salads or wraps the next day",
        "Choose leaner cuts (rump, eye fillet) if you're also watching total calories",
      ]}
      relatedFoods={[
        { name: "Beef Mince", href: "/protein-foods/beef-mince" },
        { name: "Chicken Breast", href: "/protein-foods/chicken-breast" },
        { name: "Salmon", href: "/protein-foods/salmon" },
      ]}
      relatedMeal={{ name: "50g Protein Meals", href: "/protein-meals/50g-protein" }}
      faqs={[
        {
          q: "How much protein is in a 200g steak?",
          a: "Around 62g for a lean cut, grilled — roughly 31g per 100g scaled up. A fattier cut will come in somewhat lower.",
        },
        {
          q: "Does the cut of steak change the protein content much?",
          a: "Leanness matters more than the specific cut name. Leaner cuts like eye fillet or rump have slightly more protein per 100g than heavily marbled cuts, since fat displaces some of the lean meat.",
        },
      ]}
    />
  );
}
