import type { LucideIcon } from "lucide-react";
import { MetricChart } from "@design-system";

export interface MetricTrendCardProps {
	icon: LucideIcon;
	title: string;
	currentValue: number | string;
	unit?: string;
	data: Array<{ day: string; value: number }>;
	color: string;
	statusLabel?: string;
}

function TrendCardHeader({
	icon: Icon,
	title,
	currentValue,
	unit,
	color,
	statusLabel,
}: Omit<MetricTrendCardProps, "data">) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Icon size={14} className="text-muted-foreground" />
				<p className="font-semibold text-sm">{title} · 7 Days</p>
			</div>
			<div className="flex items-baseline gap-1.5">
				<span
					className="font-headline font-bold text-base"
					style={{ color }}
				>
					{currentValue}
					{unit}
				</span>
				{statusLabel && (
					<span
						className="text-[10px] font-bold uppercase tracking-wider"
						style={{ color }}
					>
						{statusLabel}
					</span>
				)}
			</div>
		</div>
	);
}

export function MetricTrendCard({
	icon,
	title,
	currentValue,
	unit = "",
	data,
	color,
	statusLabel,
}: MetricTrendCardProps) {
	return (
		<div className="glass-card rounded-[1.5rem] p-4 border border-border/40 space-y-3">
			<TrendCardHeader
				icon={icon}
				title={title}
				currentValue={currentValue}
				unit={unit}
				color={color}
				statusLabel={statusLabel}
			/>
			<MetricChart data={data} color={color} unit={unit} />
		</div>
	);
}
