import { Link } from "@tanstack/react-router";
import { Activity, Brain, Heart, Shield } from "lucide-react";
import { HalfCircleGauge } from "@design-system";
import type { Domain } from "#/integrations/api/types";

const DOMAIN_ICONS: Record<
	string,
	React.ComponentType<{ size?: number; className?: string }>
> = {
	cardio: Heart,
	metabolic: Activity,
	neuro: Brain,
	onco: Shield,
};

const ICON_STYLE: Record<Domain["risk"], { bg: string; text: string }> = {
	yellow: { bg: "bg-teal-light/30", text: "text-teal" },
	green: { bg: "bg-green-glow/20", text: "text-green-text" },
	red: { bg: "bg-rose-500/20", text: "text-rose-400" },
};

const RISK_DOT: Record<Domain["risk"], string> = {
	yellow: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]",
	green: "bg-green-glow shadow-[0_0_8px_rgba(0,228,117,0.5)]",
	red: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]",
};

const RISK_COLORS: Record<Domain["risk"], string> = {
	yellow: "#facc15",
	green: "var(--green-glow)",
	red: "#f43f5e",
};

const RISK_BG: Record<Domain["risk"], string> = {
	yellow: "bg-yellow-400/5",
	green: "bg-green-glow/5",
	red: "bg-rose-500/5",
};

export function DomainCard({ domain }: { domain: Domain }) {
	const Icon = DOMAIN_ICONS[domain.id] ?? Heart;
	const { bg, text } = ICON_STYLE[domain.risk];

	return (
		<Link
			to="/report/$domain"
			params={{ domain: domain.id }}
			className="glass-card p-4 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-white/5 flex flex-col gap-4 active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
		>
			<div
				className={`absolute inset-0 ${RISK_BG[domain.risk]} pointer-events-none`}
			/>

			<div className="relative z-10 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2.5">
						<div className={`p-2 rounded-xl ${bg} ${text} shadow-sm`}>
							<Icon size={16} />
						</div>
						<p className="font-headline font-bold text-sm tracking-tight">
							{domain.name}
						</p>
					</div>
					<div className={`w-2 h-2 rounded-full ${RISK_DOT[domain.risk]}`} />
				</div>

				<div className="px-1">
					<HalfCircleGauge
						primaryLevel={domain.geneticRisk}
						secondaryLevel={domain.geneticActivation}
						primaryColor={RISK_COLORS[domain.risk]}
					/>
				</div>

				<div className="flex justify-between items-center px-1">
					<span className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.1em]">
						Activation
					</span>
					<span className="text-[10px] text-teal font-bold tabular-nums">
						{domain.geneticActivation}%
					</span>
				</div>
			</div>
		</Link>
	);
}
