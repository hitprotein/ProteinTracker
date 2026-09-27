import type { FAQItem } from "@/lib/content-types";

// Visible FAQ list plus its FAQPage JSON-LD. Both are generated from the same
// array so the schema can never drift from what's on the page (Google treats
// schema that doesn't match visible content as spammy).
export default function FaqSection({ faqs }: { faqs: FAQItem[] }) {
  if (faqs.length === 0) return null;

  return (
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
    </>
  );
}
