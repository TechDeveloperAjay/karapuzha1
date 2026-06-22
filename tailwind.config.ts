import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        sans: ["var(--font-jost)"],
        serif: ["var(--font-cormorant)"],
      },

      boxShadow: {
        luxury: "0 20px 50px rgba(0,0,0,0.08)",
      },
    },
  },

  plugins: [],
};

export default config;