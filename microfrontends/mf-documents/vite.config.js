import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfDocuments',
      filename: 'remoteEntry.js',
      exposes: {
        './DocumentsStep': './src/DocumentsStep.jsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  preview: {
    port: 3004,
    strictPort: true,
    cors: true,
  },
});
