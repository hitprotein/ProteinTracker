"use client";

import { useEffect, useRef, useState } from "react";
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
  { label: "GLP-1 Protein", href: "/protein-calculator/glp-1" },
  { label: "Meal Calculator", href: "/protein-meal-calculator" },
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
      aria-hidden="true"
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
  const menuId = `nav-menu-${thisKey}`;
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setOpenKey(isOpen ? null : thisKey)}
        className="flex items-center gap-1 whitespace-nowrap py-1 hover:text-pt-white"
      >
        {label}
        <Chevron open={isOpen} />
      </button>
      {isOpen && (
        <div
          id={menuId}
          className="absolute left-0 top-full z-20 mt-2 w-56 rounded-card border border-pt-white/10 bg-pt-black p-2 shadow-lg"
        >
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
  const navRef = useRef<HTMLElement>(null);

  // Close an open dropdown on a click/tap anywhere outside the nav, or on
  // Escape — otherwise the only way to dismiss it is to hit its button again.
  useEffect(() => {
    if (!openKey) return;
    function onPointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenKey(null);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenKey(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openKey]);

  return (
    <header className="bg-pt-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" aria-label="ProteinTracker.com.au home" onClick={() => setOpenKey(null)}>
          <Image
            src="/header-logo-64h.png"
            alt="ProteinTracker.com.au"
            width={592}
            height={220}
            priority
            className="h-12 w-auto sm:h-14 md:h-20"
          />
        </Link>
        <CtaButton href="https://hitprotein.com.au/download" size="sm" className="shrink-0 whitespace-nowrap">
          Try HitProtein
        </CtaButton>
      </div>

      {/* Nav row: always visible on every screen size, wraps on narrow
          phones rather than hiding behind a menu button people have to know
          to tap. */}
      <nav ref={navRef} aria-label="Main" className="border-t border-pt-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 text-sm font-medium text-pt-white/80">
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
      </nav>
    </header>
  );
}
