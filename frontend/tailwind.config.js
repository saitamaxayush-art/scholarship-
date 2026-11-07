/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        forest: {
          DEFAULT: 'var(--forest)',
          deep: 'var(--forest-deep)',
          hover: '#183c2e',
        },
        gold: {
          DEFAULT: 'var(--gold)',
          hover: '#c49333',
          light: '#f5edd8',
        },
        sand: {
          DEFAULT: 'var(--sand)',
          subtle: '#F4F0E8',
          border: 'var(--sand)',
        },
        stone: {
          DEFAULT: 'var(--stone)',
          muted: '#8E938D',
          light: '#A5AAA3',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '6px',
        none: '0px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(20, 24, 26, 0.05)',
        'elevated': '0 4px 12px rgba(20, 24, 26, 0.08)',
        'panel': '0 8px 24px rgba(20, 24, 26, 0.10)',
      },
      letterSpacing: {
        editorial: '-0.03em',
        tightest: '-0.04em',
      }
    },
  },
  plugins: [],
}

