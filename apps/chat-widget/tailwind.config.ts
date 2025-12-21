import type { Config } from 'tailwindcss';

export default {
  prefix: 'chat-',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        // Force sharp corners for the modern/technical look
        none: '0px',
        sm: '0px',
        DEFAULT: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '9999px', // Keep 'full' for the circular chat bubble button
      },
      colors: {
        // A technical dark theme palette
        widget: {
          bg: '#09090b', // Almost black
          card: '#18181b', // Dark grey
          border: '#27272a', // Subtle border
          text: '#fafafa', // White text
          muted: '#a1a1aa', // Muted text
          primary: '#fff', // Accent color (white for high contrast)
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
