import {
	CartesianGrid,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";

export interface TrajectoryPoint {
	label: string;
	bioAge: number;
	baseline: number;
}

export interface AgingTrajectoryChartProps {
	data: TrajectoryPoint[];
}

// ─── Colors ──────────────────────────────────────────────────────────────────
const COLOR_BELOW = "var(--teal)"; // bio age below baseline = improving
const COLOR_ABOVE = "var(--rose)"; // bio age above baseline = accelerating
const COLOR_BASELINE = "var(--violet)"; // reference / chronological age

// ─── Data Processing ─────────────────────────────────────────────────────────

interface ChartPoint {
	label: string;
	bioAge: number;
	baseline: number;
	below: number | null; // bioAge value when at/below baseline
	above: number | null; // bioAge value when above baseline
}

/**
 * Enriches raw trajectory data with per-point color-segment values.
 * Interpolated crossing points are inserted so that the two colored
 * line segments always connect smoothly at the baseline intersection.
 */
function buildColoredData(data: TrajectoryPoint[]): ChartPoint[] {
	const result: ChartPoint[] = [];

	for (let i = 0; i < data.length; i++) {
		const curr = data[i];
		const currAbove = curr.bioAge > curr.baseline;

		if (i > 0) {
			const prev = data[i - 1];
			const prevAbove = prev.bioAge > prev.baseline;

			if (currAbove !== prevAbove) {
				// Lines crossed — interpolate the exact crossing point
				const dBioAge = curr.bioAge - prev.bioAge;
				const dBaseline = curr.baseline - prev.baseline;
				const denominator = dBioAge - dBaseline;
				const t =
					denominator !== 0
						? (prev.baseline - prev.bioAge) / denominator
						: 0;
				const crossAge = prev.bioAge + t * dBioAge;
				const crossBaseline = prev.baseline + t * dBaseline;

				result.push({
					label: "",
					bioAge: crossAge,
					baseline: crossBaseline,
					below: crossAge, // shared by both segments at the crossing
					above: crossAge,
				});
			}
		}

		result.push({
			label: curr.label,
			bioAge: curr.bioAge,
			baseline: curr.baseline,
			below: currAbove ? null : curr.bioAge,
			above: currAbove ? curr.bioAge : null,
		});
	}

	return result;
}

function computeDelta(data: TrajectoryPoint[]): number {
	if (data.length < 2) return 0;
	return data[data.length - 1].bioAge - data[0].bioAge;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const TOOLTIP_STYLE = {
	backgroundColor: "var(--card)",
	borderColor: "var(--border)",
	borderRadius: "0.5rem",
	fontSize: 11,
	color: "var(--card-foreground)",
};

function DeltaBadge({ delta }: { delta: number }) {
	const isImproving = delta < 0;
	const Icon = isImproving ? TrendingDown : TrendingUp;
	const color = isImproving ? "var(--green-text)" : "var(--rose)";

	return (
		<div
			style={{ color, background: `${color}18` }}
			className="flex items-center gap-1 px-2.5 py-1 rounded-full"
		>
			<Icon size={11} strokeWidth={2.5} />
			<span className="font-headline font-extrabold text-xs leading-none">
				{isImproving ? "" : "+"}
				{delta.toFixed(1)} yrs
			</span>
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
		<div className="flex gap-4 justify-center flex-wrap">
			<div className="flex items-center gap-1.5">
				<svg width="14" height="4" viewBox="0 0 14 4" aria-hidden="true">
					<rect width="14" height="2" y="1" rx="1" fill={COLOR_BELOW} />
				</svg>
				<span className="text-[10px] font-medium text-muted-foreground">
					Improving
				</span>
			</div>
			<div className="flex items-center gap-1.5">
				<svg width="14" height="4" viewBox="0 0 14 4" aria-hidden="true">
					<rect width="14" height="2" y="1" rx="1" fill={COLOR_ABOVE} />
				</svg>
				<span className="text-[10px] font-medium text-muted-foreground">
					Accelerating
				</span>
			</div>
			<div className="flex items-center gap-1.5">
				<svg width="14" height="4" viewBox="0 0 14 4" aria-hidden="true">
					<line
						x1="0"
						y1="2"
						x2="14"
						y2="2"
						stroke={COLOR_BASELINE}
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

function ChartArea({
	chartData,
	originalLength,
}: {
	chartData: ChartPoint[];
	originalLength: number;
}) {
	return (
		<div className="h-44">
			<ResponsiveContainer width="100%" height="100%">
				<ComposedChart
					data={chartData}
					margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						vertical={false}
						stroke="var(--border)"
					/>
					<XAxis
						dataKey="label"
						tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
						axisLine={false}
						tickLine={false}
						interval="preserveStartEnd"
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
							const num = typeof value === "number" ? value : parseFloat(String(value));
							const label = name === "below" || name === "above" ? "Bio Age" : "Baseline";
							return [`${num.toFixed(1)} yrs`, label];
						}}
					/>

					{/* Purple dashed baseline */}
					<Line
						type="monotone"
						dataKey="baseline"
						stroke={COLOR_BASELINE}
						strokeWidth={1.5}
						strokeDasharray="6 4"
						dot={false}
						activeDot={false}
						name="baseline"
					/>

					{/* Bio age — below baseline (teal/blue = improving) */}
					<Line
						type="monotone"
						dataKey="below"
						stroke={COLOR_BELOW}
						strokeWidth={2.5}
						dot={(props) => (
							<GlowDot
								key={`below-${props.index}`}
								{...props}
								dataLength={originalLength}
								color={COLOR_BELOW}
							/>
						)}
						activeDot={{ r: 4, fill: COLOR_BELOW, strokeWidth: 0 }}
						connectNulls={false}
						name="below"
					/>

					{/* Bio age — above baseline (rose/red = accelerating) */}
					<Line
						type="monotone"
						dataKey="above"
						stroke={COLOR_ABOVE}
						strokeWidth={2.5}
						dot={(props) => (
							<GlowDot
								key={`above-${props.index}`}
								{...props}
								dataLength={originalLength}
								color={COLOR_ABOVE}
							/>
						)}
						activeDot={{ r: 4, fill: COLOR_ABOVE, strokeWidth: 0 }}
						connectNulls={false}
						name="above"
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AgingTrajectoryChart({ data }: AgingTrajectoryChartProps) {
	const delta = computeDelta(data);
	const chartData = buildColoredData(data);
	const latest = data[data.length - 1];
	const lastAbove = latest ? latest.bioAge > latest.baseline : false;
	const lastColor = lastAbove ? COLOR_ABOVE : COLOR_BELOW;
	const isImproving = delta < 0;

	return (
		<div className="glass-card rounded-[1.5rem] border border-border/40 p-5 space-y-4">
			{/* ── Header ── */}
			<div className="flex items-start justify-between">
				<div>
					<p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
						Aging Trajectory
					</p>
					<p className="text-xs text-muted-foreground mt-0.5">12-month trend</p>
				</div>
				<DeltaBadge delta={delta} />
			</div>

			{/* ── Stats row ── */}
			<div className="flex items-end gap-6">
				<div>
					<p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
						Bio Age
					</p>
					<p
						className="font-headline font-extrabold text-2xl leading-none mt-0.5"
						style={{ color: lastColor }}
					>
						{latest?.bioAge.toFixed(1)}{" "}
						<span className="text-sm font-semibold text-muted-foreground">
							yrs
						</span>
					</p>
				</div>
				<div>
					<p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
						Baseline
					</p>
					<p
						className="font-headline font-extrabold text-2xl leading-none mt-0.5"
						style={{ color: COLOR_BASELINE }}
					>
						{latest?.baseline.toFixed(1)}{" "}
						<span className="text-sm font-semibold text-muted-foreground">
							yrs
						</span>
					</p>
				</div>
				<p
					className="ml-auto text-[11px] font-bold pb-0.5"
					style={{ color: isImproving ? "var(--green-text)" : "var(--rose)" }}
				>
					{isImproving ? "Reversing ↓" : "Accelerating ↑"}
				</p>
			</div>

			{/* ── Chart ── */}
			{/* originalLength uses chartData.length (not data.length) because the dot
			   index callback refers to positions in the enriched chartData array.
			   Crossing points are always inserted *before* a real point, so the
			   last element is always the last original data point. */}
			<ChartArea
				chartData={chartData}
				originalLength={chartData.length}
			/>

			{/* ── Legend ── */}
			<ChartLegend />
		</div>
	);
}
