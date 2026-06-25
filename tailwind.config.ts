import type { Config } from "tailwindcss";

/**
 * Madane Design Workshop — design tokens (binding, from PRD §6).
 * This file is the single theme source. Values mirror src/styles/tokens.css.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    // Strict 12-col rhythm; content capped at 1280–1440 (PRD §6.3 / §11).
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2.5rem", lg: "3.5rem" },
      screens: { "2xl": "1440px" },
    },
    screens: {
      sm: "641px", // tablet starts (PRD breakpoints)
      md: "769px",
      lg: "1025px", // desktop
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        // Dark theme — ink = light foreground, paper = dark surface.
        ink: "#ECECE6",
        paper: "#0F0F0F",
        stone: "#23262F", // cool dark tint — section tint / hovers
        sand: "#2A241E", // warm dark tint — accent blocks / cards
        mount: "#181818", // card / image-mount surface
        hairline: "#2C2C2C",
        "ink-muted": "#9C9C97",
        "paper-muted": "#5A5A55",
      },
      fontFamily: {
        display: ["var(--font-avantgarde)", "system-ui", "sans-serif"],
        sans: ["var(--font-avantgarde)", "system-ui", "sans-serif"],
        mono: ["var(--font-avantgarde)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // PRD type scale (px): 12·14·16·18·24·32·40·56·72·96
        "2xs": ["0.75rem", { lineHeight: "1.4" }], // 12
        xs: ["0.875rem", { lineHeight: "1.45" }], // 14
        base: ["1rem", { lineHeight: "1.65" }], // 16 — body
        lead: ["1.125rem", { lineHeight: "1.5" }], // 18
        "2xl": ["1.5rem", { lineHeight: "1.2" }], // 24
        "3xl": ["2rem", { lineHeight: "1.1" }], // 32
        h2: ["1.75rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }], // 28 — H2
        h1: ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.015em" }], // 40 — H1
        "4xl": ["3.5rem", { lineHeight: "1.0", letterSpacing: "-0.02em" }], // 56
        display: ["4rem", { lineHeight: "1.0", letterSpacing: "-0.02em" }], // 64
        "5xl": ["4.5rem", { lineHeight: "0.98", letterSpacing: "-0.02em" }], // 72
        "6xl": ["6rem", { lineHeight: "0.95", letterSpacing: "-0.025em" }], // 96
      },
      spacing: {
        // 8px base rhythm: 4·8·12·16·24·32·48·64·96·128
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "6": "1.5rem",
        "8": "2rem",
        "12": "3rem",
        "16": "4rem",
        "24": "6rem",
        "32": "8rem",
        section: "clamp(4rem, 10vw, 10rem)", // 64–160px section padding
        "section-sm": "clamp(4rem, 8vw, 5rem)",
      },
      maxWidth: {
        content: "1280px",
        wide: "1440px",
        prose: "68ch", // 66–72ch long-form
        lead: "52ch",
      },
      borderRadius: {
        none: "0px",
        card: "14px", // soft teaser cards only (12–16px)
      },
      letterSpacing: {
        label: "0.18em", // mono labels +18%
        tight: "-0.01em",
        tighter: "-0.02em",
      },
      transitionTimingFunction: {
        // The one signature ease (PRD §6.5)
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
      },
      boxShadow: {
        none: "none", // PRD: no drop shadows
      },
      keyframes: {
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(-7%, 5%)" },
          "70%": { transform: "translate(5%, 12%)" },
          "90%": { transform: "translate(-3%, 8%)" },
        },
      },
      animation: {
        grain: "grain-shift 8s steps(6) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
