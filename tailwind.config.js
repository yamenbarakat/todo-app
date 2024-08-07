/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Josefin Sans", "sans-serif"],
    },
    extend: {
      colors: {
        lightGray: "hsl(0, 0%, 98%)",
        veryLightGrayBlue: "hsl(236, 33%, 92%)",
        lightGrayBlue: "hsl(233, 11%, 84%)",
        darkGrayBlue: "hsl(236, 9%, 61%)",
        veryDarkGrayBlue: "hsl(235, 19%, 35%)",
        dDarkBlue: "hsl(235, 21%, 11%)",
        dVeryDarkBlue: "hsl(235, 24%, 19%)",
        dLightGrayBlue: "hsl(234, 39%, 85%)",
        dHoverLightGrayBlue: "hsl(236, 33%, 92%)",
        dDarkGrayBlue: "hsl(234, 11%, 52%)",
        dVeryDarkGrayBlue: "hsl(233, 14%, 35%)",
        dSecondVeryDarkGrayBlue: "hsl(237, 14%, 26%)",
        brightBlue: "hsl(220, 98%, 61%)",
        gr1: "hsl(192, 100%, 67%)",
        gr2: "hsl(280, 87%, 65%)",
      },
    },
  },
  plugins: [],
};
