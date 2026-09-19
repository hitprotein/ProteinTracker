import type { Metadata } from "next";
import GuidePageTemplate from "../GuidePageTemplate";

export const metadata: Metadata = {
  title: "Protein For Muscle Gain — How Much, When, and Common Mistakes",
  description:
    "The science of muscle protein synthesis, how much protein you actually need to build muscle, meal timing, and the most common mistakes people make.",
  alternates: { canonical: "/protein-guides/protein-for-muscle-gain" },
};

export default function ProteinForMuscleGainGuide() {
  return (
    <GuidePageTemplate
      h1="Protein For Muscle Gain"
      subtitle="What actually drives muscle growth, and where most people go wrong with protein."
      sections={[
        {
          heading: "Muscle protein synthesis, briefly",
          body: (
            <p>
              Building muscle is a constant cycle of breakdown and repair.
              Resistance training creates small amounts of damage in muscle
              fibres; your body repairs that damage using amino acids from
              protein, and — given enough stimulus and enough raw
              material — repairs it slightly stronger than before. This
              process is called muscle protein synthesis, and it's the
              reason training without enough protein produces far slower
              results than training with it.
            </p>
          ),
        },
        {
          heading: "How much protein actually matters here",
          body: (
            <p>
              Research on resistance-trained individuals generally supports
              somewhere around 1.6–2.2g of protein per kilogram of
              bodyweight per day for maximising muscle growth — intakes
              well above that don't appear to provide further benefit for
              most people. Our{" "}
              <a
                href="/protein-calculator/muscle-gain"
                className="font-semibold text-pt-black underline"
              >
                protein calculator for muscle gain
              </a>{" "}
              adjusts within that range based on your training intensity
              and age.
            </p>
          ),
        },
        {
          heading: "Total calories matter as much as protein",
          body: (
            <p>
              Protein provides the raw material for muscle growth, but it's
              not the only requirement — building new tissue also takes
              energy. Trying to build muscle in a significant calorie
              deficit is fighting an uphill battle regardless of how much
              protein you eat. Most people building muscle do best eating
              at maintenance or in a slight surplus, with protein intake
              high enough to make use of that extra energy.
            </p>
          ),
        },
        {
          heading: "Does meal timing actually matter?",
          body: (
            <p>
              The idea of a narrow "anabolic window" right after training
              has been largely overstated in popular fitness culture —
              total daily protein intake matters far more than eating
              protein within a specific number of minutes post-workout.
              That said, spreading protein across 3–4 meals through the day
              (rather than eating most of it in one sitting) does appear to
              support muscle protein synthesis better than one large dose,
              largely because there's a practical ceiling on how much
              protein a single meal can effectively use for muscle
              building.
            </p>
          ),
        },
        {
          heading: "Common mistakes",
          body: (
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Eating enough protein but not enough total calories to
                support growth
              </li>
              <li>
                Eating most protein in one meal rather than spreading it
                across the day
              </li>
              <li>
                Under-eating protein on rest days, assuming it only matters
                on training days (muscle repair continues well after the
                workout itself)
              </li>
              <li>
                Chasing protein intakes far above 2.2g/kg, which research
                doesn't support as producing extra benefit
              </li>
            </ul>
          ),
        },
      ]}
      faqs={[
        {
          q: "How much protein do I need per day to build muscle?",
          a: "Most research supports roughly 1.6–2.2g per kilogram of bodyweight per day for maximising muscle growth in people doing regular resistance training. Use our muscle gain calculator for a number based on your specific details.",
        },
        {
          q: "Do I need to eat protein immediately after a workout?",
          a: "Not within a narrow window, no — total daily protein intake matters far more than precise post-workout timing. Eating protein at some point within a few hours of training is sufficient for most people.",
        },
        {
          q: "Can I build muscle without a calorie surplus?",
          a: "It's possible in some cases (particularly for beginners or people returning to training), but it's generally slower and less reliable than building muscle at maintenance or in a slight surplus.",
        },
      ]}
      ctaHeading="Building muscle and want meal ideas to match?"
      ctaBody="See our 40g and 50g protein meal ideas, or let HitProtein's Protein Coach suggest meals based on your goal."
    />
  );
}
