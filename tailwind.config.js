// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: ["class"], // mode dark pakai class
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         poppins: ["Poppins", "sans-serif"],
//       },
//     },
//   },
//   plugins: [require("daisyui")],
// };

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // mode dark pakai class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["light", "dark"], // corporate jadi default
  },
  plugins: [require("daisyui")],
};
