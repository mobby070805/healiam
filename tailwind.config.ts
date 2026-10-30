import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Healiam black (from healiam.com): headings, dark bands, step circles.
        ink: {
          DEFAULT: "#0A0A0F",
          soft: "#3F3F46",
          muted: "#6B6B76",
          faint: "#A1A1AA",
        },
        // Healiam pink (from healiam.com): primary CTA buttons only.
        brand: {
          DEFAULT: "#E83656",
          hover: "#D42C4B",
          // Darker pink for small eyebrow text so it stays readable on white.
          deep: "#C8284A",
        },
        green: {
          DEFAULT: "#168A4C",
          tint: "#E8F3EA",
          // Darker green for small text on the tint, where the default green is only 3.9:1.
          deep: "#0F6B3A",
        },
        // Alternate section background (cool neutral to sit with Healiam black).
        mist: "#F6F6F8",
      },
      fontFamily: {
        // Same family for headings and body (one consistent font family).
        display: ["var(--font-brand)", "system-ui", "sans-serif"],
        sans: ["var(--font-brand)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      keyframes: {
        grow: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
