import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Single source of truth for every "go to HitProtein" button on the site.
// Style once here rather than per-page — keeps every CTA visually identical
// and means a brand tweak only needs one edit.
export default function CtaButton({
  href,
  children,
  size = "md",
  className = "",
}: CtaButtonProps) {
  // "sm" is compact on phones and matches "md" from the sm breakpoint up —
  // for tight spots like the header, next to the logo.
  const sizeClasses = {
    sm: "px-4 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }[size];
  // Internal links go through next/link for client-side navigation and
  // prefetching; external ones (HitProtein download) stay a plain <a>.
  const Anchor = href.startsWith("/") ? Link : "a";

  return (
    <Anchor
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full bg-pt-green font-heading font-extrabold uppercase tracking-wide text-pt-black shadow-[0_0_0_3px_rgba(180,255,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(180,255,0,0.3)] ${sizeClasses} ${className}`}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      />
    </Anchor>
  );
}
