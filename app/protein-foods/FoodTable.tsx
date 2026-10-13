"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export interface FoodTableRow {
  slug: string;
  name: string;
  category: string;
  per: string; // "100g" or "100ml"
  form: string; // "cooked", "raw", "as sold", "dry"
  proteinPer100: number;
  serveLabel: string;
  proteinPerServe: number;
  proteinPer100kcal: number | null;
}

type SortKey = "name" | "proteinPer100" | "proteinPerServe" | "proteinPer100kcal";

// Sortable table of every published food. Click a column heading to sort;
// click again to flip the direction. Rows link to each food's page.
export default function FoodTable({ rows }: { rows: FoodTableRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("proteinPer100");
  const [desc, setDesc] = useState(true);
  const showKcal = rows.some((r) => r.proteinPer100kcal !== null);

  const sorted = useMemo(() => {
    const out = [...rows];
    out.sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      const av = a[sortKey] ?? -Infinity;
      const bv = b[sortKey] ?? -Infinity;
      return av - bv;
    });
    return desc ? out.reverse() : out;
  }, [rows, sortKey, desc]);

  function sortBy(key: SortKey) {
    if (key === sortKey) setDesc(!desc);
    else {
      setSortKey(key);
      setDesc(key !== "name");
    }
  }

  const header = (key: SortKey, label: string, className = "") => {
    const active = key === sortKey;
    return (
      <th
        scope="col"
        aria-sort={active ? (desc ? "descending" : "ascending") : "none"}
        className={`px-2 py-2 align-bottom font-semibold sm:px-3 ${className}`}
      >
        <button type="button" onClick={() => sortBy(key)} className="inline-flex items-center gap-1 text-left">
          {label}
          <span aria-hidden="true" className={active ? "text-pt-black" : "text-pt-black/30"}>
            {active ? (desc ? "↓" : "↑") : "↕"}
          </span>
        </button>
      </th>
    );
  };

  return (
    <div className="overflow-x-auto rounded-card border border-pt-black/10 bg-pt-white">
      <table className="w-full text-left text-xs sm:text-sm">
        <caption className="sr-only">
          High protein foods. Select a column heading to sort.
        </caption>
        <thead className="bg-pt-offwhite text-pt-black">
          <tr>
            {header("name", "Food")}
            {header("proteinPer100", "Protein per 100g")}
            {header("proteinPerServe", "Protein per typical serve")}
            {showKcal && header("proteinPer100kcal", "Protein per 100 calories")}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.slug} className="border-t border-pt-black/10">
              <th scope="row" className="px-2 py-2 font-semibold sm:px-3">
                <Link href={`/protein-foods/${r.slug}`} className="text-pt-black underline">
                  {r.name}
                </Link>
                <span className="block text-xs font-normal text-pt-black/50">{r.category}</span>
              </th>
              <td className="px-2 py-2 sm:px-3">
                {r.proteinPer100}g{r.per === "100ml" && <span className="text-pt-black/50"> per 100ml</span>}
                <span className="block text-xs text-pt-black/50">{r.form}</span>
              </td>
              <td className="px-2 py-2 sm:px-3">
                {r.proteinPerServe}g <span className="block text-xs text-pt-black/50 sm:inline sm:text-sm">({r.serveLabel})</span>
              </td>
              {showKcal && <td className="px-2 py-2 sm:px-3">{r.proteinPer100kcal !== null ? `${r.proteinPer100kcal}g` : "—"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
