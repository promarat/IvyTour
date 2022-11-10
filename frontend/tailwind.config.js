/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fd6262',
        secondary: '#3f4349',
        danger: '#f97316',
      },
    },
  },
  plugins: [],
}
