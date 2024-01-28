/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#13102c",
        secondary: "#26ccf2",
        tertiary: "#d4d2d5",
      },
      height: {
        screen2: "calc(100vh - 72px)",
      },
    },
  },
  plugins: [],
};
