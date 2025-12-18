
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#1e40af',
					light: '#3b82f6',
					dark: '#1e3a8a',
				},
				secondary: '#0ea5e9',
				accent: '#8b5cf6',
				success: '#10b981',
				warning: '#f59e0b',
				error: '#ef4444',
				info: '#3b82f6',
			},
			borderRadius: {
				'lg': '0.75rem',
				'xl': '1rem',
			},
			boxShadow: {
				'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			}
		},
	},
	plugins: [],
}
