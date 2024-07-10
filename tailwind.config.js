/** @type {import('tailwindcss').Config} */
import preline from "preline/plugin";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/preline/preline.js"],
  theme: {
    extend: {},
  },
  plugins: [preline],
};
