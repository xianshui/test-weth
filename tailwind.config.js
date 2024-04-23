const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      width: {
        view: '1200px',
      },
      maxWidth: {
        view: '1200px',
        modal: '1140px',
      },
      borderColor: {
        a1: 'var(--a1)',
        a2: 'var(--a2)',
        a3: 'var(--a3)',
        a4: 'var(--a4)',
        a5: 'var(--a5)',
        a6: 'var(--a6)',
        a7: 'var(--a7)',
        down: 'var(--down)',
        up: 'var(--up)',
        primary: 'var(--primary)',
      },
      colors: {
        a1: 'var(--a1)',
        a2: 'var(--a2)',
        a3: 'var(--a3)',
        a4: 'var(--a4)',
        a5: 'var(--a5)',
        a6: 'var(--a6)',
        a7: 'var(--a7)',
        down: 'var(--down)',
        up: 'var(--up)',
        primary: 'var(--primary)',
      },
    },
    borderColor: {
      DEFAULT: '#E9E9ED',
    },
  },
  darkMode: 'class',
  plugins: [
    plugin(({ addComponents, addVariant }) => {
      addComponents({
        '.flex-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.tw-align-center': {
          display: 'flex',
          alignItems: 'center',
        },
        '.tw-justify-center': {
          display: 'flex',
          justifyContent: 'center',
        },
      })
      addVariant('child-even', '& > *:nth-child(even)')
      addVariant('child-odd', '& > *:nth-child(odd)')
      addVariant('child', '&>*')
      addVariant('child-hover', '& > *:hover')
    }),
  ],
  corePlugins: {
    preflight: false,
  },
}
