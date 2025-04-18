import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'pomodotask',
      short_name: 'pomodotask',
      description: 'pmodoro + todolist app pwa',
      theme_color: '#ffed65',
      icons:[
        {
          src: './public/android/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: './public/android/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})