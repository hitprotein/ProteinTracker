import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/CtaButton";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

const heading = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://proteintracker.com.au"),
  title: {
    default: "Protein Tracker Australia | Calculate & Hit Your Protein Goal",
    template: "%s | ProteinTracker.com.au",
  },
  description:
    "Calculate how much protein you need, discover high-protein foods and meals, and learn how to reach your daily protein target — then track it with HitProtein.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon-180x180.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#0B0D0C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${heading.variable} ${body.variable}`}>
      <body>
        <header className="relative bg-pt-black">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" aria-label="ProteinTracker.com.au home">
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
              <MobileNav />
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-24 border-t border-pt-black/10 bg-pt-black py-12 text-pt-white">
          <div className="mx-auto max-w-6xl px-6">
            <Image
              src="/footer-logo.png"
              alt="ProteinTracker.com.au"
              width={129}
              height={48}
              className="h-6 w-auto"
            />
            <Image
              src="/powered-by-hitprotein.png"
              alt="Powered by HitProtein"
              width={641}
              height={49}
              className="mt-3 h-5 w-auto"
            />
            <p className="mt-4 max-w-xl text-sm text-pt-white/60">
              Nutrition figures are sourced from Australian government
              references (FSANZ AUSNUT/NUTTAB, Eat for Health) where
              available and are approximate — actual values vary by brand,
              cut and preparation. This site does not provide medical
              advice.
            </p>
            <a
              href="https://hitprotein.com.au"
              className="mt-6 inline-block text-sm font-semibold text-pt-green"
            >
              HitProtein — the protein tracking app →
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
