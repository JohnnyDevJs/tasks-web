/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#eaeaea',
          100: '#e0e0df',
          200: '#bfbebe',
          300: '#312e2c',
          400: '#2c2928',
          500: '#272523',
          600: '#252321',
          700: '#1d1c1a',
          800: '#161514',
          900: '#11100f',
        },
        orange: {
          50: '#feeeea',
          100: '#fee5df',
          200: '#fcc9bd',
          300: '#f5522b',
          400: '#dd4a27',
          500: '#c44222',
          600: '#b83e20',
          700: '#93311a',
          800: '#6e2513',
          900: '#561d0f',
        },
        green: {
          50: '#e8eff0',
          100: '#dde7e8',
          200: '#b8cdd0',
          300: '#1a5d68',
          400: '#17545e',
          500: '#154a53',
          600: '#14464e',
          700: '#10383e',
          800: '#0c2a2f',
          900: '#092124',
        },
        gray: {
          50: '#f3f5f4',
          100: '#ecefef',
          200: '#d9dfde',
          300: '#839793',
          400: '#768884',
          500: '#697976',
          600: '#62716e',
          700: '#4f5b58',
          800: '#3b4442',
          900: '#2e3533',
        },
      },
      keyframes: {
        slideInUp: {
          '0%': {
            opacity: 0,
            visibility: 'hidden',
            transform: 'translateY(1rem)',
          },
          '100%': {
            opacity: 1,
            visibility: 'visible',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        slideInUp: 'slideInUp .4s ease-in-out',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
