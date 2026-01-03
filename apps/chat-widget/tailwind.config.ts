/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'chat-',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  safelist: [
    'chat-animate-grow',
    'chat-animate-fade-in',
    'chat-animate-slide-up',
    'dark',
    'spectre-theme',
  ],
  theme: {
    extend: {
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      colors: {
        widget: {
          bg: 'rgb(var(--chat-bg))',
          card: 'rgb(var(--chat-card))',
          border: 'rgb(var(--chat-border))',
          text: 'rgb(var(--chat-text))',
          muted: 'rgb(var(--chat-text-muted))',
          primary: 'rgb(var(--chat-primary))',
          'primary-foreground': 'rgb(var(--chat-primary-foreground))',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        grow: 'grow 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        grow: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
