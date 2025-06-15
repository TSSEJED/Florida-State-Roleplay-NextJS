module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    'postcss-custom-properties': {
      preserve: false
    },
    autoprefixer: {},
  },
}
