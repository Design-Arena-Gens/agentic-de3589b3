/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#7c3aed",
        accent: "#f59e0b",
        dark: "#0b1220",
        slate: "#1b2338",
        highlight: "#93c5fd"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 30px rgba(37, 99, 235, 0.35)",
        glass: "0 20px 60px rgba(15, 23, 42, 0.35)"
      },
      backdropBlur: {
        xs: "2px"
      },
      maxWidth: {
        content: "120rem"
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2560px"
      }
    }
  },
  plugins: []
};
