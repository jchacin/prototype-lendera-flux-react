import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        mfAuth:       'http://localhost:3001/assets/remoteEntry.js',
        mfOnboarding: 'http://localhost:3002/assets/remoteEntry.js',
        mfKyc:        'http://localhost:3003/assets/remoteEntry.js',
        mfDocuments:  'http://localhost:3004/assets/remoteEntry.js',
        mfCredit:     'http://localhost:3005/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});
