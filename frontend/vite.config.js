
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [tailwindcss(),
    react()],
  server: {
    proxy: {
      // Any request starting with /api will be forwarded
      '/api': {
        target: 'http://127.0.0.1:8000', // Your FastAPI backend URL
        changeOrigin: true, // Recommended for virtual hosts
      },
    }
  }
})