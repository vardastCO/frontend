/** @type {import('tailwindcss').Config} */

import tailwindColors from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"

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
        DEFAULT: "0.875rem"
      },
      borderRadius: {
        DEFAULT: "0.5rem"
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
        html: { fontSize: "0.875rem" }
      })
    }),
    require("tailwindcss-animate")
  ]
}
