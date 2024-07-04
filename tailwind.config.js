/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'dark-primary-theme': '#202020',
        'dark-lighter-theme': '#2E2E2E',
        'dark-primary-hover': '#ff8c6f2c',
      },
      textColor: {
        'dark-primary': '#ff4500',
      },
    },
  },
  plugins: [],
};
