import type { Metadata } from "next";
import Link from "next/link";
import MealsPageTemplate from "../MealsPageTemplate";
import { GLP1_DISCLAIMER } from "@/lib/glp1-sources";

// Same compliance rules as the GLP-1 calculator and guide (see
// lib/glp1-sources.ts): never name a medicine, never describe what the
// medicines do — only "eating less than usual" — and keep the disclaimer.
export const metadata: Metadata = {
  title: { absolute: "Small High-Protein Meals for GLP-1: 4 Easy Recipes" },
  description:
    "Four small, high-protein meals with 20–30g of protein each, for when you're eating less than usual on a GLP-1-based medicine. Simple everyday ingredients.",
  alternates: { canonical: "/protein-meals/glp-1" },
};

const linkCls = "font-semibold text-pt-black underline";

export default function Glp1MealsPage() {
  return (
    <MealsPageTemplate
      h1="Small High-Protein Meals for GLP-1"
      targetProtein={25}
      keywordBase="small high protein"
      subtitle="Smaller portions that still pack 20–30g of protein — for when you're eating less than usual."
      intro={
        <>
          <p>
            When you&apos;re eating less than usual, every meal has to work
            harder. These four smaller meals each fit 20–30g of protein into a
            modest portion of around 200–320 calories, using everyday
            ingredients from our{" "}
            <Link href="/protein-foods" className={linkCls}>
              protein foods guide
            </Link>
            . Eat the protein part first, and spread meals and snacks across
            the day.
          </p>
          <p>
            If you&apos;re on a GLP-1-based medicine, our{" "}
            <Link href="/protein-calculator/glp-1" className={linkCls}>
              GLP-1 protein calculator
            </Link>{" "}
            shows the daily range published guidance suggests, and our{" "}
            <Link href="/protein-guides/protein-and-glp-1" className={linkCls}>
              guide to protein and GLP-1
            </Link>{" "}
            covers the rest.
          </p>
          <p className="text-sm text-pt-black/60">{GLP1_DISCLAIMER}</p>
        </>
      }
      meals={[
        {
          name: "Greek Yoghurt Berry Pot",
          image: { src: "/meals/greek-yoghurt-berry-pot.jpg", width: 1408, height: 768 },
          description:
            "A small no-cook breakfast of thick Greek yoghurt topped with berries and chopped almonds.",
          category: "Breakfast",
          protein: 22,
          calories: 235,
          prepMinutes: 5,
          serves: "Serves 1",
          ingredients: [
            "200g plain Greek yoghurt (reduced-fat)",
            "Small handful of berries",
            "10g almonds, chopped",
          ],
          method:
            "Spoon the yoghurt into a small bowl or glass and top with the berries and almonds.",
          substitutions:
            "Any nuts or seeds work in place of almonds; frozen berries work straight from the freezer.",
        },
        {
          name: "Tuna and White Bean Salad",
          image: { src: "/meals/tuna-white-bean-salad.jpg", width: 1408, height: 768 },
          description:
            "A light, no-cook lunch of tuna and cannellini beans tossed with crunchy salad and lemon.",
          category: "Lunch",
          protein: 22,
          calories: 190,
          prepMinutes: 10,
          serves: "Serves 1",
          ingredients: [
            "1 small can (95g) tuna in springwater, drained",
            "60g canned cannellini beans, rinsed",
            "Cucumber, cherry tomatoes and rocket",
            "1 tsp olive oil and a squeeze of lemon",
          ],
          method:
            "Toss the beans and salad with the olive oil and lemon, then top with the tuna.",
          substitutions:
            "Canned salmon works in place of tuna; chickpeas work in place of cannellini beans.",
        },
        {
          name: "Mini Chicken and Veg Stir-Fry",
          image: { src: "/meals/mini-chicken-veg-stir-fry.jpg", width: 1408, height: 768 },
          description:
            "A smaller stir-fry of chicken and vegetables over a half serve of rice.",
          category: "Dinner",
          protein: 29,
          calories: 320,
          prepMinutes: 10,
          cookMinutes: 10,
          serves: "Serves 1",
          ingredients: [
            "80g chicken breast (cooked weight), sliced",
            "½ cup cooked rice",
            "100g stir-fry vegetables",
            "2 tsp soy sauce",
            "1 tsp oil",
          ],
          method:
            "Stir-fry the chicken in oil until cooked through, add the vegetables for a few minutes, then toss with soy sauce and serve over the rice.",
          substitutions:
            "Firm tofu or prawns work in place of chicken; cauliflower rice makes it lighter again.",
        },
        {
          name: "Smoked Salmon and Cottage Cheese Crispbreads",
          image: { src: "/meals/smoked-salmon-cottage-cheese-crispbreads.jpg", width: 1408, height: 768 },
          description:
            "Rye crispbreads topped with cottage cheese, smoked salmon and cucumber — a protein-packed snack or light meal.",
          category: "Snack",
          protein: 23,
          calories: 245,
          prepMinutes: 5,
          serves: "Serves 1",
          ingredients: [
            "100g cottage cheese",
            "50g smoked salmon",
            "2 rye crispbreads",
            "Sliced cucumber and dill",
          ],
          method:
            "Spread the cottage cheese over the crispbreads and top with the smoked salmon, cucumber and dill.",
          substitutions:
            "Canned tuna works in place of smoked salmon; rice cakes work in place of crispbreads.",
        },
      ]}
    />
  );
}
