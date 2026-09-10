import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'frontend', // Le dice a Vite que la app está en la carpeta frontend
  server: {
    port: 5173, // Cambia el puerto si es necesario
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Apunta las peticiones /api a tu servidor Express
        changeOrigin: true,
        secure: false,
      },
    },
  },
});