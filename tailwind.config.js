/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        'bg-secondary': '#1a0a0a',
        accent: '#E63946',
        foreground: '#ffffff',
        muted: '#999999',
        border: '#2a1a1a',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
