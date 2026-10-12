import Link from "next/link";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import type { FAQItem } from "@/lib/content-types";
import {
  PUBLISHED_FOODS,
  categoryAnchor,
  proteinForServe,
  relatedFoods,
  typicalServe,
  unitLabel,
  type Food,
} from "@/data/foods";

type PublishedFood = Food & { proteinPer100g: number };

// FAQs worked out from the stored figures, so they can't introduce a number
// that isn't already in the data. Added only when the entry's own FAQs don't
// already cover the question, and only until the page has at least 4.
function pageFaqs(food: PublishedFood): FAQItem[] {
  const faqs = [...food.faqs];
  const asked = (needle: string) => faqs.some((f) => f.q.toLowerCase().includes(needle));
  const name = food.name.toLowerCase();
  const per = unitLabel(food);

  const candidates: FAQItem[] = [];
  if (!asked(`${per} of`) && !asked(`per ${per}`)) {
    candidates.push({
      q: `How much protein is in ${per} of ${name}?`,
      a: `About ${food.proteinPer100g}g of protein per ${per} (${food.prepDescription}).`,
    });
  }
  const serve = typicalServe(food);
  if (serve && serve.grams !== 100 && !asked(serve.label.toLowerCase())) {
    candidates.push({
      q: `How much protein is in ${serve.label} of ${name}?`,
      a: `About ${proteinForServe(food, serve.grams)}g of protein, based on ${food.proteinPer100g}g per ${per}.`,
    });
  }
  if (food.caloriesPer100g !== null && food.proteinPer100kcal !== null) {
    candidates.push({
      q: `How many calories are in ${name}?`,
      a: `About ${food.caloriesPer100g} calories per ${per}, which works out to ${food.proteinPer100kcal}g of protein per 100 calories.`,
    });
  }
  const sameCategory = PUBLISHED_FOODS.filter((f) => f.category === food.category && f.unit === food.unit)
    .sort((a, b) => b.proteinPer100g - a.proteinPer100g);
  if (sameCategory.length >= 2) {
    const rank = sameCategory.findIndex((f) => f.slug === food.slug) + 1;
    candidates.push({
      q: `How does ${name} compare with other ${food.category.toLowerCase()} foods?`,
      a: `Of the ${sameCategory.length} ${food.category.toLowerCase()} foods on this site, ${name} ranks number ${rank} for protein per ${per}. See the full table on our high protein foods page.`,
    });
  }
  faqs.push(...candidates);

  // Generic fallback, only if the page still has fewer than 4 FAQs.
  if (faqs.length < 4) {
    faqs.push({
      q: `Where do these ${name} protein figures come from?`,
      a: "Figures come from Australian food composition data (FSANZ AUSNUT/NUTTAB) or, for branded products, the brand's Australian nutrition panel. Protein varies by brand, cut and preparation, so check the label of the product you buy.",
    });
  }
  return faqs;
}

function sourceLine(food: Food): string | null {
  const s = food.source;
  if (s.dataset === "TODO") return null;
  return [s.dataset, s.foodName, s.foodId ? `ID ${s.foodId}` : null].filter(Boolean).join(" — ");
}

export default function FoodPageTemplate({ food }: { food: PublishedFood }) {
  const per = unitLabel(food);
  const faqs = pageFaqs(food);
  const related = relatedFoods(food);
  const source = sourceLine(food);
  const brands = (food.brands ?? []).filter((b) => b.proteinPer100g !== null);
  const intro = food.intro ?? [
    `${food.name} has about ${food.proteinPer100g}g of protein per ${per} (${food.prepDescription}). The table above shows what that works out to for common serves.`,
  ];

  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">Protein in {food.name}</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            {food.proteinPer100g}g of protein per {per} ({food.prepDescription})
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-card border border-pt-black/10 bg-pt-white p-6 shadow-sm">
          <p className="font-heading text-lg font-bold">Protein by serving size</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {food.commonServes.map((s) => (
              <div key={s.label} className="rounded-lg bg-pt-offwhite p-3 text-center">
                <p className="text-xs text-pt-black/60">{s.label}</p>
                <p className="mt-1 font-heading text-xl font-extrabold text-pt-black">
                  {proteinForServe(food, s.grams)}g
                </p>
              </div>
            ))}
          </div>
          {food.caloriesPer100g !== null && food.proteinPer100kcal !== null && (
            <p className="mt-4 text-sm text-pt-black/70">
              {food.caloriesPer100g} calories per {per} · {food.proteinPer100kcal}g protein per 100 calories
            </p>
          )}
          <p className="mt-4 text-xs text-pt-black/50">
            Figures are approximate for {food.prepDescription}. Protein content varies by brand, cut and exact
            preparation — see the note below.
          </p>
          {source && <p className="mt-2 text-xs text-pt-black/50">Source: {source}</p>}
        </div>

        <div className="mt-10 space-y-3 text-pt-black/80">
          {intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {food.watchOut && (
          <div className="mt-10 rounded-card border border-pt-black/10 bg-pt-offwhite p-6">
            <h2 className="text-xl font-bold">{food.watchOut.heading}</h2>
            <div className="mt-3 space-y-3 text-pt-black/80">
              {food.watchOut.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {brands.length > 0 && (
          <>
            <h2 className="mt-10 text-2xl font-bold">Australian brands compared</h2>
            <div className="mt-3 overflow-x-auto rounded-card border border-pt-black/10 bg-pt-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-pt-offwhite">
                  <tr>
                    <th scope="col" className="px-3 py-2 font-semibold">Brand</th>
                    <th scope="col" className="px-3 py-2 font-semibold">Protein per {per}</th>
                    <th scope="col" className="px-3 py-2 font-semibold">Calories per {per}</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map((b) => (
                    <tr key={`${b.brand}-${b.product}`} className="border-t border-pt-black/10">
                      <th scope="row" className="px-3 py-2 font-semibold">
                        {b.brand} {b.product}
                      </th>
                      <td className="px-3 py-2">{b.proteinPer100g}g</td>
                      <td className="px-3 py-2">{b.caloriesPer100g ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-pt-black/50">
              From each brand&apos;s Australian nutrition panel. Recipes change, so check the pack.
            </p>
          </>
        )}

        {food.whyVaries && food.whyVaries.length > 0 && (
          <>
            <h2 className="mt-10 text-2xl font-bold">Why the number varies</h2>
            <div className="mt-3 space-y-3 text-pt-black/80">
              {food.whyVaries.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </>
        )}

        {food.usageTips && food.usageTips.length > 0 && (
          <>
            <h2 className="mt-10 text-2xl font-bold">Ways to use it</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-pt-black/80">
              {food.usageTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </>
        )}

        <h2 className="mt-10 text-2xl font-bold">Related</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-pt-black/80">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/protein-foods/${r.slug}`} className="font-semibold text-pt-black underline">
                {r.name}
              </Link>
            </li>
          ))}
          {food.relatedMeal && (
            <li>
              <Link href={food.relatedMeal.href} className="font-semibold text-pt-black underline">
                {food.relatedMeal.name}
              </Link>
            </li>
          )}
          <li>
            <Link
              href={`/protein-foods#${categoryAnchor(food.category)}`}
              className="font-semibold text-pt-black underline"
            >
              More {food.category.toLowerCase()} foods
            </Link>
          </li>
        </ul>

        <FaqSection faqs={faqs} />

        <div className="mt-12 rounded-card bg-pt-black p-8 text-center text-pt-white">
          <p className="font-heading text-xl font-bold">Know what you&apos;re eating. Know your protein.</p>
          <p className="mt-2 text-sm text-pt-white/70">
            HitProtein logs your food and tracks it against your daily target automatically.
          </p>
          <div className="mt-5 flex justify-center">
            <CtaButton href="https://hitprotein.com.au/download">Track Your Protein With HitProtein</CtaButton>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NutritionInformation",
            name: `${food.name} (${food.prepDescription})`,
            servingSize: food.unit === "ml" ? "100 ml" : "100 g",
            proteinContent: `${food.proteinPer100g} g`,
            ...(food.caloriesPer100g !== null && { calories: `${food.caloriesPer100g} calories` }),
          }),
        }}
      />
    </>
  );
}
