import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
    host: '0.0.0.0',
    fs: {
      strict: false
    },
    historyApiFallback: true // Redireciona 404s para o index.html
  }
});
""