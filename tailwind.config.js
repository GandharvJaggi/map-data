import {
  transparent,
  white,
  gray,
  black,
  yellow,
  red,
  slate
} from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    colors: {
      base: '#EEEEEE',
      'base-dark': '#222831',
      'fall-dark': '#31363F',
      primary: '#76ABAE',
      transparent: transparent,
      white: white,
      slate: slate,
      red: red,
      gray: gray,
      black: black,
      yellow: yellow
    },
    extend: {}
  },
  plugins: []
};
