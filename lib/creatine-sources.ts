// References for the creatine guide. Keep it factual and cited: what creatine
// is, how it's dosed, safety, and how it relates to protein. No brand
// recommendations and no claims beyond what these sources show.
export const CREATINE_SOURCES = [
  {
    id: "issn-creatine",
    label:
      "Kreider RB, et al. International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine. Journal of the International Society of Sports Nutrition, 2017;14:18.",
    url: "https://doi.org/10.1186/s12970-017-0173-z",
  },
  {
    id: "misconceptions",
    label:
      "Antonio J, et al. Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show? Journal of the International Society of Sports Nutrition, 2021;18:13.",
    url: "https://doi.org/10.1186/s12970-021-00412-w",
  },
  {
    id: "ais",
    label: "Australian Institute of Sport: Sports Supplement Framework.",
    url: "https://www.ais.gov.au/nutrition/supplements",
  },
] as const;

// Bump whenever the guide's numbers or sources change.
export const CREATINE_LAST_UPDATED = "2026-10-05";

export const CREATINE_DISCLAIMER =
  "General information only, not medical advice. ProteinTracker.com.au isn't affiliated with any supplement brand. If you have kidney disease or another health condition, take regular medication, are pregnant or breastfeeding, or are under 18, talk to your GP or an Accredited Practising Dietitian before taking creatine.";
