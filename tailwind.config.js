/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        400: '400px',
        500: '500px',
        600: '600px',
        650: '650px',
        700: '700px',
        750: '750px',
        850: '850px',
        900: '900px',
        1000: '1000px',
        1100: '1100px',
        1200: '1200px',
      },
      maxWidth: {
        1200: '1200px',
      },
      minWidth: {
        900: '900px',
      },
      height: {
        400: '400px',
        500: '500px',
        600: '600px',
        750: '750px',
        850: '850px',
        900: '900px',
        1000: '1000px',
        '1/7': '14.2857143%', // 1/7 height
        '2/7': '28.5714286%', // 2/7 height
        '3/7': '42.8571429%', // 3/7 height
        '4/7': '57.1428571%', // 4/7 height
        '5/7': '71.4285714%', // 5/7 height
        '6/7': '85.7142857%', // 6/7 height
        '7/7': '100%',
      },
      backgroundColor: {
        'dark-primary-theme': '#101010',
        'dark-lighter-theme': '#1a1a1a',
        'dark-lighter-nav': '#1f1f1f',
        'dark-primary-hover': '#ff8c6f2c',
        'dark-primary': '#ff4500',
        'dark-gray': '#252525',
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
      borderWidth: {
        1: '0.5px',
      },
      borderColor: {
        grey: '#8f8f8f',
        'dark-primary': '#ff4500',
      },
      scale: {
        101: '1.01',
      },
      spacing: {
        'scrollbar-gutter-stable': 'scrollbar-gutter: stable;',
      },
    },
  },
  plugins: [],
};
