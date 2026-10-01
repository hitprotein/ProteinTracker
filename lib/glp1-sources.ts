// Single list of references for the GLP-1 calculator and guide, so both pages cite the same sources.
// Wording on these pages must stay educational: no medicine brand or generic names, no claims about
// what the medicines do, no supply or prescribing links. Advertising prescription-only medicines to the
// public is prohibited in Australia — see the TGA's guidance on advertising GLP-1 receptor agonists
// (tga.gov.au > Advertising > Specialised advertising issues and topics). It isn't rendered as a
// reference: nothing on the pages cites it, and its URL names a medicine, which these pages must not.
export const GLP1_SOURCES = [
  {
    id: "advisory",
    label:
      "Mozaffarian D, et al. Nutritional priorities to support GLP-1 therapy for obesity: a joint Advisory from the American College of Lifestyle Medicine, the American Society for Nutrition, the Obesity Medicine Association, and The Obesity Society. Obesity, 2025 (also published in The American Journal of Clinical Nutrition).",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12304835/",
  },
  {
    id: "consensus",
    label:
      "Nutritional and lifestyle supportive care recommendations for management of obesity with GLP-1-based therapies: an expert consensus statement using a modified Delphi approach. 2025.",
    url: "https://www.sciencedirect.com/science/article/pii/S2667368125000725",
  },
  {
    id: "dietitians",
    label: "Better Health Channel (Victorian Government): Dietitians, including how to find an Accredited Practising Dietitian.",
    url: "https://www.betterhealth.vic.gov.au/health/servicesandsupport/dietitians",
  },
  {
    id: "da",
    label: "Dietitians Australia: find an Accredited Practising Dietitian (APD).",
    url: "https://dietitiansaustralia.org.au",
  },
] as const;

export const GLP1_DISCLAIMER =
  "General information only, not medical advice. ProteinTracker.com.au doesn't recommend, prescribe or supply any medicine and isn't affiliated with any pharmaceutical company. If you take a prescribed medicine, talk to your prescriber, GP or an Accredited Practising Dietitian before changing how you eat.";
