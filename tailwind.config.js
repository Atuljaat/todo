/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./docs/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage : {
        'custom-light': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(100,116,128,1) 35%, rgba(0,212,255,1) 100%)',
      }
    },
  },
  plugins: [],
}

