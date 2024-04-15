/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        textPrimary: "#fefce8",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
