/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F5F0E8',
        'bg-secondary': '#EDEAE0',
        accent: '#1A1A2E',
        accent2: '#C0392B',
        foreground: '#1A1A2E',
        muted: '#6B6560',
        border: '#D4CFC4',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
