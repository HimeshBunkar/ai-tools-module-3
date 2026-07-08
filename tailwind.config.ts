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
          DEFAULT: "#0C0C0E",
          raised: "#141416",
        },
        border: {
          DEFAULT: "#1F1F22",
          subtle: "#141416",
        },
        foreground: {
          DEFAULT: "#FFFFFF",
          muted: "#9A9A9E",
          faint: "#555558",
        },
        accent: {
          DEFAULT: "#FFFFFF",
          hover: "#E5E5E5",
          muted: "#18181C",
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
