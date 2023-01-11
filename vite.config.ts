import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
	build: {
		sourcemap: mode !== 'production',
		assetsDir: '.'
	},
	plugins: [
		VitePWA({
			injectRegister: null,
			strategies: 'injectManifest',
			injectManifest: { injectionPoint: undefined, rollupFormat: 'iife' },
			srcDir: 'src/sw/',
			filename: 'sw.ts'
		})
	]
}));
