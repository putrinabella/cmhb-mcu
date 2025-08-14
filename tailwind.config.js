/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // DaisyUI akan pakai class 'dark'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
