import type { Metadata } from "next";
import Link from "next/link";
import FaqSection from "@/components/FaqSection";
import type { FAQItem } from "@/lib/content-types";
import FoodTable, { type FoodTableRow } from "./FoodTable";
import {
  CATEGORIES,
  PUBLISHED_FOODS,
  categoryAnchor,
  proteinForServe,
  typicalServe,
  unitLabel,
} from "@/data/foods";

const SITE_URL = "https://proteintracker.com.au";

export const metadata: Metadata = {
  title: "High Protein Foods in Australia — Protein Content Table",
  description:
    "How much protein is in chicken, eggs, Greek yoghurt, tuna, tofu and more? Compare high-protein foods in Australia per 100g and per typical serve.",
  alternates: { canonical: "/protein-foods" },
};

const linkCls = "font-semibold text-pt-black underline";

// Everything below is worked out from data/foods.ts, so the hub can't show a
// number that isn't in the data file.
const rows: FoodTableRow[] = PUBLISHED_FOODS.map((f) => {
  const serve = typicalServe(f);
  return {
    slug: f.slug,
    name: f.name,
    category: f.category,
    per: unitLabel(f),
    proteinPer100: f.proteinPer100g,
    serveLabel: serve.label,
    proteinPerServe: proteinForServe(f, serve.grams),
    proteinPer100kcal: f.proteinPer100kcal,
  };
});

// Ranked per 100g, so liquids measured per 100ml are left out of the top 10.
const byProtein = PUBLISHED_FOODS.filter((f) => f.unit !== "ml").sort((a, b) => b.proteinPer100g - a.proteinPer100g);
const top10 = byProtein.slice(0, 10);
const categoriesWithFoods = CATEGORIES.filter((c) => PUBLISHED_FOODS.some((f) => f.category === c));
const topServe = [...rows].sort((a, b) => b.proteinPerServe - a.proteinPerServe)[0];
const topPlant = byProtein.find((f) => f.category === "Plant-Based");

const faqs: FAQItem[] = [
  ...(byProtein[0]
    ? [
        {
          q: "Which food has the most protein per 100g?",
          a: `Of the foods on this page, ${byProtein[0].name.toLowerCase()} has the most, at about ${byProtein[0].proteinPer100g}g of protein per 100g (${byProtein[0].prepDescription}). Lean meat and fish generally top the list per 100g.`,
        },
      ]
    : []),
  ...(topServe
    ? [
        {
          q: "Which food gives the most protein in a typical serve?",
          a: `${topServe.name} gives the most in the serve sizes we use, about ${topServe.proteinPerServe}g in ${topServe.serveLabel}. Per-serve figures depend on how much you actually eat, so it's worth comparing both columns.`,
        },
      ]
    : []),
  ...(topPlant
    ? [
        {
          q: "What is the highest protein plant-based food?",
          a: `Of the plant-based foods on this page, ${topPlant.name.toLowerCase()} is highest, at about ${topPlant.proteinPer100g}g of protein per 100g (${topPlant.prepDescription}).`,
        },
      ]
    : []),
  {
    q: "Are these figures for cooked or raw food?",
    a: "Each food page says exactly what its figure refers to, for example cooked and skinless, or canned and drained. Meat and fish figures are for cooked weight. Cooking removes water, so cooked meat has more protein per 100g than the same meat weighed raw.",
  },
  {
    q: "Where do the protein figures come from?",
    a: "Figures come from Australian food composition data published by Food Standards Australia New Zealand (AUSNUT and NUTTAB), or from a brand's Australian nutrition panel for branded products. Products vary, so the label on your pack is always the final word.",
  },
  {
    q: "How much protein do I need a day?",
    a: "It depends on your weight, age, activity and goal. Our protein calculator gives you a personal daily target, and our protein meal calculator shows how to build a meal around a specific number of grams.",
  },
];

export default function ProteinFoodsPage() {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">High Protein Foods in Australia</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            How much protein is in everyday Australian foods, per 100g and per typical serve.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-pt-black/80">
          Use the table to compare foods side by side. Select a column heading to sort it, or tap a food for its
          serving sizes, what changes the number and common questions.
        </p>

        <nav aria-label="Food categories" className="mt-6 flex flex-wrap gap-2">
          {categoriesWithFoods.map((c) => (
            <a
              key={c}
              href={`#${categoryAnchor(c)}`}
              className="rounded-full border border-pt-black/15 bg-pt-white px-4 py-1.5 text-sm font-semibold hover:bg-pt-offwhite"
            >
              {c}
            </a>
          ))}
          <a
            href="#top-10"
            className="rounded-full border border-pt-black/15 bg-pt-white px-4 py-1.5 text-sm font-semibold hover:bg-pt-offwhite"
          >
            Top {top10.length}
          </a>
        </nav>

        <div className="mt-8">
          <FoodTable rows={rows} />
        </div>
        <p className="mt-3 text-sm text-pt-black/50">
          Figures are approximate. Protein varies by brand, cut and preparation, so check the label for the product
          you buy.
        </p>

        <h2 id="top-10" className="mt-14 scroll-mt-6 text-2xl font-bold">
          Top {top10.length} highest protein foods
        </h2>
        <p className="mt-2 text-pt-black/80">Ranked by protein per 100g, from the foods on this page.</p>
        <ol className="mt-4 space-y-2">
          {top10.map((f, i) => (
            <li
              key={f.slug}
              className="flex items-baseline justify-between gap-4 rounded-card border border-pt-black/10 bg-pt-white px-4 py-3"
            >
              <span>
                <span className="mr-3 font-heading font-extrabold text-pt-black/40">{i + 1}</span>
                <Link href={`/protein-foods/${f.slug}`} className={linkCls}>
                  {f.name}
                </Link>
                <span className="ml-2 text-sm text-pt-black/50">{f.prepDescription}</span>
              </span>
              <span className="whitespace-nowrap font-heading font-bold">{f.proteinPer100g}g</span>
            </li>
          ))}
        </ol>

        {categoriesWithFoods.map((c) => (
          <section key={c} id={categoryAnchor(c)} className="scroll-mt-6">
            <h2 className="mt-14 text-2xl font-bold">{c}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {PUBLISHED_FOODS.filter((f) => f.category === c).map((f) => (
                <Link
                  key={f.slug}
                  href={`/protein-foods/${f.slug}`}
                  className="rounded-card border border-pt-black/10 bg-pt-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="font-heading text-lg font-bold">{f.name}</p>
                  <p className="mt-1 text-sm text-pt-black/60">
                    {f.proteinPer100g}g / {unitLabel(f)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <h2 className="mt-14 text-2xl font-bold">How to use this list</h2>
        <div className="mt-3 space-y-3 text-pt-black/80">
          <p>
            <strong>Per 100g is for comparing foods.</strong> It puts every food on the same footing, so you can see
            which ones pack the most protein into the same weight. Lean meat, fish and some dairy usually sit near the
            top. Grains and most snacks sit lower, but they can still add up over a day.
          </p>
          <p>
            <strong>Per serve is for planning meals.</strong> Nobody eats 100g of parmesan or 100g of chia seeds in one
            sitting, and plenty of people eat more than 100g of chicken. The per-serve column uses a realistic portion
            for each food, which is often a better guide to what a food actually adds to your plate.
          </p>
          <p>
            <strong>Check what the figure refers to.</strong> Cooked meat has more protein per 100g than raw, because
            cooking drives off water. Canned fish figures are for drained weight. Each food page says exactly which form
            its number describes, so you can match it to how you weigh your food.
          </p>
          <p>
            <strong>Brands and cuts vary.</strong> These are typical figures for Australian foods. A leaner cut, a
            different brand of yoghurt or a firmer tofu can sit higher or lower, so for products you buy often, the
            nutrition panel on the pack is the most accurate number to track.
          </p>
          <p>
            <strong>Mix animal and plant sources if you like.</strong> Both can help you reach your daily target.
            Plant foods such as tofu and legumes are useful if you eat little or no meat, and combining a few sources
            across the day is an easy way to get there.
          </p>
          <p>
            Not sure what your daily target should be? The{" "}
            <Link href="/protein-calculator" className={linkCls}>
              protein calculator
            </Link>{" "}
            gives you a personal number, and the{" "}
            <Link href="/protein-meal-calculator" className={linkCls}>
              protein meal calculator
            </Link>{" "}
            builds a meal around a specific gram target. For ready-made ideas, see our{" "}
            <Link href="/protein-meals" className={linkCls}>
              high-protein meals
            </Link>
            .
          </p>
        </div>

        <FaqSection faqs={faqs} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "High protein foods in Australia",
            numberOfItems: PUBLISHED_FOODS.length,
            itemListElement: PUBLISHED_FOODS.map((f, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: f.name,
              url: `${SITE_URL}/protein-foods/${f.slug}`,
            })),
          }),
        }}
      />
    </>
  );
}
