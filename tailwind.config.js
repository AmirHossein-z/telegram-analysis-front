/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //         colors: {
      //             blue_dark: "#233047",
      //             blue_light: "#219ebc",
      //             blue_lighter: "#8ecae6",
      //             orange_bright: "#fb8500",
      //             yellow_bright: "#ffb703",
      //             yellow_light: "#FED9B7",
      cornflower_blue: "#060f13",
      //             red_light: "#F07167",
      //             yellow_lighter: "#FDFCDC",
      //             turquoise_blue: "#00AFB9",
      //             blue_bright: "#0081A7",
      //         },
      animation: {
        fadeIn: "fadeIn 1s linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  daisyui: {
    themes: ["forest", "emerald"],
  },
  plugins: [require("daisyui")],
};
