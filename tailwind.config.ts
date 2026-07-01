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
        background: "#0B0B0E",
        surface: {
          DEFAULT: "#131316",
          raised: "#18181C",
        },
        border: {
          DEFAULT: "#232326",
          subtle: "#1B1B1F",
        },
        foreground: {
          DEFAULT: "#EDEDEF",
          muted: "#8B8B93",
          faint: "#5C5C64",
        },
        accent: {
          DEFAULT: "#6E56CF",
          hover: "#7C66DB",
          muted: "#2A2440",
        },
        pricing: {
          free: "#4CC38A",
          freemium: "#5B9EE8",
          paid: "#6E56CF",
          trial: "#E8A64C",
        },
        success: "#4CC38A",
        danger: "#E5484D",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
