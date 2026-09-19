"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/CtaButton";

const CALCULATE_LINKS = [
  { label: "Protein Calculator", href: "/protein-calculator" },
  { label: "For Weight Loss", href: "/protein-calculator/weight-loss" },
  { label: "For Muscle Gain", href: "/protein-calculator/muscle-gain" },
  { label: "For Women", href: "/protein-calculator/women" },
  { label: "For Men", href: "/protein-calculator/men" },
  { label: "Over 50", href: "/protein-calculator/over-50" },
];

const TRACK_LINKS = [
  { label: "Protein Tracker", href: "/protein-tracker" },
  { label: "AI Protein Tracker", href: "/ai-protein-tracker" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      className={`mt-0.5 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function NavDropdown({
  label,
  links,
  openKey,
  thisKey,
  setOpenKey,
}: {
  label: string;
  links: { label: string; href: string }[];
  openKey: string | null;
  thisKey: string;
  setOpenKey: (k: string | null) => void;
}) {
  const isOpen = openKey === thisKey;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpenKey(isOpen ? null : thisKey)}
        className="flex items-center gap-1 whitespace-nowrap py-1 hover:text-pt-white"
      >
        {label}
        <Chevron open={isOpen} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-2 w-56 rounded-card border border-pt-white/10 bg-pt-black p-2 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpenKey(null)}
              className="block rounded-lg px-3 py-2 text-pt-white/90 hover:bg-pt-white/10 hover:text-pt-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SiteHeader() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <header className="bg-pt-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="ProteinTracker.com.au home" onClick={() => setOpenKey(null)}>
          <Image
            src="/header-logo-64h.png"
            alt="ProteinTracker.com.au"
            width={592}
            height={220}
            priority
            className="h-14 w-auto md:h-20"
          />
        </Link>
        <CtaButton href="https://hitprotein.com.au/download">
          Try HitProtein
        </CtaButton>
      </div>

      {/* Nav row: always visible on every screen size, scrolls horizontally
          on narrow phones rather than wrapping or hiding behind a menu
          button people have to know to tap. */}
      <div className="border-t border-pt-white/10">
        <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-6 py-3 text-sm font-medium text-pt-white/80">
          <NavDropdown
            label="Calculate"
            links={CALCULATE_LINKS}
            openKey={openKey}
            thisKey="calculate"
            setOpenKey={setOpenKey}
          />
          <NavDropdown
            label="Track"
            links={TRACK_LINKS}
            openKey={openKey}
            thisKey="track"
            setOpenKey={setOpenKey}
          />
          <Link href="/protein-foods" className="whitespace-nowrap py-1 hover:text-pt-white">
            Foods
          </Link>
          <Link href="/protein-meals" className="whitespace-nowrap py-1 hover:text-pt-white">
            Meals
          </Link>
          <Link href="/protein-guides" className="whitespace-nowrap py-1 hover:text-pt-white">
            Guides
          </Link>
        </div>
      </div>
    </header>
  );
}
