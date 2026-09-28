import type { Metadata } from "next";
import FoodPageTemplate from "../FoodPageTemplate";

export const metadata: Metadata = {
  title: "Protein in Tofu — Per 100g and by Firmness",
  description:
    "How much protein is in tofu? Around 12g per 100g for firm tofu. See protein by serving size and how firmness changes the number.",
  alternates: { canonical: "/protein-foods/tofu" },
};

export default function TofuPage() {
  return (
    <FoodPageTemplate
      h1="Protein in Tofu"
      proteinPer100g={12}
      prepDescription="firm tofu, raw"
      servings={[
        { label: "100g", grams: 100 },
        { label: "150g", grams: 150 },
        { label: "200g", grams: 200 },
        { label: "300g (block)", grams: 300 },
      ]}
      intro={
        <p>
          Tofu is one of the most useful plant-based protein sources —
          it contains all the essential amino acids, absorbs flavour well,
          and works across a huge range of cuisines. A 200–300g block covers
          a meaningful share of a meal's protein for vegetarians, vegans, or
          anyone cutting back on meat.
        </p>
      }
      varianceNote={
        <>
          <p>
            Firmness makes a real difference here — extra-firm and firm tofu
            have had more water pressed out during production, which
            concentrates the protein. Silken and soft tofu contain
            significantly more water for the same weight, and can have
            noticeably less protein per 100g as a result — sometimes close
            to half of firm tofu's figure. If protein density matters to
            you, choose firm or extra-firm.
          </p>
          <p>
            Some brands, particularly extra-firm or "high-protein" tofu
            products, press out even more water and come in higher again —
            worth checking the label if you're buying specifically for
            protein content.
          </p>
        </>
      }
      usageTips={[
        "Press firm tofu before cooking to remove extra water and improve texture",
        "Marinate before pan-frying or baking, since tofu takes on flavour well",
        "Use in stir-fries, curries or scrambles as a direct meat substitute",
      ]}
      relatedFoods={[
        { name: "Eggs", href: "/protein-foods/eggs" },
        { name: "Greek Yoghurt", href: "/protein-foods/greek-yoghurt" },
        { name: "Cottage Cheese", href: "/protein-foods/cottage-cheese" },
      ]}
      relatedMeal={{ name: "40g Protein Meals", href: "/protein-meals/40g-protein" }}
      faqs={[
        {
          q: "How much protein is in 200g of tofu?",
          a: "Around 24g for firm tofu — roughly 12g per 100g scaled up. Extra-firm and high-protein brands can be higher again, so check the label.",
        },
        {
          q: "Does silken tofu have less protein than firm tofu?",
          a: "Yes, noticeably — silken and soft tofu contain more water for the same weight, which lowers the protein per 100g compared to firm or extra-firm tofu.",
        },
      ]}
    />
  );
}
