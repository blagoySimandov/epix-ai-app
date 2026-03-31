import { useCountUp } from "#/lib/use-count-up";

export interface BioAgeWidgetProps {
	bio: number;
	chrono: number;
	delta: number;
	status: "Slower aging" | "Average" | "Faster aging";
}

type Status = BioAgeWidgetProps["status"];

const R = 44;
const C = 2 * Math.PI * R;
const TICK_R = 47.5;
const TICK_COUNT = 60;

const STATUS_COLOR: Record<Status, string> = {
	"Slower aging": "var(--teal)",
	Average: "var(--color-yellow-500)",
	"Faster aging": "var(--color-rose-400)",
};

const DELTA_CLASS: Record<Status, string> = {
	"Slower aging": "bg-green-glow/20 text-green-text",
	Average: "bg-yellow-400/20 text-yellow-500",
	"Faster aging": "bg-rose-500/20 text-rose-400",
};

const DELTA_TEXT: Record<Status, string> = {
	"Slower aging": "text-green-text",
	Average: "text-yellow-500",
	"Faster aging": "text-rose-400",
};

const INSIGHT: Record<Status, (d: number) => string> = {
	"Slower aging": (d) => `Aging ${d} year${d !== 1 ? "s" : ""} younger than expected`,
	Average: () => "Aging at your expected chronological rate",
	"Faster aging": (d) => `Aging ${d} year${d !== 1 ? "s" : ""} faster than expected`,
};

const TRACK_STROKE = "color-mix(in srgb, var(--card-foreground) 8%, transparent)";
const INACTIVE_TICK = "color-mix(in srgb, var(--card-foreground) 12%, transparent)";

function GlowFilter() {
	return (
		<filter id="bioAgeGlow" x="-40%" y="-40%" width="180%" height="180%">
			<feGaussianBlur stdDeviation="2.5" result="blur" />
			<feMerge>
				<feMergeNode in="blur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	);
}

function TickRing({ ratio, color }: { ratio: number; color: string }) {
	return (
		<g>
			{Array.from({ length: TICK_COUNT }, (_, i) => {
				const angle = (i / TICK_COUNT) * 2 * Math.PI;
				const isActive = i / TICK_COUNT < ratio;
				return (
					<circle
						key={i}
						cx={50 + TICK_R * Math.cos(angle)}
						cy={50 + TICK_R * Math.sin(angle)}
						r="0.75"
						fill={isActive ? color : INACTIVE_TICK}
					/>
				);
			})}
		</g>
	);
}

function ArcTrack() {
	return (
		<circle
			cx="50"
			cy="50"
			r={R}
			fill="none"
			strokeWidth="5"
			stroke={TRACK_STROKE}
		/>
	);
}

function ActiveArc({ offset, color }: { offset: number; color: string }) {
	return (
		<>
			<circle
				cx="50"
				cy="50"
				r={R}
				fill="none"
				strokeWidth="8"
				stroke={color}
				strokeDasharray={C}
				strokeDashoffset={offset}
				strokeLinecap="round"
				opacity="0.25"
				filter="url(#bioAgeGlow)"
			/>
			<circle
				cx="50"
				cy="50"
				r={R}
				fill="none"
				strokeWidth="5"
				stroke={color}
				strokeDasharray={C}
				strokeDashoffset={offset}
				strokeLinecap="round"
				style={{ animation: "dial-fill 1.4s cubic-bezier(0.25,1,0.5,1) 0.4s both" }}
			/>
		</>
	);
}

function EndDot({ ratio, color }: { ratio: number; color: string }) {
	const angle = ratio * 2 * Math.PI;
	return (
		<circle
			cx={50 + R * Math.cos(angle)}
			cy={50 + R * Math.sin(angle)}
			r="3"
			fill={color}
			filter="url(#bioAgeGlow)"
		/>
	);
}

function DialSvg({
	bio,
	chrono,
	status,
}: Pick<BioAgeWidgetProps, "bio" | "chrono" | "status">) {
	const ratio = bio / chrono;
	const offset = C * (1 - ratio);
	const color = STATUS_COLOR[status];
	return (
		<svg
			viewBox="0 0 100 100"
			className="w-full h-full -rotate-90"
			aria-hidden
		>
			<defs>
				<GlowFilter />
			</defs>
			<TickRing ratio={ratio} color={color} />
			<ArcTrack />
			<ActiveArc offset={offset} color={color} />
			<EndDot ratio={ratio} color={color} />
		</svg>
	);
}

function DeltaBadge({
	delta,
	status,
}: Pick<BioAgeWidgetProps, "delta" | "status">) {
	const sign = delta <= 0 ? "−" : "+";
	const abs = Math.abs(delta);
	return (
		<span
			className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${DELTA_CLASS[status]}`}
		>
			{sign}
			{abs} yrs
		</span>
	);
}

function DialCenter({
	bio,
	delta,
	status,
}: Pick<BioAgeWidgetProps, "bio" | "delta" | "status">) {
	const displayBio = useCountUp(bio);
	return (
		<div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
			<span className="font-headline font-black text-6xl text-card-foreground tracking-tighter leading-none">
				{displayBio}
			</span>
			<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
				Bio Age
			</span>
			<DeltaBadge delta={delta} status={status} />
		</div>
	);
}

function DialContainer(props: BioAgeWidgetProps) {
	return (
		<div className="relative w-52 h-52">
			<DialSvg bio={props.bio} chrono={props.chrono} status={props.status} />
			<DialCenter bio={props.bio} delta={props.delta} status={props.status} />
		</div>
	);
}

function InsightLine({
	delta,
	status,
}: Pick<BioAgeWidgetProps, "delta" | "status">) {
	const abs = Math.abs(delta);
	return (
		<p className="text-center text-[13px] text-muted-foreground leading-snug px-2">
			{INSIGHT[status](abs)}
		</p>
	);
}

function ChronoStat({ chrono }: { chrono: number }) {
	const display = useCountUp(chrono);
	return (
		<div className="text-center">
			<p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-[0.12em] mb-0.5">
				Chronological
			</p>
			<p className="font-headline font-bold text-xl text-card-foreground/70">
				{display}
			</p>
		</div>
	);
}

function StatsFooter({
	chrono,
	delta,
	status,
}: Pick<BioAgeWidgetProps, "chrono" | "delta" | "status">) {
	const sign = delta <= 0 ? "−" : "+";
	const abs = Math.abs(delta);
	return (
		<div className="w-full border-t border-border pt-4 grid grid-cols-2 gap-4">
			<ChronoStat chrono={chrono} />
			<div className="text-center">
				<p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-[0.12em] mb-0.5">
					Age Delta
				</p>
				<p className={`font-headline font-bold text-xl ${DELTA_TEXT[status]}`}>
					{sign}
					{abs} Yrs
				</p>
			</div>
		</div>
	);
}

function GlowOverlay({ color }: { color: string }) {
	return (
		<div
			className="absolute inset-0 pointer-events-none rounded-[2rem]"
			style={{
				background: `radial-gradient(ellipse at 50% 30%, ${color} 0%, transparent 60%)`,
				opacity: 0.08,
			}}
		/>
	);
}

export function BioAgeWidget({ bio, chrono, delta, status }: BioAgeWidgetProps) {
	const color = STATUS_COLOR[status];
	return (
		<div className="relative rounded-[2rem] overflow-hidden bg-card border border-border p-6 flex flex-col items-center gap-5 shadow-xl">
			<GlowOverlay color={color} />
			<DialContainer bio={bio} chrono={chrono} delta={delta} status={status} />
			<InsightLine delta={delta} status={status} />
			<StatsFooter chrono={chrono} delta={delta} status={status} />
		</div>
	);
}
