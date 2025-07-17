/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideIn: "slideIn 0.6s ease-out",
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};