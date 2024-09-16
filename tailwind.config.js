/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'dark-primary-theme': '#202020',
        'dark-lighter-theme': '#2E2E2E',
        'dark-primary-hover': '#ff8c6f2c',
        'dark-primary': '#ff4500',
      },
      textColor: {
        'dark-primary': '#ff4500',
      },
      scale: {
        50: '0.5',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
};
