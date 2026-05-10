import { useState } from "react";
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
import { TrendingDown, TrendingUp, ChevronRight } from "lucide-react";
import { generateDailyLabels } from "#/lib/date-utils";
import { BottomSheet } from "./BottomSheet";

export interface TrajectoryPoint {
	week: string;
	bioAge: number;
	baseline: number;
}

export interface AgingTrajectoryChartProps {
	data: TrajectoryPoint[];
}

const COLOR_GOOD = "var(--green-text)";
const COLOR_BAD = "var(--rose)";

interface DeltaPoint {
	week: string;
	delta: number;
}

interface BreakdownFactor {
	label: string;
	value: number;
	unit: string;
}

interface BreakdownGroup {
	title: string;
	factors: BreakdownFactor[];
}

const TODAY_BREAKDOWN: BreakdownGroup[] = [
	{
		title: "Physical Activity",
		factors: [
			{ label: "Steps", value: -0.4, unit: "h" },
			{ label: "HRV", value: -0.2, unit: "h" },
			{ label: "Jogging", value: -0.1, unit: "h" },
		],
	},
	{
		title: "Environment",
		factors: [
			{ label: "Air Pollution", value: +0.2, unit: "h" },
			{ label: "Sleep", value: +0.1, unit: "h" },
			{ label: "Elevation", value: +0.1, unit: "h" },
		],
	},
];

function buildDeltaData(data: TrajectoryPoint[]): DeltaPoint[] {
	const labels = generateDailyLabels(data.length);
	return data.map((p, i) => ({
		week: labels[i],
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
	const color = isImproving ? COLOR_GOOD : COLOR_BAD;
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

function FactorRow({ factor }: { factor: BreakdownFactor }) {
	const isGood = factor.value < 0;
	const color = isGood ? COLOR_GOOD : COLOR_BAD;
	return (
		<div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
			<span className="text-sm text-foreground">{factor.label}</span>
			<span className="text-sm font-bold" style={{ color }}>
				{isGood ? "" : "+"}
				{factor.value.toFixed(1)}{factor.unit}
			</span>
		</div>
	);
}

function BreakdownGroup({ group }: { group: BreakdownGroup }) {
	return (
		<div className="mb-4">
			<p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
				{group.title}
			</p>
			{group.factors.map((f) => (
				<FactorRow key={f.label} factor={f} />
			))}
		</div>
	);
}

function computeBreakdownNet(groups: BreakdownGroup[]): number {
	return groups.flatMap((g) => g.factors).reduce((sum, f) => sum + f.value, 0);
}

function BreakdownNet({ groups }: { groups: BreakdownGroup[] }) {
	const net = computeBreakdownNet(groups);
	const isGood = net < 0;
	const color = isGood ? COLOR_GOOD : COLOR_BAD;
	return (
		<div
			className="flex items-center justify-between rounded-xl px-4 py-3 mt-2"
			style={{ background: "var(--muted)" }}
		>
			<span className="text-sm font-bold text-foreground">Net today</span>
			<div className="flex items-center gap-2">
				<span className="text-sm font-extrabold" style={{ color }}>
					{isGood ? "" : "+"}
					{net.toFixed(1)}h
				</span>
				<span className="text-[10px] text-muted-foreground">
					{isGood ? "Aging slower ✓" : "Aging faster ✗"}
				</span>
			</div>
		</div>
	);
}

function TodayBreakdownSheet({ onClose }: { onClose: () => void }) {
	const labels = generateDailyLabels(7);
	const todayLabel = labels[labels.length - 1];
	return (
		<BottomSheet title={`${todayLabel} — Score Breakdown`} onClose={onClose}>
			<div>
				{TODAY_BREAKDOWN.map((group) => (
					<BreakdownGroup key={group.title} group={group} />
				))}
				<BreakdownNet groups={TODAY_BREAKDOWN} />
			</div>
		</BottomSheet>
	);
}

function TodayBreakdownButton({ onClick }: { onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="w-full flex items-center justify-between px-3 py-2 rounded-xl mt-1"
			style={{ background: "var(--muted)" }}
		>
			<span className="text-[11px] font-semibold text-muted-foreground">
				Today's score breakdown
			</span>
			<ChevronRight size={13} className="text-muted-foreground" />
		</button>
	);
}

export function AgingTrajectoryChart({ data }: AgingTrajectoryChartProps) {
	const [showBreakdown, setShowBreakdown] = useState(false);
	const delta = computeDelta(data);
	return (
		<>
			<div className="glass-card rounded-[1.5rem] border border-border/40 p-5 space-y-3">
				<ChartHeader delta={delta} />
				<ChartArea data={data} />
				<ChartLegend />
				<TodayBreakdownButton onClick={() => setShowBreakdown(true)} />
			</div>
			{showBreakdown && <TodayBreakdownSheet onClose={() => setShowBreakdown(false)} />}
		</>
	);
}
