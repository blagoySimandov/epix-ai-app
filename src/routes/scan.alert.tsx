import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AlertTriangle,
	ArrowLeft,
	ChevronRight,
	Dna,
	Info,
	Leaf,
	X,
} from "lucide-react";
import { z } from "zod";

const scanAlertSearchSchema = z.object({
	type: z.enum(["food", "medication"]).optional().default("food"),
});

export const Route = createFileRoute("/scan/alert")({
	validateSearch: (search) => scanAlertSearchSchema.parse(search),
	component: ScanAlertPage,
});

const FOOD_ALERT = {
	item: "Grapefruit",
	type: "food" as const,
	description: "A citrus fruit commonly eaten fresh or as juice.",
	gene: "CYP3A4",
	snp: "rs35599367",
	genotype: "C/T",
	impact: "Inhibits statin metabolism",
	mechanism:
		"Grapefruit inhibits CYP3A4 enzyme activity, reducing the body's ability to break down certain medications.",
	risks: [
		"Up to 15× increase in statin plasma concentration",
		"Elevated risk of myopathy",
		"Potential rhabdomyolysis in severe cases",
	],
	alternatives: [
		{ name: "Apples", reason: "No CYP3A4 interaction" },
		{ name: "Berries", reason: "Safe with statins" },
		{ name: "Oranges", reason: "Different metabolic pathway" },
		{ name: "Pears", reason: "No known drug interactions" },
		{ name: "Watermelon", reason: "Hydrating and safe" },
	],
};

const MED_ALERT = {
	item: "Simvastatin",
	type: "medication" as const,
	description: "A lipid-lowering medication used to control cholesterol.",
	gene: "SLCO1B1",
	snp: "rs4149056",
	genotype: "C/C",
	impact: "High risk of muscle toxicity",
	mechanism:
		"The SLCO1B1 gene variant decreases the transport of statins into the liver, leading to higher blood levels.",
	risks: [
		"4.5× increased risk of myopathy",
		"Elevated creatinine kinase levels",
		"Muscle pain and weakness",
	],
	alternatives: [
		{ name: "Rosuvastatin", reason: "Lower SLCO1B1 dependence" },
		{ name: "Pravastatin", reason: "Hydrophillic, safer profile" },
		{ name: "Fluvastatin", reason: "Alternative metabolic path" },
		{ name: "Ezetimibe", reason: "Non-statin cholesterol control" },
	],
};

function WarnIcon() {
	return (
		<div className="relative flex items-center justify-center w-24 h-24 mx-auto">
			{/* pulsing ring */}
			<span
				className="absolute inset-0 rounded-full opacity-30 animate-ping"
				style={{ background: "rgba(255,255,255,0.25)" }}
			/>
			<span
				className="absolute inset-2 rounded-full opacity-20"
				style={{ background: "rgba(255,255,255,0.15)" }}
			/>
			<div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
				<AlertTriangle size={40} className="text-white" strokeWidth={2.5} />
			</div>
		</div>
	);
}

function GeneticChip({ data }: { data: typeof FOOD_ALERT | typeof MED_ALERT }) {
	return (
		<div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
			<Dna size={16} className="text-white/80 shrink-0" />
			<div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/90">
				<span>
					<span className="text-white/60">Gene</span>{" "}
					<span className="font-bold text-white">{data.gene}</span>
				</span>
				<span>
					<span className="text-white/60">SNP</span>{" "}
					<span className="font-bold text-white">{data.snp}</span>
				</span>
				<span>
					<span className="text-white/60">Genotype</span>{" "}
					<span className="font-bold text-white">{data.genotype}</span>
				</span>
			</div>
		</div>
	);
}

function ActionButtons({ type }: { type: "food" | "medication" }) {
	return (
		<div className="flex flex-col gap-3">
			<Link
				to="/scan/alert/details"
				search={{ type }}
				className="flex items-center justify-between w-full bg-white text-rose-600 font-bold text-base px-5 py-4 rounded-2xl shadow-lg hover:bg-white/90 transition-all"
			>
				<span className="flex items-center gap-2.5">
					<Info size={20} />
					Why is this flagged?
				</span>
				<ChevronRight size={20} />
			</Link>
			<Link
				to="/scan/alert/alternatives"
				search={{ type }}
				className="flex items-center justify-between w-full bg-white/15 backdrop-blur-sm text-white font-semibold text-base px-5 py-4 rounded-2xl border border-white/25 hover:bg-white/20 transition-all"
			>
				<span className="flex items-center gap-2.5">
					<Leaf size={20} />
					See safer alternatives
				</span>
				<ChevronRight size={20} />
			</Link>
		</div>
	);
}

function ScanAlertPage() {
	const { type } = Route.useSearch();
	const data = type === "food" ? FOOD_ALERT : MED_ALERT;

	return (
		<main className="min-h-screen" style={{ background: "#b91c1c" }}>
			{/* Gradient overlay for depth */}
			<div
				className="min-h-screen"
				style={{
					background:
						"linear-gradient(160deg, #ef4444 0%, #b91c1c 40%, #7f1d1d 100%)",
				}}
			>
				<div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-7">
					{/* Top bar */}
					<div className="flex items-center justify-between">
						<Link to="/scan" className="p-2 -ml-2 text-white/70">
							<ArrowLeft size={22} />
						</Link>
						<span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
							Genetic Alert
						</span>
						<Link to="/scan" className="p-2 -mr-2 text-white/70">
							<X size={22} />
						</Link>
					</div>

					{/* Warning icon */}
					<WarnIcon />

					{/* Scanned item info */}
					<div className="text-center">
						<p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-1">
							Scanned {data.type}
						</p>
						<h1 className="font-headline font-extrabold text-4xl text-white tracking-tight leading-tight">
							{data.item}
						</h1>
						<p className="text-white/75 text-base mt-2 leading-relaxed">
							{data.description}
						</p>
					</div>

					{/* Impact badge */}
					<div className="flex items-center justify-center">
						<div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 border border-white/30">
							<span className="w-2 h-2 rounded-full bg-white animate-pulse" />
							<span className="text-white font-semibold text-sm">
								{data.impact}
							</span>
						</div>
					</div>

					{/* Divider */}
					<div className="border-t border-white/20" />

					{/* Genetic context */}
					<div className="flex flex-col gap-3">
						<p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
							Your Genetic Profile
						</p>
						<GeneticChip data={data} />
					</div>

					{/* Action buttons */}
					<ActionButtons type={type} />

					{/* Dismiss */}
					<div className="text-center">
						<Link
							to="/scan"
							className="text-white/55 text-sm font-medium underline underline-offset-2"
						>
							Dismiss and continue scanning
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
