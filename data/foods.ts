// SINGLE SOURCE OF TRUTH for the /protein-foods section.
//
// Rules (see README "Content workflow"):
// - Every nutrition figure must come from FSANZ AUSNUT/NUTTAB (or the
//   Australian Food Composition Database), or from a brand's Australian
//   nutrition panel for brand items. Record it in `source`.
// - Every figure added or changed is `verified: false` until MJ has checked it
//   against the source. Flip to `true` only after checking.
// - If a figure isn't available, leave it `null` with a TODO. Never estimate.
// - A food is only published (page, hub row, sitemap) once `proteinPer100g`
//   is filled in — see `isPublished`. Unfilled foods are drafts.
// - No health or weight-loss claims beyond plain nutrition facts.

import type { FAQItem } from "@/lib/content-types";

export const CATEGORIES = [
  "Meat",
  "Seafood",
  "Dairy & Eggs",
  "Plant-Based",
  "Grains & Cereals",
  "Nuts & Seeds",
  "Snacks",
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface FoodSource {
  // e.g. "AUSNUT 2011–13", "NUTTAB 2010", "AFCD Release 2", "Brand panel".
  // "TODO" means no source has been recorded yet.
  dataset: string;
  foodName: string | null; // the dataset's food name, or the brand product name
  foodId: string | null; // the dataset's food ID / key, where it has one
  note?: string;
}

export interface Serve {
  label: string;
  grams: number; // grams, or ml for foods with unit "ml"
}

export interface BrandRow {
  brand: string;
  product: string;
  proteinPer100g: number | null;
  caloriesPer100g: number | null;
  source: FoodSource; // must be the brand's Australian nutrition panel
  verified: boolean;
}

export interface FoodEntry {
  slug: string;
  name: string;
  category: Category;
  unit?: "g" | "ml"; // default "g"; milks are per 100ml
  // The exact form the figures refer to, e.g. "cooked, skinless". This is
  // also what to look up in AUSNUT.
  prepDescription: string;
  proteinPer100g: number | null;
  caloriesPer100g: number | null; // kcal
  commonServes: Serve[];
  source: FoodSource;
  verified: boolean;
  todo?: string[];
  faqs: FAQItem[];
  // Slugs in order of preference. Pages link to the first 3–4 that are
  // published, so list the original related foods after newer drafts.
  related: string[];
  relatedMeal?: { name: string; href: string };
  // Optional page copy. Pages without it get a data-driven intro.
  title?: string;
  metaDescription?: string;
  intro?: string[];
  whyVaries?: string[];
  usageTips?: string[];
  watchOut?: { heading: string; body: string[] };
  brands?: BrandRow[];
}

const TODO_SOURCE: FoodSource = { dataset: "TODO", foodName: null, foodId: null };

// Figures carried over unchanged from the pre-existing food pages. No AUSNUT
// reference was recorded when they were first published, so they're unverified.
const CARRIED_OVER: FoodSource = {
  dataset: "TODO",
  foodName: null,
  foodId: null,
  note: "Existing site figure carried over unchanged; record the AUSNUT/NUTTAB food name and ID when checking.",
};

const RAW_FOODS: FoodEntry[] = [
  // ───────────────────────────── Meat ─────────────────────────────
  {
    slug: "chicken-breast",
    name: "Chicken Breast",
    category: "Meat",
    prepDescription: "grilled or baked, skinless, no added fat",
    proteinPer100g: 31,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "250g", grams: 250 },
    ],
    source: CARRIED_OVER,
    verified: false,
    todo: ["Add caloriesPer100g from AUSNUT (cooked, skinless chicken breast)."],
    title: "Protein in Chicken Breast — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in chicken breast? 31g per 100g cooked, skinless. See protein by serving size and how cooking method changes the number.",
    intro: [
      "Chicken breast is one of the most efficient protein sources available — high in protein, low in fat, and neutral enough to fit almost any meal. A standard 150–200g cooked breast (roughly what you'd get from one chicken breast fillet) covers a substantial share of most people's daily protein target in a single meal.",
    ],
    whyVaries: [
      "The 31g/100g figure above is for cooked, skinless chicken breast. Raw chicken breast measures lower — closer to 22–23g per 100g — because cooking drives off water weight, concentrating the protein into less mass. If you're weighing chicken raw before cooking, use the raw figure; if you're weighing it cooked on your plate, use the cooked one. Mixing the two up is the most common reason people's tracked numbers don't match what they expected.",
      "Cooking method makes a smaller difference than raw-vs-cooked — grilled, baked and pan-fried (without added fat) all land in a similar range. Skin-on chicken breast has meaningfully more fat and slightly less protein per 100g, since skin adds weight without adding protein.",
    ],
    usageTips: [
      "Grill or bake in bulk at the start of the week and portion out for quick, ready-to-eat protein",
      "Slice into strips for stir-fries, wraps or salads",
      "Poach and shred for meal-prepped bowls or sandwiches",
    ],
    related: ["beef-mince", "eggs", "tuna", "turkey"],
    relatedMeal: { name: "40g Protein Meals", href: "/protein-meals/40g-protein" },
    faqs: [
      {
        q: "How much protein is in 100g of chicken breast?",
        a: "Around 31g for cooked, skinless chicken breast. Raw chicken breast is lower — around 22–23g per 100g — since cooking removes water and concentrates the protein.",
      },
      {
        q: "Does chicken skin reduce protein content?",
        a: "Skin adds fat and calories without adding meaningful protein, so skin-on chicken breast has a slightly lower protein percentage per 100g than skinless, even though the total protein in the piece of meat itself is similar.",
      },
    ],
  },
  {
    slug: "steak",
    name: "Steak",
    category: "Meat",
    prepDescription: "lean beef steak, grilled, trimmed of visible fat",
    proteinPer100g: 31,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "250g", grams: 250 },
    ],
    source: CARRIED_OVER,
    verified: false,
    todo: ["Add caloriesPer100g from AUSNUT (lean beef steak, grilled)."],
    title: "Protein in Steak — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in steak? Around 31g per 100g for lean beef steak, grilled. See protein by serving size and how cut affects the number.",
    intro: [
      "Steak is a dense, complete protein source — a typical 200–250g serving (a reasonably sized dinner steak) covers a large share of most people's daily protein target in one meal, along with iron, zinc and B12.",
    ],
    whyVaries: [
      "Protein content varies more by leanness than by cut name. A trimmed, lean cut (like eye fillet, rump or lean scotch fillet) will sit close to the 31g/100g figure above, while a fattier, heavily marbled cut has more calories from fat and slightly less protein per 100g, simply because fat is taking up some of that 100g instead of lean meat.",
      "Cooking method and doneness change moisture content, which changes the protein-per-100g figure slightly — a well-done steak has lost more water than a rare one, concentrating the protein a little further. The difference is small enough that it's not usually worth adjusting for day-to-day.",
    ],
    usageTips: [
      "Pair with a carb source and vegetables for a balanced, high-protein dinner",
      "Slice leftover steak cold into salads or wraps the next day",
      "Choose leaner cuts (rump, eye fillet) if you're also watching total calories",
    ],
    related: ["beef-mince", "kangaroo", "lamb", "chicken-breast", "salmon"],
    relatedMeal: { name: "50g Protein Meals", href: "/protein-meals/50g-protein" },
    faqs: [
      {
        q: "How much protein is in a 200g steak?",
        a: "Around 62g for a lean cut, grilled — roughly 31g per 100g scaled up. A fattier cut will come in somewhat lower.",
      },
      {
        q: "Does the cut of steak change the protein content much?",
        a: "Leanness matters more than the specific cut name. Leaner cuts like eye fillet or rump have slightly more protein per 100g than heavily marbled cuts, since fat displaces some of the lean meat.",
      },
    ],
  },
  {
    slug: "beef-mince",
    name: "Beef Mince",
    category: "Meat",
    prepDescription: "lean beef mince, cooked, drained of fat",
    proteinPer100g: 26,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "500g", grams: 500 },
    ],
    source: CARRIED_OVER,
    verified: false,
    todo: ["Add caloriesPer100g from AUSNUT (lean beef mince, cooked, drained)."],
    title: "Protein in Beef Mince — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in beef mince? Around 26g per 100g for lean mince, cooked. See protein by serving size and how fat content changes the number.",
    intro: [
      "Beef mince is one of the most versatile protein sources — cheap, quick to cook, and adaptable to almost any cuisine, from bolognese to tacos to a simple stir-fry.",
    ],
    whyVaries: [
      "Fat content is the biggest variable with mince. Standard mince (around 15–20% fat) has noticeably less protein per 100g than lean or extra-lean mince (around 5–10% fat), since fat displaces lean meat in the same weight. If protein-per-gram matters to you, lean or extra-lean mince is worth the small price difference.",
      "Draining cooked mince of rendered fat also changes the protein-per-100g figure slightly, since some of the weight (fat) has been removed. If you weigh mince before cooking rather than after, expect a slightly different number.",
    ],
    usageTips: [
      "Cook a large batch and portion into meals for the week",
      "Bulk out with lentils or extra vegetables to stretch a pack further without losing much protein density",
      "Choose lean or extra-lean mince if you're targeting a higher protein-to-calorie ratio",
    ],
    related: ["steak", "chicken-breast", "lentils", "tofu"],
    relatedMeal: { name: "40g Protein Meals", href: "/protein-meals/40g-protein" },
    faqs: [
      {
        q: "How much protein is in 200g of beef mince?",
        a: "Around 52g for lean mince, cooked and drained — roughly 26g per 100g scaled up. Standard (higher-fat) mince will be somewhat lower.",
      },
      {
        q: "Is lean mince significantly higher in protein than regular mince?",
        a: "Yes, noticeably — the extra fat in standard mince takes up space that would otherwise be lean, protein-containing meat, so lean and extra-lean mince come out ahead per 100g.",
      },
    ],
  },
  {
    slug: "kangaroo",
    name: "Kangaroo",
    category: "Meat",
    prepDescription: "kangaroo fillet or steak, cooked",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT/NUTTAB (kangaroo, loin fillet or rump, cooked).", "Check common Australian pack sizes for kangaroo fillets."],
    related: ["steak", "lamb", "beef-mince"],
    faqs: [],
  },
  {
    slug: "lamb",
    name: "Lamb",
    category: "Meat",
    prepDescription: "lean lamb, cooked, fat trimmed",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Pick one lean cut (e.g. lamb leg or loin, lean, cooked) and look up protein and calories in AUSNUT."],
    related: ["steak", "kangaroo", "pork"],
    faqs: [],
  },
  {
    slug: "pork",
    name: "Pork",
    category: "Meat",
    prepDescription: "lean pork loin or fillet, cooked, fat trimmed",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (pork loin or fillet, lean, cooked)."],
    related: ["lamb", "chicken-breast", "ham"],
    faqs: [],
  },
  {
    slug: "turkey",
    name: "Turkey Breast",
    category: "Meat",
    prepDescription: "turkey breast, roasted, skinless",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (turkey breast, roasted, no skin)."],
    related: ["chicken-breast", "chicken-thigh", "ham"],
    faqs: [],
  },
  {
    slug: "chicken-thigh",
    name: "Chicken Thigh",
    category: "Meat",
    prepDescription: "skinless chicken thigh fillet, cooked",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (chicken thigh, skinless, cooked)."],
    related: ["chicken-breast", "turkey", "pork"],
    faqs: [],
  },
  {
    slug: "ham",
    name: "Ham",
    category: "Meat",
    prepDescription: "leg ham, sliced",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "50g", grams: 50 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (ham, leg, sliced).", "Check typical slice weight and deli pack sizes."],
    related: ["turkey", "pork", "chicken-breast"],
    faqs: [],
  },

  // ───────────────────────────── Seafood ─────────────────────────────
  {
    slug: "tuna",
    name: "Tuna",
    category: "Seafood",
    prepDescription: "canned in springwater or brine, drained",
    proteinPer100g: 25,
    caloriesPer100g: null,
    commonServes: [
      { label: "Small can (95g)", grams: 95 },
      { label: "100g", grams: 100 },
      { label: "Large can (185g)", grams: 185 },
      { label: "200g", grams: 200 },
    ],
    source: CARRIED_OVER,
    verified: false,
    todo: [
      "Add caloriesPer100g from AUSNUT (tuna, canned in water/brine, drained).",
      "Check the 95g and 185g can serves: the page treats them as drained weights, but can labels usually state the undrained weight.",
    ],
    title: "Protein in Tuna — Per 100g and Per Can",
    metaDescription:
      "How much protein is in tuna? Around 25g per 100g for canned tuna in springwater, drained. See protein by can size.",
    intro: [
      "Canned tuna is about as convenient as protein gets — no cooking, long shelf life, and a genuinely high protein-to-calorie ratio. A standard small can (around 95g drained) is an easy way to add 20g-plus of protein to a meal in seconds.",
    ],
    whyVaries: [
      "Tuna canned in springwater or brine has a higher protein percentage than tuna canned in oil, simply because oil adds calories and weight without adding protein. If you're comparing cans, check whether it's packed in water or oil before comparing protein-per-100g figures directly.",
      "Drained weight matters — the protein figures above are for tuna after draining, since that's what you actually eat. The weight printed on the can is usually the undrained weight, which will overstate the amount of tuna (and protein) you're actually getting.",
    ],
    usageTips: [
      "Keep a few cans on hand for a fast, no-cook protein top-up",
      "Mix with Greek yoghurt instead of mayonnaise for a higher-protein tuna salad",
      "Add to a rice or pasta salad to boost the protein of an otherwise carb-heavy meal",
    ],
    related: ["salmon", "canned-salmon", "prawns", "chicken-breast", "eggs"],
    relatedMeal: { name: "30g Protein Meals", href: "/protein-meals/30g-protein" },
    faqs: [
      {
        q: "How much protein is in a can of tuna?",
        a: "Around 23–24g for a standard small can (95g drained) in springwater or brine. Larger 185g cans provide roughly 46g drained.",
      },
      {
        q: "Does tuna in oil have less protein than tuna in water?",
        a: "Per 100g, yes slightly — the oil adds weight and calories without adding protein, which lowers the protein percentage compared to tuna packed in water or brine.",
      },
    ],
  },
  {
    slug: "salmon",
    name: "Salmon",
    category: "Seafood",
    prepDescription: "cooked fillet, skin off",
    proteinPer100g: 23,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "250g", grams: 250 },
    ],
    source: CARRIED_OVER,
    verified: false,
    todo: ["Add caloriesPer100g from AUSNUT (Atlantic salmon, fillet, cooked)."],
    title: "Protein in Salmon — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in salmon? Around 23g per 100g for cooked salmon fillet. See protein by serving size.",
    intro: [
      "Salmon combines a strong protein content with omega-3 fats that most other protein sources don't offer — a typical 150–200g fillet is both a solid protein contribution and one of the better fat sources in a high-protein diet.",
    ],
    whyVaries: [
      "Farmed and wild salmon have broadly similar protein content — the bigger difference between them is fat content and type, not protein. Farmed salmon tends to be higher in total fat, which slightly lowers its protein percentage per 100g compared to leaner wild salmon.",
      "As with other meat and fish, cooked salmon has a higher protein-per-100g figure than raw, since cooking removes water weight and concentrates the protein into a smaller final portion.",
    ],
    usageTips: [
      "Bake or grill in bulk and keep in the fridge for quick protein additions to salads or bowls",
      "Pair with vegetables and a small carb portion for a balanced dinner",
      "Use canned salmon as a cheaper, no-cook alternative with similar protein content",
    ],
    related: ["tuna", "barramundi", "canned-salmon", "prawns"],
    relatedMeal: { name: "50g Protein Meals", href: "/protein-meals/50g-protein" },
    faqs: [
      {
        q: "How much protein is in a 150g salmon fillet?",
        a: "Around 35g, cooked — roughly 23g per 100g scaled up to a typical fillet size.",
      },
      {
        q: "Is farmed salmon lower in protein than wild salmon?",
        a: "Only slightly, if at all — the main difference is fat content, not protein. Farmed salmon tends to have more fat, which can marginally lower the protein percentage per 100g.",
      },
    ],
  },
  {
    slug: "prawns",
    name: "Prawns",
    category: "Seafood",
    prepDescription: "cooked, peeled",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (prawn, king or school, cooked, peeled)."],
    related: ["barramundi", "tuna", "salmon"],
    faqs: [],
  },
  {
    slug: "barramundi",
    name: "Barramundi",
    category: "Seafood",
    prepDescription: "fillet, cooked",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT/NUTTAB (barramundi, fillet, cooked)."],
    related: ["salmon", "prawns", "tuna"],
    faqs: [],
  },
  {
    slug: "canned-salmon",
    name: "Canned Salmon",
    category: "Seafood",
    prepDescription: "pink or red salmon, canned in water or brine, drained",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (salmon, pink, canned in brine, drained).", "Check common Australian can sizes and their drained weights."],
    related: ["salmon", "tuna", "sardines"],
    faqs: [],
  },
  {
    slug: "sardines",
    name: "Sardines",
    category: "Seafood",
    prepDescription: "canned in water or brine, drained",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (sardine, canned in water/brine, drained).", "Check common Australian can sizes and their drained weights."],
    related: ["canned-salmon", "tuna", "salmon"],
    faqs: [],
  },

  // ─────────────────────────── Dairy & Eggs ───────────────────────────
  {
    slug: "eggs",
    name: "Eggs",
    category: "Dairy & Eggs",
    prepDescription: "whole egg, boiled or poached, based on a 50g large egg",
    proteinPer100g: 12.5,
    caloriesPer100g: null,
    commonServes: [
      { label: "1 egg", grams: 50 },
      { label: "2 eggs", grams: 100 },
      { label: "3 eggs", grams: 150 },
      { label: "4 eggs", grams: 200 },
    ],
    source: CARRIED_OVER,
    verified: false,
    todo: ["Add caloriesPer100g from AUSNUT (egg, chicken, whole, boiled)."],
    title: "Protein in Eggs — Per Egg and Per 100g",
    metaDescription:
      "How much protein is in eggs? About 6g per large egg (~12.5g per 100g). See protein for 1, 2, 3 and 4 eggs.",
    intro: [
      "Eggs are one of the most complete and convenient protein sources — cheap, quick to prepare, and containing every essential amino acid your body needs. A large Australian egg weighs around 50–60g and provides roughly 6–7g of protein, making a two- or three-egg meal a solid protein contribution without much effort.",
    ],
    whyVaries: [
      "Egg size varies — a \"large\" egg in Australia is typically 50–60g, but jumbo eggs can weigh 68g or more, and small eggs less than 50g. If your carton specifies a weight range, use that rather than assuming every egg is exactly 50g.",
      "Almost all of an egg's protein is in the white, but the yolk still contributes a meaningful share alongside most of the vitamins and fat. Egg whites alone are higher in protein per 100g than whole eggs (since they're mostly water and protein, with no fat), which is why some people use extra egg whites to boost a meal's protein without adding much fat.",
    ],
    usageTips: [
      "Boiled eggs make an easy grab-and-go protein source with no prep at meal time",
      "Add an extra egg white or two to an omelette to boost protein without much extra fat",
      "Combine with Greek yoghurt or cottage cheese at breakfast to hit a higher target without a large meal",
    ],
    related: ["egg-whites", "greek-yoghurt", "cottage-cheese", "chicken-breast"],
    relatedMeal: { name: "30g Protein Meals", href: "/protein-meals/30g-protein" },
    faqs: [
      { q: "How much protein is in 2 eggs?", a: "Around 12–13g, based on two 50g large eggs — roughly 6g per egg." },
      { q: "How much protein is in 3 eggs?", a: "Around 18–19g, based on three 50g large eggs." },
      {
        q: "Is most of an egg's protein in the yolk or the white?",
        a: "The white contains more protein by weight than the yolk, but the yolk still contributes a meaningful amount alongside most of the egg's fat and micronutrients — a whole egg gives you both.",
      },
    ],
  },
  {
    slug: "greek-yoghurt",
    name: "Greek Yoghurt",
    category: "Dairy & Eggs",
    prepDescription: "plain, natural, unsweetened",
    // TODO(MJ): confirm this figure — and which product type it describes.
    // Strained Greek yoghurt and unstrained "Greek-style" yoghurt differ, so
    // check whether 10g/100g matches the AUSNUT entry you pick, and record it.
    proteinPer100g: 10,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "300g", grams: 300 },
    ],
    source: CARRIED_OVER,
    verified: false,
    todo: [
      "Confirm proteinPer100g (currently the existing 10g) and say whether it's for strained Greek or Greek-style yoghurt.",
      "Add caloriesPer100g from the same AUSNUT entry.",
      "Add real Australian tub sizes (single-serve and large tubs) to commonServes once checked.",
      "Optionally add brands (strained vs Greek-style) from Australian nutrition panels to show the difference.",
    ],
    title: "Protein in Greek Yoghurt — Per 100g and Per Serving",
    metaDescription:
      "How much protein is in Greek yoghurt? About 10g per 100g for plain, natural Greek yoghurt. See protein by serving size.",
    intro: [
      "Greek yoghurt is strained more than regular yoghurt, which removes much of the liquid whey and concentrates the protein — that's why it has roughly double the protein of standard yoghurt at a similar calorie count. A 200g tub of plain Greek yoghurt is a convenient way to add a meaningful amount of protein to breakfast or a snack.",
    ],
    whyVaries: [
      "The 10g/100g figure is for plain, unsweetened Greek yoghurt. Flavoured varieties often have less protein per 100g because fruit, sugar or flavouring syrup displaces some of the yoghurt — check the label rather than assuming a flavoured tub matches plain.",
      "Full-fat, low-fat and non-fat Greek yoghurt all have similar protein content per 100g, since removing fat doesn't remove protein — the main difference between them is calories, not protein.",
    ],
    watchOut: {
      heading: "Greek vs Greek-style: check the label",
      body: [
        "In Australia, a lot of yoghurt sold as \"Greek-style\" isn't strained. Traditional Greek yoghurt is strained to remove liquid whey, which makes it thicker and concentrates the protein. Greek-style yoghurt is often made thick in other ways, such as with added milk solids or thickeners, so its protein can sit much closer to regular yoghurt.",
        "Both can be good choices, but they aren't interchangeable for protein. Check the nutrition panel for protein per 100g rather than going by the name on the tub.",
      ],
    },
    usageTips: [
      "Use as a base for a protein-boosted smoothie",
      "Add to overnight oats to increase protein without extra bulk",
      "Swap in for sour cream or mayonnaise in savoury dishes for a protein upgrade",
    ],
    related: ["cottage-cheese", "natural-yoghurt", "eggs", "milk"],
    relatedMeal: { name: "30g Protein Meals", href: "/protein-meals/30g-protein" },
    brands: [],
    faqs: [
      {
        q: "Is Greek yoghurt higher in protein than regular yoghurt?",
        a: "Yes — the straining process that makes Greek yoghurt thicker also concentrates the protein, giving it roughly double the protein of regular yoghurt for a similar serving size.",
      },
      {
        q: "Does low-fat Greek yoghurt have less protein?",
        a: "No — protein content stays similar across full-fat, low-fat and non-fat versions. The fat content mainly affects calories, not protein.",
      },
      {
        q: "What's the difference between Greek and Greek-style yoghurt?",
        a: "Greek yoghurt is strained to remove liquid whey, which concentrates the protein. Greek-style yoghurt is often thickened in other ways and isn't necessarily strained, so it can have less protein. Check the nutrition panel rather than the name.",
      },
    ],
  },
  {
    slug: "cottage-cheese",
    name: "Cottage Cheese",
    category: "Dairy & Eggs",
    prepDescription: "plain, standard fat content",
    proteinPer100g: 11,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "250g", grams: 250 },
    ],
    source: CARRIED_OVER,
    verified: false,
    todo: ["Add caloriesPer100g from AUSNUT (cottage cheese, plain).", "Check whether 250g is a real Australian tub size."],
    title: "Protein in Cottage Cheese — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in cottage cheese? Around 11g per 100g. See protein by serving size and why it's a useful high-protein, low-calorie food.",
    intro: [
      "Cottage cheese is one of the better protein-to-calorie ratios in dairy — a decent serving delivers a substantial protein hit for relatively few calories, which is part of why it's a common choice for people tracking protein closely.",
    ],
    whyVaries: [
      "Protein content stays fairly consistent between full-fat, reduced-fat and low-fat cottage cheese — as with Greek yoghurt, removing fat mostly affects calories rather than protein. The bigger variable is brand: curd size, added cream, and moisture content differ enough between brands that checking the label is worth it if precision matters to you.",
    ],
    usageTips: [
      "Eat straight with fruit for a quick high-protein snack",
      "Blend into smoothies for a thicker texture and a protein boost with less added sugar than protein powder",
      "Use as a base for a high-protein dip mixed with herbs",
    ],
    related: ["greek-yoghurt", "ricotta", "eggs", "milk"],
    relatedMeal: { name: "30g Protein Meals", href: "/protein-meals/30g-protein" },
    faqs: [
      {
        q: "How much protein is in a 250g tub of cottage cheese?",
        a: "Around 27–28g, based on a standard 11g-per-100g figure — a substantial amount for a relatively low-calorie food.",
      },
      {
        q: "Is low-fat cottage cheese lower in protein?",
        a: "Not meaningfully — protein content stays similar across full-fat and low-fat versions. The fat content mainly changes the calorie count.",
      },
    ],
  },
  {
    slug: "milk",
    name: "Milk",
    category: "Dairy & Eggs",
    unit: "ml",
    prepDescription: "regular cow's milk, per 100ml",
    proteinPer100g: 3.4,
    caloriesPer100g: null,
    commonServes: [
      { label: "100ml", grams: 100 },
      { label: "250ml (1 cup)", grams: 250 },
      { label: "500ml", grams: 500 },
      { label: "1 litre", grams: 1000 },
    ],
    source: CARRIED_OVER,
    verified: false,
    todo: ["Add caloriesPer100g (per 100ml) from AUSNUT (milk, cow, fluid, regular fat)."],
    title: "Protein in Milk — Per 100ml, Per Glass and Per Litre",
    metaDescription:
      "How much protein is in milk? Around 3.4g per 100ml for regular cow's milk. See protein by glass, cup and litre.",
    intro: [
      "Milk isn't the highest-protein food gram-for-gram, but it's easy to drink in volume and adds up quickly across a day — a couple of glasses with meals or in coffee can contribute a meaningful amount without any real effort.",
    ],
    whyVaries: [
      "Full-cream, reduced-fat and skim milk all have very similar protein content per 100ml — removing fat doesn't remove protein, so the main difference between them is calories, not protein.",
      "Plant-based milk alternatives (oat, almond, rice) generally have much lower protein than dairy milk — often a third or less. Soy milk is the main exception, typically landing close to dairy milk's protein content. Check the label if you're substituting, since \"milk\" alternatives vary widely.",
    ],
    usageTips: [
      "Use milk instead of water in oats or protein shakes for an easy protein boost",
      "A glass with meals adds protein without needing to prepare anything",
      "If using a plant-based alternative, choose soy milk if protein content matters to you",
    ],
    related: ["soy-milk", "greek-yoghurt", "cottage-cheese", "eggs"],
    faqs: [
      { q: "How much protein is in a glass of milk?", a: "Around 8–9g for a 250ml glass of regular cow's milk." },
      {
        q: "Does skim milk have less protein than full-cream milk?",
        a: "No — protein content is very similar across skim, reduced-fat and full-cream milk. The fat content is what changes, not the protein.",
      },
      {
        q: "Is plant-based milk a good protein source?",
        a: "Most plant-based milks (oat, almond, rice) are much lower in protein than dairy milk. Soy milk is the main exception, with protein content close to regular milk.",
      },
    ],
  },
  {
    slug: "egg-whites",
    name: "Egg Whites",
    category: "Dairy & Eggs",
    prepDescription: "egg white, cooked",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (egg, white, cooked).", "Check the weight of one large egg white for a per-white serve."],
    related: ["eggs", "cottage-cheese", "greek-yoghurt"],
    faqs: [],
  },
  {
    slug: "cheddar-cheese",
    name: "Cheddar Cheese",
    category: "Dairy & Eggs",
    prepDescription: "cheddar, regular fat",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "20g", grams: 20 },
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (cheese, cheddar, regular fat).", "Check typical slice weight for a per-slice serve."],
    related: ["parmesan", "mozzarella", "cottage-cheese"],
    faqs: [],
  },
  {
    slug: "parmesan",
    name: "Parmesan",
    category: "Dairy & Eggs",
    prepDescription: "parmesan, grated or block",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "10g", grams: 10 },
      { label: "20g", grams: 20 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (cheese, parmesan)."],
    related: ["cheddar-cheese", "mozzarella", "ricotta"],
    faqs: [],
  },
  {
    slug: "mozzarella",
    name: "Mozzarella",
    category: "Dairy & Eggs",
    prepDescription: "mozzarella, regular fat",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (cheese, mozzarella)."],
    related: ["cheddar-cheese", "parmesan", "ricotta"],
    faqs: [],
  },
  {
    slug: "ricotta",
    name: "Ricotta",
    category: "Dairy & Eggs",
    prepDescription: "ricotta, regular fat",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "50g", grams: 50 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (cheese, ricotta)."],
    related: ["cottage-cheese", "greek-yoghurt", "mozzarella"],
    faqs: [],
  },
  {
    slug: "natural-yoghurt",
    name: "Natural Yoghurt",
    category: "Dairy & Eggs",
    prepDescription: "plain, natural, unstrained",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (yoghurt, natural/plain, regular fat)."],
    related: ["greek-yoghurt", "milk", "cottage-cheese"],
    faqs: [],
  },

  // ─────────────────────────── Plant-Based ───────────────────────────
  {
    slug: "tofu",
    name: "Tofu",
    category: "Plant-Based",
    prepDescription: "firm tofu, raw",
    proteinPer100g: 12,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "300g (block)", grams: 300 },
    ],
    source: { ...CARRIED_OVER, note: "Set to 12g/100g by MJ (site owner) in October 2026; record the AUSNUT/brand source when checking." },
    verified: false,
    todo: ["Add caloriesPer100g for firm tofu from the same source.", "Check whether 300g is a real Australian block size."],
    title: "Protein in Tofu — Per 100g and by Firmness",
    metaDescription:
      "How much protein is in tofu? Around 12g per 100g for firm tofu. See protein by serving size and how firmness changes the number.",
    intro: [
      "Tofu is one of the most useful plant-based protein sources — it contains all the essential amino acids, absorbs flavour well, and works across a huge range of cuisines. A 200–300g block covers a meaningful share of a meal's protein for vegetarians, vegans, or anyone cutting back on meat.",
    ],
    whyVaries: [
      "Firmness makes a real difference here — extra-firm and firm tofu have had more water pressed out during production, which concentrates the protein. Silken and soft tofu contain significantly more water for the same weight, and can have noticeably less protein per 100g as a result — sometimes close to half of firm tofu's figure. If protein density matters to you, choose firm or extra-firm.",
      "Some brands, particularly extra-firm or \"high-protein\" tofu products, press out even more water and come in higher again — worth checking the label if you're buying specifically for protein content.",
    ],
    usageTips: [
      "Press firm tofu before cooking to remove extra water and improve texture",
      "Marinate before pan-frying or baking, since tofu takes on flavour well",
      "Use in stir-fries, curries or scrambles as a direct meat substitute",
    ],
    related: ["tempeh", "edamame", "lentils", "eggs", "greek-yoghurt", "cottage-cheese"],
    relatedMeal: { name: "40g Protein Meals", href: "/protein-meals/40g-protein" },
    faqs: [
      {
        q: "How much protein is in 200g of tofu?",
        a: "Around 24g for firm tofu — roughly 12g per 100g scaled up. Extra-firm and high-protein brands can be higher again, so check the label.",
      },
      {
        q: "Does silken tofu have less protein than firm tofu?",
        a: "Yes, noticeably — silken and soft tofu contain more water for the same weight, which lowers the protein per 100g compared to firm or extra-firm tofu.",
      },
    ],
  },
  {
    slug: "tempeh",
    name: "Tempeh",
    category: "Plant-Based",
    prepDescription: "tempeh, plain",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT/NUTTAB (tempeh) or an Australian brand panel.", "Check common Australian block sizes."],
    related: ["tofu", "edamame", "lentils"],
    faqs: [],
  },
  {
    slug: "edamame",
    name: "Edamame",
    category: "Plant-Based",
    prepDescription: "shelled soybeans, cooked",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (soybean, green/edamame, shelled, cooked) or an Australian frozen-pack panel."],
    related: ["tofu", "tempeh", "chickpeas"],
    faqs: [],
  },
  {
    slug: "lentils",
    name: "Lentils",
    category: "Plant-Based",
    prepDescription: "cooked or canned, drained",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (lentil, cooked, drained) — pick brown/green or red and say which.", "Check common Australian can sizes and drained weights."],
    related: ["chickpeas", "kidney-beans", "tofu"],
    faqs: [],
  },
  {
    slug: "chickpeas",
    name: "Chickpeas",
    category: "Plant-Based",
    prepDescription: "canned, drained",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (chickpea, canned, drained).", "Check common Australian can sizes and drained weights."],
    related: ["lentils", "hummus", "kidney-beans"],
    faqs: [],
  },
  {
    slug: "kidney-beans",
    name: "Kidney Beans",
    category: "Plant-Based",
    prepDescription: "canned, drained",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (bean, red kidney, canned, drained)."],
    related: ["black-beans", "chickpeas", "lentils"],
    faqs: [],
  },
  {
    slug: "black-beans",
    name: "Black Beans",
    category: "Plant-Based",
    prepDescription: "canned, drained",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT/NUTTAB (bean, black, canned, drained) or an Australian brand panel."],
    related: ["kidney-beans", "chickpeas", "lentils"],
    faqs: [],
  },
  {
    slug: "baked-beans",
    name: "Baked Beans",
    category: "Plant-Based",
    prepDescription: "canned, in tomato sauce",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (bean, baked, canned in tomato sauce).", "Check common Australian can sizes."],
    related: ["kidney-beans", "chickpeas", "wholemeal-bread"],
    faqs: [],
  },
  {
    slug: "soy-milk",
    name: "Soy Milk",
    category: "Plant-Based",
    unit: "ml",
    prepDescription: "regular soy milk, per 100ml",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100ml", grams: 100 },
      { label: "250ml (1 cup)", grams: 250 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories per 100ml in AUSNUT (soy beverage, regular fat, calcium fortified)."],
    related: ["milk", "tofu", "edamame"],
    faqs: [],
  },

  // ───────────────────────── Grains & Cereals ─────────────────────────
  {
    slug: "oats",
    name: "Rolled Oats",
    category: "Grains & Cereals",
    prepDescription: "rolled oats, dry (uncooked)",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "40g", grams: 40 },
      { label: "50g", grams: 50 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (oats, rolled, uncooked)."],
    related: ["weet-bix", "quinoa", "milk"],
    faqs: [],
  },
  {
    slug: "weet-bix",
    name: "Weet-Bix",
    category: "Grains & Cereals",
    prepDescription: "Sanitarium Weet-Bix, dry",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: [
      "Brand item: take protein and calories per 100g from Sanitarium's Australian Weet-Bix nutrition panel (source dataset \"Brand panel\").",
      "Add a per-biscuit serve using the panel's stated serving size.",
    ],
    related: ["oats", "milk", "wholemeal-bread"],
    faqs: [],
  },
  {
    slug: "quinoa",
    name: "Quinoa",
    category: "Grains & Cereals",
    prepDescription: "cooked",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT/NUTTAB (quinoa, cooked)."],
    related: ["brown-rice", "oats", "pasta"],
    faqs: [],
  },
  {
    slug: "wholemeal-bread",
    name: "Wholemeal Bread",
    category: "Grains & Cereals",
    prepDescription: "wholemeal bread, sliced",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (bread, wholemeal).", "Check a typical slice weight for a per-slice serve."],
    related: ["oats", "weet-bix", "eggs"],
    faqs: [],
  },
  {
    slug: "brown-rice",
    name: "Brown Rice",
    category: "Grains & Cereals",
    prepDescription: "cooked",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (rice, brown, boiled)."],
    related: ["quinoa", "pasta", "lentils"],
    faqs: [],
  },
  {
    slug: "pasta",
    name: "Pasta",
    category: "Grains & Cereals",
    prepDescription: "wheat pasta, cooked",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "200g", grams: 200 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (pasta, white wheat, boiled)."],
    related: ["brown-rice", "quinoa", "parmesan"],
    faqs: [],
  },

  // ─────────────────────────── Nuts & Seeds ───────────────────────────
  {
    slug: "almonds",
    name: "Almonds",
    category: "Nuts & Seeds",
    prepDescription: "raw, with skin",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "30g (small handful)", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (almond, raw, with skin)."],
    related: ["peanuts", "cashews", "peanut-butter"],
    faqs: [],
  },
  {
    slug: "peanut-butter",
    name: "Peanut Butter",
    category: "Nuts & Seeds",
    prepDescription: "smooth or crunchy, no added sugar",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "20g (1 tbsp)", grams: 20 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (peanut butter, smooth/crunchy).", "Check the gram weight of 1 tablespoon used for the serve."],
    related: ["peanuts", "almonds", "oats"],
    faqs: [],
  },
  {
    slug: "peanuts",
    name: "Peanuts",
    category: "Nuts & Seeds",
    prepDescription: "dry roasted, unsalted",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (peanut, dry roasted, unsalted)."],
    related: ["peanut-butter", "almonds", "cashews"],
    faqs: [],
  },
  {
    slug: "cashews",
    name: "Cashews",
    category: "Nuts & Seeds",
    prepDescription: "raw",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (cashew, raw)."],
    related: ["almonds", "walnuts", "peanuts"],
    faqs: [],
  },
  {
    slug: "walnuts",
    name: "Walnuts",
    category: "Nuts & Seeds",
    prepDescription: "raw",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (walnut, raw)."],
    related: ["almonds", "cashews", "chia-seeds"],
    faqs: [],
  },
  {
    slug: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    category: "Nuts & Seeds",
    prepDescription: "pepitas, hulled",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "15g (1 tbsp)", grams: 15 },
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (pumpkin seed/pepita, hulled).", "Check the gram weight of 1 tablespoon used for the serve."],
    related: ["chia-seeds", "almonds", "peanuts"],
    faqs: [],
  },
  {
    slug: "chia-seeds",
    name: "Chia Seeds",
    category: "Nuts & Seeds",
    prepDescription: "dry",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "15g (1 tbsp)", grams: 15 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (chia seed, dried).", "Check the gram weight of 1 tablespoon used for the serve."],
    related: ["pumpkin-seeds", "oats", "almonds"],
    faqs: [],
  },

  // ───────────────────────────── Snacks ─────────────────────────────
  {
    slug: "beef-jerky",
    name: "Beef Jerky",
    category: "Snacks",
    prepDescription: "plain or original flavour",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "25g", grams: 25 },
      { label: "50g", grams: 50 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (beef jerky) or an Australian brand panel (source dataset \"Brand panel\").", "Check common Australian pack sizes."],
    related: ["steak", "almonds", "cheddar-cheese"],
    faqs: [],
  },
  {
    slug: "hummus",
    name: "Hummus",
    category: "Snacks",
    prepDescription: "plain hummus dip",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "30g (2 tbsp)", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (dip, hummus).", "Check the gram weight of 2 tablespoons used for the serve."],
    related: ["chickpeas", "wholemeal-bread", "lentils"],
    faqs: [],
  },
  {
    slug: "popcorn",
    name: "Popcorn",
    category: "Snacks",
    prepDescription: "air-popped, plain",
    proteinPer100g: null,
    caloriesPer100g: null,
    commonServes: [
      { label: "20g", grams: 20 },
      { label: "100g", grams: 100 },
    ],
    source: TODO_SOURCE,
    verified: false,
    todo: ["Look up protein and calories in AUSNUT (popcorn, air-popped, plain)."],
    related: ["peanuts", "almonds", "beef-jerky"],
    faqs: [],
  },
];

// ─────────────────────────── Derived helpers ───────────────────────────

const round1 = (n: number) => Math.round(n * 10) / 10;

export interface Food extends FoodEntry {
  proteinPer100kcal: number | null; // calculated, never entered by hand
}

export const FOODS: Food[] = RAW_FOODS.map((f) => ({
  ...f,
  proteinPer100kcal:
    f.proteinPer100g !== null && f.caloriesPer100g
      ? round1((f.proteinPer100g / f.caloriesPer100g) * 100)
      : null,
}));

// A food only gets a live page, hub row and sitemap entry once its protein
// figure is filled in. Everything else is a draft.
export function isPublished(f: Food): f is Food & { proteinPer100g: number } {
  return f.proteinPer100g !== null;
}

export const PUBLISHED_FOODS = FOODS.filter(isPublished);

export function getFood(slug: string): Food | undefined {
  return FOODS.find((f) => f.slug === slug);
}

export function categoryAnchor(category: Category): string {
  return category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-");
}

export function unitLabel(f: Food): string {
  return f.unit === "ml" ? "100ml" : "100g";
}

export function proteinForServe(f: Food & { proteinPer100g: number }, grams: number): number {
  return Math.round((f.proteinPer100g * grams) / 100);
}

// The serve shown as "typical" in tables: the first non-100 serve if there is
// one, otherwise the first serve.
export function typicalServe(f: Food): Serve {
  return f.commonServes.find((s) => s.grams !== 100) ?? f.commonServes[0];
}

// 3–4 published related foods: the entry's own `related` list first, then
// published foods from the same category, so links never point at drafts.
export function relatedFoods(f: Food, max = 4): Food[] {
  const picked: Food[] = [];
  const add = (c: Food | undefined) => {
    if (c && c.slug !== f.slug && isPublished(c) && !picked.some((p) => p.slug === c.slug)) picked.push(c);
  };
  f.related.forEach((s) => add(getFood(s)));
  PUBLISHED_FOODS.filter((c) => c.category === f.category).forEach(add);
  PUBLISHED_FOODS.forEach((c) => picked.length < 3 && add(c));
  return picked.slice(0, max);
}
