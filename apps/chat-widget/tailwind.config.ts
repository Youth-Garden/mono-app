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
        // Shadcn-style với RGB format
        widget: {
          bg: 'rgb(var(--chat-bg))',
          foreground: 'rgb(var(--chat-foreground))',
          card: 'rgb(var(--chat-card))',
          'card-foreground': 'rgb(var(--chat-card-foreground))',
          popover: 'rgb(var(--chat-popover))',
          'popover-foreground': 'rgb(var(--chat-popover-foreground))',
          primary: 'rgb(var(--chat-primary))',
          'primary-foreground': 'rgb(var(--chat-primary-foreground))',
          secondary: 'rgb(var(--chat-secondary))',
          'secondary-foreground': 'rgb(var(--chat-secondary-foreground))',
          muted: 'rgb(var(--chat-muted))',
          'muted-foreground': 'rgb(var(--chat-muted-foreground))',
          accent: 'rgb(var(--chat-accent))',
          'accent-foreground': 'rgb(var(--chat-accent-foreground))',
          destructive: 'rgb(var(--chat-destructive))',
          'destructive-foreground': 'rgb(var(--chat-destructive-foreground))',
          border: 'rgb(var(--chat-border))',
          input: 'rgb(var(--chat-input))',
          ring: 'rgb(var(--chat-ring))',
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
