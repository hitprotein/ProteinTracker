import type { Metadata } from "next";
import Link from "next/link";
import Glp1Calculator from "@/components/Glp1Calculator";
import Glp1References from "@/components/Glp1References";
import FaqSection from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "GLP-1 Protein Calculator: How Much Protein Do I Need on GLP-1?",
  description:
    "Free GLP-1 protein calculator for Australians. See the daily protein range published guidance suggests when you're eating less on a GLP-1-based medicine, with sources and per-meal targets.",
  alternates: { canonical: "/protein-calculator/glp-1" },
};

const faqs = [
  {
    q: "How much protein should I eat on a GLP-1 medicine?",
    a: "Published expert guidance suggests about 1.2–1.5g of protein per kg of body weight per day while you're actively losing weight, and at least 0.8g per kg during maintenance (more for adults 65+). A practical target of 80–120g a day is also described. Your prescriber, GP or dietitian can set the right number for you.",
  },
  {
    q: "Why is this different from the standard protein calculator?",
    a: "The standard calculator is built for general fitness and body-composition goals. This one follows guidance written specifically for people using GLP-1-based medicines, who are often eating much less than usual.",
  },
  {
    q: "Can protein shakes or bars help?",
    a: "The guidance notes that shakes and bars can help some people reach their protein target when appetite is low. Whole foods are still the foundation, and if you have kidney problems or another health condition, check with your doctor first.",
  },
  {
    q: "Is this calculator medical advice?",
    a: "No. It shows general ranges from published guidance so you can have a better-informed conversation with your healthcare team. It doesn't replace advice from your prescriber, GP or an Accredited Practising Dietitian.",
  },
];

export default function Glp1CalculatorPage() {
  const linkCls = "font-semibold text-pt-black underline";
  return (
    <>
      <section className="bg-pt-black py-16 text-pt-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">GLP-1 Protein Calculator</h1>
          <p className="mx-auto mt-4 max-w-xl text-pt-white/70">
            How much protein published guidance suggests when you&apos;re eating less on a GLP-1-based medicine,
            with the sources behind every number.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-2xl px-6">
        <Glp1Calculator />
      </section>

      <article className="mx-auto mt-16 max-w-3xl px-6 pb-24">
        <h2 className="text-2xl font-bold">How this calculator works</h2>
        <div className="mt-3 space-y-3 text-pt-black/80">
          <p>
            It uses the ranges in two 2025 publications on nutrition for people using GLP-1-based therapies: a joint
            advisory from four obesity and nutrition societies [1] and an expert consensus statement [2]. While you&apos;re
            actively losing weight, the consensus suggests 1.2–1.5g of protein per kg of body weight a day. During
            maintenance it suggests at least 0.8g per kg, and older adults at least 1.0–1.2g per kg.
          </p>
          <p>
            The advisory also describes an absolute target of 80–120g a day as a practical option [1]. If your
            weight-based number looks high, that&apos;s a sensible thing to raise with your dietitian.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-bold">Why protein can get harder when you&apos;re eating less</h2>
        <div className="mt-3 space-y-3 text-pt-black/80">
          <p>
            When portions shrink, protein often shrinks with them. The guidance highlights that when weight comes off
            quickly and food intake drops a lot, some of the weight lost can be lean tissue, which is why it focuses on
            getting enough protein and keeping up strength training [1][2].
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-bold">Making smaller meals count</h2>
        <div className="mt-3 space-y-3 text-pt-black/80">
          <ul className="list-disc space-y-2 pl-6">
            <li>Spread protein across three to five smaller meals or snacks instead of one or two big ones.</li>
            <li>Start each meal with the protein part, so it&apos;s eaten before you feel full.</li>
            <li>
              Lean on protein-dense foods that are easy to eat in small amounts, like{" "}
              <Link href="/protein-foods/greek-yoghurt" className={linkCls}>Greek yoghurt</Link>,{" "}
              <Link href="/protein-foods/eggs" className={linkCls}>eggs</Link>,{" "}
              <Link href="/protein-foods/cottage-cheese" className={linkCls}>cottage cheese</Link>,{" "}
              <Link href="/protein-foods/tuna" className={linkCls}>tuna</Link> and{" "}
              <Link href="/protein-foods/tofu" className={linkCls}>tofu</Link>.
            </li>
            <li>
              Our <Link href="/protein-meal-calculator" className={linkCls}>protein meal calculator</Link> can help
              you plan meals that hit a per-meal target.
            </li>
          </ul>
        </div>

        <h2 className="mt-10 text-2xl font-bold">Protein isn&apos;t the whole picture</h2>
        <div className="mt-3 space-y-3 text-pt-black/80">
          <p>
            The joint advisory stresses that more protein on its own isn&apos;t enough, and pairs it with regular
            resistance (strength) exercise [1]. It also covers fluids, fibre and overall food quality. For the full
            picture, read our <Link href="/protein-guides/protein-and-glp-1" className={linkCls}>guide to protein
            and GLP-1</Link>.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-bold">When to talk to your healthcare team</h2>
        <div className="mt-3 space-y-3 text-pt-black/80">
          <p>
            Speak to your prescriber or GP if you&apos;re regularly struggling to eat or drink, or if you have kidney
            disease or another condition that affects how much protein you should have. An Accredited Practising
            Dietitian can build a plan around your medicine, appetite and goals [3][4].
          </p>
        </div>

        <FaqSection faqs={faqs} />
        <Glp1References />
      </article>
    </>
  );
}
