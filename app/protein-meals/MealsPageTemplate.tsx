import CtaButton from "@/components/CtaButton";

export interface MealIdea {
  name: string;
  protein: number;
  serves: string;
  ingredients: string[];
  method: string;
  substitutions: string;
}

interface MealsPageTemplateProps {
  h1: string;
  subtitle: string;
  intro: React.ReactNode;
  meals: MealIdea[];
}

export default function MealsPageTemplate({
  h1,
  subtitle,
  intro,
  meals,
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
          {meals.map((meal) => (
            <div
              key={meal.name}
              className="rounded-card border border-pt-black/10 bg-pt-white p-6 shadow-sm"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-heading text-xl font-bold">{meal.name}</h2>
                <span className="whitespace-nowrap rounded-full bg-pt-black px-3 py-1 text-sm font-bold text-pt-green">
                  ~{meal.protein}g protein
                </span>
              </div>
              <p className="mt-1 text-sm text-pt-black/50">{meal.serves}</p>

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
            meals.map((meal) => ({
              "@context": "https://schema.org",
              "@type": "Recipe",
              name: meal.name,
              recipeYield: meal.serves,
              recipeIngredient: meal.ingredients,
              recipeInstructions: meal.method,
              nutrition: {
                "@type": "NutritionInformation",
                proteinContent: `${meal.protein}g`,
              },
            }))
          ),
        }}
      />
    </>
  );
}
