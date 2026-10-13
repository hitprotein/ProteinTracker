// SINGLE SOURCE OF TRUTH for the /protein-foods section.
//
// Rules (see README "Content workflow"):
// - Every nutrition figure must come from FSANZ food composition data (AFCD,
//   AUSNUT/NUTTAB), or from a brand's Australian nutrition panel for brand
//   items. Record it in `source`.
// - Every figure added or changed is `verified: false` until MJ has checked it
//   against the source. Flip to `true` only after checking.
// - If a figure isn't available, leave it `null` with a TODO. Never estimate.
// - A food is only published (page, hub row, sitemap) once it has a protein
//   figure — see `isPublished`. Unfilled foods are drafts.
// - No health or weight-loss claims beyond plain nutrition facts.
//
// Where the figures live:
// - data/afcd-foods.json holds every AFCD figure exactly as captured from
//   FSANZ AFCD Release 3.0 (with its food key, name and link). Don't retype
//   those numbers here: an entry is matched to the JSON by slug and
//   `primaryState` picks which of its values the page leads with. The rest
//   show as "other forms".
// - Foods that aren't in AFCD (brand panels) put their figures in `manual`.
// - Page copy never types a number. Use tokens, filled from the data at
//   build time (an unknown token fails the build):
//     {p}              protein per 100g, primary value
//     {p:raw}          protein per 100g of this food's raw value (any state)
//     {p@slug}         protein per 100g of another food's primary value
//     {p@slug:raw}     ...of another food's raw value
//     {kcal} / {kcal:raw} / {kcal@slug}   calories per 100g, same rules
//     {g:150}          protein in 150g of this food (primary value), rounded

import type { FAQItem } from "@/lib/content-types";
import afcdData from "./afcd-foods.json";

export const CATEGORIES = [
  "Meat",
  "Seafood",
  "Dairy & Eggs",
  "Plant-Based",
  "Grains & Cereals",
  "Nuts & Seeds",
  "Snacks & Supplements",
] as const;
export type Category = (typeof CATEGORIES)[number];

// The form a figure refers to. "cooked-alt" is a second cooking method.
export type FoodState = "raw" | "cooked" | "cooked-alt" | "as-sold" | "dry";

export interface FoodSource {
  // e.g. "FSANZ AFCD Release 3.0", or "Brand panel" for brand items.
  // "TODO" means no source has been recorded yet.
  dataset: string;
  foodName: string | null; // the dataset's food name, or the brand product name
  foodId: string | null; // the dataset's food key / ID, where it has one
  url?: string;
  note?: string;
}

export interface FoodValue {
  state: FoodState;
  proteinPer100g: number | null;
  energyKjPer100g: number | null;
  caloriesPer100g: number | null; // kcal, derived from kJ / 4.184
  proteinPer100kcal: number | null;
  source: FoodSource;
  verified: boolean;
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
  unit?: "g" | "ml"; // default "g". AFCD figures are per 100g.
  // Plain description of the form the main figure refers to, matching the
  // source's food name, e.g. "lean, skinless, grilled, no added fat".
  prepDescription: string;
  // AFCD foods: which value from data/afcd-foods.json the page leads with.
  primaryState?: FoodState;
  // Foods not in AFCD: figures entered by hand from their source.
  manual?: FoodValue;
  commonServes: Serve[];
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

// A food with no figure yet.
const draft = (state: FoodState): FoodValue => ({
  state,
  proteinPer100g: null,
  energyKjPer100g: null,
  caloriesPer100g: null,
  proteinPer100kcal: null,
  source: TODO_SOURCE,
  verified: false,
});

const NOT_IN_AFCD = "Not in FSANZ AFCD Release 3.0. Use an Australian brand nutrition panel (dataset \"Brand panel\").";

const RAW_FOODS: FoodEntry[] = [
  // ───────────────────────────── Meat ─────────────────────────────
  {
    slug: "chicken-breast",
    name: "Chicken Breast",
    category: "Meat",
    primaryState: "cooked",
    prepDescription: "lean, skinless, grilled, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "250g", grams: 250 },
    ],
    title: "Protein in Chicken Breast — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in chicken breast? {p}g per 100g grilled and skinless, or {p:raw}g raw. See protein by serving size and how cooking changes the number.",
    intro: [
      "Chicken breast is one of the most efficient protein sources available — high in protein, low in fat, and neutral enough to fit almost any meal. A 150g serve of cooked breast has about {g:150}g of protein, which covers a substantial share of most people's daily protein target in a single meal.",
    ],
    whyVaries: [
      "The {p}g/100g figure above is for grilled, skinless chicken breast. Raw chicken breast measures lower — {p:raw}g per 100g — because cooking drives off water weight, concentrating the protein into less mass. If you're weighing chicken raw before cooking, use the raw figure; if you're weighing it cooked on your plate, use the cooked one. Mixing the two up is the most common reason people's tracked numbers don't match what they expected.",
      "Cooking method makes a smaller difference than raw-vs-cooked — baked chicken breast comes in at {p:cooked-alt}g per 100g. Skin-on chicken breast has more fat and less protein per 100g, since skin adds weight without adding much protein.",
    ],
    usageTips: [
      "Grill or bake in bulk at the start of the week and portion out for quick, ready-to-eat protein",
      "Slice into strips for stir-fries, wraps or salads",
      "Poach and shred for meal-prepped bowls or sandwiches",
    ],
    related: ["chicken-thigh", "turkey-breast", "beef-mince", "eggs", "tuna"],
    relatedMeal: { name: "40g Protein Meals", href: "/protein-meals/40g-protein" },
    faqs: [
      {
        q: "How much protein is in 100g of chicken breast?",
        a: "About {p}g for grilled, skinless chicken breast. Raw chicken breast is lower, at {p:raw}g per 100g, since cooking removes water and concentrates the protein.",
      },
      {
        q: "Does chicken skin reduce protein content?",
        a: "Skin adds fat and calories without adding much protein, so skin-on chicken breast has a lower protein percentage per 100g than skinless, even though the meat itself is the same.",
      },
    ],
  },
  {
    slug: "chicken-thigh",
    name: "Chicken Thigh",
    category: "Meat",
    primaryState: "cooked",
    prepDescription: "lean, skinless, baked, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["chicken-breast", "turkey-breast", "chicken-mince"],
    faqs: [],
  },
  {
    slug: "chicken-mince",
    name: "Chicken Mince",
    category: "Meat",
    primaryState: "raw",
    prepDescription: "raw",
    todo: ["AFCD Release 3.0 only has raw chicken mince. Add a cooked figure if one becomes available."],
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "250g", grams: 250 },
      { label: "500g", grams: 500 },
    ],
    related: ["beef-mince", "lean-beef-mince", "chicken-breast", "turkey-breast"],
    faqs: [],
  },
  {
    slug: "steak",
    name: "Steak (Rump)",
    category: "Meat",
    primaryState: "cooked",
    prepDescription: "lean rump steak, grilled, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "250g", grams: 250 },
    ],
    title: "Protein in Steak — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in steak? {p}g per 100g for lean rump steak, grilled. See protein by serving size and how the cut affects the number.",
    intro: [
      "Steak is a dense, complete protein source — a 200g serve of lean grilled rump has about {g:200}g of protein, a large share of most people's daily protein target in one meal, along with iron, zinc and B12.",
    ],
    whyVaries: [
      "Protein content varies more by leanness than by cut name. Lean grilled sirloin comes in at {p@sirloin-steak}g per 100g, close to rump's {p}g. A fattier, heavily marbled cut has more calories from fat and less protein per 100g, simply because fat is taking up some of that 100g instead of lean meat.",
      "Cooking changes the number too. Raw lean rump is {p:raw}g per 100g; grilling drives off water and concentrates the protein. A well-done steak has lost more water than a rare one, so its protein per 100g is a little higher again.",
    ],
    usageTips: [
      "Pair with a carb source and vegetables for a balanced, high-protein dinner",
      "Slice leftover steak cold into salads or wraps the next day",
      "Choose leaner cuts (rump, sirloin, eye fillet) if you're also watching total calories",
    ],
    related: ["sirloin-steak", "beef-mince", "kangaroo", "lamb", "chicken-breast", "salmon"],
    relatedMeal: { name: "50g Protein Meals", href: "/protein-meals/50g-protein" },
    faqs: [
      {
        q: "How much protein is in a 200g steak?",
        a: "About {g:200}g for lean rump steak, grilled — {p}g per 100g scaled up. A fattier cut will come in lower.",
      },
      {
        q: "Does the cut of steak change the protein content much?",
        a: "Leanness matters more than the specific cut name. Lean grilled rump is {p}g per 100g and lean grilled sirloin is {p@sirloin-steak}g. Heavily marbled cuts have less protein per 100g, since fat displaces some of the lean meat.",
      },
    ],
  },
  {
    slug: "sirloin-steak",
    name: "Sirloin Steak",
    category: "Meat",
    primaryState: "cooked",
    prepDescription: "lean, grilled, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "200g", grams: 200 },
      { label: "250g", grams: 250 },
    ],
    related: ["steak", "lean-beef-mince", "kangaroo", "lamb"],
    faqs: [],
  },
  {
    slug: "beef-mince",
    name: "Beef Mince (Regular)",
    category: "Meat",
    primaryState: "cooked",
    prepDescription: "regular fat, stir-fried, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "500g", grams: 500 },
    ],
    title: "Protein in Beef Mince — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in beef mince? {p}g per 100g for regular mince, cooked, or {p:raw}g raw. Compare lean mince and see protein by serving size.",
    intro: [
      "Beef mince is one of the most versatile protein sources — cheap, quick to cook, and adaptable to almost any cuisine, from bolognese to tacos to a simple stir-fry. A 150g serve of cooked regular mince has about {g:150}g of protein.",
    ],
    whyVaries: [
      "Fat content is the biggest variable with mince. Cooked lower-fat (lean) mince has {p@lean-beef-mince}g of protein per 100g, against {p}g for regular mince, since fat displaces lean meat in the same weight. If protein per gram matters to you, lean mince is worth the small price difference.",
      "Raw or cooked matters too. Regular mince is {p:raw}g per 100g raw and {p}g cooked, because cooking drives off water. If you weigh mince before cooking, use the raw figure.",
    ],
    usageTips: [
      "Cook a large batch and portion into meals for the week",
      "Bulk out with lentils or extra vegetables to stretch a pack further",
      "Choose lean mince if you're targeting a higher protein-to-calorie ratio",
    ],
    related: ["lean-beef-mince", "steak", "chicken-mince", "lentils", "tofu"],
    relatedMeal: { name: "40g Protein Meals", href: "/protein-meals/40g-protein" },
    faqs: [
      {
        q: "How much protein is in 200g of beef mince?",
        a: "About {g:200}g for regular mince, cooked — {p}g per 100g scaled up. Weighed raw, 200g of regular mince has less, because the raw figure is {p:raw}g per 100g.",
      },
      {
        q: "Is lean mince higher in protein than regular mince?",
        a: "Yes. Cooked lean mince has {p@lean-beef-mince}g of protein per 100g, compared with {p}g for regular mince. The extra fat in regular mince takes up space that would otherwise be lean meat.",
      },
    ],
  },
  {
    slug: "lean-beef-mince",
    name: "Beef Mince (Lean)",
    category: "Meat",
    primaryState: "cooked",
    prepDescription: "lower fat, stir-fried, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "500g", grams: 500 },
    ],
    related: ["beef-mince", "steak", "chicken-mince", "kangaroo"],
    relatedMeal: { name: "40g Protein Meals", href: "/protein-meals/40g-protein" },
    faqs: [],
  },
  {
    slug: "kangaroo",
    name: "Kangaroo",
    category: "Meat",
    primaryState: "cooked",
    prepDescription: "loin fillet, grilled, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["steak", "lamb", "lean-beef-mince"],
    faqs: [],
  },
  {
    slug: "lamb",
    name: "Lamb (Leg)",
    category: "Meat",
    primaryState: "cooked",
    prepDescription: "lean leg roast, roasted, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["lamb-mince", "steak", "kangaroo", "pork-loin"],
    faqs: [],
  },
  {
    slug: "lamb-mince",
    name: "Lamb Mince",
    category: "Meat",
    primaryState: "raw",
    prepDescription: "raw",
    todo: ["AFCD Release 3.0 only has raw lamb mince. Add a cooked figure if one becomes available."],
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "250g", grams: 250 },
      { label: "500g", grams: 500 },
    ],
    related: ["lamb", "beef-mince", "chicken-mince"],
    faqs: [],
  },
  {
    slug: "pork-loin",
    name: "Pork Loin",
    category: "Meat",
    primaryState: "cooked",
    prepDescription: "lean loin roast, baked, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["pork-fillet", "ham", "lamb", "chicken-breast"],
    faqs: [],
  },
  {
    slug: "pork-fillet",
    name: "Pork Fillet",
    category: "Meat",
    primaryState: "raw",
    prepDescription: "lean, raw",
    todo: ["AFCD Release 3.0 only has raw pork fillet. Add a cooked figure if one becomes available."],
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["pork-loin", "ham", "chicken-breast"],
    faqs: [],
  },
  {
    slug: "turkey-breast",
    name: "Turkey Breast",
    category: "Meat",
    primaryState: "cooked",
    prepDescription: "lean, skinless, baked, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["chicken-breast", "chicken-thigh", "ham"],
    faqs: [],
  },
  {
    slug: "ham",
    name: "Ham",
    category: "Meat",
    primaryState: "as-sold",
    prepDescription: "lean leg ham",
    todo: ["Check typical slice weight and deli pack sizes for a per-slice serve."],
    commonServes: [
      { label: "50g", grams: 50 },
      { label: "100g", grams: 100 },
    ],
    related: ["turkey-breast", "pork-loin", "chicken-breast"],
    faqs: [],
  },

  // ───────────────────────────── Seafood ─────────────────────────────
  {
    slug: "tuna",
    name: "Tuna (Canned)",
    category: "Seafood",
    primaryState: "as-sold",
    prepDescription: "canned in water, drained",
    commonServes: [
      { label: "95g", grams: 95 },
      { label: "100g", grams: 100 },
      { label: "185g", grams: 185 },
      { label: "200g", grams: 200 },
    ],
    todo: [
      "Check the 95g and 185g serves: they're common Australian can sizes, but can labels usually state the weight before draining, and the figures here are for drained tuna.",
    ],
    title: "Protein in Tuna — Per 100g and Per Can",
    metaDescription:
      "How much protein is in tuna? {p}g per 100g for canned tuna in water, drained. See protein for common can sizes.",
    intro: [
      "Canned tuna is about as convenient as protein gets — no cooking, long shelf life, and a high protein-to-calorie ratio. 95g of drained tuna has about {g:95}g of protein, an easy way to add protein to a meal in seconds.",
    ],
    whyVaries: [
      "Tuna canned in water or brine has a higher protein percentage than tuna canned in oil, simply because oil adds calories and weight without adding protein. If you're comparing cans, check whether it's packed in water or oil before comparing protein-per-100g figures directly.",
      "Drained weight matters — the protein figures above are for tuna after draining, since that's what you actually eat. The weight printed on the can is usually the weight before draining, which will overstate the amount of tuna (and protein) you're actually getting.",
    ],
    usageTips: [
      "Keep a few cans on hand for a fast, no-cook protein top-up",
      "Mix with Greek yoghurt instead of mayonnaise for a higher-protein tuna salad",
      "Add to a rice or pasta salad to boost the protein of an otherwise carb-heavy meal",
    ],
    related: ["tuna-steak", "salmon", "canned-salmon", "prawns", "chicken-breast", "eggs"],
    relatedMeal: { name: "30g Protein Meals", href: "/protein-meals/30g-protein" },
    faqs: [
      {
        q: "How much protein is in a can of tuna?",
        a: "Drained tuna in water has {p}g of protein per 100g, so 95g of drained tuna has about {g:95}g and 185g has about {g:185}g. Can labels usually show the weight before draining, so a can gives you a little less tuna than the number on the label.",
      },
      {
        q: "Does tuna in oil have less protein than tuna in water?",
        a: "Per 100g, yes — the oil adds weight and calories without adding protein, which lowers the protein percentage compared to tuna packed in water or brine.",
      },
    ],
  },
  {
    slug: "tuna-steak",
    name: "Tuna Steak",
    category: "Seafood",
    primaryState: "raw",
    prepDescription: "yellowfin fillet, raw",
    todo: ["AFCD Release 3.0 only has raw yellowfin tuna fillet. Add a cooked figure if one becomes available."],
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["tuna", "salmon", "barramundi"],
    faqs: [],
  },
  {
    slug: "salmon",
    name: "Salmon",
    category: "Seafood",
    primaryState: "cooked",
    prepDescription: "Atlantic salmon fillet, grilled, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "250g", grams: 250 },
    ],
    title: "Protein in Salmon — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in salmon? {p}g per 100g for grilled Atlantic salmon fillet, or {p:raw}g raw. See protein by serving size.",
    intro: [
      "Salmon combines a strong protein content with omega-3 fats that most other protein sources don't offer — a 150g grilled fillet has about {g:150}g of protein and is one of the better fat sources in a high-protein diet.",
    ],
    whyVaries: [
      "Farmed and wild salmon have broadly similar protein content — the bigger difference between them is fat content and type, not protein. Fattier fish has a slightly lower protein percentage per 100g, since fat takes up some of the weight.",
      "As with other meat and fish, cooked salmon has a higher protein-per-100g figure than raw — {p}g grilled against {p:raw}g raw — since cooking removes water weight and concentrates the protein.",
    ],
    usageTips: [
      "Bake or grill in bulk and keep in the fridge for quick protein additions to salads or bowls",
      "Pair with vegetables and a small carb portion for a balanced dinner",
      "Try canned salmon as a cheaper, no-cook option, and check the label for its protein",
    ],
    related: ["tuna", "barramundi", "canned-salmon", "prawns"],
    relatedMeal: { name: "50g Protein Meals", href: "/protein-meals/50g-protein" },
    faqs: [
      {
        q: "How much protein is in a 150g salmon fillet?",
        a: "About {g:150}g, grilled — {p}g per 100g scaled up to a 150g fillet.",
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
    primaryState: "cooked",
    prepDescription: "peeled, cooked from raw, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["barramundi", "tuna", "salmon"],
    faqs: [],
  },
  {
    slug: "barramundi",
    name: "Barramundi",
    category: "Seafood",
    primaryState: "cooked",
    prepDescription: "farmed fillet, grilled, no added fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["salmon", "prawns", "tuna"],
    faqs: [],
  },
  {
    slug: "sardines",
    name: "Sardines",
    category: "Seafood",
    primaryState: "raw",
    prepDescription: "Australian sardine, whole, raw",
    todo: ["AFCD Release 3.0 entry used is fresh whole sardine, raw. Canned sardines would need a separate entry (AFCD or brand panel)."],
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    related: ["canned-salmon", "tuna", "salmon"],
    faqs: [],
  },
  {
    slug: "canned-salmon",
    name: "Canned Salmon",
    category: "Seafood",
    manual: draft("as-sold"),
    prepDescription: "pink or red salmon, canned in water or brine, drained",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories (salmon, canned, drained) in AFCD or a brand panel.", "Check common Australian can sizes and their drained weights."],
    related: ["salmon", "tuna", "sardines"],
    faqs: [],
  },

  // ─────────────────────────── Dairy & Eggs ───────────────────────────
  {
    slug: "eggs",
    name: "Eggs",
    category: "Dairy & Eggs",
    primaryState: "cooked",
    prepDescription: "whole egg, hard-boiled",
    commonServes: [
      { label: "1 egg (50g)", grams: 50 },
      { label: "2 eggs (100g)", grams: 100 },
      { label: "3 eggs (150g)", grams: 150 },
      { label: "4 eggs (200g)", grams: 200 },
    ],
    todo: ["Serves assume a 50g egg (edible portion). Check this against the carton weights you want to reference."],
    title: "Protein in Eggs — Per Egg and Per 100g",
    metaDescription:
      "How much protein is in eggs? {p}g per 100g hard-boiled, about {g:50}g in a 50g egg. See protein for 1, 2, 3 and 4 eggs.",
    intro: [
      "Eggs are one of the most complete and convenient protein sources — cheap, quick to prepare, and containing every essential amino acid your body needs. Hard-boiled egg has {p}g of protein per 100g, so a 50g egg gives you about {g:50}g and a two- or three-egg meal is a solid protein contribution without much effort.",
    ],
    whyVaries: [
      "Egg size varies, and the serves above assume 50g of egg per egg. Bigger eggs give you more protein per egg, so if your carton lists a weight, use that rather than assuming every egg is the same.",
      "Cooking barely changes an egg's protein per 100g: raw whole egg is {p:raw}g per 100g and hard-boiled is {p}g.",
    ],
    usageTips: [
      "Boiled eggs make an easy grab-and-go protein source with no prep at meal time",
      "Add an extra egg white or two to an omelette to boost protein without much extra fat",
      "Combine with Greek yoghurt or cottage cheese at breakfast to hit a higher target without a large meal",
    ],
    related: ["egg-whites", "greek-yoghurt", "cottage-cheese", "chicken-breast"],
    relatedMeal: { name: "30g Protein Meals", href: "/protein-meals/30g-protein" },
    faqs: [
      { q: "How much protein is in 2 eggs?", a: "About {g:100}g, based on two 50g eggs, hard-boiled." },
      { q: "How much protein is in 3 eggs?", a: "About {g:150}g, based on three 50g eggs, hard-boiled." },
    ],
  },
  {
    slug: "egg-whites",
    name: "Egg Whites",
    category: "Dairy & Eggs",
    manual: draft("cooked"),
    prepDescription: "egg white, cooked",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories in AFCD (egg, white, cooked).", "Check the weight of one egg white for a per-white serve."],
    related: ["eggs", "cottage-cheese", "greek-yoghurt"],
    faqs: [],
  },
  {
    slug: "greek-yoghurt",
    name: "Greek Yoghurt",
    category: "Dairy & Eggs",
    // TODO(MJ): confirm this figure — and which product type it describes.
    // Not in AFCD. Strained Greek yoghurt and unstrained "Greek-style"
    // yoghurt differ, so check it against Australian brand panels.
    manual: {
      state: "as-sold",
      proteinPer100g: 10,
      energyKjPer100g: null,
      caloriesPer100g: null,
      proteinPer100kcal: null,
      source: {
        dataset: "TODO",
        foodName: null,
        foodId: null,
        note: "Existing site figure carried over unchanged. " + NOT_IN_AFCD,
      },
      verified: false,
    },
    prepDescription: "plain, natural, unsweetened",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "300g", grams: 300 },
    ],
    todo: [
      "Not in AFCD. Confirm proteinPer100g (currently the existing 10g) from an Australian brand panel and say whether it's strained Greek or Greek-style yoghurt.",
      "Add caloriesPer100g from the same panel.",
      "Add real Australian tub sizes (single-serve and large tubs) to commonServes once checked.",
      "Watch-out block: add brand rows (strained vs Greek-style, e.g. Chobani, YoPro) from Australian nutrition panels to show the difference.",
    ],
    title: "Protein in Greek Yoghurt — Per 100g and Per Serving",
    metaDescription:
      "How much protein is in Greek yoghurt? About {p}g per 100g for plain, natural Greek yoghurt. See protein by serving size.",
    intro: [
      "Greek yoghurt is strained more than regular yoghurt, which removes much of the liquid whey and concentrates the protein. Plain natural yoghurt is {p@natural-yoghurt}g of protein per 100g in Australian food composition data, and strained Greek yoghurt sits above that. A 200g serve of plain Greek yoghurt has about {g:200}g of protein.",
    ],
    whyVaries: [
      "The {p}g/100g figure is for plain, unsweetened Greek yoghurt. Flavoured varieties often have less protein per 100g because fruit, sugar or flavouring syrup displaces some of the yoghurt — check the label rather than assuming a flavoured tub matches plain.",
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
    related: ["high-protein-yoghurt", "cottage-cheese", "natural-yoghurt", "eggs", "milk"],
    relatedMeal: { name: "30g Protein Meals", href: "/protein-meals/30g-protein" },
    brands: [],
    faqs: [
      {
        q: "Is Greek yoghurt higher in protein than regular yoghurt?",
        a: "Yes — the straining process that makes Greek yoghurt thicker also concentrates the protein. Plain natural yoghurt is {p@natural-yoghurt}g of protein per 100g, while strained Greek yoghurt is higher. Check the panel, since Greek-style yoghurt isn't always strained.",
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
    slug: "high-protein-yoghurt",
    name: "High Protein Yoghurt",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "flavoured, low fat, intense sweetened, increased protein",
    todo: ["Brand items (e.g. YoPro, Chobani) vary: add brand rows from Australian nutrition panels if wanted."],
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["greek-yoghurt", "natural-yoghurt", "cottage-cheese"],
    faqs: [],
  },
  {
    slug: "natural-yoghurt",
    name: "Natural Yoghurt",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "plain, regular fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "200g", grams: 200 },
    ],
    related: ["greek-yoghurt", "high-protein-yoghurt", "milk", "cottage-cheese"],
    faqs: [],
  },
  {
    slug: "cottage-cheese",
    name: "Cottage Cheese",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "plain",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "250g", grams: 250 },
    ],
    todo: ["Check whether 250g is a real Australian tub size."],
    title: "Protein in Cottage Cheese — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in cottage cheese? {p}g per 100g. See protein by serving size and how it compares with other dairy foods.",
    intro: [
      "Cottage cheese is one of the better protein-to-calorie ratios in dairy — {p}g of protein for {kcal} calories per 100g — which is part of why it's a common choice for people tracking protein closely.",
    ],
    whyVaries: [
      "Protein content stays fairly consistent between full-fat, reduced-fat and low-fat cottage cheese — as with Greek yoghurt, removing fat mostly affects calories rather than protein. The bigger variable is brand: curd size, added cream, and moisture content differ enough between brands that checking the label is worth it if precision matters to you.",
    ],
    usageTips: [
      "Eat straight with fruit for a quick high-protein snack",
      "Blend into smoothies for a thicker texture and a protein boost",
      "Use as a base for a high-protein dip mixed with herbs",
    ],
    related: ["greek-yoghurt", "ricotta", "eggs", "milk"],
    relatedMeal: { name: "30g Protein Meals", href: "/protein-meals/30g-protein" },
    faqs: [
      {
        q: "How much protein is in a 250g tub of cottage cheese?",
        a: "About {g:250}g, based on {p}g of protein per 100g.",
      },
      {
        q: "Is low-fat cottage cheese lower in protein?",
        a: "Not meaningfully — protein content stays similar across full-fat and low-fat versions. The fat content mainly changes the calorie count.",
      },
    ],
  },
  {
    slug: "cheddar-cheese",
    name: "Cheddar Cheese",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "regular fat",
    todo: ["Check typical slice weight for a per-slice serve."],
    commonServes: [
      { label: "20g", grams: 20 },
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    related: ["light-cheddar", "parmesan", "mozzarella", "cottage-cheese"],
    faqs: [],
  },
  {
    slug: "light-cheddar",
    name: "Cheddar Cheese (Reduced Fat)",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "reduced fat",
    commonServes: [
      { label: "20g", grams: 20 },
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    related: ["cheddar-cheese", "mozzarella", "cottage-cheese"],
    faqs: [],
  },
  {
    slug: "parmesan",
    name: "Parmesan",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "fresh, regular fat",
    commonServes: [
      { label: "10g", grams: 10 },
      { label: "20g", grams: 20 },
      { label: "100g", grams: 100 },
    ],
    related: ["cheddar-cheese", "mozzarella", "haloumi"],
    faqs: [],
  },
  {
    slug: "mozzarella",
    name: "Mozzarella",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "regular",
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    related: ["cheddar-cheese", "parmesan", "ricotta"],
    faqs: [],
  },
  {
    slug: "haloumi",
    name: "Haloumi",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "as purchased",
    commonServes: [
      { label: "50g", grams: 50 },
      { label: "100g", grams: 100 },
    ],
    related: ["mozzarella", "cheddar-cheese", "parmesan"],
    faqs: [],
  },
  {
    slug: "ricotta",
    name: "Ricotta",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "as purchased",
    commonServes: [
      { label: "50g", grams: 50 },
      { label: "100g", grams: 100 },
    ],
    related: ["cottage-cheese", "greek-yoghurt", "mozzarella"],
    faqs: [],
  },
  {
    slug: "milk",
    name: "Milk (Full Cream)",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "cow's milk, regular fat",
    // AFCD gives milk per 100g, so serves are by weight. A per-100ml figure
    // would need a brand panel (Australian milk panels are per 100mL).
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "250g", grams: 250 },
      { label: "500g", grams: 500 },
      { label: "1kg", grams: 1000 },
    ],
    todo: [
      "AFCD figures are per 100g, so this page now shows milk per 100g (it used to say per 100ml). To show per 100ml, per glass or per litre, take figures from an Australian brand panel.",
    ],
    title: "Protein in Milk — Per 100g and by Serving Size",
    metaDescription:
      "How much protein is in milk? {p}g per 100g for full cream cow's milk. Compare reduced fat, skim and soy milk.",
    intro: [
      "Milk isn't the highest-protein food gram-for-gram, but it's easy to drink in volume and adds up quickly across a day — 250g of full cream milk, about a glass, has around {g:250}g of protein.",
    ],
    whyVaries: [
      "Full cream, reduced fat and skim milk all have very similar protein content: {p}g, {p@light-milk}g and {p@skim-milk}g per 100g respectively. Removing fat doesn't remove protein, so the main difference between them is calories, not protein.",
      "Plant-based milks vary widely. Regular soy milk is {p@soy-milk}g per 100g, close to dairy milk, while many oat, almond and rice milks are much lower. Check the label if you're substituting.",
    ],
    usageTips: [
      "Use milk instead of water in oats or protein shakes for an easy protein boost",
      "A glass with meals adds protein without needing to prepare anything",
      "If using a plant-based alternative, choose soy milk if protein content matters to you",
    ],
    related: ["light-milk", "skim-milk", "soy-milk", "greek-yoghurt", "cottage-cheese"],
    faqs: [
      {
        q: "How much protein is in a glass of milk?",
        a: "Full cream milk has {p}g of protein per 100g, so 250g has about {g:250}g. A 250ml glass weighs a little more than 250g, so it has slightly more.",
      },
      {
        q: "Does skim milk have less protein than full cream milk?",
        a: "No. Skim milk has {p@skim-milk}g of protein per 100g and full cream milk has {p}g. The fat content is what changes, not the protein.",
      },
      {
        q: "Is plant-based milk a good protein source?",
        a: "It depends on the milk. Regular soy milk has {p@soy-milk}g of protein per 100g, close to dairy milk. Most oat, almond and rice milks are much lower, so check the label.",
      },
    ],
  },
  {
    slug: "light-milk",
    name: "Milk (Reduced Fat)",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "cow's milk, reduced fat",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "250g", grams: 250 },
      { label: "500g", grams: 500 },
      { label: "1kg", grams: 1000 },
    ],
    todo: ["AFCD figures are per 100g. Per 100ml would need an Australian brand panel."],
    related: ["milk", "skim-milk", "soy-milk"],
    faqs: [],
  },
  {
    slug: "skim-milk",
    name: "Milk (Skim)",
    category: "Dairy & Eggs",
    primaryState: "as-sold",
    prepDescription: "cow's milk, skim",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "250g", grams: 250 },
      { label: "500g", grams: 500 },
      { label: "1kg", grams: 1000 },
    ],
    todo: ["AFCD figures are per 100g. Per 100ml would need an Australian brand panel."],
    related: ["milk", "light-milk", "soy-milk"],
    faqs: [],
  },

  // ─────────────────────────── Plant-Based ───────────────────────────
  {
    slug: "tofu",
    name: "Tofu (Firm)",
    category: "Plant-Based",
    primaryState: "as-sold",
    prepDescription: "firm tofu, as purchased",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
      { label: "300g", grams: 300 },
    ],
    todo: [
      "Tofu was set to 12g/100g by MJ for the meal pages; AFCD firm tofu is 12.8g. The meal pages and meal calculator are outside this change and still use 12g.",
      "Check whether 300g is a real Australian block size.",
    ],
    title: "Protein in Tofu — Per 100g and by Firmness",
    metaDescription:
      "How much protein is in tofu? {p}g per 100g for firm tofu. See protein by serving size and how firmness changes the number.",
    intro: [
      "Tofu is one of the most useful plant-based protein sources — it contains all the essential amino acids, absorbs flavour well, and works across a huge range of cuisines. A 200g serve of firm tofu has about {g:200}g of protein, a meaningful share of a meal for vegetarians, vegans, or anyone cutting back on meat.",
    ],
    whyVaries: [
      "Firmness makes a real difference here — extra-firm and firm tofu have had more water pressed out during production, which concentrates the protein. Silken and soft tofu contain more water for the same weight, and have noticeably less protein per 100g as a result. If protein density matters to you, choose firm or extra-firm.",
      "Some brands, particularly extra-firm or \"high-protein\" tofu products, press out even more water and come in higher again — worth checking the label if you're buying specifically for protein content.",
    ],
    usageTips: [
      "Press firm tofu before cooking to remove extra water and improve texture",
      "Marinate before pan-frying or baking, since tofu takes on flavour well",
      "Use in stir-fries, curries or scrambles as a direct meat substitute",
    ],
    related: ["tempeh", "edamame", "tvp", "lentils", "eggs", "greek-yoghurt", "cottage-cheese"],
    relatedMeal: { name: "40g Protein Meals", href: "/protein-meals/40g-protein" },
    faqs: [
      {
        q: "How much protein is in 200g of tofu?",
        a: "About {g:200}g for firm tofu — {p}g per 100g scaled up. Extra-firm and high-protein brands can be higher again, so check the label.",
      },
      {
        q: "Does silken tofu have less protein than firm tofu?",
        a: "Yes, noticeably — silken and soft tofu contain more water for the same weight, which lowers the protein per 100g compared to firm or extra-firm tofu.",
      },
    ],
  },
  {
    slug: "tvp",
    name: "TVP (Soy Granules)",
    category: "Plant-Based",
    primaryState: "dry",
    prepDescription: "textured vegetable protein, dry granules",
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "50g", grams: 50 },
      { label: "100g", grams: 100 },
    ],
    todo: ["AFCD Release 3.0 only has dry TVP. TVP is rehydrated before eating, so a rehydrated figure would need a separate source."],
    related: ["plant-based-mince", "tofu", "lentils"],
    faqs: [],
  },
  {
    slug: "plant-based-mince",
    name: "Plant-Based Meat",
    category: "Plant-Based",
    primaryState: "as-sold",
    prepDescription: "soy, wheat or pea protein base, as purchased",
    todo: ["Plant-based meat brands vary a lot: add brand rows from Australian nutrition panels if wanted."],
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    related: ["tvp", "tofu", "beef-mince"],
    faqs: [],
  },
  {
    slug: "tempeh",
    name: "Tempeh",
    category: "Plant-Based",
    manual: draft("as-sold"),
    prepDescription: "tempeh, plain",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    todo: [NOT_IN_AFCD, "Check common Australian block sizes."],
    related: ["tofu", "edamame", "lentils"],
    faqs: [],
  },
  {
    slug: "edamame",
    name: "Edamame",
    category: "Plant-Based",
    manual: draft("cooked"),
    prepDescription: "shelled soybeans, cooked",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    todo: [NOT_IN_AFCD + " An Australian frozen-pack panel works."],
    related: ["tofu", "tempeh", "chickpeas"],
    faqs: [],
  },
  {
    slug: "soy-milk",
    name: "Soy Milk",
    category: "Plant-Based",
    primaryState: "as-sold",
    prepDescription: "regular fat, added calcium and vitamins",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "250g", grams: 250 },
      { label: "500g", grams: 500 },
    ],
    todo: ["AFCD figures are per 100g. Per 100ml would need an Australian brand panel."],
    related: ["milk", "tofu", "light-milk"],
    faqs: [],
  },
  {
    slug: "lentils",
    name: "Lentils",
    category: "Plant-Based",
    primaryState: "cooked",
    prepDescription: "dried lentils, boiled, drained",
    todo: ["The dry figure in AFCD is for red lentils, while the cooked figure doesn't name a variety. Check you're happy showing them together."],
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
      { label: "200g", grams: 200 },
    ],
    related: ["chickpeas", "kidney-beans", "tofu"],
    faqs: [],
  },
  {
    slug: "chickpeas",
    name: "Chickpeas",
    category: "Plant-Based",
    primaryState: "as-sold",
    prepDescription: "canned, drained",
    todo: ["Check common Australian can sizes and drained weights."],
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    related: ["lentils", "hummus", "kidney-beans"],
    faqs: [],
  },
  {
    slug: "kidney-beans",
    name: "Kidney Beans",
    category: "Plant-Based",
    primaryState: "as-sold",
    prepDescription: "red kidney beans, canned, drained",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    related: ["black-beans", "chickpeas", "lentils"],
    faqs: [],
  },
  {
    slug: "black-beans",
    name: "Black Beans",
    category: "Plant-Based",
    manual: draft("as-sold"),
    prepDescription: "canned, drained",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories (bean, black, canned, drained) in AFCD or an Australian brand panel."],
    related: ["kidney-beans", "chickpeas", "lentils"],
    faqs: [],
  },
  {
    slug: "baked-beans",
    name: "Baked Beans",
    category: "Plant-Based",
    primaryState: "as-sold",
    prepDescription: "canned in tomato sauce",
    todo: ["Check common Australian can sizes."],
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "200g", grams: 200 },
    ],
    related: ["kidney-beans", "chickpeas", "wholemeal-bread"],
    faqs: [],
  },

  // ───────────────────────── Grains & Cereals ─────────────────────────
  {
    slug: "oats",
    name: "Rolled Oats",
    category: "Grains & Cereals",
    primaryState: "dry",
    prepDescription: "rolled oats, uncooked",
    commonServes: [
      { label: "40g", grams: 40 },
      { label: "50g", grams: 50 },
      { label: "100g", grams: 100 },
    ],
    related: ["weet-bix", "quinoa", "milk"],
    faqs: [],
  },
  {
    slug: "weet-bix",
    name: "Weet-Bix",
    category: "Grains & Cereals",
    primaryState: "as-sold",
    prepDescription: "Sanitarium Weet-Bix, dry",
    todo: ["Add a per-biscuit serve using the serving size on Sanitarium's Australian nutrition panel."],
    commonServes: [
      { label: "100g", grams: 100 },
    ],
    related: ["oats", "milk", "wholemeal-bread"],
    faqs: [],
  },
  {
    slug: "quinoa",
    name: "Quinoa",
    category: "Grains & Cereals",
    primaryState: "dry",
    prepDescription: "uncooked",
    commonServes: [
      { label: "50g", grams: 50 },
      { label: "75g", grams: 75 },
      { label: "100g", grams: 100 },
    ],
    related: ["oats", "brown-rice", "pasta"],
    faqs: [],
  },
  {
    slug: "wholemeal-bread",
    name: "Wholemeal Bread",
    category: "Grains & Cereals",
    manual: draft("as-sold"),
    prepDescription: "wholemeal bread, sliced",
    commonServes: [
      { label: "100g", grams: 100 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories in AFCD (bread, wholemeal).", "Check a typical slice weight for a per-slice serve."],
    related: ["oats", "weet-bix", "eggs"],
    faqs: [],
  },
  {
    slug: "brown-rice",
    name: "Brown Rice",
    category: "Grains & Cereals",
    manual: draft("cooked"),
    prepDescription: "cooked",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "150g", grams: 150 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories in AFCD (rice, brown, boiled)."],
    related: ["quinoa", "pasta", "lentils"],
    faqs: [],
  },
  {
    slug: "pasta",
    name: "Pasta",
    category: "Grains & Cereals",
    manual: draft("cooked"),
    prepDescription: "wheat pasta, cooked",
    commonServes: [
      { label: "100g", grams: 100 },
      { label: "200g", grams: 200 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories in AFCD (pasta, white wheat, boiled)."],
    related: ["brown-rice", "quinoa", "parmesan"],
    faqs: [],
  },

  // ─────────────────────────── Nuts & Seeds ───────────────────────────
  {
    slug: "almonds",
    name: "Almonds",
    category: "Nuts & Seeds",
    primaryState: "as-sold",
    prepDescription: "raw, with skin, unsalted",
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    related: ["peanut-butter", "pumpkin-seeds", "peanuts", "cashews"],
    faqs: [],
  },
  {
    slug: "peanut-butter",
    name: "Peanut Butter",
    category: "Nuts & Seeds",
    primaryState: "as-sold",
    prepDescription: "smooth or crunchy, no added sugar or salt",
    todo: ["Check the gram weight of 1 tablespoon if you want a per-tablespoon serve."],
    commonServes: [
      { label: "20g", grams: 20 },
      { label: "100g", grams: 100 },
    ],
    related: ["peanuts", "almonds", "oats"],
    faqs: [],
  },
  {
    slug: "pumpkin-seeds",
    name: "Pumpkin Seeds (Pepitas)",
    category: "Nuts & Seeds",
    primaryState: "as-sold",
    prepDescription: "hulled and dried",
    todo: ["Check the gram weight of 1 tablespoon if you want a per-tablespoon serve."],
    commonServes: [
      { label: "15g", grams: 15 },
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    related: ["hemp-seeds", "chia-seeds", "almonds"],
    faqs: [],
  },
  {
    slug: "hemp-seeds",
    name: "Hemp Seeds",
    category: "Nuts & Seeds",
    primaryState: "as-sold",
    prepDescription: "dried",
    commonServes: [
      { label: "15g", grams: 15 },
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    related: ["pumpkin-seeds", "chia-seeds", "hemp-protein"],
    faqs: [],
  },
  {
    slug: "chia-seeds",
    name: "Chia Seeds",
    category: "Nuts & Seeds",
    primaryState: "as-sold",
    prepDescription: "dried",
    todo: ["Check the gram weight of 1 tablespoon if you want a per-tablespoon serve."],
    commonServes: [
      { label: "15g", grams: 15 },
      { label: "100g", grams: 100 },
    ],
    related: ["pumpkin-seeds", "hemp-seeds", "oats"],
    faqs: [],
  },
  {
    slug: "peanuts",
    name: "Peanuts",
    category: "Nuts & Seeds",
    manual: draft("as-sold"),
    prepDescription: "dry roasted, unsalted",
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories in AFCD (peanut, dry roasted, unsalted)."],
    related: ["peanut-butter", "almonds", "cashews"],
    faqs: [],
  },
  {
    slug: "cashews",
    name: "Cashews",
    category: "Nuts & Seeds",
    manual: draft("as-sold"),
    prepDescription: "raw",
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories in AFCD (cashew, raw)."],
    related: ["almonds", "walnuts", "peanuts"],
    faqs: [],
  },
  {
    slug: "walnuts",
    name: "Walnuts",
    category: "Nuts & Seeds",
    manual: draft("as-sold"),
    prepDescription: "raw",
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories in AFCD (walnut, raw)."],
    related: ["almonds", "cashews", "chia-seeds"],
    faqs: [],
  },

  // ─────────────────────── Snacks & Supplements ───────────────────────
  {
    slug: "whey-protein",
    name: "Whey Protein Powder",
    category: "Snacks & Supplements",
    primaryState: "dry",
    prepDescription: "whey-based powder, over 70% protein, unfortified",
    todo: ["Scoop sizes vary by brand. Check the 30g serve against the brands you want to reference."],
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    related: ["hemp-protein", "milk", "greek-yoghurt"],
    faqs: [],
  },
  {
    slug: "hemp-protein",
    name: "Hemp Protein Powder",
    category: "Snacks & Supplements",
    primaryState: "dry",
    prepDescription: "hemp seed based powder",
    todo: ["Scoop sizes vary by brand. Check the 30g serve against the brands you want to reference."],
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    related: ["whey-protein", "hemp-seeds", "tofu"],
    faqs: [],
  },
  {
    slug: "beef-jerky",
    name: "Beef Jerky",
    category: "Snacks & Supplements",
    manual: draft("as-sold"),
    prepDescription: "plain or original flavour",
    commonServes: [
      { label: "25g", grams: 25 },
      { label: "50g", grams: 50 },
      { label: "100g", grams: 100 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories in AFCD (beef jerky) or an Australian brand panel.", "Check common Australian pack sizes."],
    related: ["steak", "almonds", "cheddar-cheese"],
    faqs: [],
  },
  {
    slug: "hummus",
    name: "Hummus",
    category: "Snacks & Supplements",
    manual: draft("as-sold"),
    prepDescription: "plain hummus dip",
    commonServes: [
      { label: "30g", grams: 30 },
      { label: "100g", grams: 100 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories in AFCD (dip, hummus)."],
    related: ["chickpeas", "wholemeal-bread", "lentils"],
    faqs: [],
  },
  {
    slug: "popcorn",
    name: "Popcorn",
    category: "Snacks & Supplements",
    manual: draft("as-sold"),
    prepDescription: "air-popped, plain",
    commonServes: [
      { label: "20g", grams: 20 },
      { label: "100g", grams: 100 },
    ],
    todo: ["Not in the AFCD capture. Look up protein and calories in AFCD (popcorn, air-popped, plain)."],
    related: ["peanuts", "almonds", "beef-jerky"],
    faqs: [],
  },
];

// ───────────────────────────── AFCD data ─────────────────────────────

interface AfcdJsonValue {
  state: string;
  proteinPer100g: number;
  energyKjPer100g: number;
  caloriesPer100g: number;
  proteinPer100kcal: number;
  source: { dataset: string; foodKey: string; foodName: string; url: string };
  verified: boolean;
}

const AFCD = new Map<string, FoodValue[]>(
  (afcdData.foods as { slug: string; values: AfcdJsonValue[] }[]).map((f) => [
    f.slug,
    f.values.map((v) => ({
      state: v.state as FoodState,
      proteinPer100g: v.proteinPer100g,
      energyKjPer100g: v.energyKjPer100g,
      caloriesPer100g: v.caloriesPer100g,
      proteinPer100kcal: v.proteinPer100kcal,
      source: { dataset: v.source.dataset, foodName: v.source.foodName, foodId: v.source.foodKey, url: v.source.url },
      verified: v.verified,
    })),
  ]),
);

function valuesFor(entry: FoodEntry): FoodValue[] {
  if (entry.manual) return [entry.manual];
  const values = AFCD.get(entry.slug);
  if (!values) throw new Error(`foods: "${entry.slug}" has primaryState but no entry in afcd-foods.json`);
  const primary = values.find((v) => v.state === entry.primaryState);
  if (!primary) throw new Error(`foods: "${entry.slug}" has no AFCD value for state "${entry.primaryState}"`);
  return [primary, ...values.filter((v) => v !== primary)];
}

// ─────────────────────────── Derived data ───────────────────────────

export interface Food extends FoodEntry, Omit<FoodValue, "state"> {
  state: FoodState;
  // The food's other AFCD values (e.g. raw when the page leads with cooked).
  otherValues: FoodValue[];
}

// Fill the number tokens described at the top of this file.
function fill(text: string, entry: FoodEntry, values: FoodValue[]): string {
  return text.replace(/\{(p|kcal|g)(?:@([a-z0-9-]+))?(?::([a-z0-9.-]+))?\}/g, (token, kind, otherSlug, arg) => {
    let vals = values;
    if (otherSlug) {
      const other = RAW_FOODS.find((f) => f.slug === otherSlug);
      if (!other) throw new Error(`foods: unknown slug in ${token} on "${entry.slug}"`);
      vals = valuesFor(other);
    }
    const state = kind === "g" ? undefined : arg;
    const v = state ? vals.find((x) => x.state === state) : vals[0];
    const n = kind === "kcal" ? v?.caloriesPer100g : v?.proteinPer100g;
    if (n === null || n === undefined) throw new Error(`foods: ${token} on "${entry.slug}" has no figure`);
    if (kind === "g") {
      const grams = Number(arg);
      if (!grams) throw new Error(`foods: ${token} on "${entry.slug}" needs a gram amount`);
      return String(Math.round((n * grams) / 100));
    }
    return String(n);
  });
}

function resolve(entry: FoodEntry): Food {
  const [primary, ...otherValues] = valuesFor(entry);
  const f = (t: string) => fill(t, entry, [primary, ...otherValues]);
  const published = primary.proteinPer100g !== null;
  // Draft copy is never shown, so only fill tokens on published foods.
  const fillList = (l?: string[]) => (l && published ? l.map(f) : l);
  return {
    ...entry,
    ...primary,
    otherValues,
    title: entry.title && published ? f(entry.title) : entry.title,
    metaDescription: entry.metaDescription && published ? f(entry.metaDescription) : entry.metaDescription,
    intro: fillList(entry.intro),
    whyVaries: fillList(entry.whyVaries),
    usageTips: fillList(entry.usageTips),
    watchOut: entry.watchOut && { ...entry.watchOut, body: fillList(entry.watchOut.body)! },
    faqs: published ? entry.faqs.map((q) => ({ q: f(q.q), a: f(q.a) })) : entry.faqs,
  };
}

// Every food in the JSON must have an entry above, and every slug referenced
// in `related` must exist, so nothing in the data silently goes missing.
for (const slug of AFCD.keys()) {
  const entry = RAW_FOODS.find((f) => f.slug === slug);
  if (!entry || !entry.primaryState) throw new Error(`foods: afcd-foods.json has "${slug}" but no AFCD entry in foods.ts`);
}
for (const f of RAW_FOODS) {
  if (!f.manual === !f.primaryState) throw new Error(`foods: "${f.slug}" needs exactly one of primaryState or manual`);
  for (const r of f.related) if (!RAW_FOODS.some((x) => x.slug === r)) throw new Error(`foods: "${f.slug}" relates to unknown "${r}"`);
}

export const FOODS: Food[] = RAW_FOODS.map(resolve);

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

// How the figure was weighed, for labels: "cooked", "raw", "as sold", "dry".
export function stateLabel(state: FoodState): string {
  return { raw: "raw", cooked: "cooked", "cooked-alt": "cooked", "as-sold": "as sold", dry: "dry" }[state];
}

export function proteinForServe(f: { proteinPer100g: number }, grams: number): number {
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
