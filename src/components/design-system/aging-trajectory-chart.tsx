import {
	Area,
	AreaChart,
	CartesianGrid,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";

export interface TrajectoryPoint {
	week: string;
	bioAge: number;
	baseline: number;
}

export interface AgingTrajectoryChartProps {
	data: TrajectoryPoint[];
}

const TOOLTIP_STYLE = {
	backgroundColor: "var(--card)",
	borderColor: "var(--border)",
	borderRadius: "0.5rem",
	fontSize: 11,
	color: "var(--card-foreground)",
};

function computeDelta(data: TrajectoryPoint[]): number {
	if (data.length < 2) return 0;
	return data[data.length - 1].bioAge - data[0].bioAge;
}

function DeltaBadge({ delta }: { delta: number }) {
	const isImproving = delta < 0;
	const Icon = isImproving ? TrendingDown : TrendingUp;
	const color = isImproving ? "var(--green-text)" : "#f43f5e";

	return (
		<div style={{ color }} className="flex items-center gap-1.5">
			<Icon size={13} strokeWidth={2.5} />
			<span className="font-headline font-extrabold text-xl leading-none">
				{isImproving ? "" : "+"}
				{delta.toFixed(1)} yrs
			</span>
		</div>
	);
}

function ChartHeader({ delta }: { delta: number }) {
	const isImproving = delta < 0;
	return (
		<div className="flex items-start justify-between">
			<div>
				<p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
					Aging Trajectory
				</p>
				<p className="text-xs text-muted-foreground mt-0.5">12-week trend</p>
			</div>
			<div className="text-right space-y-0.5">
				<DeltaBadge delta={delta} />
				<p className="text-[10px] text-muted-foreground font-semibold">
					{isImproving ? "Reversing ↓" : "Accelerating ↑"}
				</p>
			</div>
		</div>
	);
}

function GlowDot(props: {
	cx?: number;
	cy?: number;
	index?: number;
	dataLength: number;
}) {
	const { cx, cy, index, dataLength } = props;
	if (index !== dataLength - 1 || cx == null || cy == null) return null;
	return (
		<g>
			<circle cx={cx} cy={cy} r={10} fill="var(--teal)" opacity={0.15} />
			<circle cx={cx} cy={cy} r={5} fill="var(--teal)" opacity={0.35} />
			<circle cx={cx} cy={cy} r={3} fill="var(--teal)" />
		</g>
	);
}

function ChartLegend() {
	return (
		<div className="flex gap-5 justify-center mt-1">
			<div className="flex items-center gap-1.5">
				<svg width="14" height="4" viewBox="0 0 14 4" aria-hidden="true">
					<rect width="14" height="2" y="1" rx="1" fill="var(--teal)" />
				</svg>
				<span className="text-[10px] font-medium text-muted-foreground">
					Bio Age
				</span>
			</div>
			<div className="flex items-center gap-1.5">
				<svg width="14" height="4" viewBox="0 0 14 4" aria-hidden="true">
					<line
						x1="0"
						y1="2"
						x2="14"
						y2="2"
						stroke="var(--muted-foreground)"
						strokeWidth="1.5"
						strokeDasharray="3 2"
					/>
				</svg>
				<span className="text-[10px] font-medium text-muted-foreground">
					Baseline
				</span>
			</div>
		</div>
	);
}

function ChartArea({ data }: { data: TrajectoryPoint[] }) {
	return (
		<div className="h-44">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					data={data}
					margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
				>
					<defs>
						<linearGradient id="ageAreaGradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--teal)" stopOpacity={0.35} />
							<stop offset="85%" stopColor="var(--teal)" stopOpacity={0.04} />
							<stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid
						strokeDasharray="3 3"
						vertical={false}
						stroke="var(--border)"
					/>
					<XAxis
						dataKey="week"
						tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
						axisLine={false}
						tickLine={false}
						interval={2}
					/>
					<YAxis
						tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
						axisLine={false}
						tickLine={false}
						domain={["dataMin - 1", "dataMax + 1"]}
					/>
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Area
						type="monotone"
						dataKey="bioAge"
						stroke="var(--teal)"
						strokeWidth={2.5}
						fill="url(#ageAreaGradient)"
						dot={(props) => (
							<GlowDot
								key={`glow-${props.index}`}
								{...props}
								dataLength={data.length}
							/>
						)}
						activeDot={{ r: 5, fill: "var(--teal)", strokeWidth: 0 }}
						name="Bio Age"
					/>
					<Line
						type="monotone"
						dataKey="baseline"
						stroke="var(--muted-foreground)"
						strokeWidth={1.5}
						strokeDasharray="5 4"
						dot={false}
						name="Baseline"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

export function AgingTrajectoryChart({ data }: AgingTrajectoryChartProps) {
	const delta = computeDelta(data);
	return (
		<div className="glass-card rounded-[1.5rem] border border-border/40 p-5 space-y-3">
			<ChartHeader delta={delta} />
			<ChartArea data={data} />
			<ChartLegend />
		</div>
	);
}
