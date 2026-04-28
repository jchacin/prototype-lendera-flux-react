import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfOnboarding',
      filename: 'remoteEntry.js',
      exposes: {
        './PersonalDataStep': './src/PersonalDataStep.jsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  preview: {
    port: 3002,
    strictPort: true,
    cors: true,
  },
});
