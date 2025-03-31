import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sql-query-runner/',
  server: {
    // Add proper CORS headers
    cors: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // Properly handle serving CSV files with correct MIME type
  assetsInclude: ['**/*.csv'],
  // Configure proper build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
});
