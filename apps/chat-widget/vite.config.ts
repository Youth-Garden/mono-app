import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'spectre',
      fileName: (format) => `spectre.js`,
      formats: ['umd'],
    },
    rollupOptions: {
      output: {
        // Ensure CSS is handled if needed, though inline CSS plugin handles injection
      },
    },
  },
});
