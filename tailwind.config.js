/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01AEEF",
        secondary: "#291D89",
        bgColor: "#EAF4F2",
        hardBgColor: "#D7EFEF",
        graycustom: "#7F7F7F",

        // You can add more custom colors here if needed
        // "bgColor": "#00FF00",
        // "custom-blue": "#0000FF",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};