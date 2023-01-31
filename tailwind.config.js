/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        yekanBakh: ["Yekan Bakh", "sans-serif"],
      },
    },
  },
  plugins: [require("@noqte/ui")],
};
