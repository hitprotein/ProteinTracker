import { GLP1_DISCLAIMER, GLP1_LAST_UPDATED, GLP1_SOURCES } from "@/lib/glp1-sources";

const SITE_URL = "https://proteintracker.com.au";

const lastUpdatedLabel = new Date(`${GLP1_LAST_UPDATED}T00:00:00Z`).toLocaleDateString("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

// Numbered references, last-updated date and disclaimer, shared by the GLP-1
// calculator and guide. `path` is the page's own route, for its WebPage schema.
export default function Glp1References({ path }: { path: string }) {
  return (
    <section aria-labelledby="refs" className="mt-12 rounded-card border border-pt-black/10 bg-pt-offwhite p-6">
      <h2 id="refs" className="text-xl font-bold">References</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-pt-black/75">
        {GLP1_SOURCES.map((s) => (
          <li key={s.id}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-pt-black">
              {s.label}
            </a>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-xs font-semibold text-pt-black/70">
        Last updated <time dateTime={GLP1_LAST_UPDATED}>{lastUpdatedLabel}</time>
      </p>
      <p className="mt-2 text-xs leading-relaxed text-pt-black/60">{GLP1_DISCLAIMER}</p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: `${SITE_URL}${path}`,
            dateModified: GLP1_LAST_UPDATED,
            citation: GLP1_SOURCES.map((s) => s.url),
          }),
        }}
      />
    </section>
  );
}
