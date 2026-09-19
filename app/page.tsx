import Link from "next/link";

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
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/protein-calculator"
              className="rounded-card bg-pt-green px-6 py-3 font-heading font-bold text-pt-black transition hover:opacity-90"
            >
              Calculate My Protein
            </Link>
            <a
              href="https://hitprotein.com.au"
              className="text-sm font-semibold text-pt-white/70 hover:text-pt-white"
            >
              Already know your target? Track it with HitProtein →
            </a>
          </div>
        </div>
      </section>

      {/* TODO: Foods / Meals / Guides section cards — build once Phase 2/3 pages exist */}
    </>
  );
}
