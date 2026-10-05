const SITE_URL = "https://proteintracker.com.au";

export interface Source {
  id: string;
  label: string;
  url: string;
}

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Numbered references, last-updated date and disclaimer for referenced pages.
// Also outputs WebPage JSON-LD with dateModified and the cited sources. `path`
// is the page's own route.
export default function References({
  sources,
  lastUpdated,
  disclaimer,
  path,
}: {
  sources: readonly Source[];
  lastUpdated: string; // YYYY-MM-DD
  disclaimer: string;
  path: string;
}) {
  return (
    <section aria-labelledby="refs" className="mt-12 rounded-card border border-pt-black/10 bg-pt-offwhite p-6">
      <h2 id="refs" className="text-xl font-bold">References</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-pt-black/75">
        {sources.map((s) => (
          <li key={s.id}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-pt-black">
              {s.label}
            </a>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-xs font-semibold text-pt-black/70">
        Last updated <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
      </p>
      <p className="mt-2 text-xs leading-relaxed text-pt-black/60">{disclaimer}</p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: `${SITE_URL}${path}`,
            dateModified: lastUpdated,
            citation: sources.map((s) => s.url),
          }),
        }}
      />
    </section>
  );
}
