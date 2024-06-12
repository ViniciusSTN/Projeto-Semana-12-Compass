/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        "gray100": "#898989",
        "gray200": "#616161",
        "gray300": "#666666",
        "gray400": "#D9D9D9",
        "gray2": "#9F9F9F",
        "off-white": "#FFF3E3",
        "darkgreen": "#3A3A3A",
        "goldenbrown": "#B88E2F",
        "lightgray": "#F4F5F7",
        "lightgray2": "#EEEEEE",
        "darkcharcoal": "#333333",
        "silver": "#B0B0B0",
        "purple-blue": "#816DFA",
        "platinum": "#D8D8D8",
        "aluminum": "#C4C4C4",
        "antiquewhite": "#FCF8F3",
        "secondary-yellow": "#FFC700",
        "third-yellow": "#FFDA5B",
        "green-accents": "#2EC1AC",
        "red-accents": "#E97171",
        "red-strong": "#FF0000"
      },
      screens: {
        "2xl": "1440px",
      },
      fontSize: {
        "2.5xl": [ "1.75rem" ],
        "3.3xl": [ "2rem"],
        "3.5xl": [ "2.125rem"],
        "4.5xl": [ "2.5rem"],
        "5.5xl": [ "3.25rem", { lineHeight: "65px" }],
      },
      padding: {
        '1/8': '12%',
        '1/4': '25%',
        '1/3': '33.333333%',
        '1/2': '50%',
        'full': '100%',
      },
      spacing: {
        "4.5": "4.5rem",
        "285px": "17.813rem",
        "300px": "18.75rem", 
        "404px": "25.25rem", 
        "582px": "36.375rem", 
        "643px": "40.2rem",
        "716px": "44.75rem",
        "1184px": "74rem",
        "1236px": "77.25rem",
      },
      lineHeight: {
        "12": "3rem"
      },
      backgroundImage: {
        "home-fsection": "url('https://project3-images-storage.s3.us-east-2.amazonaws.com/static/home-principal-section-bg.png')",
      },
      gridTemplateColumns: {
        'responsive': 'repeat(auto-fill, minmax(285px, 1fr))',
      },
    },
  },
  plugins: [],
}
