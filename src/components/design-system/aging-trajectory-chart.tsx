import {
	BarChart,
	Bar,
	Cell,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	CartesianGrid,
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



// Theme colors
const COLOR_GOOD = "var(--green-text)";
const COLOR_BAD = "var(--rose)";

interface DeltaPoint {
	week: string;
	delta: number; // bioAge − standardAging  (<0 = good, >0 = bad)
}

function buildDeltaData(data: TrajectoryPoint[]): DeltaPoint[] {
	return data.map((p) => ({
		week: p.week,
		delta: parseFloat((p.bioAge - p.baseline).toFixed(2)),
	}));
}

function computeDelta(data: TrajectoryPoint[]): number {
	if (data.length < 2) return 0;
	return data[data.length - 1].bioAge - data[0].bioAge;
}

function DeltaBadge({ delta }: { delta: number }) {
	const isImproving = delta < 0;
	const Icon = isImproving ? TrendingDown : TrendingUp;
	const color = isImproving ? "var(--green-text)" : COLOR_BAD;
	return (
		<div style={{ color }} className="flex items-center gap-1.5">
			<Icon size={13} strokeWidth={2.5} />
			<span className="font-headline font-extrabold text-xl leading-none">
				{isImproving ? "" : "+"}
				{delta.toFixed(1)}h
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
					Aging Velocity
				</p>
				<p className="text-xs text-muted-foreground mt-0.5">vs. standard aging baseline</p>
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



interface TooltipPayload {
	payload?: DeltaPoint;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
	if (!active || !payload?.length) return null;
	const d = payload[0]?.payload;
	if (!d) return null;
	const isGood = d.delta <= 0;
	return (
		<div
			style={{
				background: "var(--card)",
				border: "1px solid var(--border)",
				borderRadius: "0.75rem",
				padding: "8px 12px",
				fontSize: 11,
			}}
		>
			<p className="font-bold text-foreground mb-1">{d.week}</p>
			<p style={{ color: isGood ? COLOR_GOOD : COLOR_BAD }}>
				{isGood ? "" : "+"}
				{d.delta.toFixed(1)}h vs baseline
			</p>
			<p className="text-muted-foreground text-[10px] mt-0.5">
				{isGood ? "Aging slower ✓" : "Aging faster ✗"}
			</p>
		</div>
	);
}

function ChartArea({ data }: { data: TrajectoryPoint[] }) {
	const deltaData = buildDeltaData(data);
	const minVal = Math.min(0, ...deltaData.map((d) => d.delta));
	const maxVal = Math.max(0, ...deltaData.map((d) => d.delta));
	const lastIdx = deltaData.length - 1;
	
	// Ensure baseline is visually balanced. Give the top part (max) at least 1/3 of the bottom part (min) space.
	const yMin = Math.floor(minVal - 1);
	const yMax = Math.max(Math.ceil(maxVal + 1), Math.ceil(Math.abs(minVal) * 0.4));

	return (
		<div className="h-44">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={deltaData}
					margin={{ top: 8, right: 10, left: -8, bottom: 0 }}
					barCategoryGap="30%"
				>
					<defs>
						<linearGradient id="barGood" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={COLOR_GOOD} stopOpacity={0.9} />
							<stop offset="100%" stopColor={COLOR_GOOD} stopOpacity={0.5} />
						</linearGradient>
						<linearGradient id="barBad" x1="0" y1="1" x2="0" y2="0">
							<stop offset="0%" stopColor={COLOR_BAD} stopOpacity={0.9} />
							<stop offset="100%" stopColor={COLOR_BAD} stopOpacity={0.5} />
						</linearGradient>
					</defs>
					<CartesianGrid
						strokeDasharray="3 3"
						vertical={false}
						stroke="var(--border)"
						opacity={0.5}
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
						tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}h`}
						domain={[yMin, yMax]}
						label={{
							value: "HOURS",
							angle: -90,
							position: "insideLeft",
							offset: 16,
							style: {
								fontSize: 8,
								fill: "var(--muted-foreground)",
								letterSpacing: "0.1em",
								textAnchor: "middle",
							},
						}}
					/>
					<ReferenceLine
						y={0}
						stroke="var(--muted-foreground)"
						strokeWidth={1.5}
						strokeDasharray="5 4"
						label={{
							value: "Baseline",
							position: "insideTopRight",
							fontSize: 9,
							fill: "var(--muted-foreground)",
							dy: -4,
						}}
					/>
					<Tooltip
						content={<CustomTooltip />}
						cursor={{ fill: "var(--muted)", opacity: 0.3, radius: 4 }}
					/>
					<Bar
						dataKey="delta"
						radius={[4, 4, 4, 4]}
						maxBarSize={28}
						isAnimationActive
						animationDuration={700}
						animationEasing="ease-out"
					>
						{deltaData.map((entry, index) => {
							const isGood = entry.delta <= 0;
							const isLast = index === lastIdx;
							const fill = isGood ? "url(#barGood)" : "url(#barBad)";
							return (
								<Cell
									key={`cell-${index}`}
									fill={fill}
									opacity={isLast ? 1 : 0.7}
									stroke={isLast ? (isGood ? COLOR_GOOD : COLOR_BAD) : "none"}
									strokeWidth={isLast ? 1.5 : 0}
								/>
							);
						})}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

function ChartLegend() {
	return (
		<div className="flex gap-5 justify-center mt-1">
			<div className="flex items-center gap-1.5">
				<span
					style={{
						display: "inline-block",
						width: 10,
						height: 10,
						borderRadius: 3,
						background: COLOR_GOOD,
						opacity: 0.8,
					}}
				/>
				<span className="text-[10px] font-medium text-muted-foreground">
					Slower than baseline
				</span>
			</div>
			<div className="flex items-center gap-1.5">
				<span
					style={{
						display: "inline-block",
						width: 10,
						height: 10,
						borderRadius: 3,
						background: COLOR_BAD,
						opacity: 0.8,
					}}
				/>
				<span className="text-[10px] font-medium text-muted-foreground">
					Faster than baseline
				</span>
			</div>
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
