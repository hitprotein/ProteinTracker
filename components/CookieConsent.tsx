"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "pt_cookie_consent";
type Consent = "accepted" | "declined" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [hydrated, setHydrated] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY) as Consent;
    setConsent(stored);
    setHydrated(true);
  }, []);

  function decide(choice: "accepted" | "declined") {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setConsent(choice);
  }

  return (
    <>
      {/* GA4 only loads once the visitor has actively accepted — not on
          page load, and never if they decline. */}
      {gaId && consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {hydrated && consent === null && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-pt-white/10 bg-pt-black px-6 py-5 text-pt-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-sm text-pt-white/80">
              We use cookies to understand site traffic via Google
              Analytics. Accept to help us improve the site, or decline to
              browse without analytics tracking.
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => decide("declined")}
                className="rounded-full border border-pt-white/30 px-5 py-2 text-sm font-semibold text-pt-white hover:bg-pt-white/10"
              >
                Decline
              </button>
              <button
                onClick={() => decide("accepted")}
                className="rounded-full bg-pt-green px-5 py-2 text-sm font-bold text-pt-black hover:opacity-90"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
