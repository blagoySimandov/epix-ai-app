import { Link } from "@tanstack/react-router";
import { FileText, Home, QrCode, User } from "lucide-react";

const NAV_ITEMS = [
	{ to: "/", icon: Home, label: "Home" },
	{ to: "/design", icon: FileText, label: "Report" },
	{ to: "/scan", icon: QrCode, label: "Scan" },
	{ to: "/profile", icon: User, label: "Profile" },
] as const;

function NavItem({ to, icon: Icon, label }: (typeof NAV_ITEMS)[number]) {
	return (
		<Link
			to={to}
			className="flex flex-col items-center justify-center px-4 py-1 text-muted-foreground transition-all duration-300"
			activeProps={{
				className:
					"flex flex-col items-center justify-center px-4 py-1 text-teal bg-teal/10 rounded-2xl transition-all duration-300",
			}}
		>
			<Icon size={22} />
			<span className="text-[11px] font-medium tracking-wide uppercase mt-1">
				{label}
			</span>
		</Link>
	);
}

export function BottomNav() {
	return (
		<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 [background:color-mix(in_srgb,var(--card)_75%,transparent)] backdrop-blur-2xl shadow-[0_-8px_32px_0_rgba(13,28,50,0.06)] rounded-t-3xl">
			{NAV_ITEMS.map((item) => (
				<NavItem key={item.to} {...item} />
			))}
		</nav>
	);
}
