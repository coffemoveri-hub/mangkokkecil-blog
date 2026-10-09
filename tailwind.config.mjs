/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          sage: '#A3B18A',
          'sage-dark': '#588157',
          'sage-light': '#DAD7CD',
          'sage-soft': '#E9ECE7',
          orange: '#FF9F1C',
          'orange-hover': '#F38A00',
          'orange-soft': '#FFEAD0',
          cream: '#FDF6EC',
          'cream-dark': '#F4E8D6',
          charcoal: '#333333',
          'charcoal-light': '#555555',
          'charcoal-muted': '#777777',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Quicksand"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'organic': '0 10px 30px -10px rgba(163, 177, 138, 0.25)',
        'organic-lg': '0 20px 40px -15px rgba(88, 129, 87, 0.2)',
        'warm': '0 10px 25px -5px rgba(255, 159, 28, 0.25)',
      },
      borderRadius: {
        'organic': '1.75rem',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
