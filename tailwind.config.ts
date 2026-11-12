import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dukka: {
          forest: "#0D523F",
          amber: "#FEB100",
          ink: "#031815",
          canvas: "#FAFAFA",
          muted: "#6B7373",
          line: "#E4E7E7",
          soft: "#F3F5F4",
          panel: "#F7F8F7",
        },
      },
      fontFamily: {
        urbanist: "var(--font-urbanist)",
      },
      spacing: {
        "nav-offset": "var(--dukka-nav-height, 120px)",
      },
    },
    screens: {
      xs: "361px",
      ss: "375px",
      sm: "680px",
      md: "768px",
      "min-lg": "1000px",
      lg: "1099px",
      xl: "1440px",
      "2xl": "2560px",
      "4xl": "3840px",
    },
    boxShadow: {
      "nav-top": "0 -2px 6px rgba(0, 0, 0, 0.1)",
    },
  },
  plugins: [],
} satisfies Config;
