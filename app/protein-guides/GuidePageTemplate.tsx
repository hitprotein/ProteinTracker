import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import type { FAQItem } from "@/lib/content-types";

export interface GuideSection {
  heading: string;
  body: React.ReactNode;
}

interface GuidePageTemplateProps {
  h1: string;
  subtitle: string;
  sections: GuideSection[];
  faqs: FAQItem[];
  ctaHeading?: string;
  ctaBody?: string;
}

export default function GuidePageTemplate({
  h1,
  subtitle,
  sections,
  faqs,
  ctaHeading = "Ready to know your own number?",
  ctaBody = "HitProtein sets your personalised target automatically and tracks it as you eat.",
}: GuidePageTemplateProps) {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">{h1}</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">{subtitle}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="mt-10 text-2xl font-bold first:mt-0">{s.heading}</h2>
            <div className="mt-3 space-y-3 text-pt-black/80">{s.body}</div>
          </div>
        ))}

        <FaqSection faqs={faqs} />

        <div className="mt-12 rounded-card bg-pt-black p-8 text-center text-pt-white">
          <p className="font-heading text-xl font-bold">{ctaHeading}</p>
          <p className="mt-2 text-sm text-pt-white/70">{ctaBody}</p>
          <div className="mt-5 flex justify-center">
            <CtaButton href="https://hitprotein.com.au/download">
              Try HitProtein
            </CtaButton>
          </div>
        </div>
      </article>
    </>
  );
}
