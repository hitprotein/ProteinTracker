"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/CookieConsent";

// Lets visitors change their analytics choice after dismissing the banner.
export default function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
