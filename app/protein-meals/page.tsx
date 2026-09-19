import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High Protein Meal Ideas — 30g, 40g and 50g Protein Meals",
  description:
    "Real meal ideas built around specific protein targets, with ingredients, method and protein per serving. Find meals for 30g, 40g and 50g of protein.",
  alternates: { canonical: "/protein-meals" },
};

const targets = [
  { name: "30g Protein Meals", href: "/protein-meals/30g-protein", body: "Lighter meals and snacks-sized portions" },
  { name: "40g Protein Meals", href: "/protein-meals/40g-protein", body: "Standard main-meal protein target" },
  { name: "50g Protein Meals", href: "/protein-meals/50g-protein", body: "Larger meals for higher daily targets" },
];

export default function ProteinMealsPage() {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">High Protein Meals</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            Real meal ideas built around a specific protein target — not
            just a list of "high protein foods."
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {targets.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="rounded-card border border-pt-black/10 bg-pt-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="font-heading text-lg font-bold">{t.name}</p>
              <p className="mt-1 text-sm text-pt-black/60">{t.body}</p>
            </a>
          ))}
        </div>

        <p className="mt-10 text-pt-black/80">
          Know exactly how much protein you need per meal, not just per day?
          Try the{" "}
          <a href="/protein-meal-calculator" className="font-semibold text-pt-black underline">
            protein meal calculator
          </a>{" "}
          — enter a gram target and get a food combination that gets you
          there, rather than picking from a fixed list.
        </p>
      </section>
    </>
  );
}
