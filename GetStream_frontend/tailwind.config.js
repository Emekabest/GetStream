/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    variants: {
      extend: {
        // Add more variants as needed
      },
    },
    plugins: [
      // Add Tailwind CSS plugins here
      // Example: require('@tailwindcss/forms'),
    ],
  };