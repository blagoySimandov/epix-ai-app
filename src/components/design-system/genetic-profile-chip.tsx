import { Dna } from "lucide-react";

export interface GeneticProfileChipProps {
	gene: string;
	snp: string;
	genotype: string;
	className?: string;
}

export function GeneticProfileChip({
	gene,
	snp,
	genotype,
	className = "",
}: GeneticProfileChipProps) {
	return (
		<div
			className={`flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 ${className}`}
		>
			<Dna size={16} className="text-white/80 shrink-0" />
			<div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/90">
				<span>
					<span className="text-white/60">Gene</span>{" "}
					<span className="font-bold text-white">{gene}</span>
				</span>
				<span>
					<span className="text-white/60">SNP</span>{" "}
					<span className="font-bold text-white">{snp}</span>
				</span>
				<span>
					<span className="text-white/60">Genotype</span>{" "}
					<span className="font-bold text-white">{genotype}</span>
				</span>
			</div>
		</div>
	);
}
