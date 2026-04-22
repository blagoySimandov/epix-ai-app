import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import * as React from "react";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider";
import appCss from "../styles.css?url";
import { BottomNav } from "../components/report/bottom-nav";
import { registerServiceWorker } from "../lib/register-sw";

interface MyRouterContext {
	queryClient: QueryClient;
}

// To switch themes, change this value to 'light' or 'auto'
const APP_THEME = "dark" as const;

const THEME_INIT_SCRIPT = `document.documentElement.classList.add('${APP_THEME}');document.documentElement.setAttribute('data-theme','${APP_THEME}');document.documentElement.style.colorScheme='${APP_THEME}';`;

function NotFoundPage() {
	return (
		<main className="flex min-h-screen items-center justify-center">
			<p className="text-muted-foreground">Page not found.</p>
		</main>
	);
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	notFoundComponent: NotFoundPage,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover",
			},
			{
				title: "Epix AI — Genomic Health Intelligence",
			},
			{
				name: "description",
				content: "Personalised health intelligence powered by your genetic and epigenetic data.",
			},
			// PWA / mobile meta
			{
				name: "theme-color",
				content: "#0A192F",
			},
			{
				name: "mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent",
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Epix AI",
			},
			{
				name: "application-name",
				content: "Epix AI",
			},
			{
				name: "msapplication-TileColor",
				content: "#0A192F",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/favicon_io/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon_io/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon_io/favicon-16x16.png",
			},
			{
				rel: "shortcut icon",
				href: "/favicon_io/favicon.ico",
			},
		],
	}),
	shellComponent: RootDocument,
});


function RootDocument({ children }: { children: React.ReactNode }) {
	React.useEffect(() => {
		registerServiceWorker();
	}, []);

	return (
		<html lang="en" translate="no" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
				<TanStackQueryProvider>
					{children}
					<BottomNav />
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				</TanStackQueryProvider>
				<Scripts />
			</body>
		</html>
	);
}
