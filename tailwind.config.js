/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        /** Snorkel-inspired portal neutrals */
        canvas: {
          DEFAULT: 'hsl(210 20% 98%)',
          muted: 'hsl(210 16% 96%)'
        },
        surface: {
          DEFAULT: '#ffffff',
          raised: 'hsl(210 20% 99%)'
        },
        border: {
          DEFAULT: 'hsl(214 18% 88%)',
          subtle: 'hsl(214 16% 92%)'
        },
        ink: {
          DEFAULT: 'hsl(222 22% 14%)',
          secondary: 'hsl(215 14% 38%)',
          muted: 'hsl(215 12% 48%)',
          faint: 'hsl(215 10% 58%)'
        },
        /** Primary accent — reserved for actions, focus, links */
        accent: {
          DEFAULT: 'hsl(217 78% 52%)',
          hover: 'hsl(217 78% 46%)',
          soft: 'hsl(214 95% 97%)',
          border: 'hsl(214 70% 88%)'
        },
        danger: {
          DEFAULT: 'hsl(350 60% 46%)',
          soft: 'hsl(350 55% 97%)',
          border: 'hsl(350 40% 90%)'
        },
        success: {
          soft: 'hsl(152 55% 96%)',
          border: 'hsl(152 40% 86%)',
          text: 'hsl(152 45% 26%)'
        },
        warning: {
          soft: 'hsl(38 92% 96%)',
          border: 'hsl(38 70% 88%)',
          text: 'hsl(28 55% 32%)'
        }
      },
      boxShadow: {
        /** Restrained elevation */
        card: '0 1px 2px 0 rgb(15 23 42 / 0.04)'
      }
    }
  },
  plugins: []
};
