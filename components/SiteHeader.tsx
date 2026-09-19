"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import CtaButton from "@/components/CtaButton";

const MOBILE_LINK_GROUPS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Calculate",
    links: [
      { label: "Protein Calculator", href: "/protein-calculator" },
      { label: "For Weight Loss", href: "/protein-calculator/weight-loss" },
      { label: "For Muscle Gain", href: "/protein-calculator/muscle-gain" },
      { label: "For Women", href: "/protein-calculator/women" },
      { label: "For Men", href: "/protein-calculator/men" },
      { label: "Over 50", href: "/protein-calculator/over-50" },
    ],
  },
  {
    heading: "Track",
    links: [
      { label: "Protein Tracker", href: "/protein-tracker" },
      { label: "AI Protein Tracker", href: "/ai-protein-tracker" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Foods", href: "/protein-foods" },
      { label: "Meals", href: "/protein-meals" },
      { label: "Meal Calculator", href: "/protein-meal-calculator" },
      { label: "Guides", href: "/protein-guides" },
    ],
  },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-pt-black">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="ProteinTracker.com.au home" onClick={() => setOpen(false)}>
          <Image
            src="/header-logo-64h.png"
            alt="ProteinTracker.com.au"
            width={592}
            height={220}
            priority
            className="h-16 w-auto md:h-20"
          />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-pt-white/80 md:flex">
          <div className="group relative">
            <button className="flex items-center gap-1 py-2 hover:text-pt-white">
              Calculate
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="mt-0.5">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full w-56 rounded-card border border-pt-white/10 bg-pt-black p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              <Link href="/protein-calculator" className="block rounded-lg px-3 py-2 hover:bg-pt-white/10 hover:text-pt-white">
                Protein Calculator
              </Link>
              <Link href="/protein-calculator/weight-loss" className="block rounded-lg px-3 py-2 hover:bg-pt-white/10 hover:text-pt-white">
                For Weight Loss
              </Link>
              <Link href="/protein-calculator/muscle-gain" className="block rounded-lg px-3 py-2 hover:bg-pt-white/10 hover:text-pt-white">
                For Muscle Gain
              </Link>
              <Link href="/protein-calculator/women" className="block rounded-lg px-3 py-2 hover:bg-pt-white/10 hover:text-pt-white">
                For Women
              </Link>
              <Link href="/protein-calculator/men" className="block rounded-lg px-3 py-2 hover:bg-pt-white/10 hover:text-pt-white">
                For Men
              </Link>
              <Link href="/protein-calculator/over-50" className="block rounded-lg px-3 py-2 hover:bg-pt-white/10 hover:text-pt-white">
                Over 50
              </Link>
            </div>
          </div>

          <div className="group relative">
            <button className="flex items-center gap-1 py-2 hover:text-pt-white">
              Track
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="mt-0.5">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full w-56 rounded-card border border-pt-white/10 bg-pt-black p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              <Link href="/protein-tracker" className="block rounded-lg px-3 py-2 hover:bg-pt-white/10 hover:text-pt-white">
                Protein Tracker
              </Link>
              <Link href="/ai-protein-tracker" className="block rounded-lg px-3 py-2 hover:bg-pt-white/10 hover:text-pt-white">
                AI Protein Tracker
              </Link>
            </div>
          </div>

          <Link href="/protein-foods" className="hover:text-pt-white">
            Foods
          </Link>
          <Link href="/protein-meals" className="hover:text-pt-white">
            Meals
          </Link>
          <Link href="/protein-guides" className="hover:text-pt-white">
            Guides
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <CtaButton href="https://hitprotein.com.au/download">
            Try HitProtein
          </CtaButton>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-pt-white md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel — normal document flow, so it pushes the page
          down rather than overlaying it. Desktop never sees this (md:hidden
          on the trigger keeps `open` from mattering above the breakpoint). */}
      {open && (
        <div className="border-t border-pt-white/10 px-6 py-6 md:hidden">
          {MOBILE_LINK_GROUPS.map((group) => (
            <div key={group.heading} className="mb-6 last:mb-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-pt-white/40">
                {group.heading}
              </p>
              <div className="mt-2 flex flex-col">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-2 text-base font-medium text-pt-white/90 hover:text-pt-green"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
