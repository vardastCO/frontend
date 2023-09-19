/** @type {import('tailwindcss').Config} */

import tailwindColors from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"

const spacing = {
  "3xs": "2px",
  "2xs": "6px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "20px",
  xl: "26px",
  "2xl": "24px",
  "3xl": "34px",
  "4xl": "42px",
  "5xl": "56px",
  "6xl": "72px",
  "7xl": "90px",
  "8xl": "110px",
  "9xl": "132px"
}

const myColors = {
  primary: {
    50: "#feefe9",
    100: "#fbcebe",
    200: "#f8ae92",
    300: "#f58e66",
    400: "#f36d3b",
    500: "#f04d0f",
    600: "#f15b22",
    700: "#99310a",
    800: "#6d2307",
    900: "#411504",
    950: "#160701"
  },
  secondary: {
    50: "#f2f4f4",
    100: "#dadfdf",
    200: "#c1cac9",
    300: "#a8b4b3",
    400: "#8f9f9e",
    500: "#768988",
    600: "#9eacab",
    700: "#4b5757",
    800: "#353e3e",
    900: "#202525",
    950: "#0b0c0c"
  }
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        ...spacing,
        DEFAULT: spacing.md,
        spaceY: spacing["5xl"]
      },
      fontFamily: {
        yekanBakh: [
          "Yekan Bakh",
          "Helvetica Neue",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        ]
      },
      borderRadius: {
        DEFAULT: spacing.xs
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
        error: tailwindColors.red,
        succuss: tailwindColors.green,
        warning: tailwindColors.yellow,
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
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "12px" }
      })
    }),
    require("tailwindcss-animate")
  ]
}
