import { Link, useLocation } from "@tanstack/react-router";
import { FileText, Home, QrCode, MessageSquare } from "lucide-react";
import { cn } from "#/lib/utils";

const NAV_ITEMS = [
	{ to: "/", icon: Home, label: "Home" },
	{ to: "/blood-test", icon: FileText, label: "Report" },
	{ to: "/scan", icon: QrCode, label: "Scan" },
	{ to: "/chat", icon: MessageSquare, label: "Chat" },
] as const;

function NavItem({ to, icon: Icon, label, isAlert }: (typeof NAV_ITEMS)[number] & { isAlert: boolean }) {
	return (
		<Link
			to={to}
			className={cn(
				"flex flex-col items-center justify-center px-4 py-1 transition-all duration-300",
				isAlert ? "text-white/60" : "text-muted-foreground"
			)}
			activeProps={{
				className: cn(
					"flex flex-col items-center justify-center px-4 py-1 rounded-2xl transition-all duration-300",
					isAlert ? "text-white bg-white/20" : "text-teal bg-teal/10"
				),
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
	const location = useLocation();
	const isAlertActive = location.pathname.startsWith("/scan/alert");

	return (
		<nav
			className={cn(
				"fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 backdrop-blur-2xl shadow-[0_-8px_32px_0_rgba(13,28,50,0.06)] rounded-t-3xl transition-all duration-500",
				isAlertActive
					? "bg-[#7f1d1d]/85 border-t border-white/10"
					: "[background:color-mix(in_srgb,var(--card)_75%,transparent)]"
			)}
		>
			{NAV_ITEMS.map((item) => (
				<NavItem key={item.to} {...item} isAlert={isAlertActive} />
			))}
		</nav>
	);
}
