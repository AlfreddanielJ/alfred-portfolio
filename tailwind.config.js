/* Layout, type and spacing tokens come from the Stitch project "Academic Professor Portfolio UI".
   Colors: the original light neutrals, with the Stitch blue accent replaced by charcoal (#1A1A1A / #222222).
   Dark bands use a charcoal gradient (#1A1A1A → #3A3A3A). Change the accent in the `secondary*` values. */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Surfaces: page → card → inset → hover (neutral greys, no blue cast) */
        background: "#F6F6F6",
        surface: "#F6F6F6",
        "surface-dim": "#D9D9D9",
        "surface-bright": "#F6F6F6",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F1F1F1",
        "surface-container": "#EBEBEB",
        "surface-container-high": "#E4E4E4",
        "surface-container-highest": "#DDDDDD",
        "surface-variant": "#E0E0E0",
        "surface-tint": "#555555",

        /* Text */
        "on-background": "#1A1A1A",
        "on-surface": "#1A1A1A",
        "on-surface-variant": "#4A4A4A",
        outline: "#777777",
        "outline-variant": "#C8C8C8",
        "inverse-surface": "#222222",
        "inverse-on-surface": "#F2F2F2",
        "inverse-primary": "#BDBDBD",

        /* Primary: charcoal buttons; primary-container is the dark slab used for bands */
        primary: "#1A1A1A",
        "on-primary": "#FFFFFF",
        "primary-container": "#1A1A1A",
        "on-primary-container": "#A8A8A8",
        "primary-fixed": "#E4E4E4",
        "primary-fixed-dim": "#CFCFCF",
        "on-primary-fixed": "#1A1A1A",
        "on-primary-fixed-variant": "#CFCFCF",

        /* Accent: charcoal (replaces the blue) */
        secondary: "#222222",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#3A3A3A",
        "on-secondary-container": "#FFFFFF",
        "secondary-fixed": "#E6E6E6",
        "secondary-fixed-dim": "#D2D2D2",
        "on-secondary-fixed": "#1A1A1A",
        "on-secondary-fixed-variant": "#2E2E2E",

        /* Errors / SCIE badges (unchanged from the design) */
        error: "#BA1A1A",
        "on-error": "#FFFFFF",
        "error-container": "#FFDAD6",
        "on-error-container": "#93000A",

        /* Tertiary (unused by the layouts; kept neutral) */
        tertiary: "#1A1A1A",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#2E2E2E",
        "on-tertiary-container": "#E6E6E6",
        "tertiary-fixed": "#E4E4E4",
        "tertiary-fixed-dim": "#CFCFCF",
        "on-tertiary-fixed": "#1A1A1A",
        "on-tertiary-fixed-variant": "#4A4A4A",
      },
      borderRadius: { DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem" },
      spacing: {
        "space-xs": "0.25rem",
        "margin-desktop": "3rem",
        "space-md": "1rem",
        margin: "1rem",
        "space-xl": "2.5rem",
        "gutter-desktop": "2rem",
        "space-2xl": "4rem",
        "space-sm": "0.5rem",
        gutter: "1.5rem",
        "space-lg": "1.5rem",
      },
      fontFamily: {
        "headline-md": ["Playfair Display"],
        "label-badge": ["Inter"],
        "body-lg": ["Inter"],
        "label-md": ["Inter"],
        "code-doi": ["Inter"],
        "display-hero-mobile": ["Playfair Display"],
        "body-md": ["Inter"],
        "body-citation": ["Inter"],
        "headline-lg-mobile": ["Playfair Display"],
        "headline-lg": ["Playfair Display"],
        "display-hero": ["Playfair Display"],
        "headline-sm": ["Inter"],
      },
      fontSize: {
        "headline-md": ["1.5rem", { lineHeight: "1.35", letterSpacing: "0em", fontWeight: "600" }],
        "label-badge": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.06em", fontWeight: "700" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        "label-md": ["0.8125rem", { lineHeight: "1.25", letterSpacing: "0.02em", fontWeight: "600" }],
        "code-doi": ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }],
        "display-hero-mobile": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "body-md": ["0.9375rem", { lineHeight: "1.65", fontWeight: "400" }],
        "body-citation": ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-lg-mobile": ["1.75rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "600" }],
        "display-hero": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-sm": ["1.125rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};
