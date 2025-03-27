import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: "var(--font-urbanist)",
        noto_sans: "var(--font-noto_sans)",
        poppins: "var(--font-Poppins)",
        georgian: "var(--font-Georgian)",
        philisopher: "var(--font-philisopher)",
        inter: "var(--font-Inter)",
      },
    },
    screens: {
      'xs': '361px',
      'ss': '375px',
      'sm': '680px',
      'md': '768px',
      'min-lg': '1000px',
      'lg': '1099px',
      'xl': '1440px',
      '2xl': '2560px',
      '4xl': '3840px'
    },
    boxShadow: {
      'nav-top': '0 -2px 6px rgba(0, 0, 0, 0.1)', // Top shadow
    },
  },
  plugins: [],
} satisfies Config;
