import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const chartData = [
	{ name: "Jan", total: 1200, users: 800 },
	{ name: "Feb", total: 2100, users: 1200 },
	{ name: "Mar", total: 800, users: 500 },
	{ name: "Apr", total: 1600, users: 1100 },
	{ name: "May", total: 2400, users: 1800 },
	{ name: "Jun", total: 1400, users: 900 },
];

export function LineChartTrend() {
	return (
		<div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col">
			<h3 className="text-lg font-medium mb-1">Line Chart Trend</h3>
			<p className="text-sm text-muted-foreground mb-6">
				Growth trajectory over the last 6 months.
			</p>
			<div className="h-[300px] w-full mt-auto">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={chartData}
						margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							stroke="var(--border)"
						/>
						<XAxis
							dataKey="name"
							stroke="var(--muted-foreground)"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							dy={10}
						/>
						<YAxis
							stroke="var(--muted-foreground)"
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "var(--card)",
								borderColor: "var(--border)",
								borderRadius: "0.5rem",
								color: "var(--card-foreground)",
								boxShadow:
									"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
							}}
							itemStyle={{ color: "var(--foreground)" }}
						/>
						<Line
							type="monotone"
							dataKey="total"
							stroke="var(--primary)"
							strokeWidth={2}
							dot={{ r: 4, fill: "var(--background)", strokeWidth: 2 }}
							activeDot={{ r: 6, fill: "var(--primary)" }}
						/>
						<Line
							type="monotone"
							dataKey="users"
							stroke="var(--chart-3)"
							strokeWidth={2}
							dot={{ r: 4, fill: "var(--background)", strokeWidth: 2 }}
							activeDot={{ r: 6, fill: "var(--chart-3)" }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
