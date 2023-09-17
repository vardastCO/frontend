/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "vertical-space": {
          "1x": "64px",
          "2x": "128px"
        }
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
        },
        error: colors.red,
        succuss: colors.green,
        warning: colors.yellow,
        alpha: colors.gray
      }
    }
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "14px" }
      })
    }),
    require("tailwindcss-animate")
  ]
}
