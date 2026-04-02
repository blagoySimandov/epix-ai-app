import { useMemo } from "react";

interface ActivationGaugeProps {
	level: number; // 0-100
}

export function ActivationGauge({ level }: ActivationGaugeProps) {
	const rotation = useMemo(() => {
		return (level / 100) * 180 - 90;
	}, [level]);

	return (
		<div className="relative w-48 h-24 mx-auto overflow-hidden">
			{/* Gauge Background Arc */}
			<div className="absolute inset-0 border-[12px] border-foreground/8 rounded-t-full" />

			{/* Active Progress Arc */}
			<svg
				viewBox="0 0 100 50"
				className="absolute inset-0 w-full h-full"
				style={{
					filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--teal) 40%, transparent))",
				}}
			>
				<path
					d="M 5 50 A 45 45 0 0 1 95 50"
					fill="none"
					stroke="currentColor"
					strokeWidth="10"
					strokeDasharray="141.37"
					strokeDashoffset={141.37 - (level / 100) * 141.37}
					className="text-teal transition-all duration-1000 ease-out-back"
					strokeLinecap="round"
				/>
			</svg>

			{/* Tick Ring */}
			<div className="absolute inset-0 opacity-20">
				{Array.from({ length: 21 }).map((_, i) => (
					<div
						key={i}
						className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-foreground origin-bottom"
						style={{
							transform: `translateX(-50%) rotate(${i * 9 - 90}deg) translateY(-40px)`,
						}}
					/>
				))}
			</div>

			{/* Needle */}
			<div
				className="absolute bottom-0 left-1/2 w-0.5 h-[40px] bg-foreground/70 origin-bottom transition-transform duration-1000 ease-out-back"
				style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
			/>

			{/* Center Value */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
				<div className="bg-background border border-border w-10 h-10 rounded-full flex items-center justify-center shadow-sm z-10">
					<span className="text-[10px] font-bold tabular-nums text-teal">
						{level}%
					</span>
				</div>
			</div>

			{/* Scale Labels */}
			<div className="absolute bottom-1 left-4 text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
				0%
			</div>
			<div className="absolute bottom-1 right-4 text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
				100%
			</div>
		</div>
	);
}
