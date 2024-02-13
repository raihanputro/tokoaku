import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/core.scss";
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, './config'),
      '@components': path.resolve(__dirname, './src/components'),
      '@containers': path.resolve(__dirname, './src/containers'),
      '@domain': path.resolve(__dirname, './src/domain'),
      '@languages': path.resolve(__dirname, './src/languages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@static': path.resolve(__dirname, './src/static'),
      '@store': path.resolve(__dirname, './src/configureStore.js'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
