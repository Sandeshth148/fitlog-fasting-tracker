import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-index',
      closeBundle() {
        // Copy index.html to dist after build
        try {
          copyFileSync(
            resolve(__dirname, 'public/index.html'),
            resolve(__dirname, 'dist/index.html')
          )
          console.log('✅ Copied index.html to dist/')
        } catch (err) {
          console.warn('⚠️ Could not copy index.html:', err)
        }
      }
    }
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    lib: {
      entry: './src/web-component.tsx',
      name: 'FastingTracker',
      fileName: 'fasting-tracker',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      }
    }
  },
  define: {
    'process.env': {}
  },
  server: {
    port: 4206,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 4206,
    strictPort: true,
    cors: true,
  },
})
