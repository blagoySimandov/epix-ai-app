import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, ChevronRight, Info, Leaf, X } from "lucide-react";
import { z } from "zod";
import { GeneticProfileChip, PulsingAlertIcon } from "@design-system";
import { useScanAlerts } from "#/integrations/tanstack-query/queries/use-scan-alerts";

const scanAlertSearchSchema = z.object({
	type: z.enum(["food", "medication"]).optional().default("food"),
});

export const Route = createFileRoute("/scan/alert/")({
	validateSearch: (search) => scanAlertSearchSchema.parse(search),
	component: ScanAlertPage,
});

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
	)
}

function ScanAlertPage() {
	const { type } = Route.useSearch();
	const { data: results } = useScanAlerts();
	const data = results.alerts[type];

	if (!data) return null;

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
					<PulsingAlertIcon icon={AlertTriangle} />

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
						<GeneticProfileChip 
							gene={data.gene} 
							snp={data.snp} 
							genotype={data.genotype} 
						/>
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
	)
}
