/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        tory: {
          50: '#FFF1F5',
          100: '#FFE4EC',
          200: '#FDCEDC',
          300: '#FB9BB8',
          400: '#F75A8E',
          500: '#E82C7C', // Core Brand Tory Pink
          600: '#D31665',
          700: '#B10C51',
          800: '#930D43',
          900: '#7B0E3B',
        },
        cream: {
          base: '#FFFDF9',
          surface: '#FAF6EE',
          border: '#F0E8D9',
          muted: '#F5EFEB',
        },
        charcoal: {
          900: '#1C1917',
          800: '#292524',
          700: '#44403C',
          500: '#78716C',
          300: '#D6D3D1',
          100: '#F5F5F4',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
      },
      fontFamily: {
        display: ['Outfit', 'Playfair Display', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '18px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'tory-sm': '0 2px 8px -2px rgba(232, 44, 124, 0.08), 0 1px 4px -1px rgba(28, 25, 23, 0.05)',
        'tory-md': '0 8px 24px -4px rgba(232, 44, 124, 0.12), 0 4px 12px -2px rgba(28, 25, 23, 0.06)',
        'tory-lg': '0 16px 40px -8px rgba(232, 44, 124, 0.16), 0 8px 20px -4px rgba(28, 25, 23, 0.08)',
        'tory-hover': '0 20px 48px -10px rgba(232, 44, 124, 0.22)',
        'tory-glow': '0 0 25px rgba(232, 44, 124, 0.28)',
      },
    },
  },
  plugins: [],
};
