/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#6B7280',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {},
  },
}