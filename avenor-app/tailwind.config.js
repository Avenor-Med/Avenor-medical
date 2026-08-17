/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F1B3A',
        'navy-mid': '#1F3A6B',
        cream: '#F5EFE0',
        'cream-soft': '#FBF9F4',
        brass: '#C49B5C',
        'brass-bright': '#E3BC7A',
        'brass-dark': '#9A7338',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
