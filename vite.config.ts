import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: null,
      strategies: 'injectManifest',
      injectManifest: { injectionPoint: undefined, rollupFormat: 'iife' },
      srcDir: 'src/sw/',
      filename: 'sw.ts',
    }),
  ],
});
