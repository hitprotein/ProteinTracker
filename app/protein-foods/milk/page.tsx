import type { Metadata } from "next";
import FoodPageTemplate from "../FoodPageTemplate";

export const metadata: Metadata = {
  title: "Protein in Milk — Per 100ml, Per Glass and Per Litre",
  description:
    "How much protein is in milk? Around 3.4g per 100ml for regular cow's milk. See protein by glass, cup and litre.",
  alternates: { canonical: "/protein-foods/milk" },
};

export default function MilkPage() {
  return (
    <FoodPageTemplate
      h1="Protein in Milk"
      proteinPer100g={3.4}
      prepDescription="regular cow's milk, per 100ml"
      servings={[
        { label: "100ml", grams: 100 },
        { label: "250ml (1 cup)", grams: 250 },
        { label: "500ml", grams: 500 },
        { label: "1 litre", grams: 1000 },
      ]}
      intro={
        <p>
          Milk isn't the highest-protein food gram-for-gram, but it's easy
          to drink in volume and adds up quickly across a day — a couple of
          glasses with meals or in coffee can contribute a meaningful amount
          without any real effort.
        </p>
      }
      varianceNote={
        <>
          <p>
            Full-cream, reduced-fat and skim milk all have very similar
            protein content per 100ml — removing fat doesn't remove protein,
            so the main difference between them is calories, not protein.
          </p>
          <p>
            Plant-based milk alternatives (oat, almond, rice) generally have
            much lower protein than dairy milk — often a third or less.
            Soy milk is the main exception, typically landing close to dairy
            milk's protein content. Check the label if you're substituting,
            since "milk" alternatives vary widely.
          </p>
        </>
      }
      usageTips={[
        "Use milk instead of water in oats or protein shakes for an easy protein boost",
        "A glass with meals adds protein without needing to prepare anything",
        "If using a plant-based alternative, choose soy milk if protein content matters to you",
      ]}
      relatedFoods={[
        { name: "Greek Yoghurt", href: "/protein-foods/greek-yoghurt" },
        { name: "Cottage Cheese", href: "/protein-foods/cottage-cheese" },
        { name: "Eggs", href: "/protein-foods/eggs" },
      ]}
      faqs={[
        {
          q: "How much protein is in a glass of milk?",
          a: "Around 8–9g for a 250ml glass of regular cow's milk.",
        },
        {
          q: "Does skim milk have less protein than full-cream milk?",
          a: "No — protein content is very similar across skim, reduced-fat and full-cream milk. The fat content is what changes, not the protein.",
        },
        {
          q: "Is plant-based milk a good protein source?",
          a: "Most plant-based milks (oat, almond, rice) are much lower in protein than dairy milk. Soy milk is the main exception, with protein content close to regular milk.",
        },
      ]}
    />
  );
}
