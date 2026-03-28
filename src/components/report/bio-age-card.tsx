import type { BioAge } from "#/integrations/api/types";
import { BioAgeDial } from "./bio-age-dial";

interface BioAgeCardProps {
	bioAge: BioAge;
}

function MetricsGrid({ chrono, delta }: { chrono: number; delta: number }) {
	const sign = delta < 0 ? "" : "+";
	return (
		<div className="w-full mt-10 grid grid-cols-2 gap-8 border-t border-border/30 pt-8">
			<div className="text-center space-y-1">
				<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
					Chronological
				</p>
				<p className="font-headline font-bold text-2xl">{chrono}</p>
			</div>
			<div className="text-center space-y-1">
				<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
					Age Delta
				</p>
				<p className="font-headline font-bold text-2xl text-green-glow">
					{sign}
					{delta} Years
				</p>
			</div>
		</div>
	);
}

export function BioAgeCard({ bioAge }: BioAgeCardProps) {
	return (
		<div className="glass-card rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
			<div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-light/20 rounded-full blur-3xl" />
			<div className="flex flex-col items-center">
				<BioAgeDial
					bio={bioAge.bio}
					chrono={bioAge.chrono}
					status={bioAge.status}
				/>
				<MetricsGrid chrono={bioAge.chrono} delta={bioAge.delta} />
			</div>
		</div>
	);
}
