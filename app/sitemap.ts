import type { MetadataRoute } from "next";

const BASE_URL = "https://proteintracker.com.au";

// Add a route here the same day it ships — an unlisted page still exists,
// it just won't get discovered via the sitemap as fast.
const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },

  { path: "/protein-calculator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/protein-calculator/weight-loss", priority: 0.8, changeFrequency: "monthly" },
  { path: "/protein-calculator/muscle-gain", priority: 0.8, changeFrequency: "monthly" },
  { path: "/protein-calculator/women", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-calculator/men", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-calculator/over-50", priority: 0.7, changeFrequency: "monthly" },

  { path: "/protein-tracker", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ai-protein-tracker", priority: 0.8, changeFrequency: "monthly" },

  { path: "/protein-foods", priority: 0.8, changeFrequency: "monthly" },
  { path: "/protein-foods/chicken-breast", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-foods/eggs", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-foods/greek-yoghurt", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-foods/steak", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-foods/beef-mince", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-foods/tuna", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-foods/salmon", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-foods/cottage-cheese", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-foods/milk", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-foods/tofu", priority: 0.7, changeFrequency: "monthly" },

  { path: "/protein-meals", priority: 0.8, changeFrequency: "monthly" },
  { path: "/protein-meals/30g-protein", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-meals/40g-protein", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-meals/50g-protein", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-meal-calculator", priority: 0.8, changeFrequency: "monthly" },

  { path: "/protein-guides", priority: 0.7, changeFrequency: "monthly" },
  { path: "/protein-guides/how-much-protein-do-i-need", priority: 0.6, changeFrequency: "monthly" },
  { path: "/protein-guides/protein-for-muscle-gain", priority: 0.6, changeFrequency: "monthly" },
  { path: "/protein-guides/protein-for-weight-loss", priority: 0.6, changeFrequency: "monthly" },
  { path: "/protein-guides/how-much-protein-per-meal", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
