const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        ...colors,
        bgPrimary: {
          DEFAULT: "#111B21",
        },
        primary: {
          DEFAULT: "#67209E",
        },
        // primary: {
        //   DEFAULT: "#2F1673",
        // },
        secondary: {
          DEFAULT: "#29183e",
        },
        // purple: {
        //   dark: "#2F1673",
        // },
        modal: {
          DEFAULT: "rgba(0,0,0,0.4)",
        },
      },
      fontFamily: {
        body: ["Montserrat"],
      },
    },
  },
  plugins: [],
};
