import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High Protein Foods — Protein Content Guide (Australia)",
  description:
    "How much protein is in chicken, eggs, Greek yoghurt, steak, tuna, salmon and more. A guide to high-protein foods with exact amounts per serving.",
  alternates: { canonical: "/protein-foods" },
};

const foods = [
  { name: "Chicken Breast", href: "/protein-foods/chicken-breast", protein: "31g / 100g" },
  { name: "Eggs", href: "/protein-foods/eggs", protein: "~6g / egg" },
  { name: "Greek Yoghurt", href: "/protein-foods/greek-yoghurt", protein: "10g / 100g" },
  { name: "Steak", href: "/protein-foods/steak", protein: "31g / 100g" },
  { name: "Beef Mince", href: "/protein-foods/beef-mince", protein: "26g / 100g" },
  { name: "Tuna", href: "/protein-foods/tuna", protein: "25g / 100g" },
  { name: "Salmon", href: "/protein-foods/salmon", protein: "23g / 100g" },
  { name: "Cottage Cheese", href: "/protein-foods/cottage-cheese", protein: "11g / 100g" },
  { name: "Milk", href: "/protein-foods/milk", protein: "3.4g / 100ml" },
  { name: "Tofu", href: "/protein-foods/tofu", protein: "8g / 100g" },
];

export default function ProteinFoodsPage() {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">High Protein Foods</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            Exact protein content for the foods that make hitting your target
            easiest.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {foods.map((food) => (
            <a
              key={food.href}
              href={food.href}
              className="rounded-card border border-pt-black/10 bg-pt-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="font-heading text-lg font-bold">{food.name}</p>
              <p className="mt-1 text-sm text-pt-black/60">{food.protein}</p>
            </a>
          ))}
        </div>

        <p className="mt-10 text-sm text-pt-black/50">
          Figures are approximate — protein content varies by brand, cut and
          preparation method. Each food page has serving-size breakdowns and
          notes on what changes the number.
        </p>

        <p className="mt-6 text-pt-black/80">
          Not sure how these foods add up toward your day? Try our{" "}
          <a href="/protein-calculator" className="font-semibold text-pt-black underline">
            protein calculator
          </a>{" "}
          to get your daily target, or the{" "}
          <a href="/protein-meal-calculator" className="font-semibold text-pt-black underline">
            protein meal calculator
          </a>{" "}
          to build a meal around a specific gram target.
        </p>
      </section>
    </>
  );
}
