import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/0_Test/Tool/excel-clone/dist/',
	plugins: [
		vue(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	server: {
		host: 'localhost',
		port: 3000
	},
	
	build: {
		chunkSizeWarningLimit: 1500,
	}
})
