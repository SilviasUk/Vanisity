/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  daisyui: {
    themes: [
      {
        default: {
          primary: "#171717",
          secondary: "#050506",
          accent: "#050506",
          neutral: "#1B1B1B",
          "base-100": "#111111",
          info: "#6787e0",
          success: "#16a34a",
          warning: "#ea580c",
          error: "#B44141",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}