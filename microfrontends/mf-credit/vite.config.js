import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfCredit',
      filename: 'remoteEntry.js',
      exposes: {
        './ResultStep': './src/ResultStep.jsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  preview: {
    port: 3005,
    strictPort: true,
    cors: true,
  },
});
