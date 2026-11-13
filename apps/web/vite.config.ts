import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Trada',
        short_name: 'Trada',
        description: 'Manage, Sell and Grow your business.',
        theme_color: '#0d1b4b',
        background_color: '#f7f9fc',
        display: 'standalone',
        start_url: '/',
      },
      workbox: { navigateFallback: '/index.html' },
    }),
  ],
});