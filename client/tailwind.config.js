/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'bg-start': '#E18D44',
      'bg-end': '#A82551',
      'black': '#000000',
    },
  },
  plugins: [],
}