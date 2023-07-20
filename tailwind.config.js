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
        fadeIn: "fadeIn 200ms linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0.5, transform: "scale(0.9,0.9)" },
          "100%": { opacity: 1, transform: "scale(1,1)" },
        },
      },
      boxShadow: {
        bg: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
    },
  },
  daisyui: {
    themes: ["emerald", "forest"],
  },
  plugins: [require("daisyui")],
};
