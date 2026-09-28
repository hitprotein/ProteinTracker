import type { Metadata } from "next";
import Link from "next/link";
import MealsPageTemplate from "../MealsPageTemplate";

export const metadata: Metadata = {
  title: "40g Protein Meals — Meal Ideas With 40g of Protein",
  description:
    "Meal ideas with around 40g of protein each — a solid standard main-meal target — with ingredients, method and substitutions.",
  alternates: { canonical: "/protein-meals/40g-protein" },
};

export default function FortyGramMealsPage() {
  return (
    <MealsPageTemplate
      h1="40g Protein Meals"
      targetProtein={40}
      subtitle="A solid main-meal protein target — enough to make real progress toward most people's daily goal in one sitting."
      intro={
        <p>
          40g is a common target for a standard lunch or dinner. These meals
          use everyday ingredients from our{" "}
          <Link href="/protein-foods" className="font-semibold text-pt-black underline">
            protein foods guide
          </Link>{" "}
          — swap freely based on what you have.
        </p>
      }
      meals={[
      ]}
    />
  );
}
