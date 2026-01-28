import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        providers: resolve(__dirname, 'providers.html'),
        detail: resolve(__dirname, 'provider-detail.html'),
      },
    },
  },
})
