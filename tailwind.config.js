module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing:{
        '76':'19rem',
        '80':'20rem',
        '88':'22rem',
        '100':'25rem',
        '120':'30rem',
      }
    },
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [],
}
