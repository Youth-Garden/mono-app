import { createPreset } from 'fumadocs-ui/tailwind-plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/content/**/*.{md,mdx}',
    './src/mdx-components.tsx',
    './mdx-components.tsx',
  ],
  presets: [createPreset() as unknown as Config],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-gt-america)', 'Arial', 'sans-serif'],
        mono: [
          'var(--font-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
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
