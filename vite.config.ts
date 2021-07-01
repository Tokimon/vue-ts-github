import nPath from 'path';
import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': nPath.resolve('./src')
    }
  }
})
