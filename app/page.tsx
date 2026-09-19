import CtaButton from "@/components/CtaButton";

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
            <a
              href="/protein-tracker"
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
