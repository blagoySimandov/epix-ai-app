import type { BioAge } from "#/integrations/api/types";

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const RING_COLORS: Record<BioAge["status"], string> = {
	"Slower aging": "var(--teal)",
	Average: "var(--teal)",
	"Faster aging": "#f43f5e",
};

interface BioAgeDialProps {
	bio: number;
	chrono: number;
	status: BioAge["status"];
}

export function BioAgeDial({ bio, chrono, status }: BioAgeDialProps) {
	const ratio = bio / chrono;
	const offset = CIRCUMFERENCE * (1 - ratio);
	const color = RING_COLORS[status];

	return (
		<div className="relative w-56 h-56 flex items-center justify-center">
			<svg
				viewBox="0 0 100 100"
				className="w-full h-full -rotate-90"
				aria-label={`Biological age ${bio} out of ${chrono}`}
				role="img"
			>
				<title>Biological age dial</title>
				<circle
					cx="50"
					cy="50"
					r={RADIUS}
					fill="none"
					strokeWidth="6"
					stroke="var(--surface-ring)"
				/>
				<circle
					cx="50"
					cy="50"
					r={RADIUS}
					fill="none"
					strokeWidth="6"
					stroke={color}
					strokeDasharray={CIRCUMFERENCE}
					strokeDashoffset={offset}
					strokeLinecap="round"
					style={{
						animation: "dial-fill 1.4s cubic-bezier(0.25, 1, 0.5, 1) 0.4s both",
					}}
				/>
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center text-center">
				<span className="font-headline font-extrabold text-6xl text-primary tracking-tighter">
					{bio}
				</span>
				<span className="font-sans text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
					Bio Age
				</span>
			</div>
		</div>
	);
}
