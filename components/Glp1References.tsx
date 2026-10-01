import { GLP1_DISCLAIMER, GLP1_SOURCES } from "@/lib/glp1-sources";

// Numbered references + disclaimer, shared by the GLP-1 calculator and guide.
export default function Glp1References() {
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
      <p className="mt-5 text-xs leading-relaxed text-pt-black/60">{GLP1_DISCLAIMER}</p>
    </section>
  );
}
