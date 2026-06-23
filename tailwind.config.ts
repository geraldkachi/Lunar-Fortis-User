import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0D1B2A",
          dark: "#1A2B3C",
          red: "#E8392A",
          "red-light": "#F05545",
        },
        lf: {
          navy: "#0D1B2A",
          "navy-80": "#1a2d40",
          red: "#E8392A",
          "red-hover": "#c8301f",
          gray: "#6B7280",
          "gray-light": "#F3F4F6",
          "gray-border": "#E5E7EB",
          "input-bg": "#EEF3F8",
          "input-border": "#C8D8E8",
          "input-focus": "#0D1B2A",
          "text-primary": "#0D1B2A",
          "text-secondary": "#6B7280",
          "text-muted": "#9CA3AF",
          "badge-blue": "#EEF3F8",
          "badge-blue-text": "#0D1B2A",
          "success": "#10B981",
          "pending": "#F59E0B",
          "link": "#4F7FAF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "xl": "12px",
        "2xl": "16px",
      },
      boxShadow: {
        "card": "0 2px 8px rgba(0,0,0,0.08)",
        "modal": "0 8px 32px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
