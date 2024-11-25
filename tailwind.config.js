/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
      extend: {
        colors: {
          primary: {
            100: "var(--color-primary-200, #C6E5F8)",
            200: "var(--color-primary-300, #91C9F1)",
            300: "var(--color-primary-400, #569BD7)",
            400: "var(--color-primary-500, #2B6CAF)",
            500: "var(--color-primary-600, #00377B)",
            600: "var(--color-primary-700, #002A69)",
            700: "var(--color-primary-900, #001F58)",
            800: "var(--color-primary-950, #001647)",
            900: "var(--color-primary-950, #000F3B)",
          },
          grean: {
            100: "var(--color-cyan-100, #E8FADE)",
            200: "var(--color-cyan-100, #CEF5BE)",
            300: "var(--color-cyan-200, #A6E296)",
            400: "var(--color-cyan-300, #7DC673)",
            500: "var(--color-cyan-400, #4AA147)",
            600: "var(--color-cyan-500, #338A38)",
            700: "var(--color-cyan-600, #23732E)",
            800: "var(--color-cyan-700, #165D26)",
            900: "var(--color-cyan-900, #0D4D21)",
          },
        },
        fontFamily: {
          'poppins': ['Poppins-SemiBold', 'sans-serif'],
          'el-messiri': ['ElMessiri-SemiBold', 'sans-serif'],
      }
      },
    },
    plugins: [],
  };
  