/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cssg: {
          dark: '#0B0B0F',
          card: '#1A1A24',
          border: '#333345',
          text: '#E2E8F0',
          muted: '#9CA3AF',
          accent: '#0EA5E9',
          accentHover: '#38BDF8',
          premium: '#EAB308'
        }
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'logo-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-14px) rotate(2deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-2deg)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'logo-float': 'logo-float 6s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
