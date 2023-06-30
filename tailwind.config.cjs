/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Dosis", "Inter", ...defaultTheme.fontFamily.sans],
        dosis: ['Dosis', 'sans-serif']
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
};
