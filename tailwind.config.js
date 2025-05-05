/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(0,22,45)',
        secondary: 'rgb(0,38,80)',
        tertiary: 'rgb(33,84,141)',
        accent: 'rgb(94,147,207)',
        fontColor: 'rgb(177,203,231)',
      },
    },
    fontFamily: {
      tektur: ["Tektur", "sans-serif"],
      hennyPenny: ["Henny Penny", "sans-serif"],
    },
  },
  plugins: [],
}

