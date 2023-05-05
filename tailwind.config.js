/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss"

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "n-gray": {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828"
        },
        "n-blue": {
          25: "#F2F8FF",
          50: "#C2E0FF",
          100: "#93C8FF",
          200: "#6AB2FE",
          300: "#479EFD",
          400: "#2C8CFB",
          500: "#177BF6",
          600: "#086AEC",
          700: "#0058D8",
          800: "#0046B5",
          900: "#003185"
        },
        "n-green": {
          25: "#F5FFF8",
          50: "#C0FFD5",
          100: "#8CFFB3",
          200: "#5DFE97",
          300: "#37FC80",
          400: "#19F971",
          500: "#02F267",
          600: "#00E367",
          700: "#00C662",
          800: "#00944E",
          900: "#004D2B"
        },
        "n-yellow": {
          25: "#FFFEF5",
          50: "#FFFCEB",
          100: "#FFF8D2",
          200: "#FEEFA6",
          300: "#FDDE67",
          400: "#FAC11D",
          500: "#F4A600",
          600: "#E98B00",
          700: "#D26B00",
          800: "#A94700",
          900: "#702500"
        },
        "n-red": {
          25: "#FFF9F8",
          50: "#FFCCC9",
          100: "#FFA19A",
          200: "#FE7B71",
          300: "#FD5C4E",
          400: "#FA4333",
          500: "#F5311E",
          600: "#EA240E",
          700: "#D51B04",
          800: "#AF1600",
          900: "#7A1000"
        }
      },
      fontFamily: {
        yekanBakh: [
          "Yekan Bakh",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        ]
      },
      fontWeight: {
        extrablack: "950"
      }
    }
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "14px" }
      })
    })
  ]
}
