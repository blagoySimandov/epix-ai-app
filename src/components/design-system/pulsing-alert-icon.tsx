import type React from "react";

export interface PulsingAlertIconProps {
	/** Lucide icon component to display */
	icon: React.ElementType;
	/** Any additional classes */
	className?: string;
	/** Optional size of the inner icon container (default: w-20 h-20) */
	size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
	sm: "w-16 h-16",
	md: "w-20 h-20",
	lg: "w-24 h-24",
};

const ICON_SIZE_MAP = {
	sm: 32,
	md: 40,
	lg: 48,
};

export function PulsingAlertIcon({
	icon: Icon,
	className = "",
	size = "md",
}: PulsingAlertIconProps) {
	return (
		<div
			className={`relative flex items-center justify-center w-24 h-24 mx-auto ${className}`}
		>
			{/* Outer pulsing ring */}
			<span
				className="absolute inset-0 rounded-full opacity-30 animate-ping"
				style={{ background: "rgba(255,255,255,0.25)" }}
			/>
			{/* Static inner fade ring */}
			<span
				className="absolute inset-2 rounded-full opacity-20"
				style={{ background: "rgba(255,255,255,0.15)" }}
			/>
			{/* Core icon container */}
			<div
				className={`relative z-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 ${SIZE_MAP[size]}`}
			>
				<Icon
					size={ICON_SIZE_MAP[size]}
					className="text-white"
					strokeWidth={2.5}
				/>
			</div>
		</div>
	);
}
