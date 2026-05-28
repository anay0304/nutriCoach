import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── NutriCoach design tokens ──────────────────────────
        // Base background (warm beige)
        bg: {
          DEFAULT: "#f1ead9",
          soft: "#ebe3cf",
        },
        // Card surfaces
        surface: {
          DEFAULT: "#fbf7ee",
          2: "#f6efde",
        },
        // Hairlines / borders
        hairline: {
          DEFAULT: "#e5dcc4",
          strong: "#d8cdb1",
        },
        // Ink (navy structure)
        ink: {
          DEFAULT: "#1a2435",
          2: "#2f3b50",
          3: "#5b6577",
          4: "#8a8f9c",
          muted: "#a8a799",
        },
        // Growth (sage) — progress only
        sage: {
          DEFAULT: "#7e9479",
          soft: "#d8e1d1",
          ink: "#4a5e46",
        },
        // Accent (amber) — primary CTA
        amber: {
          DEFAULT: "#c97a4a",
          hover: "#b86a3b",
          soft: "#efd6c2",
          ink: "#7a3f1b",
        },
        // Secondary CTA accent
        coral: "#d8836a",
      },
      fontFamily: {
        serif: ["Newsreader", "Source Serif 4", "ui-serif", "Georgia", ...fontFamily.serif],
        sans: ["Geist", "Manrope", ...fontFamily.sans],
        mono: ["JetBrains Mono", "IBM Plex Mono", ...fontFamily.mono],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "18px",
        xl: "24px",
        pill: "999px",
      },
      boxShadow: {
        1: "0 1px 0 rgba(26,36,53,0.04), 0 1px 2px rgba(26,36,53,0.04)",
        2: "0 1px 0 rgba(26,36,53,0.04), 0 6px 18px -10px rgba(26,36,53,0.18)",
        3: "0 2px 0 rgba(26,36,53,0.04), 0 24px 48px -24px rgba(26,36,53,0.28)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "pop-in": { from: { opacity: "0", transform: "scale(.96) translateY(8px)" }, to: { opacity: "1", transform: "scale(1) translateY(0)" } },
        typing: {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "30%": { transform: "translateY(-3px)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in .2s ease",
        "pop-in": "pop-in .25s ease",
        typing: "typing 1s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
