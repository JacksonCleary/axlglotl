import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "fill-axlotl": "#38bdf8",
        "fill-countries": "#bae6fd",
        "stroke-world": "#bae6fd",
      },
      transitionProperty: {
        width: "width",
        iconButton: "border-color, background-color",
        boxShadowWidth: "box-shadow, width",
        borderColorWidthBackground: "border-color, width, background-color",
        svgFillStroke: "fill, stroke",
      },
      spacing: {
        "34px": "34px",
      },
      zIndex: {
        "n-1": "-1",
        "1": "1",
        "5": "5",
      },
      borderRadius: {
        chat: "0 0.5rem 0.5rem 0.5rem",
        chatButton: "0.25rem 0.25rem 0 0",
      },
    },
  },
  plugins: [],
} satisfies Config;
