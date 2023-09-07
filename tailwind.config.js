/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
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
        brand: colors.blue
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
