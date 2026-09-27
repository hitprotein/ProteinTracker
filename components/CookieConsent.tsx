"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "pt_cookie_consent";
// Fired by the footer's "Cookie settings" button to reopen the banner.
export const OPEN_COOKIE_SETTINGS_EVENT = "pt:open-cookie-settings";
type Consent = "accepted" | "declined" | null;

// localStorage can throw (Safari private mode, blocked site data). Treat that
// as "no stored choice" rather than crashing the page.
function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(choice: "accepted" | "declined") {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Choice still applies for this page view; it just won't persist.
  }
}

// Withdrawing consent after GA has loaded: the script can't be unloaded, but
// GA's documented opt-out flag stops it sending anything further, and its
// cookies are removed. Cookies are set on the registrable domain, so try
// every parent domain of the current host.
function disableAnalytics(gaId: string) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = true;
  const parts = window.location.hostname.split(".");
  const domains = parts.map((_, i) => parts.slice(i).join("."));
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${d}`;
    }
  }
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [hydrated, setHydrated] = useState(false);
  const [reopened, setReopened] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    setConsent(readConsent());
    setHydrated(true);

    const open = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  function decide(choice: "accepted" | "declined") {
    writeConsent(choice);
    if (gaId) {
      if (choice === "declined") disableAnalytics(gaId);
      else delete (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`];
    }
    setConsent(choice);
    setReopened(false);
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

      {hydrated && (consent === null || reopened) && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-pt-white/10 bg-pt-black px-6 py-5 text-pt-white"
        >
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
