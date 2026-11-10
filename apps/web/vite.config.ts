import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Trada',
        short_name: 'Trada',
        description: 'Understand and control your business.',
        theme_color: '#082d4a',
        background_color: '#f7f9fc',
        display: 'standalone',
        start_url: '/',
      },
      workbox: { navigateFallback: '/index.html' },
    }),
  ],
});
