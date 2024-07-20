/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#115700",
        secondary:"#2E2E2E",
        tetiary:"#525252"
      },
      fontFamily:{
        poppins: ['Poppins', 'sans-serif'],
        mulish:["Mulish", "sans-serif"],
        roboto:[ "Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}

