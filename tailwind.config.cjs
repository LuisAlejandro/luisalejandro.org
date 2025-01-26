
const defaultTheme = require("tailwindcss/defaultTheme");


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "450px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        display: ["Thunder", "sans-serif"],
        title: ["Poppins", "sans-serif"],
        main: ["Roboto", "sans-serif"],
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
        "9xl": "8.25rem",
        "10xl": "10.25rem",
        "11xl": "12.25rem",
        "12xl": "14.25rem",
        "13xl": "16.25rem",
        "14xl": "18.25rem",
        "15xl": "20.25rem",
        "16xl": "22.25rem",
        "17xl": "24.25rem",
        "18xl": "26.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-16": "span 16 / span 16",
      },
      backgroundImage: {
        "case-studies-canaima-challenge":
          "url('/images/case-studies/canaima-challenge.png')",
        "case-studies-dockershelf-challenge":
          "url('/images/case-studies/dockershelf-challenge.png')",
        "case-studies-expedia-challenge":
          "url('/images/case-studies/expedia-challenge.png')",
        "case-studies-soleit-challenge":
          "url('/images/case-studies/soleit-challenge.png')",
      },
    },
  },
  
  plugins: [require("@tailwindcss/forms")],
};
