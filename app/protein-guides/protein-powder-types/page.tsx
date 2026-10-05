import type { Metadata } from "next";
import Link from "next/link";
import GuidePageTemplate from "../GuidePageTemplate";
import References from "@/components/References";
import { POWDER_DISCLAIMER, POWDER_LAST_UPDATED, POWDER_SOURCES } from "@/lib/protein-powder-sources";

const PATH = "/protein-guides/protein-powder-types";

export const metadata: Metadata = {
  title: { absolute: "Protein Powder Types Compared: Whey, WPI, Pea & Collagen" },
  description:
    "Whey concentrate vs isolate vs casein, soy, pea and collagen: protein per scoop, lactose, digestion and who each suits. A plain-English, referenced guide.",
  alternates: { canonical: PATH },
};

const linkCls = "font-semibold text-pt-black underline";

// Typical label ranges for a 30g scoop. Protein content varies by product, so
// the page tells readers to check the label.
const COMPARISON = [
  { type: "Whey concentrate (WPC)", protein: "21–24g", lactose: "Some", speed: "Fast", complete: "Yes", suits: "Everyday use, budget" },
  { type: "Whey isolate (WPI)", protein: "25–27g", lactose: "Very little", speed: "Fast", complete: "Yes", suits: "Lactose-sensitive, more protein per scoop" },
  { type: "Casein", protein: "22–24g", lactose: "Some", speed: "Slow", complete: "Yes", suits: "Long gaps between meals" },
  { type: "Soy", protein: "24–27g", lactose: "None", speed: "Moderate", complete: "Yes", suits: "Plant-based" },
  { type: "Pea", protein: "21–24g", lactose: "None", speed: "Moderate", complete: "Low in methionine", suits: "Plant-based, dairy and soy-free" },
  { type: "Plant blend (e.g. pea + rice)", protein: "21–24g", lactose: "None", speed: "Moderate", complete: "Yes, when combined", suits: "Plant-based" },
  { type: "Collagen", protein: "26–28g", lactose: "None", speed: "Fast", complete: "No (no tryptophan)", suits: "Not a main protein source" },
];

export default function ProteinPowderTypesGuide() {
  return (
    <GuidePageTemplate
      h1="Protein Powder Types Compared"
      subtitle="Whey concentrate, whey isolate, casein, soy, pea, plant blends and collagen: what's actually different, and which suits you."
      sections={[
        {
          heading: "The quick comparison",
          body: (
            <>
              <p>Typical figures for a 30g scoop. Protein content varies between products, so check your tub&apos;s label.</p>
              <div className="overflow-x-auto rounded-card border border-pt-black/10 bg-pt-white">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-pt-offwhite text-pt-black">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold">Type</th>
                      <th scope="col" className="px-3 py-2 font-semibold">Protein per scoop</th>
                      <th scope="col" className="px-3 py-2 font-semibold">Lactose</th>
                      <th scope="col" className="px-3 py-2 font-semibold">Digestion</th>
                      <th scope="col" className="px-3 py-2 font-semibold">Complete protein?</th>
                      <th scope="col" className="px-3 py-2 font-semibold">Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.type} className="border-t border-pt-black/10 align-top">
                        <th scope="row" className="px-3 py-2 font-semibold text-pt-black">{row.type}</th>
                        <td className="px-3 py-2">{row.protein}</td>
                        <td className="px-3 py-2">{row.lactose}</td>
                        <td className="px-3 py-2">{row.speed}</td>
                        <td className="px-3 py-2">{row.complete}</td>
                        <td className="px-3 py-2">{row.suits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ),
        },
        {
          heading: "Whey concentrate (WPC)",
          body: (
            <p>
              The most common and usually the cheapest powder. Whey is a complete protein, digests quickly and is
              the richest of the common powders in leucine, the amino acid most closely linked to starting muscle
              protein synthesis [1][2]. Concentrate keeps some of milk&apos;s lactose and fat, so it has a little less
              protein per scoop than isolate. Most people who tolerate dairy do fine on it.
            </p>
          ),
        },
        {
          heading: "Whey isolate (WPI)",
          body: (
            <p>
              Isolate is filtered further to remove most of the lactose and fat, so each scoop carries more protein.
              It&apos;s the usual pick if dairy upsets your stomach, or if you want the most protein for the fewest
              calories. It costs more than concentrate, and for people who handle lactose fine the difference in
              results is small.
            </p>
          ),
        },
        {
          heading: "Casein",
          body: (
            <p>
              The other main milk protein. Casein digests slowly, releasing amino acids over several hours rather
              than all at once, while whey peaks quickly [3]. That makes it a common choice before bed or before a
              long gap between meals. It&apos;s a complete protein but contains some lactose.
            </p>
          ),
        },
        {
          heading: "Soy",
          body: (
            <p>
              The most established plant protein powder, and a complete protein. In research comparing whey, soy and
              casein, soy sat in between the two milk proteins for its effect on muscle protein synthesis [3]. It
              suits vegans and anyone avoiding dairy, but not people with a soy allergy.
            </p>
          ),
        },
        {
          heading: "Pea",
          body: (
            <p>
              Popular, dairy-free and soy-free. Pea protein is relatively low in methionine, one of the essential amino
              acids, and plant proteins generally carry less leucine than whey [2]. That doesn&apos;t make it a bad
              choice: a slightly larger serve, or pairing it with other protein foods across the day, closes most of
              the gap [1].
            </p>
          ),
        },
        {
          heading: "Plant blends (pea + rice and others)",
          body: (
            <p>
              Blends exist to fill each other&apos;s gaps. Pea is low in methionine, while rice is low in lysine, an
              amino acid pea has plenty of. Combined, they give a more complete amino acid profile than either alone
              [2]. If you want a plant powder and aren&apos;t using soy, a blend is usually the better option than a
              single source.
            </p>
          ),
        },
        {
          heading: "Collagen",
          body: (
            <>
              <p>
                Collagen is high in protein on the label, but it&apos;s an incomplete protein: it contains no
                tryptophan and very little leucine. In a study of older women, whey increased muscle protein synthesis
                while collagen did not [4].
              </p>
              <p>
                Collagen grams still count toward your daily protein total, but it shouldn&apos;t be your main protein
                source if muscle is the goal. Some powders sold as &ldquo;beef protein isolate&rdquo; are largely
                collagen too, so check the label.
              </p>
            </>
          ),
        },
        {
          heading: "How to choose",
          body: (
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Most people:</strong> whey concentrate. It&apos;s complete, high in leucine and good value.</li>
              <li><strong>Dairy upsets your stomach:</strong> whey isolate, or a plant powder if isolate still doesn&apos;t agree with you.</li>
              <li><strong>Vegan or plant-based:</strong> soy, or a pea and rice blend.</li>
              <li><strong>Long gap until your next meal:</strong> casein.</li>
              <li><strong>Building muscle:</strong> any complete protein works. Collagen shouldn&apos;t be your main source [4].</li>
              <li>
                <strong>Watching calories:</strong> isolate gives the most protein per calorie, but whole foods like{" "}
                <Link href="/protein-foods/greek-yoghurt" className={linkCls}>Greek yoghurt</Link> and{" "}
                <Link href="/protein-foods/cottage-cheese" className={linkCls}>cottage cheese</Link> do a similar job.
              </li>
            </ul>
          ),
        },
        {
          heading: "Do you need protein powder at all?",
          body: (
            <p>
              No. Powder is a convenience, not a requirement. Most active people do well on about 1.4–2.0g of protein
              per kg of body weight a day, spread across meals of roughly 20–40g each [1], and food can cover that.
              Powder helps when you&apos;re short on time or struggling to reach your number. Find yours with the{" "}
              <Link href="/protein-calculator" className={linkCls}>protein calculator</Link>, and see what a 20–40g
              serve looks like in food on our{" "}
              <Link href="/protein-meals" className={linkCls}>high-protein meals</Link> pages. Wondering about
              creatine too? See{" "}
              <Link href="/protein-guides/creatine-and-protein" className={linkCls}>creatine vs protein</Link>.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Which type of protein powder is best?",
          a: "For most people, whey concentrate: it's a complete protein, high in leucine and good value. Choose whey isolate if lactose bothers you, soy or a pea and rice blend if you're plant-based, and casein for long gaps between meals. Collagen shouldn't be your main protein source.",
        },
        {
          q: "Is whey isolate better than whey concentrate?",
          a: "Isolate has more protein and less lactose and fat per scoop, but costs more. If dairy doesn't upset your stomach, concentrate works well for most people.",
        },
        {
          q: "Is plant protein as good as whey?",
          a: "Plant proteins usually have a little less leucine and some are low in one or more essential amino acids. Soy is complete, and pea and rice blends fill each other's gaps. A slightly larger serve closes most of the difference.",
        },
        {
          q: "Does collagen count toward my daily protein?",
          a: "Its grams count toward your total, but collagen is an incomplete protein with no tryptophan and little leucine. In research, it didn't increase muscle protein synthesis the way whey did, so it shouldn't be your main protein source.",
        },
        {
          q: "Do I need protein powder?",
          a: "No. It's a convenient way to top up protein, but food can cover your needs. It's most useful when you're short on time or regularly falling short of your daily target.",
        },
      ]}
      footer={
        <References sources={POWDER_SOURCES} lastUpdated={POWDER_LAST_UPDATED} disclaimer={POWDER_DISCLAIMER} path={PATH} />
      }
      ctaHeading="How much protein are you actually getting?"
      ctaBody="HitProtein tracks your daily protein from food and shakes, and can estimate it from a photo of your meal."
    />
  );
}
