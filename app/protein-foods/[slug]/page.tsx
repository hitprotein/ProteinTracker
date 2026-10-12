import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FoodPageTemplate from "../FoodPageTemplate";
import { PUBLISHED_FOODS, getFood, isPublished, unitLabel } from "@/data/foods";

// Every food page is generated at build time from data/foods.ts. Draft foods
// (no protein figure yet) have no page.
export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED_FOODS.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const food = getFood(params.slug);
  if (!food || !isPublished(food)) return {};
  const per = unitLabel(food);
  return {
    title: food.title ?? `Protein in ${food.name} — Per ${per} and by Serving Size`,
    description:
      food.metaDescription ??
      `How much protein is in ${food.name.toLowerCase()}? About ${food.proteinPer100g}g per ${per} (${food.prepDescription}). See protein by serving size.`,
    alternates: { canonical: `/protein-foods/${food.slug}` },
  };
}

export default function FoodPage({ params }: { params: { slug: string } }) {
  const food = getFood(params.slug);
  if (!food || !isPublished(food)) notFound();
  return <FoodPageTemplate food={food} />;
}
