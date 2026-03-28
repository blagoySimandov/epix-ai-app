import { Link } from "@tanstack/react-router";
import { Activity, Brain, Heart, Shield } from "lucide-react";
import type { Domain } from "#/integrations/api/types";
import { useCountUp } from "#/lib/use-count-up";

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
	red: { bg: "bg-rose-100", text: "text-rose-600" },
};

const RISK_DOT: Record<Domain["risk"], string> = {
	yellow: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]",
	green: "bg-green-glow shadow-[0_0_8px_rgba(0,228,117,0.5)]",
	red: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]",
};

interface DomainCardProps {
	domain: Domain;
}

export function DomainCard({ domain }: DomainCardProps) {
	const Icon = DOMAIN_ICONS[domain.id] ?? Heart;
	const iconStyle = ICON_STYLE[domain.risk];
	const dotStyle = RISK_DOT[domain.risk];
	const displayScore = useCountUp(domain.score, 1000, 600);

	return (
		<Link
			to="/report/$domain"
			params={{ domain: domain.id }}
			className="glass-card p-5 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white/40 flex flex-col justify-between aspect-square active:scale-95 transition-transform duration-200"
		>
			<div className="flex justify-between items-start">
				<div className={`p-2 rounded-xl ${iconStyle.bg} ${iconStyle.text}`}>
					<Icon size={20} />
				</div>
				<div className={`w-2.5 h-2.5 rounded-full ${dotStyle}`} />
			</div>
			<div>
				<p className="font-headline font-bold text-lg mb-0.5">{domain.name}</p>
				<div className="flex items-baseline gap-1">
					<span className="font-headline font-extrabold text-2xl">
						{displayScore}
					</span>
					<span className="text-[10px] text-muted-foreground">/100</span>
				</div>
				<p className="text-[11px] font-medium text-muted-foreground mt-2">
					{domain.activation} Activation
				</p>
			</div>
		</Link>
	);
}
