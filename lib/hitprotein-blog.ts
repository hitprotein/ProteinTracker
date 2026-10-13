// Food data articles on the HitProtein blog that cover foods on this site.
// Each food page links to the ones that are about it.
const BLOG = "https://www.hitprotein.com.au/blog";

export interface BlogArticle {
  href: string;
  title: string;
}

export const HP_ARTICLES = {
  ranked: {
    href: `${BLOG}/high-protein-foods-ranked-by-protein-per-calorie`,
    title: "High protein foods ranked by protein per calorie",
  },
  greek: {
    href: `${BLOG}/greek-yoghurt-vs-greek-style-protein`,
    title: "Greek yoghurt vs Greek-style: protein compared",
  },
  cooking: {
    href: `${BLOG}/does-cooking-increase-protein`,
    title: "Does cooking increase protein? Raw vs cooked explained",
  },
} satisfies Record<string, BlogArticle>;

// Foods in the article's raw vs cooked table.
const COOKING_SLUGS = new Set([
  "chicken-breast", "chicken-thigh", "steak", "sirloin-steak", "beef-mince", "lean-beef-mince", "kangaroo", "lamb",
  "pork-loin", "turkey-breast", "barramundi", "salmon", "eggs", "oats", "quinoa", "brown-rice", "pasta",
]);
const YOGHURT_SLUGS = new Set(["greek-yoghurt", "high-protein-yoghurt", "natural-yoghurt"]);

/** Blog articles relevant to a food page, most specific first. */
export function articlesFor(slug: string): BlogArticle[] {
  const out: BlogArticle[] = [];
  if (YOGHURT_SLUGS.has(slug)) out.push(HP_ARTICLES.greek);
  if (COOKING_SLUGS.has(slug)) out.push(HP_ARTICLES.cooking);
  out.push(HP_ARTICLES.ranked);
  return out;
}
