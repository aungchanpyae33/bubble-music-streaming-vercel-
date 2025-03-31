import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        short: { raw: "(max-height: 400px)" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        overlay: "rgba(43, 43, 41,0.5)",
      },
      animation: {
        showtextoverflow:
          "showtextoverflowF var(--animate-translate-duration) linear 500ms forwards, showtextoverflowB var(--animate-translate-duration) linear calc(1000ms + var(--animate-translate-duration)) forwards",
      },
      keyframes: {
        showtextoverflowF: {
          from: { transform: "translateX(0)" },
          to: {
            transform:
              "translateX(calc(-100% + var(--animate-translate-info)))",
          },
        },
        showtextoverflowB: {
          from: {
            transform:
              "translateX(calc(-100% + var(--animate-translate-info)))",
          },
          to: { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
