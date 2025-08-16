/**** Tailwind Config ****/
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 47.4% 11.2%)",
        muted: "hsl(210 40% 96.1%)",
        primary: "hsl(221.2 83.2% 53.3%)",
        "primary-foreground": "white",
      },
    },
  },
  plugins: [],
};
