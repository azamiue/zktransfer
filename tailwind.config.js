import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-mb": "url('/bg/hero-mb.png')",
        "hero-dsk": "url('/bg/bg-dsk.png')",
      },
      fontFamily: {
        lato: "Lato, sans-serif",
        sans: ["var(--font-ppneuemontreal)"],
      },
      colors: {
        tp5: "rgba(0, 0, 0, 0.05)",
        tp10: "rgba(0, 0, 0, 0.1)",
        w10: "rgba(255, 255, 255, 0.10)",
        w20: "rgba(255, 255, 255, 0.20)",
        w50: "rgba(255, 255, 255, 0.50)",
        rgba080: "rgba(0, 0, 0, 0.80)",
        black6: "#0D0D0D",
        gray: "rgba(167, 174, 173, 1)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({ defaultTheme: "light" })],
};
