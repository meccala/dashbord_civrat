/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'discord': {
          dark: '#1a1a2e',
          darker: '#0d0d1a',
          light: '#2d2d44',
        },
        'neon': {
          green: '#39ff14',
          'green-light': '#5fff3d',
          'green-dark': '#2bcc0f',
        },
        'accent': {
          yellow: '#ffd700',
          'yellow-light': '#ffed4a',
          'yellow-dark': '#d4a900',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(57, 255, 20, 0.3)',
        'neon-intense': '0 0 40px rgba(57, 255, 20, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'glow': {
          'from': { 'box-shadow': '0 0 10px rgba(57, 255, 20, 0.3)' },
          'to': { 'box-shadow': '0 0 20px rgba(57, 255, 20, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
