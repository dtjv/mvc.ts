const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
