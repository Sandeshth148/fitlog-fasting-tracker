import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: './src/web-component.tsx',
      name: 'FastingTracker',
      fileName: 'fasting-tracker',
      formats: ['es']
    },
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
