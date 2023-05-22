import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      routes: path.resolve('src/routes'),
      pages: path.resolve('src/pages'),
      utils: path.resolve('src/utils'),
      app: path.resolve('src/app'),
      shared: path.resolve('src/shared'),
      features: path.resolve('src/features'),
    },
  },
});
