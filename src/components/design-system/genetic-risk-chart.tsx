const W = 300;
const H = 80;
const TRACK_Y = 60;
const TRACK_H = 8;
const MEAN_X = W / 2;
const SIGMA = 55;
const PEAK_H = 34;

function gaussianH(x: number): number {
	return PEAK_H * Math.exp(-((x - MEAN_X) ** 2) / (2 * SIGMA ** 2));
}

function buildBellPath(): string {
	const N = 40;
	const pts = Array.from({ length: N + 1 }, (_, i) => {
		const x = (i / N) * W;
		return `${x.toFixed(1)} ${(TRACK_Y - gaussianH(x)).toFixed(1)}`;
	}).join(" L ");
	return `M 0 ${TRACK_Y} L ${pts} L ${W} ${TRACK_Y} Z`;
}

const BELL_PATH = buildBellPath();

interface GeneticRiskChartProps {
	userRisk: number;
}

function UserPin({ userX }: { userX: number }) {
	const labelX = Math.max(16, Math.min(userX, W - 16));
	const pinTop = TRACK_Y - 22;

	return (
		<>
			<line
				x1={userX}
				y1={pinTop + 10}
				x2={userX}
				y2={TRACK_Y}
				stroke="var(--foreground)"
				strokeWidth="1"
				strokeOpacity="0.45"
			/>
			<polygon
				points={`${userX},${pinTop} ${userX + 5},${pinTop + 8} ${userX},${pinTop + 16} ${userX - 5},${pinTop + 8}`}
				fill="var(--foreground)"
				filter="url(#pinGlow)"
			/>
			<text
				x={labelX}
				y={pinTop - 4}
				textAnchor="middle"
				fontSize="7"
				fill="var(--foreground)"
				fillOpacity="0.6"
				fontFamily="monospace"
				fontWeight="bold"
				letterSpacing="1"
			>
				YOU
			</text>
		</>
	);
}

export function GeneticRiskChart({ userRisk }: GeneticRiskChartProps) {
	const userX = (userRisk / 100) * W;

	return (
		<div className="flex flex-col gap-2">
			<svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
				<defs>
					<linearGradient id="riskGrad" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="var(--green-glow)" />
						<stop offset="48%" stopColor="var(--amber)" />
						<stop offset="100%" stopColor="var(--rose)" />
					</linearGradient>
					<linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.06" />
						<stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.01" />
					</linearGradient>
					<filter id="pinGlow" x="-100%" y="-100%" width="300%" height="300%">
						<feGaussianBlur stdDeviation="2" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Population bell curve */}
				<path d={BELL_PATH} fill="url(#bellGrad)" />

				{/* Gradient risk track */}
				<rect
					x={0}
					y={TRACK_Y}
					width={W}
					height={TRACK_H}
					rx={TRACK_H / 2}
					fill="url(#riskGrad)"
					opacity="0.9"
				/>

				{/* Average marker */}
				<line
					x1={MEAN_X}
					y1={TRACK_Y - 3}
					x2={MEAN_X}
					y2={TRACK_Y + TRACK_H + 3}
					stroke="var(--foreground)"
					strokeWidth="1"
					strokeOpacity="0.3"
					strokeDasharray="2 2"
				/>
				<text
					x={MEAN_X}
					y={TRACK_Y + TRACK_H + 14}
					textAnchor="middle"
					fontSize="6.5"
					fill="var(--foreground)"
					fillOpacity="0.35"
					fontFamily="monospace"
					fontWeight="bold"
					letterSpacing="1"
				>
					AVG
				</text>

				<UserPin userX={userX} />
			</svg>

			<div className="flex justify-between px-0.5">
				<span className="text-[9px] uppercase tracking-widest font-bold text-green-glow">
					Low
				</span>
				<span className="text-[9px] uppercase tracking-widest font-bold text-amber">
					Average
				</span>
				<span className="text-[9px] uppercase tracking-widest font-bold text-rose">
					High
				</span>
			</div>
		</div>
	);
}
