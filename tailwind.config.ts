import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: {
          DEFAULT: "#131316",
          raised: "#18181C",
        },
        border: {
          DEFAULT: "#232326",
          subtle: "#1B1B1F",
        },
        foreground: {
          DEFAULT: "#FFFFFF",
          muted: "#A1A1AA",
          faint: "#71717A",
        },
        accent: {
          DEFAULT: "#FFFFFF",
          hover: "#A1A1AA",
          muted: "#18181C",
        },
        pricing: {
          free: "#71717A",
          freemium: "#71717A",
          paid: "#52525B",
          trial: "#3F3F46",
        },
        success: "#22C55E",
        danger: "#E5484D",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        sm: "8px",
        md: "10px",
        lg: "12px",
        card: "20px",
        full: "999px",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
