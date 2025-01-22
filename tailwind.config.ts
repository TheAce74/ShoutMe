import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        primary: {
          400: "#F40000",
          500: "#AA0808",
        },
        neutral: {
          100: "#FFFFFF",
          900: "#000000",
        },
        warning: {
          400: "#FFF200",
        },
        success: {
          400: "#05C829",
        },
      },
      height: {
        screen: "100dvh",
      },
      width: {
        screen: "100dvh",
      },
      minHeight: {
        screen: "100dvh",
      },
      minWidth: {
        screen: "100dvh",
      },
      maxHeight: {
        screen: "100dvh",
      },
      maxWidth: {
        screen: "100dvh",
      },
      borderRadius: {
        circle: "50%",
        pill: "100vmax",
      },
    },
  },
  plugins: [],
} satisfies Config;
