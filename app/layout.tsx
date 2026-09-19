import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/CtaButton";
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
        <header className="bg-pt-black">
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
              <Link href="/protein-calculator" className="hover:text-pt-white">
                Calculate
              </Link>
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
            <CtaButton href="https://hitprotein.com.au/download">
              Try HitProtein
            </CtaButton>
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
