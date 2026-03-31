import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from "recharts";

const TOOLTIP_STYLE = {
	backgroundColor: "var(--card)",
	borderColor: "var(--border)",
	borderRadius: "0.5rem",
	fontSize: 12,
	color: "var(--card-foreground)",
};

export interface MetricChartProps {
	data: Array<{ day: string; value: number }>;
	color: string;
	unit?: string;
}

export function MetricChart({ data, color, unit = "" }: MetricChartProps) {
	return (
		<div className="h-28 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
					<XAxis
						dataKey="day"
						tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
						axisLine={false}
						tickLine={false}
					/>
					<Tooltip
						contentStyle={TOOLTIP_STYLE}
						formatter={(v) => [`${v}${unit}`, ""]}
					/>
					<Area
						type="monotone"
						dataKey="value"
						stroke={color}
						strokeWidth={2}
						fill={color}
						fillOpacity={0.12}
						dot={false}
						activeDot={{ r: 4, fill: color }}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
