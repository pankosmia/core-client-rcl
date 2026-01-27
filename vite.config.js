import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    host: true,
    cors: true,
    origin: 'http://localhost:8000',
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      // You can remove `external` for an app build
      // external: ["react", "react-dom"],
    },
  },
  base: '/clients/core-client-rcl/'
})
