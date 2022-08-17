/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "maximum": { "max": "767px" },
      // => @media (max-width: 767px) { ... }
      "minimum": { "max": "528px" },
      // => @media (max-width: 500px) { ... }
    },
    colors: {
      primary: "#4D4DFE",
    },
    fontFamily: {
      mono: ["Roboto", "monospace"],
      sans: ["Roboto", "sans-serif"],
      serif: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      gridTemplateRows: {
        "auto-1fr": "auto 1fr",
      },
    },
  },
  plugins: [],
};
