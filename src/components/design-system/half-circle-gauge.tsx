const CX = 50;
const CY = 50;
const OUTER_R = 42;
const INNER_R = 30;

function arcPath(r: number, value: number): string | null {
	if (value <= 0) return null;
	const frac = Math.min(value, 99.5) / 100;
	const angle = (1 - frac) * Math.PI;
	const ex = (CX + r * Math.cos(angle)).toFixed(2);
	const ey = (CY - r * Math.sin(angle)).toFixed(2);
	return `M ${CX - r} ${CY} A ${r} ${r} 0 0 1 ${ex} ${ey}`;
}

const OUTER_TRACK = `M ${CX - OUTER_R} ${CY} A ${OUTER_R} ${OUTER_R} 0 0 1 ${CX + OUTER_R} ${CY}`;
const INNER_TRACK = `M ${CX - INNER_R} ${CY} A ${INNER_R} ${INNER_R} 0 0 1 ${CX + INNER_R} ${CY}`;

export interface HalfCircleGaugeProps {
	primaryLevel: number;
	secondaryLevel: number;
	primaryColor: string;
	secondaryColor?: string;
}

export function HalfCircleGauge({
	primaryLevel,
	secondaryLevel,
	primaryColor,
	secondaryColor = "var(--teal)",
}: HalfCircleGaugeProps) {
	const primaryFill = arcPath(OUTER_R, primaryLevel);
	const secondaryFill = arcPath(INNER_R, secondaryLevel);

	const gradientId = `gauge-grad-${primaryColor.replace(/[^a-zA-Z0-9]/g, "")}`;

	return (
		<div className="relative">
			<svg
				viewBox="0 0 100 54"
				className="w-full overflow-visible"
				aria-hidden="true"
			>
				<defs>
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor={primaryColor} stopOpacity="0.6" />
						<stop offset="100%" stopColor={primaryColor} />
					</linearGradient>
				</defs>
				<path
					d={OUTER_TRACK}
					fill="none"
					strokeWidth="6"
					stroke="var(--surface-ring)"
					strokeLinecap="round"
					className="opacity-50"
				/>
				{primaryFill && (
					<path
						d={primaryFill}
						fill="none"
						strokeWidth="6"
						stroke={`url(#${gradientId})`}
						strokeLinecap="round"
						className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
					/>
				)}
				<path
					d={INNER_TRACK}
					fill="none"
					strokeWidth="4"
					stroke="var(--surface-ring)"
					strokeLinecap="round"
					className="opacity-30"
				/>
				{secondaryFill && (
					<path
						d={secondaryFill}
						fill="none"
						strokeWidth="4"
						stroke={secondaryColor}
						strokeLinecap="round"
					/>
				)}
				<text
					x="50"
					y="42"
					textAnchor="middle"
					className="fill-foreground font-headline font-bold text-[16px]"
				>
					{primaryLevel}%
				</text>
				<text
					x="50"
					y="52"
					textAnchor="middle"
					className="fill-muted-foreground font-medium text-[6px] uppercase tracking-[0.1em]"
				>
					Risk Level
				</text>
			</svg>
		</div>
	);
}
