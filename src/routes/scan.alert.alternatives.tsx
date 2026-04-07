import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Leaf } from "lucide-react";
import { z } from "zod";

const alertAlternativesSearchSchema = z.object({
	type: z.enum(["food", "medication"]).optional().default("food"),
});

export const Route = createFileRoute("/scan/alert/alternatives")({
	validateSearch: (search) => alertAlternativesSearchSchema.parse(search),
	component: AlertAlternativesPage,
});

const FOOD_ALERT = {
	item: "Grapefruit",
	gene: "CYP3A4",
	alternatives: [
		{ name: "Apples", reason: "No CYP3A4 interaction", emoji: "🍎" },
		{ name: "Berries", reason: "Safe with statins", emoji: "🫐" },
		{ name: "Oranges", reason: "Different metabolic pathway", emoji: "🍊" },
		{ name: "Pears", reason: "No known drug interactions", emoji: "🍐" },
		{ name: "Watermelon", reason: "Hydrating and safe", emoji: "🍉" },
	],
};

const MED_ALERT = {
	item: "Simvastatin",
	gene: "SLCO1B1",
	alternatives: [
		{ name: "Rosuvastatin", reason: "Lower SLCO1B1 dependence", emoji: "💊" },
		{ name: "Pravastatin", reason: "Hydrophillic, safer profile", emoji: "🛡️" },
		{ name: "Fluvastatin", reason: "Alternative metabolic path", emoji: "🧬" },
		{ name: "Ezetimibe", reason: "Non-statin cholesterol control", emoji: "✅" },
	],
};

type AlertData = typeof FOOD_ALERT | typeof MED_ALERT;

function AlternativeCard({
	name,
	reason,
	emoji,
	index,
}: {
	name: string;
	reason: string;
	emoji: string;
	index: number;
}) {
	return (
		<div
			className="glass-card rounded-2xl p-4 border border-border/40 flex items-center gap-4"
			style={{ animationDelay: `${index * 60}ms` }}
		>
			{/* Emoji avatar */}
			<div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-2xl shrink-0 border border-green-100 dark:border-green-900/40">
				{emoji}
			</div>

			{/* Text */}
			<div className="flex-1 min-w-0">
				<p className="font-headline font-bold text-base text-foreground">{name}</p>
				<p className="text-sm text-muted-foreground mt-0.5 leading-snug">{reason}</p>
			</div>

			{/* Check */}
			<CheckCircle2
				size={22}
				className="shrink-0 text-green-500"
				strokeWidth={2}
			/>
		</div>
	);
}

function SafetyNote({ data }: { data: AlertData }) {
	return (
		<div className="rounded-2xl border border-border/40 bg-muted/50 p-4 flex items-start gap-3">
			<div className="rounded-lg bg-green-500/10 p-2 shrink-0">
				<Leaf size={16} className="text-green-500" />
			</div>
			<p className="text-xs text-muted-foreground leading-relaxed">
				These alternatives have <span className="font-semibold text-foreground">no known interactions</span> with the{" "}
				<span className="font-semibold text-foreground">{data.gene}</span> pathway and are
				considered safer choices based on your genetic profile.
			</p>
		</div>
	);
}

function AlertAlternativesPage() {
	const { type } = Route.useSearch();
	const data = type === "food" ? FOOD_ALERT : MED_ALERT;

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
							Safer Alternatives
						</p>
						<h1 className="font-headline font-bold text-2xl tracking-tight leading-tight">
							Instead of {data.item}
						</h1>
					</div>
				</div>

				{/* Count badge */}
				<div className="flex items-center gap-2">
					<div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3.5 py-1.5">
						<CheckCircle2 size={14} className="text-green-500" />
						<span className="text-green-600 dark:text-green-400 font-semibold text-xs">
							{data.alternatives.length} safe options found
						</span>
					</div>
				</div>

				{/* Alternatives list */}
				<div className="flex flex-col gap-3">
					{data.alternatives.map((alt, i) => (
						<AlternativeCard key={alt.name} {...alt} index={i} />
					))}
				</div>

				<SafetyNote data={data} />

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
