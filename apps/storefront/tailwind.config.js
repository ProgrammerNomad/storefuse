/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/themes/*/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/modules/*/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/core/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fdf6f2",
          100: "#faeade",
          200: "#f4d0bb",
          300: "#ecaf8d",
          400: "#e2835a",
          500: "#C2724F",
          600: "#a85c3b",
          700: "#8c4830",
          800: "#723b28",
          900: "#5e3123",
        },
        warm: {
          bg: "#FAFAF7",
          card: "#FFFFFF",
          border: "#E5E7EB",
          muted: "#6B7280",
          text: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover": "0 10px 25px -5px rgb(0 0 0 / 0.08), 0 4px 6px -2px rgb(0 0 0 / 0.04)",
      },
      aspectRatio: {
        product: "4 / 5",
      },
    },
  },
  plugins: [],
};
