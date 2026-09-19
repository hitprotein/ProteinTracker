"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const LINK_GROUPS: { heading: string; links: { label: string; href: string }[] }[] = [
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

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-pt-white"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 max-h-[80vh] overflow-y-auto border-t border-pt-white/10 bg-pt-black px-6 py-6">
          {LINK_GROUPS.map((group) => (
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
    </div>
  );
}
