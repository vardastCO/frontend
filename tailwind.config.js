/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        yekanBakh: ["Yekan Bakh", "sans-serif"],
      },
      fontWeight: {
        extrablack: "950",
      },
    },
  },
  plugins: [require("@noqte/ui")],
};
