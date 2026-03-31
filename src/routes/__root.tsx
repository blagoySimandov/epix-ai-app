import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Moon, Sun } from "lucide-react";
import * as React from "react";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

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
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function ThemeToggle() {
	const [theme, setTheme] = React.useState<"light" | "dark" | "auto">("auto");

	React.useEffect(() => {
		const storedTheme = localStorage.getItem("theme") as
			| "light"
			| "dark"
			| "auto";
		if (storedTheme) {
			setTheme(storedTheme);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);

		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(newTheme);
		root.setAttribute("data-theme", newTheme);
		root.style.colorScheme = newTheme;
	};

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="fixed top-4 right-4 z-[100] p-2 rounded-full bg-card/80 backdrop-blur-sm border shadow-sm hover:bg-muted transition-colors"
			aria-label="Toggle theme"
		>
			{theme === "light" ? (
				<Moon className="w-5 h-5" />
			) : (
				<Sun className="w-5 h-5 text-yellow-500" />
			)}
		</button>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
				<TanStackQueryProvider>
					<ThemeToggle />
					{children}
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
