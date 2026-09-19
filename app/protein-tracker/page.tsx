import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Protein Tracker App — Free Protein Tracking (Australia)",
  description:
    "Track your daily protein intake the easy way. Set a personalised protein goal, log your food, and even scan meals with AI using HitProtein — Australia's protein tracker app.",
  alternates: { canonical: "/protein-tracker" },
};

const steps = [
  {
    title: "Set Your Goal",
    body: "HitProtein calculates a personalised protein target based on your weight, age, activity level and goal — the same calculation used on our protein calculator.",
  },
  {
    title: "Track Your Food",
    body: "Log the protein you eat throughout the day in seconds, and see exactly how close you are to your target at a glance.",
  },
  {
    title: "Scan With AI",
    body: "Take a photo of your meal and HitProtein's AI can estimate the protein for you — no manual searching or weighing required. This feature lives inside the HitProtein app.",
  },
  {
    title: "Get Meal Ideas",
    body: "HitProtein's Protein Coach can suggest meals based on your remaining protein for the day, so you're never guessing what to eat next.",
  },
  {
    title: "Track Your Progress",
    body: "See your daily progress toward your protein target, plus streaks and trends over time, right on your home screen.",
  },
];

export default function ProteinTrackerPage() {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">Protein Tracker</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            Know your protein goal. Track what you eat. Hit your target every
            day.
          </p>
          <div className="mt-8">
            <CtaButton href="https://hitprotein.com.au/download" size="lg">
              Download HitProtein
            </CtaButton>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold">How protein tracking works</h2>
        <p className="mt-3 text-pt-black/80">
          Tracking your protein is simple once you know your daily target and
          have an easy way to log what you eat against it. Most people who
          struggle to hit their protein goal aren't lacking motivation —
          they're lacking a system that makes it quick enough to stick with.
          HitProtein handles both halves: the target, and the tracking.
        </p>

        <div className="mt-10 space-y-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pt-black font-heading font-bold text-pt-green">
                {i + 1}
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-pt-black/80">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-pt-black/50">
          Don't know your protein target yet? Start with the{" "}
          <a href="/protein-calculator" className="font-semibold text-pt-black underline">
            protein calculator
          </a>{" "}
          first.
        </p>

        <div className="mt-12 rounded-card bg-pt-black p-8 text-center text-pt-white">
          <p className="font-heading text-xl font-bold">
            Ready to make hitting your protein goal easier?
          </p>
          <div className="mt-4">
            <CtaButton href="https://hitprotein.com.au/download">
              Download HitProtein
            </CtaButton>
          </div>
        </div>
      </article>
    </>
  );
}
