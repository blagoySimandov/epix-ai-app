import {
	CartesianGrid,
	LineChart,
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

interface ChartPoint extends TrajectoryPoint {
	standardAging: number;
	bioAgeAbove: number | null;
	bioAgeBelow: number | null;
}

// Standard-aging calibration in years:
// - offset starts the reference line slightly below first observed bio age
// - minimum increase keeps the line clearly upward-trending across the period
const STANDARD_AGING_OFFSET = 0.5;
const STANDARD_AGING_MIN_INCREASE = 2.4;
const BIO_AGE_BELOW_COLOR = "var(--teal)";
const BIO_AGE_ABOVE_COLOR = "#f43f5e";

const TOOLTIP_STYLE = {
	backgroundColor: "var(--card)",
	borderColor: "var(--border)",
	borderRadius: "0.5rem",
	fontSize: 11,
	color: "var(--card-foreground)",
};

function buildChartData(data: TrajectoryPoint[]): ChartPoint[] {
	if (data.length === 0) return [];

	const first = data[0];
	const last = data[data.length - 1];
	const standardStart = first.bioAge - STANDARD_AGING_OFFSET;
	const standardEnd = Math.max(
		standardStart + STANDARD_AGING_MIN_INCREASE,
		last.bioAge + STANDARD_AGING_OFFSET,
	);
	const denominator = Math.max(data.length - 1, 1);

	return data.map((point, index) => {
		const progress = index / denominator;
		const standardAging =
			standardStart + (standardEnd - standardStart) * progress;
		const isAbove = point.bioAge >= standardAging;
		return {
			...point,
			standardAging,
			bioAgeAbove: isAbove ? point.bioAge : null,
			bioAgeBelow: isAbove ? null : point.bioAge,
		};
	});
}

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
	color: string;
}) {
	const { cx, cy, index, dataLength, color } = props;
	if (index !== dataLength - 1 || cx == null || cy == null) return null;
	return (
		<g>
			<circle cx={cx} cy={cy} r={10} fill={color} opacity={0.15} />
			<circle cx={cx} cy={cy} r={5} fill={color} opacity={0.35} />
			<circle cx={cx} cy={cy} r={3} fill={color} />
		</g>
	);
}

function ChartLegend() {
	return (
		<div className="flex gap-5 justify-center mt-1">
			<div className="flex items-center gap-1.5">
				<svg width="14" height="4" viewBox="0 0 14 4" aria-hidden="true">
					<rect width="14" height="2" y="1" rx="1" fill={BIO_AGE_BELOW_COLOR} />
				</svg>
				<span className="text-[10px] font-medium text-muted-foreground">
					Below standard
				</span>
			</div>
			<div className="flex items-center gap-1.5">
				<svg width="14" height="4" viewBox="0 0 14 4" aria-hidden="true">
					<rect width="14" height="2" y="1" rx="1" fill={BIO_AGE_ABOVE_COLOR} />
				</svg>
				<span className="text-[10px] font-medium text-muted-foreground">
					Above standard
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
					Standard aging
				</span>
			</div>
		</div>
	);
}

function ChartArea({ data }: { data: TrajectoryPoint[] }) {
	const chartData = buildChartData(data);
	const latest = chartData[chartData.length - 1];
	const latestColor =
		latest && latest.bioAge >= latest.standardAging
			? BIO_AGE_ABOVE_COLOR
			: BIO_AGE_BELOW_COLOR;

	return (
		<div className="h-44">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					data={chartData}
					margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
				>
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
					<Tooltip
						contentStyle={TOOLTIP_STYLE}
						formatter={(value, name) => {
							if (name === "standardAging") {
								return [`${Number(value).toFixed(1)} yrs`, "Standard aging"];
							}
							if (name === "bioAgeAbove" || name === "bioAgeBelow") {
								return [`${Number(value).toFixed(1)} yrs`, "Biological age"];
							}
							return [value, name];
						}}
					/>
					<Line
						type="monotone"
						dataKey="bioAgeBelow"
						stroke={BIO_AGE_BELOW_COLOR}
						strokeWidth={2.5}
						connectNulls={false}
						dot={(props) => (
							<GlowDot
								key={`glow-${props.index}`}
								{...props}
								color={latestColor}
								dataLength={chartData.length}
							/>
						)}
						activeDot={{ r: 5, fill: BIO_AGE_BELOW_COLOR, strokeWidth: 0 }}
						name="Biological age"
					/>
					<Line
						type="monotone"
						dataKey="bioAgeAbove"
						stroke={BIO_AGE_ABOVE_COLOR}
						strokeWidth={2.5}
						connectNulls={false}
						dot={(props) => (
							<GlowDot
								key={`glow-${props.index}`}
								{...props}
								color={latestColor}
								dataLength={chartData.length}
							/>
						)}
						activeDot={{ r: 5, fill: BIO_AGE_ABOVE_COLOR, strokeWidth: 0 }}
						name="Biological age"
					/>
					<Line
						type="monotone"
						dataKey="standardAging"
						stroke="var(--muted-foreground)"
						strokeWidth={1.5}
						strokeDasharray="5 4"
						dot={false}
						name="Standard aging"
					/>
				</LineChart>
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
