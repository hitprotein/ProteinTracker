import Calculator from "@/components/Calculator";
import type { ActivityLevel, GoalType } from "@/lib/protein-calculator";

export interface FAQItem {
  q: string;
  a: string;
}

export interface ContentSection {
  heading: string;
  body: React.ReactNode;
}

interface CalculatorPageTemplateProps {
  h1: string;
  subtitle: string;
  defaultGoalType?: GoalType;
  defaultActivityLevel?: ActivityLevel;
  defaultAge?: string;
  sections: ContentSection[];
  faqs: FAQItem[];
}

// Shared shell for /protein-calculator and every goal-specific variant
// (weight-loss, muscle-gain, women, men, over-50). Keeps the layout,
// calculator embed, and FAQ schema identical across all of them — only
// the copy and calculator defaults differ per page.
export default function CalculatorPageTemplate({
  h1,
  subtitle,
  defaultGoalType,
  defaultActivityLevel,
  defaultAge,
  sections,
  faqs,
}: CalculatorPageTemplateProps) {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">{h1}</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">{subtitle}</p>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-2xl px-6">
        <Calculator
          defaultGoalType={defaultGoalType}
          defaultActivityLevel={defaultActivityLevel}
          defaultAge={defaultAge}
        />
      </section>

      <article className="mx-auto mt-16 max-w-3xl px-6 pb-24">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="mt-10 text-2xl font-bold first:mt-0">{s.heading}</h2>
            <div className="mt-3 space-y-3 text-pt-black/80">{s.body}</div>
          </div>
        ))}

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
