/** @type {import('tailwindcss').Config} */

import tailwindColors from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"

import { myColors } from "./src/app/theme"

const tailwind = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr));"
      },
      spacing: {
        DEFAULT: "0.875rem",
        half: "0.5px"
      },
      borderRadius: {
        DEFAULT: "0.5rem"
      },
      fontFamily: {
        iranYekan: [
          "Iran Yekan",
          "Helvetica Neue",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        ]
      },
      fontWeight: {
        extrablack: "950"
      },
      colors: {
        primary: {
          ...myColors.primary,
          DEFAULT: myColors.primary[600]
        },
        secondary: {
          ...myColors.secondary,
          DEFAULT: myColors.secondary[600]
        },
        error: {
          ...tailwindColors.red,
          DEFAULT: tailwindColors.red[600]
        },
        success: {
          ...tailwindColors.green,
          DEFAULT: tailwindColors.green[600]
        },
        warning: {
          ...tailwindColors.yellow,
          DEFAULT: tailwindColors.yellow[600]
        },
        info: {
          ...tailwindColors.blue,
          DEFAULT: tailwindColors.blue[600]
        },
        alpha: {
          white: tailwindColors.white,
          ...tailwindColors.gray,
          DEFAULT: tailwindColors.gray[600],
          black: tailwindColors.black
        }
      }
    }
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        html: { fontSize: theme("fontSize.sm") },
        h1: { fontSize: theme("fontSize.2xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
        h4: { fontSize: theme("fontSize.base") },
        h5: { fontSize: theme("fontSize.sm") },
        h6: { fontSize: theme("fontSize.xs") },
        p: { fontSize: theme("fontSize.base") }
      })
    }),
    require("tailwindcss-animate")
  ]
}

// {
//   xs: [ '0.75rem', { lineHeight: '1rem' } ],
//   sm: [ '0.875rem', { lineHeight: '1.25rem' } ],
//   base: [ '1rem', { lineHeight: '1.5rem' } ],
//   lg: [ '1.125rem', { lineHeight: '1.75rem' } ],
//   xl: [ '1.25rem', { lineHeight: '1.75rem' } ],
//   '2xl': [ '1.5rem', { lineHeight: '2rem' } ],
//   '3xl': [ '1.875rem', { lineHeight: '2.25rem' } ],
//   '4xl': [ '2.25rem', { lineHeight: '2.5rem' } ],
//   '5xl': [ '3rem', { lineHeight: '1' } ],
//   '6xl': [ '3.75rem', { lineHeight: '1' } ],
//   '7xl': [ '4.5rem', { lineHeight: '1' } ],
//   '8xl': [ '6rem', { lineHeight: '1' } ],
//   '9xl': [ '8rem', { lineHeight: '1' } ]
// }

module.exports = tailwind
