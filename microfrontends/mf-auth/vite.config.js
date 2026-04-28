import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfAuth',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginPanel': './src/LoginPanel.jsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  preview: {
    port: 3001,
    strictPort: true,
    cors: true,
  },
});
