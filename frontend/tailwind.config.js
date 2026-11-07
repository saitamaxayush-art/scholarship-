/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'rgb(var(--cream-rgb) / <alpha-value>)',
        grass: {
          DEFAULT: 'rgb(var(--grass-rgb) / <alpha-value>)',
          deep: 'rgb(var(--grass-deep-rgb) / <alpha-value>)',
          soft: '#DCEFC4',
        },
        coral: 'rgb(var(--coral-rgb) / <alpha-value>)',
        sun: 'rgb(var(--sun-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        cobalt: '#2B4BD8',
        tomato: '#E8442E',
        mustard: '#E2B33A',
        pink: '#F4A6C0',
      },
      fontFamily: {
        sans: ['"General Sans"', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(3rem, 7.4vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.045em' }],
        'display-sm': ['clamp(2.5rem, 5.2vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        title: ['clamp(2rem, 3.6vw, 3.25rem)', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
      },
      boxShadow: {
        card: '0 1px 0 rgba(21,20,15,0.04), 0 18px 40px -18px rgba(21,20,15,0.28)',
        soft: '0 10px 30px -16px rgba(21,20,15,0.25)',
      },
      maxWidth: { measure: '68ch' },
    },
  },
  plugins: [],
};
