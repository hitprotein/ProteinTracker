import Image from "next/image";
import CtaButton from "@/components/CtaButton";

export interface MealIdea {
  name: string;
  // One-sentence summary, shown on the card and used as the Recipe
  // description. Avoid numbers other than protein — those need fact-checking.
  description: string;
  // Recipe schema category, e.g. "Breakfast", "Lunch", "Dinner".
  category: string;
  // Only where the dish clearly belongs to one (e.g. "Mexican") — leave unset
  // rather than guess.
  cuisine?: string;
  // Whole-meal figures: every listed ingredient, not just the main protein.
  // Estimates from standard per-100g values — check against AUSNUT.
  protein: number;
  calories: number;
  prepMinutes: number;
  // Leave unset for no-cook meals.
  cookMinutes?: number;
  serves: string;
  ingredients: string[];
  method: string;
  substitutions: string;
  // Path under /public, e.g. "/meals/tuna-cottage-cheese-salad.jpg". Google
  // treats a Recipe without an image as invalid, so a meal only gets Recipe
  // JSON-LD once it has one; until then the card renders without a photo.
  image?: { src: string; width: number; height: number };
}

const SITE_URL = "https://proteintracker.com.au";

const isoMinutes = (m: number) => `PT${m}M`;

// Serves, calories and times as separate chunks so a narrow card wraps
// between them rather than mid-chunk ("Cook 40 / min").
function metaChunks(meal: MealIdea): string[] {
  return [
    meal.serves,
    `~${meal.calories} kcal`,
    `Prep ${meal.prepMinutes} min`,
    meal.cookMinutes ? `Cook ${meal.cookMinutes} min` : "No cooking",
  ];
}

// Built from the meal's own fields so the keywords can't drift from the page.
// `base` is the page's keyword phrase: by default its target (30/40/50/60g),
// not the meal's exact figure — people search "40g protein dinner", not "39g".
function mealKeywords(meal: MealIdea, base: string): string {
  return [
    `${base} ${meal.category.toLowerCase()}`,
    `high protein ${meal.category.toLowerCase()}`,
    meal.name.toLowerCase(),
  ].join(", ");
}

interface MealsPageTemplateProps {
  h1: string;
  subtitle: string;
  intro: React.ReactNode;
  meals: MealIdea[];
  targetProtein: number;
  // Overrides the "<target>g protein" keyword phrase, for pages not built
  // around a gram target (e.g. "small high protein").
  keywordBase?: string;
}

export default function MealsPageTemplate({
  h1,
  subtitle,
  intro,
  meals,
  targetProtein,
  keywordBase = `${targetProtein}g protein`,
}: MealsPageTemplateProps) {
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">{h1}</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">{subtitle}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-3 text-pt-black/80">{intro}</div>

        <div className="mt-10 space-y-6">
          {meals.map((meal, i) => (
            <div
              key={meal.name}
              className="overflow-hidden rounded-card border border-pt-black/10 bg-pt-white p-6 shadow-sm"
            >
              {meal.image && (
                <Image
                  src={meal.image.src}
                  alt={meal.name}
                  width={meal.image.width}
                  height={meal.image.height}
                  sizes="(min-width: 768px) 720px, 100vw"
                  priority={i === 0}
                  className="-mx-6 -mt-6 mb-6 block h-auto w-[calc(100%+3rem)] max-w-none"
                />
              )}
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-heading text-xl font-bold">{meal.name}</h2>
                <span className="whitespace-nowrap rounded-full bg-pt-black px-3 py-1 text-sm font-bold text-pt-green">
                  ~{meal.protein}g protein
                </span>
              </div>
              <p className="mt-1 flex flex-wrap gap-x-2 text-sm text-pt-black/50">
                {metaChunks(meal).map((chunk, j) => (
                  <span key={chunk} className="whitespace-nowrap">
                    {j > 0 && <span aria-hidden="true">· </span>}
                    {chunk}
                  </span>
                ))}
              </p>
              <p className="mt-3 text-pt-black/80">{meal.description}</p>

              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold">Ingredients</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-pt-black/80">
                    {meal.ingredients.map((ing) => (
                      <li key={ing}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold">Method</p>
                  <p className="mt-2 text-sm text-pt-black/80">{meal.method}</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-pt-black/50">
                <strong>Substitutions:</strong> {meal.substitutions}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-card bg-pt-black p-8 text-center text-pt-white">
          <p className="font-heading text-xl font-bold">Need more high-protein meal ideas?</p>
          <p className="mt-2 text-sm text-pt-white/70">
            HitProtein's Protein Coach can suggest meals based on your
            protein goal and what you have left to eat.
          </p>
          <div className="mt-5 flex justify-center">
            <CtaButton href="https://hitprotein.com.au/download">
              Try HitProtein
            </CtaButton>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            meals.filter((meal) => meal.image).map((meal) => ({
              "@context": "https://schema.org",
              "@type": "Recipe",
              name: meal.name,
              description: meal.description,
              author: {
                "@type": "Organization",
                name: "ProteinTracker.com.au",
                url: SITE_URL,
              },
              recipeCategory: meal.category,
              ...(meal.cuisine && { recipeCuisine: meal.cuisine }),
              keywords: mealKeywords(meal, keywordBase),
              prepTime: isoMinutes(meal.prepMinutes),
              ...(meal.cookMinutes && { cookTime: isoMinutes(meal.cookMinutes) }),
              totalTime: isoMinutes(meal.prepMinutes + (meal.cookMinutes ?? 0)),
              image: [`${SITE_URL}${meal.image!.src}`],
              recipeYield: meal.serves,
              recipeIngredient: meal.ingredients,
              recipeInstructions: meal.method,
              nutrition: {
                "@type": "NutritionInformation",
                calories: `${meal.calories} calories`,
                proteinContent: `${meal.protein}g`,
              },
            }))
          ),
        }}
      />
    </>
  );
}
