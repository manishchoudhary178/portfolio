/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
        surface: 'var(--surface)',
        raised: 'var(--raised)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        mute: 'var(--mute)',
        faint: 'var(--faint)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-ink': 'var(--accent-ink)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 7.2vw, 6.4rem)', { lineHeight: '0.94', letterSpacing: '-0.045em' }],
        headline: ['clamp(1.85rem, 4.4vw, 4.2rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        title: ['clamp(1.35rem, 2.2vw, 2.15rem)', { lineHeight: '1.12', letterSpacing: '-0.03em' }],
      },
      maxWidth: {
        site: '1400px',
      },
      screens: {
        xs: '390px',
      },
    },
  },
  plugins: [],
};
