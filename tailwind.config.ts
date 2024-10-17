import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        overlay: "rgba(43, 43, 41,0.3)",
      },
      animation: {
        showtextoverflow: "showtextoverflow linear",
      },
      keyframes: {
        showtextoverflow: {
          "0%,2%,100%": { transform: "translateX(0)" },
          "50%,55%": { transform: "translateX(calc(-100% + 150px))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
