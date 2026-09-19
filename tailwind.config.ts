import type { Config } from "tailwindcss";

// Design tokens — see /docs/design-system.md for rationale.
// Colors are fixed by the ProteinTracker brand brief (do not introduce new hues).
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pt-black": "#0B0D0C",
        "pt-grey": "#171A18",
        "pt-white": "#FFFFFF",
        "pt-offwhite": "#F5F7F5",
        "pt-green": "#B4FF00", // matches HitProtein's approved bright green
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
