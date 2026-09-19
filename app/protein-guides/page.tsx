import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protein Guides — How Much Protein Do You Actually Need?",
  description:
    "In-depth guides on protein: how much you need, protein for muscle gain, protein for weight loss, and how much protein per meal actually matters.",
  alternates: { canonical: "/protein-guides" },
};

const guides = [
  {
    name: "How Much Protein Do I Need?",
    href: "/protein-guides/how-much-protein-do-i-need",
    body: "The full picture behind the number — not just a calculator result",
  },
  {
    name: "Protein For Muscle Gain",
    href: "/protein-guides/protein-for-muscle-gain",
    body: "The science of muscle protein synthesis, timing and common mistakes",
  },
  {
    name: "Protein For Weight Loss",
    href: "/protein-guides/protein-for-weight-loss",
    body: "Why protein needs rise in a deficit, and how to actually use that",
  },
  {
    name: "How Much Protein Per Meal?",
    href: "/protein-guides/how-much-protein-per-meal",
    body: "The leucine threshold, meal spacing, and why one big meal falls short",
  },
];

export default function ProteinGuidesPage() {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">Protein Guides</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            The reasoning behind the numbers — for when you want to
            understand protein, not just calculate it.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <a
              key={g.href}
              href={g.href}
              className="rounded-card border border-pt-black/10 bg-pt-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="font-heading text-lg font-bold">{g.name}</p>
              <p className="mt-2 text-sm text-pt-black/60">{g.body}</p>
            </a>
          ))}
        </div>

        <p className="mt-10 text-pt-black/80">
          Want your actual number rather than general guidance? Use the{" "}
          <a href="/protein-calculator" className="font-semibold text-pt-black underline">
            protein calculator
          </a>
          .
        </p>
      </section>
    </>
  );
}
