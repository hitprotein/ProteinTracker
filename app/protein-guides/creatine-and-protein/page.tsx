import type { Metadata } from "next";
import Link from "next/link";
import GuidePageTemplate from "../GuidePageTemplate";
import References from "@/components/References";
import { CREATINE_DISCLAIMER, CREATINE_LAST_UPDATED, CREATINE_SOURCES } from "@/lib/creatine-sources";

const PATH = "/protein-guides/creatine-and-protein";

export const metadata: Metadata = {
  title: { absolute: "Creatine vs Protein: The Difference and Taking Both" },
  description:
    "What creatine is, how it differs from protein, how much to take and whether to mix it with your protein shake. A plain-English, referenced guide.",
  alternates: { canonical: PATH },
};

const linkCls = "font-semibold text-pt-black underline";

export default function CreatineAndProteinGuide() {
  return (
    <GuidePageTemplate
      h1="Creatine vs Protein"
      subtitle="What creatine actually is, how it's different from protein, and whether it makes sense to take both."
      sections={[
        {
          heading: "The short answer",
          body: (
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Protein</strong> supplies the amino acids your body uses to build and repair muscle. You need
                it every day, mostly from food.
              </li>
              <li>
                <strong>Creatine</strong> isn&apos;t a protein. It helps your muscles produce energy for short, hard
                efforts like lifting or sprinting, which can let you train a little harder [1].
              </li>
              <li>
                They do different jobs, so one doesn&apos;t replace the other, and they&apos;re fine to take together
                [1][2].
              </li>
            </ul>
          ),
        },
        {
          heading: "What creatine is",
          body: (
            <>
              <p>
                Creatine is a compound your body makes from three amino acids (arginine, glycine and methionine) and
                stores mostly in muscle. It also comes from food, mainly meat and fish [1].
              </p>
              <p>
                In muscle, creatine is stored as phosphocreatine, which quickly regenerates the energy your muscles use
                in the first few seconds of an intense effort. Supplementing raises those stores, which is why the main
                benefits show up in repeated high-intensity work and strength training [1].
              </p>
            </>
          ),
        },
        {
          heading: "Does creatine count toward your protein?",
          body: (
            <p>
              No. Even though it&apos;s made from amino acids, creatine isn&apos;t a protein and doesn&apos;t count
              toward your daily protein target. A 5g scoop of creatine adds nothing to your protein total, so you
              still need to hit your number from food or{" "}
              <Link href="/protein-guides/protein-powder-types" className={linkCls}>protein powder</Link>. Work out your
              target with the <Link href="/protein-calculator" className={linkCls}>protein calculator</Link>.
            </p>
          ),
        },
        {
          heading: "Can you take creatine and protein together?",
          body: (
            <>
              <p>
                Yes. There&apos;s no interaction to worry about, and mixing creatine into your protein shake is a
                simple way to remember it. Taking creatine with a meal or shake containing protein and carbohydrate may
                even help your muscles take it up [1].
              </p>
              <p>
                Timing matters much less than taking it consistently every day, because the benefit comes from keeping
                your muscle stores topped up rather than from any single dose [1][2].
              </p>
            </>
          ),
        },
        {
          heading: "How much creatine to take",
          body: (
            <>
              <p>The most researched form is creatine monohydrate [1]. There are two common approaches:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Steady:</strong> 3–5g a day. Muscle stores fill up over about three to four weeks [1].
                </li>
                <li>
                  <strong>Loading:</strong> about 0.3g per kg of body weight a day (roughly 20g, split into four doses)
                  for 5–7 days, then 3–5g a day. This fills stores faster but isn&apos;t necessary [1][2].
                </li>
              </ul>
              <p>
                Both end up in the same place. Some people find a loading phase upsets their stomach, which is a good
                reason to just start at 3–5g.
              </p>
            </>
          ),
        },
        {
          heading: "Who might benefit",
          body: (
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>People doing strength or high-intensity training:</strong> this is where the evidence is
                strongest [1]. The Australian Institute of Sport rates creatine among the supplements with strong
                evidence for specific sporting situations [3].
              </li>
              <li>
                <strong>Vegetarians and vegans:</strong> without meat or fish, muscle creatine stores tend to be
                lower, so supplementing can raise them more [1].
              </li>
              <li>
                <strong>Older adults doing resistance training:</strong> research on creatine alongside strength
                training in older adults is promising [1][2].
              </li>
              <li>
                <strong>Not only men or bodybuilders:</strong> the research includes women, and the same dosing
                applies [2].
              </li>
            </ul>
          ),
        },
        {
          heading: "Is creatine safe?",
          body: (
            <>
              <p>
                Creatine monohydrate is one of the most studied supplements. For healthy people, the research hasn&apos;t
                found it harms the kidneys or liver at recommended doses, including in longer-term studies [1][2]. It
                isn&apos;t a steroid [2].
              </p>
              <p>
                Expect a small rise in body weight in the first weeks, mostly from extra water stored in muscle rather
                than fat [1][2]. If you have kidney disease, take regular medication, are pregnant or breastfeeding, or
                are under 18, check with your GP first. Athletes who are drug-tested should choose a product that&apos;s
                been batch-tested for banned substances [3].
              </p>
            </>
          ),
        },
        {
          heading: "Creatine doesn't replace the basics",
          body: (
            <p>
              Creatine can add a little to your training, but it won&apos;t make up for too little protein, too few
              calories or inconsistent training. Get your daily protein right first, spread it across your meals, then
              consider creatine as an extra. See our{" "}
              <Link href="/protein-guides/protein-for-muscle-gain" className={linkCls}>protein for muscle gain</Link>{" "}
              guide and{" "}
              <Link href="/protein-guides/how-much-protein-per-meal" className={linkCls}>how much protein per meal</Link>.
            </p>
          ),
        },
      ]}
      faqs={[
        {
          q: "Is creatine a protein?",
          a: "No. Creatine is made from amino acids, but it isn't a protein and doesn't count toward your daily protein target. It helps your muscles produce energy for short, intense efforts.",
        },
        {
          q: "Can I mix creatine with my protein shake?",
          a: "Yes. There's no interaction, and taking it with a shake or meal is an easy way to remember it. Taking it every day matters more than when you take it.",
        },
        {
          q: "Do I need to do a creatine loading phase?",
          a: "No. Loading fills your muscle stores in about a week, while 3–5g a day gets you to the same place in about three to four weeks. Many people skip loading because it can upset the stomach.",
        },
        {
          q: "Is creatine safe?",
          a: "For healthy people, creatine monohydrate at recommended doses is one of the most studied supplements and hasn't been found to harm the kidneys or liver. If you have kidney disease or another health condition, check with your GP first.",
        },
        {
          q: "Will creatine make me gain weight?",
          a: "You may gain a little weight in the first few weeks, mostly from extra water stored in your muscles rather than fat.",
        },
        {
          q: "Does creatine cause hair loss?",
          a: "There's no good evidence that it does. The idea comes from one small study that measured a hormone linked to hair loss, not hair loss itself, and it hasn't been confirmed by later research.",
        },
      ]}
      footer={
        <References
          sources={CREATINE_SOURCES}
          lastUpdated={CREATINE_LAST_UPDATED}
          disclaimer={CREATINE_DISCLAIMER}
          path={PATH}
        />
      }
      ctaHeading="Get your protein right first"
      ctaBody="HitProtein sets your daily protein target and tracks it as you eat, so you know the basics are covered."
    />
  );
}
