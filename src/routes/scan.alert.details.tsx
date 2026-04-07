import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Dna, Info, Microscope, ShieldAlert } from "lucide-react";
import { z } from "zod";
import { useScanAlerts } from "#/integrations/tanstack-query/queries/use-scan-alerts";
import type { ScanAlert } from "#/integrations/api/types";

const alertDetailsSearchSchema = z.object({
	type: z.enum(["food", "medication"]).optional().default("food"),
});

export const Route = createFileRoute("/scan/alert/details")({
	validateSearch: (search) => alertDetailsSearchSchema.parse(search),
	component: AlertDetailsPage,
});

type AlertData = ScanAlert;

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
	return (
		<div className="flex items-center gap-2 mb-3">
			<div className="rounded-lg bg-rose/10 p-1.5">
				<Icon size={14} className="text-rose" />
			</div>
			<p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
				{label}
			</p>
		</div>
	);
}

function DescriptionCard({ data }: { data: AlertData }) {
	return (
		<div className="glass-card rounded-2xl p-5 border border-border/40">
			<SectionLabel icon={Info} label="About This Item" />
			<p className="text-foreground/80 text-sm leading-relaxed">{data.description}</p>
		</div>
	);
}

function MechanismCard({ data }: { data: AlertData }) {
	return (
		<div className="glass-card rounded-2xl p-5 border border-border/40">
			<SectionLabel icon={Microscope} label="Mechanism" />
			<p className="text-foreground/80 text-sm leading-relaxed">{data.mechanism}</p>
		</div>
	);
}

function RisksCard({ data }: { data: AlertData }) {
	return (
		<div className="glass-card rounded-2xl p-5 border border-rose/20 bg-rose/5">
			<SectionLabel icon={ShieldAlert} label="Health Risks" />
			<ul className="flex flex-col gap-3">
				{data.risks.map((risk) => (
					<li key={risk} className="flex items-start gap-3">
						<div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-rose/15 flex items-center justify-center">
							<AlertTriangle size={11} className="text-rose" />
						</div>
						<span className="text-sm text-foreground/80 leading-snug">{risk}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function GeneticContextCard({ data }: { data: AlertData }) {
	return (
		<div className="glass-card rounded-2xl p-5 border border-border/40">
			<SectionLabel icon={Dna} label="Genetic Context" />
			<div className="grid grid-cols-3 gap-3 mb-4">
				{[
					{ label: "Gene", value: data.gene },
					{ label: "SNP", value: data.snp },
					{ label: "Genotype", value: data.genotype },
				].map(({ label, value }) => (
					<div key={label} className="rounded-xl bg-muted p-3 text-center">
						<p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
							{label}
						</p>
						<p className="font-bold text-sm text-foreground leading-tight">{value}</p>
					</div>
				))}
			</div>
			<p className="text-xs text-muted-foreground leading-relaxed">
				Your{" "}
				<span className="font-semibold text-foreground">{data.genotype}</span> genotype at{" "}
				<span className="font-semibold text-foreground">{data.snp}</span> results in
				atypical <span className="font-semibold text-foreground">{data.gene}</span> activity,
				increasing your risk of adverse reactions or altered efficacy for this item.
			</p>
		</div>
	);
}

function AlertDetailsPage() {
	const { type } = Route.useSearch();
	const { data: results } = useScanAlerts();
	const data = results.alerts[type];

	if (!data) return null;

	return (
		<main className="min-h-screen bg-background">
			<div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-5">
				{/* Header */}
				<div className="flex items-center gap-3">
					<Link
						to="/scan/alert"
						search={{ type }}
						className="p-2 -ml-2 text-muted-foreground"
					>
						<ArrowLeft size={20} />
					</Link>
					<div>
						<p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
							Alert Details
						</p>
						<h1 className="font-headline font-bold text-2xl tracking-tight leading-tight">
							{data.item}
						</h1>
					</div>
				</div>

				{/* Impact pill */}
				<div className="inline-flex self-start items-center gap-2 bg-rose/10 border border-rose/20 rounded-full px-3.5 py-1.5">
					<span className="w-2 h-2 rounded-full bg-rose animate-pulse" />
					<span className="text-rose font-semibold text-xs">{data.impact}</span>
				</div>

				<DescriptionCard data={data} />
				<MechanismCard data={data} />
				<RisksCard data={data} />
				<GeneticContextCard data={data} />

				{/* Back CTA */}
				<Link
					to="/scan/alert"
					search={{ type }}
					className="flex items-center justify-center gap-2 w-full bg-rose text-white font-bold text-base px-5 py-4 rounded-2xl shadow-md hover:bg-rose/90 transition-all"
				>
					<ArrowLeft size={18} />
					Back to Alert
				</Link>
			</div>
		</main>
	);
}
