import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { GeneticRiskChart } from "./genetic-risk-chart";
import { ActivationGauge } from "./activation-gauge";
import type { Disease, RiskLevel } from "#/integrations/api/types";

interface DiseaseItemProps {
	disease: Disease;
}

const STATUS_CONFIG: Record<
	RiskLevel,
	{ bar: string; text: string; bg: string; dot: string; label: string }
> = {
	red: {
		bar: "bg-rose",
		text: "text-rose",
		bg: "bg-rose/10",
		dot: "bg-rose",
		label: "High Risk",
	},
	yellow: {
		bar: "bg-amber",
		text: "text-amber",
		bg: "bg-amber/10",
		dot: "bg-amber",
		label: "Moderate",
	},
	green: {
		bar: "bg-green-glow",
		text: "text-green-text",
		bg: "bg-green-glow/10",
		dot: "bg-green-glow",
		label: "Low Risk",
	},
};

function MiniProgressBar({
	value,
	barClass,
}: { value: number; barClass: string }) {
	return (
		<div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
			<div
				className={`h-full rounded-full transition-all duration-700 ${barClass}`}
				style={{ width: `${value}%` }}
			/>
		</div>
	);
}

function CardHeader({
	disease,
	isExpanded,
	onToggle,
}: { disease: Disease; isExpanded: boolean; onToggle: () => void }) {
	const s = STATUS_CONFIG[disease.status];

	return (
		<button
			type="button"
			onClick={onToggle}
			className="w-full text-left flex flex-col gap-3"
		>
			<div className="flex items-start justify-between gap-3">
				<div className="flex flex-col gap-1.5 min-w-0">
					<div className="flex items-center gap-2">
						<div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
						<span className="text-sm font-bold tracking-tight truncate">
							{disease.name}
						</span>
					</div>
					<span
						className={`font-mono text-[10px] ${s.text} ${s.bg} px-2 py-0.5 rounded-md w-fit`}
					>
						{disease.geneticMarker}
					</span>
				</div>
				<div className="flex items-center gap-2 shrink-0 mt-0.5">
					<span
						className={`text-[10px] font-bold ${s.text} ${s.bg} px-2.5 py-1 rounded-full whitespace-nowrap`}
					>
						{s.label}
					</span>
					<ChevronDown
						size={15}
						className={`text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
					/>
				</div>
			</div>

			<div className="flex flex-col gap-1.5">
				<div className="flex items-center gap-2">
					<span className="text-[9px] uppercase tracking-widest text-muted-foreground w-14 shrink-0">
						Genetic
					</span>
					<MiniProgressBar value={disease.geneticRisk} barClass={s.bar} />
					<span
						className={`text-[10px] font-bold tabular-nums w-7 text-right ${s.text}`}
					>
						{disease.geneticRisk}%
					</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-[9px] uppercase tracking-widest text-muted-foreground w-14 shrink-0">
						Activation
					</span>
					<MiniProgressBar value={disease.activation} barClass="bg-teal" />
					<span className="text-[10px] font-bold tabular-nums w-7 text-right text-teal">
						{disease.activation}%
					</span>
				</div>
			</div>
		</button>
	);
}

function SectionHeader({ label }: { label: string }) {
	return (
		<h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
			{label}
		</h5>
	);
}

function ExpandedContent({ disease }: { disease: Disease }) {
	return (
		<div className="flex flex-col gap-6 pt-5">
			<div className="h-px bg-border" />

			<div className="flex flex-col gap-3">
				<SectionHeader label="Genetic Risk" />
				<p className="text-sm leading-relaxed text-foreground/75">
					{disease.geneticRiskDescription}
				</p>
				<div className="bg-muted/50 rounded-3xl p-5">
					<GeneticRiskChart userRisk={disease.geneticRisk} />
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<SectionHeader label="Epigenetic Activation" />
				<p className="text-sm leading-relaxed text-foreground/75">
					{disease.activationDescription}
				</p>
				<div className="bg-muted/50 rounded-3xl p-6">
					<ActivationGauge level={disease.activation} />
				</div>
			</div>

			<button
				type="button"
				className="w-full py-3 rounded-2xl bg-teal/10 border border-teal/20 text-xs font-bold text-teal hover:bg-teal/15 transition-colors"
			>
				View targeted intervention plan →
			</button>
		</div>
	);
}

export function DiseaseItem({ disease }: DiseaseItemProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={`glass-card rounded-[2rem] border border-border p-5 flex flex-col transition-all duration-300 ${!isExpanded ? "active:scale-[0.99]" : ""}`}
		>
			<CardHeader
				disease={disease}
				isExpanded={isExpanded}
				onToggle={() => setIsExpanded((v) => !v)}
			/>

			<div
				style={{
					display: "grid",
					gridTemplateRows: isExpanded ? "1fr" : "0fr",
					transition: "grid-template-rows 380ms cubic-bezier(0.16, 1, 0.3, 1)",
				}}
			>
				<div style={{ overflow: "hidden" }}>
					<ExpandedContent disease={disease} />
				</div>
			</div>
		</div>
	);
}
