module.exports = {
  content: [
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: 'var(--primary)',
      'primary-2': 'var(--primary-2)',
      secondary: 'var(--secondary)',
      'secondary-2': 'var(--secondary-2)',

      green: 'var(--green)',
      'green-100':  '#7EA96F',
      blue: 'var(--blue)',
      'blue-100': '#668FC0',
      red: 'var(--red)',
      'red-100': '#D75D5D',
      grey: 'var(--grey)',
    },
    textColor: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      green: 'var(--green)',
      blue: 'var(--blue)',
      red: 'var(--red)',
      grey: 'var(--grey)'
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}