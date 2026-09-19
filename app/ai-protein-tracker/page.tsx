import type { Metadata } from "next";
import { Camera, Sparkles, Check } from "lucide-react";
import CtaButton from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "AI Protein Tracker — Scan Your Meal With AI (HitProtein)",
  description:
    "Take a photo of your meal and let AI estimate its protein instantly. See how HitProtein's AI food scanning works and try it for yourself.",
  alternates: { canonical: "/ai-protein-tracker" },
};

const steps = [
  {
    icon: Camera,
    title: "Take a photo",
    body: "Point your phone at your meal — no manual searching or database lookups.",
  },
  {
    icon: Sparkles,
    title: "AI analyses your meal",
    body: "HitProtein's AI identifies what's on your plate and estimates the protein content.",
  },
  {
    icon: Check,
    title: "Track it toward your goal",
    body: "The estimate is logged instantly against your daily protein target — no extra steps.",
  },
];

export default function AiProteinTrackerPage() {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">
            Track Protein With AI
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            Take a photo of your meal and let HitProtein's AI estimate the
            protein.
          </p>
        </div>
      </section>

      {/* Illustrative process graphic — not a real product screenshot.
          Swap for actual in-app screenshots (photo capture → AI result →
          logged entry) as soon as they're available; real screenshots will
          convert noticeably better than this stylised version. */}
      <section className="mx-auto -mt-10 max-w-3xl px-6">
        <div className="grid gap-4 rounded-card border border-pt-black/10 bg-pt-white p-6 shadow-sm sm:grid-cols-3 md:p-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pt-black">
                  <Icon className="h-6 w-6 text-pt-green" />
                </div>
                <p className="mt-3 font-heading font-bold">
                  {i + 1}. {step.title}
                </p>
                <p className="mt-1 text-sm text-pt-black/70">{step.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <article className="mx-auto mt-16 max-w-3xl px-6 pb-24">
        <h2 className="text-2xl font-bold">How AI protein tracking works</h2>
        <p className="mt-3 text-pt-black/80">
          Manually logging every meal is the single biggest reason people give
          up on tracking protein. HitProtein's AI scanning removes that
          friction — instead of searching a food database and estimating
          portion sizes yourself, you take a photo and the AI does the
          identification and estimation for you.
        </p>
        <p className="mt-3 text-pt-black/80">
          This isn't a web tool — the scanning happens inside the HitProtein
          app on your phone, where the camera and your logged history work
          together to keep estimates reasonably accurate over time.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Is AI food scanning accurate?
        </h2>
        <p className="mt-3 text-pt-black/80">
          AI estimates are exactly that — estimates. Accuracy depends on the
          meal, the photo, and how visible the ingredients are (a bowl of
          mixed pasta is harder to estimate precisely than a grilled chicken
          breast on its own). For most people tracking protein day-to-day,
          that level of accuracy is more than enough to hit a daily target
          consistently — which matters far more than any single meal being
          exact to the gram.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Why use AI instead of manual tracking?
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-pt-black/80">
          <li>No searching food databases or guessing serving sizes</li>
          <li>Takes seconds instead of minutes per meal</li>
          <li>
            Removes the main reason most people stop tracking — the effort
          </li>
          <li>
            Works alongside manual logging and barcode scanning for meals
            where a photo isn't practical
          </li>
        </ul>

        <div className="mt-12 rounded-card bg-pt-black p-8 text-center text-pt-white">
          <p className="font-heading text-xl font-bold">
            Ready to try AI protein tracking?
          </p>
          <div className="mt-5 flex justify-center">
            <CtaButton href="https://hitprotein.com.au/download" size="lg">
              Try AI Protein Tracking With HitProtein
            </CtaButton>
          </div>
          <a
            href="https://hitprotein.com.au/download"
            className="mt-4 inline-block text-sm font-semibold text-pt-white/70 hover:text-pt-white"
          >
            Download on the App Store →
          </a>
        </div>
      </article>
    </>
  );
}
