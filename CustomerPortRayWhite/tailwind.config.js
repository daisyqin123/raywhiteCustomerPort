/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-red': '#E34E44',
        'theme-dark': '#333333',
        'theme-gray': '#494B4F',
        'theme-light': '#F6F7FA',
      },
    },
  },
  plugins: [],
}
