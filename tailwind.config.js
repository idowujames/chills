/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./js/**/*.js"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Custom color palette
        'primary': {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
        },
        'secondary': {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a',
        },
        'accent': {
          DEFAULT: '#D4A017',
          light: '#F5B700',
          dark: '#B8860B',
        },
        'text': {
          DEFAULT: '#ffffff',
          secondary: '#a1a1aa',
        },
        'border': 'rgba(255, 255, 255, 0.1)',
        'mage-gold': '#D4A017',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#0a0a0a',
        'secondary': '#1a1a1a',
      }),
      textColor: theme => ({
        ...theme('colors'),
        'primary': '#ffffff',
        'secondary': '#a1a1aa',
      }),
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: 'rgba(255, 255, 255, 0.1)',
      }),
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      animation: {
        'gradient': 'gradientBG 30s ease infinite',
        'bounceY': 'bounceY 2s infinite',
      },
      keyframes: {
        gradientBG: {
          '0%, 100%': { 
            'background-position': '0% 50%, center, 0% 50%',
            'background-size': '100% 100%, cover, 200% 200%',
          },
          '50%': { 
            'background-position': '100% 50%, center, 100% 50%',
            'background-size': '110% 110%, cover, 200% 200%',
          },
        },
        bounceY: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

