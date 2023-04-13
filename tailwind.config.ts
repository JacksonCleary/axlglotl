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
    },
  },
  plugins: [],
} satisfies Config;
