/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        robotics: {
          dark: '#000000',
          card: '#0d0d0d',
          cardHover: '#141414',
          border: '#262626',
          accent: '#00f0ff',
          neon: '#10b981',
          gold: '#f59e0b'
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
        space: ['"Space Grotesk"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
