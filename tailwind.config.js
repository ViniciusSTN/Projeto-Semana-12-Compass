/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  fontFamily: {
    Montserrat: ["Montserrat", "sans-serif"],
    Poppins: ["Poppins", "sans-serif"],
  },
  theme: {
    extend: {
      colors: {
        "gray100": "#898989",
        "gray200": "#616161",
        "gray300": "#666666",
        "gray400": "#D9D9D9",
        "gray500": "#FFF3E3",
        "darkgreen": "#3A3A3A",
        "goldenbrown": "#B88E2F",
        "lightgray": "#F4F5F7",
        "darkcharcoal": "#333333",
        "silver": "#B0B0B0",
        "purple-blue": "#816DFA",
        "platinum": "#D8D8D8",
        "aluminum": "#C4C4C4",
        "antiquewhite": "#FCF8F3",
        "primary-yellow": "#B88E2F",
        "secondary-yellow": "#FFC700",
        "third-yellow": "#FFDA5B",
        "green-accents": "#2EC1AC",
        "red-accents": "#E97171",
        "red-strong": "#FF0000"
      },
      screens: {
        "3xl": "1440px",
      },
    },
  },
  plugins: [],
}
