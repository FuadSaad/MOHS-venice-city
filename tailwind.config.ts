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
          primary: "#006B5B",
          dark: "#004F45",
          navy: "#17232B",
          gold: "#C99A3D",
          light: "#E8F5F1",
          soft: "#F7F8F6",
          border: "#E2E7E5",
          secondary: "#657278",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(23, 35, 43, 0.05), 0 4px 6px -2px rgba(23, 35, 43, 0.03)",
        card: "0 4px 20px -2px rgba(0, 107, 91, 0.06), 0 2px 8px -2px rgba(23, 35, 43, 0.04)",
        dropdown: "0 10px 30px -5px rgba(23, 35, 43, 0.1)",
      },
      borderRadius: {
        card: "14px",
      }
    },
  },
  plugins: [],
};
export default config;
