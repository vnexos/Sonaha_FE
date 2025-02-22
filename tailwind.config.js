import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        navbarGradient: 'linear-gradient(0deg, #ffffff00 0%, #ffffff 100%)',

      },
      boxShadow: {
        carouselItem: "0 25px 50px rgba(0, 0, 0, 0.7)",
      },
      transitionTimingFunction: {
        carouselItem: 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: '#FFFFFF',
          foreground: '#000000',
          primary: {
            DEFAULT: '#ff0000',
            foreground: '#FFFFFF',
          },
          secondary: {
            DEFAULT: '#10B981',
            foreground: '#FFFFFF',
          },
        },
      }
    }
  })],
}
