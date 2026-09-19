import { ArrowRight } from "lucide-react";

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  size?: "md" | "lg";
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
  const sizeClasses =
    size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full bg-pt-green font-heading font-extrabold uppercase tracking-wide text-pt-black shadow-[0_0_0_3px_rgba(180,255,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(180,255,0,0.3)] ${sizeClasses} ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}
