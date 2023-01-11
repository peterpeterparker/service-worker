import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: mode !== "production",
    assetsDir: "."
  },
  plugins: [
    VitePWA({
      injectRegister: null,
      strategies: 'injectManifest',
      injectManifest: { injectionPoint: undefined, rollupFormat: 'iife' },
      srcDir: 'src/sw/',
      filename: 'sw.ts',
    })
  ],
}));
