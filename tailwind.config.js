/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue, js}'],
  theme: {
    extend: {
      colors: {
        discord: '#36393e',
        discord_light: '#424549',
        discord_dark: '#2d3035',
      }
    },
  },
  plugins: [],
}

