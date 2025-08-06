/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
   "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        styleScript: ['"Style Script"', 'cursive'],
         alice: ["Alice", 'serif']
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'marquee': 'marquee 15s linear infinite',
      },
    },
  },
  plugins: [
  require('tailwind-scrollbar-hide')
],
}