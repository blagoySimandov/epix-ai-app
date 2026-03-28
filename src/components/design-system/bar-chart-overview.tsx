import {
	Bar,
	BarChart,
	CartesianGrid,
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

export function BarChartOverview() {
	return (
		<div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col">
			<h3 className="text-lg font-medium mb-1">Bar Chart Overview</h3>
			<p className="text-sm text-muted-foreground mb-6">
				Monthly revenue and user metrics.
			</p>
			<div className="h-[300px] w-full mt-auto">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
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
							tickFormatter={(value) => `$${value}`}
						/>
						<Tooltip
							cursor={{ fill: "var(--muted)", opacity: 0.4 }}
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
						<Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} />
						<Bar dataKey="users" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
