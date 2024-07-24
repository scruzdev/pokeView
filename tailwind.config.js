/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        'max': '9999', 
      },
      height: {
        '9/10': '90%',
        '7/10': '70%', 
        '100': '25rem',

      },
      minHeight: {
        'rm-48': '48rem'
      }
    },
  },
  plugins: [],
}

