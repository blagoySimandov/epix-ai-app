import {
	Bar,
	BarChart,
	LabelList,
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
				<BarChart data={data} margin={{ top: 16, right: 4, left: 4, bottom: 0 }}>
					<XAxis
						dataKey="day"
						tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
						axisLine={false}
						tickLine={false}
					/>
					<Tooltip
						contentStyle={TOOLTIP_STYLE}
						formatter={(v) => [`${v}${unit}`, ""]}
						cursor={{ fill: "var(--muted)", opacity: 0.2 }}
					/>
					<Bar
						dataKey="value"
						fill={color}
						radius={[4, 4, 0, 0]}
					>
						<LabelList 
							dataKey="value" 
							position="top" 
							fill="var(--muted-foreground)" 
							fontSize={10} 
							formatter={(v: number) => `${v}${unit}`} 
						/>
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
