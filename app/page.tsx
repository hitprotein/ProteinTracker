import type { Metadata } from "next";
import Link from "next/link";
import CtaButton from "@/components/CtaButton";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const sections = [
  {
    name: "Protein Calculator",
    href: "/protein-calculator",
    body: "Your personalised daily protein target from your weight, height, age, activity and goal.",
  },
  {
    name: "High Protein Foods",
    href: "/protein-foods",
    body: "Protein per 100g and per serving for chicken, eggs, Greek yoghurt, tuna, tofu and more.",
  },
  {
    name: "High Protein Meals",
    href: "/protein-meals",
    body: "Simple 30g, 40g and 50g protein meals, with ingredients, method and swaps.",
  },
  {
    name: "Protein Guides",
    href: "/protein-guides",
    body: "How much protein you need, how to split it across meals, and how it changes with your goal.",
  },
];

const popular = [
  { name: "Protein for weight loss", href: "/protein-calculator/weight-loss" },
  { name: "Protein for muscle gain", href: "/protein-calculator/muscle-gain" },
  { name: "Protein meal calculator", href: "/protein-meal-calculator" },
  { name: "Protein in chicken breast", href: "/protein-foods/chicken-breast" },
  { name: "Protein in eggs", href: "/protein-foods/eggs" },
  { name: "How much protein per meal?", href: "/protein-guides/how-much-protein-per-meal" },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-pt-black py-24 text-pt-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Know Your Protein. <span className="text-pt-green">Hit Your Goal.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-pt-white/70">
            Calculate how much protein you need, discover high-protein foods
            and meals, and learn how to reach your daily protein target.
          </p>
          <div className="mx-auto mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CtaButton href="/protein-calculator" size="lg">
              Calculate My Protein
            </CtaButton>
            <Link
              href="/protein-tracker"
              className="text-sm font-semibold text-pt-white/70 hover:text-pt-white"
            >
              Already know your target? Track it with HitProtein →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-bold">Start here</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-card border border-pt-black/10 bg-pt-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="font-heading text-lg font-bold">{s.name}</p>
              <p className="mt-1 text-sm text-pt-black/60">{s.body}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-bold">Popular</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-pt-black/80">
          {popular.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="font-semibold text-pt-black underline">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
