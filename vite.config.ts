import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

const config = defineConfig({
	plugins: [
		devtools(),
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		tanstackStart(),
		netlify(),
		viteReact(),
		VitePWA({
			registerType: "autoUpdate",
			outDir: "dist/client",
			includeAssets: ["favicon.ico", "logo192.png", "logo512.png", "robots.txt"],
			manifest: {
				name: "Epix AI — Genomic Health Intelligence",
				short_name: "Epix AI",
				description: "Personalised health intelligence powered by your genetic and epigenetic data.",
				theme_color: "#0A192F",
				background_color: "#0A192F",
				display: "standalone",
				orientation: "portrait",
				scope: "/",
				start_url: "/",
				lang: "en",
				categories: ["health", "medical", "lifestyle"],
				icons: [
					{
						src: "favicon.ico",
						sizes: "64x64 32x32 24x24 16x16",
						type: "image/x-icon",
					},
					{
						src: "logo192.png",
						type: "image/png",
						sizes: "192x192",
						purpose: "any maskable",
					},
					{
						src: "logo512.png",
						type: "image/png",
						sizes: "512x512",
						purpose: "any maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
				runtimeCaching: [
					{
						// Google Fonts
						urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts",
							expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
							cacheableResponse: { statuses: [0, 200] },
						},
					},
					{
						// Mock data / API calls
						urlPattern: /\/mock-data\/.*/i,
						handler: "StaleWhileRevalidate",
						options: {
							cacheName: "mock-api",
							expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
						},
					},
				],
			},
			devOptions: {
				enabled: true,
			},
		}),
	],
});

export default config;
