import type { Metadata } from "next";
import Link from "next/link";
import GuidePageTemplate from "../GuidePageTemplate";
import Glp1References from "@/components/Glp1References";

export const metadata: Metadata = {
  title: "Protein and GLP-1: A Practical Guide for Australians",
  description:
    "How much protein published guidance suggests on GLP-1-based medicines, how to hit it when your appetite is smaller, and when to involve your doctor or dietitian. Fully referenced.",
  alternates: { canonical: "/protein-guides/protein-and-glp-1" },
};

const linkCls = "font-semibold text-pt-black underline";

export default function ProteinAndGlp1Guide() {
  return (
    <GuidePageTemplate
      h1="Protein and GLP-1"
      subtitle="A practical, referenced guide to getting enough protein when you're eating less on a GLP-1-based medicine."
      sections={[
        {
          heading: "Who this guide is for",
          body: (
            <p>
              Adults who have been prescribed a GLP-1-based medicine by their doctor and want to make sure they&apos;re
              eating enough protein. It&apos;s general nutrition information drawn from published guidance, not advice
              about any medicine. Questions about your medicine belong with your prescriber.
            </p>
          ),
        },
        {
          heading: "Why protein matters when you're eating less",
          body: (
            <>
              <p>
                If your appetite is smaller than it used to be, total food intake can drop a lot, and protein often
                drops with it. Published guidance notes that when weight is lost quickly and intake is substantially
                reduced, some of the weight lost can be lean tissue, including muscle. That&apos;s why it puts getting
                enough protein, alongside strength training, near the top of its priorities [1][2].
              </p>
            </>
          ),
        },
        {
          heading: "How much protein published guidance suggests",
          body: (
            <>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong>While actively losing weight:</strong> about 1.2–1.5g per kg of body weight per day [2].</li>
                <li><strong>During weight maintenance:</strong> at least 0.8g per kg per day [2].</li>
                <li><strong>Adults 65 and over:</strong> at least 1.0–1.2g per kg per day [2].</li>
                <li><strong>A simpler alternative:</strong> an absolute target of 80–120g a day [1].</li>
              </ul>
              <p>
                The joint advisory also notes that protein shouldn&apos;t fall below about 0.4–0.5g per kg a day, and
                that very high intakes over long periods should be avoided [1]. Get your own range with our{" "}
                <Link href="/protein-calculator/glp-1" className={linkCls}>GLP-1 protein calculator</Link>.
              </p>
            </>
          ),
        },
        {
          heading: "Practical ways to get enough on a smaller appetite",
          body: (
            <ul className="list-disc space-y-2 pl-6">
              <li>Eat smaller, more frequent meals and snacks, each with a protein source.</li>
              <li>Eat the protein part of your meal first.</li>
              <li>
                Choose foods with a lot of protein for their size: <Link href="/protein-foods/greek-yoghurt" className={linkCls}>Greek
                yoghurt</Link>, <Link href="/protein-foods/eggs" className={linkCls}>eggs</Link>,{" "}
                <Link href="/protein-foods/cottage-cheese" className={linkCls}>cottage cheese</Link>,{" "}
                <Link href="/protein-foods/chicken-breast" className={linkCls}>chicken</Link>,{" "}
                <Link href="/protein-foods/salmon" className={linkCls}>fish</Link> and{" "}
                <Link href="/protein-foods/tofu" className={linkCls}>tofu</Link>.
              </li>
              <li>
                The guidance notes that protein shakes or bars can help some people reach their target when appetite is
                low [1]. Check with your doctor first if you have kidney problems.
              </li>
              <li>
                Track for a few days to see where you&apos;re actually landing. Most people are surprised how far short
                they are.
              </li>
            </ul>
          ),
        },
        {
          heading: "Strength training matters too",
          body: (
            <p>
              Both publications pair protein with regular resistance exercise, such as weights, bands or bodyweight
              work [1][2]. The advisory is clear that more protein on its own isn&apos;t enough [1]. If you&apos;re new to
              it, a GP, exercise physiologist or physiotherapist can help you start safely.
            </p>
          ),
        },
        {
          heading: "When to talk to your healthcare team",
          body: (
            <>
              <ul className="list-disc space-y-2 pl-6">
                <li>You&apos;re regularly struggling to eat or drink enough.</li>
                <li>You have kidney disease or another condition that affects how much protein you should eat.</li>
                <li>You&apos;re pregnant, breastfeeding, or planning a pregnancy.</li>
                <li>You want a personal plan built around your medicine, appetite and goals.</li>
              </ul>
              <p>
                An Accredited Practising Dietitian (APD) is the right professional for a personal nutrition plan in
                Australia [3][4]. Your GP can also refer you.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          q: "How much protein do I need on a GLP-1 medicine?",
          a: "Published expert guidance suggests about 1.2–1.5g per kg of body weight per day while actively losing weight, and at least 0.8g per kg during maintenance (at least 1.0–1.2g per kg for adults 65+). An absolute target of 80–120g a day is also described. Your healthcare team can tailor it for you.",
        },
        {
          q: "What are easy high-protein foods when I'm not very hungry?",
          a: "Foods with a lot of protein for their size are easiest: Greek yoghurt, eggs, cottage cheese, tuna, chicken, fish and tofu. Spreading them over smaller meals and eating the protein first can help.",
        },
        {
          q: "Is it enough to just eat more protein?",
          a: "No. The published guidance pairs protein with regular strength training and also covers fluids, fibre and overall food quality.",
        },
        {
          q: "Who should I talk to about my protein target?",
          a: "Your prescriber or GP, or an Accredited Practising Dietitian, who can set a personal target, especially if you have kidney disease or another health condition.",
        },
      ]}
      footer={<Glp1References />}
      ctaHeading="Want to see where your protein actually lands?"
      ctaBody="HitProtein tracks your daily protein and can estimate it from a photo of your meal. It's a food-tracking app, not medical advice."
    />
  );
}
