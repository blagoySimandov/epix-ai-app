import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export interface QuickStatCardProps {
	icon: LucideIcon;
	label: string;
	value: string | number;
	unit?: string;
	statusLabel: string;
	accentColor: string;
	className?: string;
}

export function QuickStatCard({
	icon: Icon,
	label,
	value,
	unit = "",
	statusLabel,
	accentColor,
	className,
}: QuickStatCardProps) {
	return (
		<div
			className={cn(
				"glass-card rounded-[1.5rem] p-4 border border-border/40 flex flex-col gap-2",
				className,
			)}
			style={{ borderLeftColor: accentColor, borderLeftWidth: 3 }}
		>
			<div className="flex items-center gap-1.5">
				<Icon size={13} style={{ color: accentColor }} />
				<p className="text-xs font-semibold text-muted-foreground truncate">
					{label}
				</p>
			</div>
			<p
				className="font-headline font-extrabold text-3xl leading-none"
				style={{ color: accentColor }}
			>
				{value}
				{unit && (
					<span className="text-base font-semibold ml-0.5">{unit}</span>
				)}
			</p>
			<p
				className="text-[11px] font-bold uppercase tracking-wider"
				style={{ color: accentColor }}
			>
				{statusLabel}
			</p>
		</div>
	);
}
