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
          yellow: '#FFCC00',
          yellowDark: '#E6B800',
          yellowLight: '#FFF4CC',
          black: '#111111',
          dark: '#1C1C1E',
          grey: '#F5F5F7',
          card: '#FFFFFF',
          textMuted: '#6B7280',
          border: '#E5E7EB',
          accentGreen: '#10B981',
          accentBlue: '#3B82F6',
          accentRed: '#EF4444',
          accentPurple: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
        'float': '0 10px 30px -4px rgba(0, 0, 0, 0.12)',
        'yellow-glow': '0 4px 15px rgba(255, 204, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
