/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        skblack: {
          light: '#474747',
          DEFAULT: '#282828',
          dark: '#141414',
        },
        skred: {
          light: '#FFED08',
          DEFAULT: '#FF3CC7',
          dark: '#FF99E2',
        },
        skwhite: {
          light: '#FAFAEC',
          DEFAULT: '#FBF1C7',
          dark: '#5F4E07',
        },
        skgreen: {
          light: '#9CE08F',
          DEFAULT: '#317B22',
          dark: '#194012',
        },
        skblue: {
          light: '#85FDFF',
          DEFAULT: '#00E5E8',
          dark: '#005052',
        },
      },
    },
  },
  plugins: [],
};
