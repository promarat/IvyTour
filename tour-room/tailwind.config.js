/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '56': '100 / 56',
        '75': '4 / 3',
      },
      colors: {
        primary: '#fd6262',
        danger: '#f97316',
      },
    },
  },
  plugins: [],
}
