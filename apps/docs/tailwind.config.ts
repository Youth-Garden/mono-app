import { createPreset } from 'fumadocs-ui/tailwind-plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './mdx-components.tsx',
  ],
  presets: [createPreset() as unknown as Config],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-gt-america)', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        lg: '0px',
        md: '0px',
        sm: '0px',
        DEFAULT: '0px',
      },
      colors: {
        primary: '#fafafa',
      },
    },
  },
};

export default config;
