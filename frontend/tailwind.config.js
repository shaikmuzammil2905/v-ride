/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vride: {
          yellow: '#FFD600',
          yellowDark: '#FFC400',
          yellowLight: '#FFF9D6',
          black: '#080808',
          dark: '#181818',
          grey: '#F7F7F7',
          card: '#FFFFFF',
          textMuted: '#6B7280',
          border: '#E5E7EB',
          accentGreen: '#10B981',
          accentBlue: '#2563EB',
          accentRed: '#EF4444',
          accentPurple: '#7C3AED'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
        'float': '0 10px 30px -4px rgba(0, 0, 0, 0.12)',
        'yellow-glow': '0 4px 15px rgba(255, 214, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
