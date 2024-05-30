/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cerulean: '#006989',
        emerald: '#06BA63',
        ghostWhite: '#F7F5FB',
        alabaster: '#E0E5DC',
        poppy: '#DB2B39',
        sunglow: '#FDCA40',
        blue: '#006989',
        green: '#06BA63',
        red: '#DB2B39',
        yellow: '#FDCA40',
        yogurt: '#E0E5DC',
      },
    },
    fontFamily: {
      londrina: ['Londrina Solid', 'cursive'],
    },
  },
  plugins: [],
};
