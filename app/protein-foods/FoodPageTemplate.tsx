import CtaButton from "@/components/CtaButton";
import type { FAQItem } from "@/lib/content-types";

export interface ServingExample {
  label: string;
  grams: number;
}

export interface RelatedLink {
  name: string;
  href: string;
}

interface FoodPageTemplateProps {
  h1: string;
  proteinPer100g: number;
  prepDescription: string; // e.g. "grilled, skinless" — context for the headline number
  intro: React.ReactNode;
  servings: ServingExample[];
  varianceNote: React.ReactNode;
  usageTips: string[];
  relatedFoods: RelatedLink[];
  relatedMeal?: RelatedLink;
  faqs: FAQItem[];
}

export default function FoodPageTemplate({
  h1,
  proteinPer100g,
  prepDescription,
  intro,
  servings,
  varianceNote,
  usageTips,
  relatedFoods,
  relatedMeal,
  faqs,
}: FoodPageTemplateProps) {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">{h1}</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            {proteinPer100g}g of protein per 100g ({prepDescription})
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-card border border-pt-black/10 bg-pt-white p-6 shadow-sm">
          <p className="font-heading text-lg font-bold">Protein by serving size</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {servings.map((s) => (
              <div key={s.label} className="rounded-lg bg-pt-offwhite p-3 text-center">
                <p className="text-xs text-pt-black/60">{s.label}</p>
                <p className="mt-1 font-heading text-xl font-extrabold text-pt-black">
                  {Math.round((proteinPer100g * s.grams) / 100)}g
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-pt-black/50">
            Figures are approximate for {prepDescription}. Protein content
            varies by brand, cut and exact preparation — see the note below.
          </p>
        </div>

        <div className="mt-10 space-y-3 text-pt-black/80">{intro}</div>

        <h2 className="mt-10 text-2xl font-bold">Why the number varies</h2>
        <div className="mt-3 space-y-3 text-pt-black/80">{varianceNote}</div>

        <h2 className="mt-10 text-2xl font-bold">Ways to use it</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-pt-black/80">
          {usageTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>

        {(relatedFoods.length > 0 || relatedMeal) && (
          <>
            <h2 className="mt-10 text-2xl font-bold">Related</h2>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-pt-black/80">
              {relatedFoods.map((f) => (
                <li key={f.href}>
                  <a href={f.href} className="font-semibold text-pt-black underline">
                    {f.name}
                  </a>
                </li>
              ))}
              {relatedMeal && (
                <li>
                  <a href={relatedMeal.href} className="font-semibold text-pt-black underline">
                    {relatedMeal.name}
                  </a>
                </li>
              )}
            </ul>
          </>
        )}

        {faqs.length > 0 && (
          <>
            <h2 className="mt-10 text-2xl font-bold">FAQs</h2>
            <div className="mt-4 space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-1 text-pt-black/80">{f.a}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-12 rounded-card bg-pt-black p-8 text-center text-pt-white">
          <p className="font-heading text-xl font-bold">
            Know what you're eating. Know your protein.
          </p>
          <p className="mt-2 text-sm text-pt-white/70">
            HitProtein logs your food and tracks it against your daily
            target automatically.
          </p>
          <div className="mt-5 flex justify-center">
            <CtaButton href="https://hitprotein.com.au/download">
              Track Your Protein With HitProtein
            </CtaButton>
          </div>
        </div>
      </article>

      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
    </>
  );
}
