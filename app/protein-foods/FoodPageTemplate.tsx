import Link from "next/link";
import TrackProteinCta, { HITPROTEIN_DOWNLOAD } from "@/components/TrackProteinCta";
import FaqSection from "@/components/FaqSection";
import { articlesFor } from "@/lib/hitprotein-blog";
import type { FAQItem } from "@/lib/content-types";
import {
  PUBLISHED_FOODS,
  categoryAnchor,
  isBrandValue,
  proteinText,
  relatedFoods,
  serveProteinText,
  stateLabel,
  typicalServe,
  unitLabel,
  type Food,
  type FoodState,
  type FoodValue,
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
      a: food.range
        ? `${proteinText(food)}g of protein per ${per} across the Australian brands we compared, so check the label of the one you buy.`
        : `About ${food.proteinPer100g}g of protein per ${per} ${stateLabel(food.state)} (${food.prepDescription}).`,
    });
  }
  const serve = typicalServe(food);
  if (serve && serve.grams !== 100 && !asked(serve.label.toLowerCase())) {
    // "150g of chicken breast", "1 slice (25g) of ham", but "1 egg (47g)" on its own.
    const serveName = serve.label.toLowerCase().includes(name.slice(0, 3)) ? serve.label : `${serve.label} of ${name}`;
    candidates.push({
      q: `How much protein is in ${serveName}?`,
      a: `About ${serveProteinText(food, serve.grams)}g of protein, based on ${proteinText(food)}g per ${per}.`,
    });
  }
  // One FAQ for the food's other form, e.g. raw when the page leads with cooked.
  const other = food.otherValues.find(
    (v) =>
      !isBrandValue(v) &&
      (v.state === "raw" || v.state === "cooked" || v.state === "dry") &&
      stateLabel(v.state) !== stateLabel(food.state) &&
      v.proteinPer100g !== null,
  );
  if (other && !asked(stateLabel(other.state))) {
    candidates.push({
      q: `How much protein is in ${formName(other.state, name)}?`,
      a: `About ${other.proteinPer100g}g of protein per ${per} (${other.source.foodName}), compared with ${food.proteinPer100g}g per ${per} ${stateLabel(food.state)}.`,
    });
  }
  if (food.range) {
    candidates.push({
      q: `How many calories are in ${name}?`,
      a: `${food.range.kcalMin}–${food.range.kcalMax} calories per ${per} across the Australian brands we compared.`,
    });
  } else if (food.caloriesPer100g !== null && food.proteinPer100kcal !== null) {
    candidates.push({
      q: `How many calories are in ${name}?`,
      a: `About ${food.caloriesPer100g} calories per ${per}, which works out to ${food.proteinPer100kcal}g of protein per 100 calories.`,
    });
  }
  const sameCategory = PUBLISHED_FOODS.filter((f) => f.category === food.category && f.unit === food.unit)
    .sort((a, b) => b.proteinPer100g - a.proteinPer100g);
  if (sameCategory.length >= 2 && !food.range) {
    const rank = sameCategory.findIndex((f) => f.slug === food.slug) + 1;
    candidates.push({
      q: `How does ${name} compare with other ${food.category.toLowerCase()} foods?`,
      a: `Of the ${sameCategory.length} ${food.category.toLowerCase()} foods on this site, ${name} ranks number ${rank} for protein per ${per}, comparing each food in the form its page shows. See the full table on our high protein foods page.`,
    });
  }
  faqs.push(...candidates);

  // Generic fallback, only if the page still has fewer than 4 FAQs.
  if (faqs.length < 4) {
    faqs.push({
      q: `Where do these ${name} protein figures come from?`,
      a: "Figures come from the Australian Food Composition Database (AFCD) published by Food Standards Australia New Zealand or, for branded products, the brand's Australian nutrition panel. Protein varies by brand, cut and preparation, so check the label of the product you buy.",
    });
  }
  return faqs;
}

// "raw chicken breast", "cooked lentils", "dry oats", "chickpeas as sold".
function formName(state: FoodState, name: string): string {
  return stateLabel(state) === "as sold" ? `${name} as sold` : `${stateLabel(state)} ${name}`;
}

// "Weighed cooked", "As sold", ... so every page says which form it shows.
function weighedLabel(state: FoodState): string {
  return stateLabel(state) === "as sold" ? "As sold" : `Weighed ${stateLabel(state)}`;
}

// "Cooked", or the entry's own label where the state alone isn't clear.
function rowLabel(food: Food, v: FoodValue): string {
  const label = (v.source.foodId && food.valueLabels?.[v.source.foodId]) || stateLabel(v.state);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

// Brand panel figures, one row per product, linked to where they were read.
function BrandTable({ values, primary, per }: { values: FoodValue[]; primary: FoodValue | null; per: string }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-card border border-pt-black/10 bg-pt-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-pt-offwhite">
          <tr>
            <th scope="col" className="px-2 py-2 font-semibold sm:px-3">Product</th>
            <th scope="col" className="px-2 py-2 font-semibold sm:px-3">Protein per {per}</th>
            <th scope="col" className="px-2 py-2 font-semibold sm:px-3">Calories per {per}</th>
          </tr>
        </thead>
        <tbody>
          {values.map((v) => (
            <tr key={v.source.url ?? v.source.foodName} className="border-t border-pt-black/10">
              <th scope="row" className="px-2 py-2 font-normal sm:px-3">
                {v.source.url ? (
                  <a href={v.source.url} className="font-semibold underline" rel="noopener" target="_blank">
                    {v.source.foodName}
                  </a>
                ) : (
                  <span className="font-semibold">{v.source.foodName}</span>
                )}
                {v === primary && <span className="text-pt-black/50"> (shown above)</span>}
              </th>
              <td className="px-2 py-2 sm:px-3">{v.proteinPer100g}g</td>
              <td className="px-2 py-2 sm:px-3">{v.caloriesPer100g ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Source({ value }: { value: FoodValue }) {
  const s = value.source;
  if (s.dataset === "TODO") return null;
  const text = [s.foodName, s.foodId].filter(Boolean).join(", ");
  return (
    <>
      {s.dataset}
      {text && " — "}
      {text && s.url ? (
        <a href={s.url} className="underline" rel="noopener" target="_blank">
          {text}
        </a>
      ) : (
        text
      )}
    </>
  );
}

export default function FoodPageTemplate({ food }: { food: PublishedFood }) {
  const per = unitLabel(food);
  const faqs = pageFaqs(food);
  const related = relatedFoods(food);
  const hasSource = food.source.dataset !== "TODO";
  const allValues: FoodValue[] = [food, ...food.otherValues];
  const formValues = allValues.filter((v) => !isBrandValue(v));
  const brandValues = allValues.filter(isBrandValue);
  const brandGroups = (food.brandGroups ?? [{ heading: "", states: brandValues.map((v) => v.state), names: undefined }])
    .map((g) => ({
      heading: g.heading,
      values: brandValues.filter(
        (v) =>
          g.states.includes(v.state) &&
          (!g.names || g.names.some((n) => v.source.foodName?.includes(n))),
      ),
    }))
    .filter((g) => g.values.length > 0);
  const intro = food.intro ?? [
    food.range
      ? `${food.name} has ${proteinText(food)}g of protein per ${per} across the Australian brands we compared below. The table above shows what that works out to for common serves.`
      : `${food.name} has about ${food.proteinPer100g}g of protein per ${per} ${stateLabel(food.state)} (${food.prepDescription}). The table above shows what that works out to for common serves.`,
  ];

  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">Protein in {food.name}</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            {proteinText(food)}g of protein per {per} ({food.prepDescription})
          </p>
          <p className="mt-3 inline-block rounded-full bg-pt-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pt-white/80">
            {weighedLabel(food.state)}
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
                  {serveProteinText(food, s.grams)}g
                </p>
              </div>
            ))}
          </div>
          {food.range && (
            <p className="mt-4 text-sm text-pt-black/70">
              {food.range.kcalMin}–{food.range.kcalMax} calories per {per}, depending on the brand
            </p>
          )}
          {!food.range && food.caloriesPer100g !== null && food.proteinPer100kcal !== null && (
            <p className="mt-4 text-sm text-pt-black/70">
              {food.caloriesPer100g} calories per {per} · {food.proteinPer100kcal}g protein per 100 calories
            </p>
          )}
          <p className="mt-4 text-xs text-pt-black/50">
            Figures are per {per} {stateLabel(food.state)} ({food.prepDescription}). Protein content varies by
            brand, cut and exact preparation — see the note below. Calories are worked out from the source&apos;s
            energy in kilojoules
            {food.range || isBrandValue(food)
              ? "."
              : ". AFCD uses different conversion factors from those required on food labels (Food Standards Code Standard 1.2.8), so they may differ slightly from the pack."}
          </p>
          {hasSource && !food.range && (
            <p className="mt-2 text-xs text-pt-black/50">
              Source: <Source value={food} />
            </p>
          )}
        </div>
        <p className="mt-4 text-sm">
          <a href={HITPROTEIN_DOWNLOAD} className="font-semibold text-pt-black underline">
            Log {food.name.toLowerCase()} in HitProtein →
          </a>
        </p>

        <div className="mt-10 space-y-3 text-pt-black/80">
          {intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {formValues.length > 1 && (
          <>
            <h2 className="mt-10 text-2xl font-bold">Other forms and varieties</h2>
            <p className="mt-2 text-pt-black/80">
              Use the figure that matches how you weigh your food. Cooking changes the water content, so raw and cooked
              figures differ.
            </p>
            <div className="mt-3 overflow-x-auto rounded-card border border-pt-black/10 bg-pt-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-pt-offwhite">
                  <tr>
                    <th scope="col" className="px-2 py-2 font-semibold sm:px-3">Form</th>
                    <th scope="col" className="px-2 py-2 font-semibold sm:px-3">Protein per {per}</th>
                    <th scope="col" className="px-2 py-2 font-semibold sm:px-3">Calories per {per}</th>
                  </tr>
                </thead>
                <tbody>
                  {formValues.map((v) => (
                    <tr key={v.source.foodId ?? v.state} className="border-t border-pt-black/10">
                      <th scope="row" className="px-2 py-2 font-normal sm:px-3">
                        <span className="font-semibold">{rowLabel(food, v)}</span>
                        {v === allValues[0] && <span className="text-pt-black/50"> (shown above)</span>}
                        <span className="block text-xs text-pt-black/50">
                          <Source value={v} />
                        </span>
                      </th>
                      <td className="px-2 py-2 sm:px-3">{v.proteinPer100g}g</td>
                      <td className="px-2 py-2 sm:px-3">{v.caloriesPer100g ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

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

        {brandGroups.length > 0 && (
          <>
            <h2 className="mt-10 text-2xl font-bold">Australian brands compared</h2>
            {brandGroups.map((g) => (
              <div key={g.heading || "brands"}>
                {g.heading && <h3 className="mt-6 text-lg font-bold">{g.heading}</h3>}
                <BrandTable values={g.values} primary={food.range ? null : allValues[0]} per={per} />
              </div>
            ))}
            <p className="mt-2 text-xs text-pt-black/50">
              Per {per} as sold, from each product&apos;s Australian nutrition panel as listed on Woolworths online.
              Recipes and labels change, so check the pack.
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

        <h2 className="mt-10 text-2xl font-bold">From the HitProtein blog</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-pt-black/80">
          {articlesFor(food.slug).map((a) => (
            <li key={a.href}>
              <a href={a.href} className="font-semibold text-pt-black underline" rel="noopener" target="_blank">
                {a.title}
              </a>
            </li>
          ))}
        </ul>

        <FaqSection faqs={faqs} />

        <TrackProteinCta />
      </article>

      {!food.range && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NutritionInformation",
              name: `${food.name} (${stateLabel(food.state)}, ${food.prepDescription})`,
              servingSize: food.unit === "ml" ? "100 ml" : "100 g",
              proteinContent: `${food.proteinPer100g} g`,
              ...(food.caloriesPer100g !== null && { calories: `${food.caloriesPer100g} calories` }),
            }),
          }}
        />
      )}
    </>
  );
}
