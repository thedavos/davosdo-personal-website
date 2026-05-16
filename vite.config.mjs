import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		minify: 'oxc',
		rolldownOptions: {
			output: {
				manualChunks: {
					vendor: ['swup'],
					utils: ['fuse.js']
				}
			}
		}
	},

	server: {
		hmr: false,
	}
})
