import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
	const env = Object.entries(loadEnv('mock', process.cwd(), '')).reduce(
		(prev, [key, val]) => ({
			...prev,
			[key]: val,
		}),
		{},
	) as any

	return {
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src/'),
				'@components': `${path.resolve(__dirname, './src/components/')}`,
				'@config': `${path.resolve(__dirname, './src/config/')}`,
				'@hooks': `${path.resolve(__dirname, './src/hooks/')}`,
				'@context': `${path.resolve(__dirname, './src/context/')}`,
				'@services': `${path.resolve(__dirname, './src/services/')}`,
				'@utils': `${path.resolve(__dirname, './src/utils/')}`,
				'@constants': `${path.resolve(__dirname, './src/constants/')}`,
				'@assets': `${path.resolve(__dirname, './src/assets/')}`,
			},
		},
		base: '/',
		define: {
			APP_VERSION: JSON.stringify(env.npm_package_version),
			NODE_ENV: JSON.stringify(env.NODE_ENV),
		},
		server: {
			proxy: {
				'/api': {
					target: env.ENDPOINT,
					changeOrigin: true,
					secure: false,
					rewrite: (apiPath) => apiPath.replace(/^\/api/, ''),
				},
			},
		},
	}
})
