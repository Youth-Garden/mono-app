import { defineConfig } from '@rsbuild/core';
import { pluginPreact } from '@rsbuild/plugin-preact';

export default defineConfig({
  plugins: [pluginPreact()],
  html: {
    template: './index.html',
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  output: {
    // Single file output for CDN distribution
    filename: {
      js: 'spectre-widget.js',
    },
    // Disable chunk splitting for single bundle
    distPath: {
      js: '',
    },
  },
  performance: {
    // Combine all chunks into one
    chunkSplit: {
      strategy: 'all-in-one',
    },
  },
});
