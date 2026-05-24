import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  safelist: [
    // dynamic per-item colors used in nav / quick-links / category accents
    { pattern: /(bg|text|border)-babymo-(green|green-dark|green-soft|yellow|yellow-dark|coral|coral-dark|orange|sky|cream|ink|ink-soft)(\/(10|15|20|30|40|60))?/ },
    { pattern: /shadow-ios-(card|sticker|soft)/ },
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // Baby Mo brand palette (matches @babymo.official)
        babymo: {
          green: "#2EA84F",
          "green-dark": "#1E7A38",
          "green-soft": "#D6F0DD",
          yellow: "#FFE066",
          "yellow-dark": "#E5B900",
          coral: "#F87BAB",
          "coral-dark": "#E2447E",
          orange: "#FF8B3D",
          sky: "#88C0F2",
          cream: "#FFFBF2",
          "cream-2": "#FAF3E7",
          ink: "#1F2A1F",
          "ink-soft": "#3A4A3A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-rounded", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "SF Pro Text", "system-ui", "sans-serif"],
      },
      fontSize: {
        // iOS-style display sizes
        "display-xl": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["2.75rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["2rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "ios": "1.25rem",
        "ios-lg": "1.75rem",
      },
      boxShadow: {
        "ios-card": "0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 24px -8px rgba(20,30,20,0.10), 0 2px 8px -4px rgba(20,30,20,0.06)",
        "ios-sticker": "0 4px 0 rgba(20,30,20,0.08), 0 8px 20px -6px rgba(20,30,20,0.12)",
        "ios-soft": "0 4px 16px -4px rgba(20,30,20,0.08)",
      },
      backdropBlur: { "ios": "20px" },
      keyframes: {
        "fade-in": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "scale-in": { from: { opacity: "0", transform: "scale(0.96)" }, to: { opacity: "1", transform: "scale(1)" } },
        "shimmer": { "0%": { backgroundPosition: "-1000px 0" }, "100%": { backgroundPosition: "1000px 0" } },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "scale-in": "scale-in 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) both",
        "shimmer": "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
