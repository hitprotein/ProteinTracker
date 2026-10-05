// References for the protein powder guide. Keep the page factual: protein
// content, amino acids and digestion, each cited here. No brand
// recommendations and no health claims beyond what these sources show (sports
// foods sold in Australia fall under the Food Standards Code's rules on claims).
export const POWDER_SOURCES = [
  {
    id: "issn",
    label:
      "Jäger R, et al. International Society of Sports Nutrition Position Stand: protein and exercise. Journal of the International Society of Sports Nutrition, 2017;14:20.",
    url: "https://doi.org/10.1186/s12970-017-0177-8",
  },
  {
    id: "plant",
    label:
      "Gorissen SHM, et al. Protein content and amino acid composition of commercially available plant-based protein isolates. Amino Acids, 2018;50:1685–1695.",
    url: "https://doi.org/10.1007/s00726-018-2640-5",
  },
  {
    id: "whey-casein-soy",
    label:
      "Tang JE, et al. Ingestion of whey hydrolysate, casein, or soy protein isolate: effects on mixed muscle protein synthesis at rest and following resistance exercise in young men. Journal of Applied Physiology, 2009;107:987–992.",
    url: "https://doi.org/10.1152/japplphysiol.00076.2009",
  },
  {
    id: "collagen",
    label:
      "Oikawa SY, et al. Whey protein but not collagen peptides stimulate acute and longer-term muscle protein synthesis with and without resistance exercise in healthy older women: a randomized controlled trial. American Journal of Clinical Nutrition, 2020;111:708–718.",
    url: "https://doi.org/10.1093/ajcn/nqz332",
  },
] as const;

// Bump whenever the guide's numbers or sources change.
export const POWDER_LAST_UPDATED = "2026-10-05";

export const POWDER_DISCLAIMER =
  "General information only, not medical advice. ProteinTracker.com.au isn't affiliated with any supplement brand. Protein content varies between products, so check the label. If you have kidney disease, a food allergy or another health condition, talk to your GP or an Accredited Practising Dietitian before adding protein powder.";
