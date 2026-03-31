import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ChevronRight, Wind } from "lucide-react";
import { AgingTrajectoryChart } from "@design-system";
import { BioAgeWidget } from "@design-system/widgets";
import { DomainCard } from "#/components/report/domain-card";
import type {
	BioAge,
	Domain,
	Environment,
	PhysicalActivity,
} from "#/integrations/api/types";
import {
	reportQueryOptions,
	useReport,
} from "#/integrations/tanstack-query/queries/use-report";

const EPIX_LOGO_URL =
	"https://cdn.prod.website-files.com/6419776880f7ef69daff4b9c/64198230a00f8c0924918817_epix-colour-logo.svg";

export const Route = createFileRoute("/")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(reportQueryOptions),
	component: HomePage,
});

const STATUS_STYLE: Record<BioAge["status"], string> = {
	"Slower aging": "bg-green-glow/20 text-green-text",
	Average: "bg-yellow-400/20 text-yellow-500",
	"Faster aging": "bg-rose-500/20 text-rose-400",
};

function BioAgeHeader({ status }: { status: BioAge["status"] }) {
	return (
		<div className="flex items-center justify-between">
			<img src={EPIX_LOGO_URL} alt="Epix AI" className="h-8 w-auto" />
			<span
				className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${STATUS_STYLE[status]}`}
			>
				{status}
			</span>
		</div>
	);
}

function DomainGrid({ domains }: { domains: Domain[] }) {
	return (
		<div className="grid grid-cols-2 gap-4">
			{domains.map((domain) => (
				<DomainCard key={domain.id} domain={domain} />
			))}
		</div>
	);
}


function ActivityPanel({ pa }: { pa: PhysicalActivity }) {
	return (
		<Link
			to="/activity"
			className="glass-card p-4 rounded-[1.5rem] border border-border/40 flex flex-col gap-3 active:scale-95 transition-transform duration-200"
		>
			<div className="flex justify-between items-start">
				<div className="p-2 rounded-xl bg-teal/10 text-teal">
					<Activity size={18} />
				</div>
				<ChevronRight size={16} className="text-muted-foreground mt-1" />
			</div>
			<div>
				<p className="font-headline font-extrabold text-3xl leading-none">
					{pa.steps.toLocaleString()}
				</p>
				<p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
					steps today
				</p>
			</div>
			<p className="text-[11px] font-semibold text-muted-foreground">
				Physical Activity
			</p>
		</Link>
	);
}

const AQI_COLOR = (aqi: number) =>
	aqi <= 50
		? "text-green-text"
		: aqi <= 100
			? "text-yellow-500"
			: "text-rose-400";

function EnvironmentPanel({ env }: { env: Environment }) {
	return (
		<Link
			to="/environment"
			className="glass-card p-4 rounded-[1.5rem] border border-border/40 flex flex-col gap-3 active:scale-95 transition-transform duration-200"
		>
			<div className="flex justify-between items-start">
				<div className="p-2 rounded-xl bg-teal/10 text-teal">
					<Wind size={18} />
				</div>
				<ChevronRight size={16} className="text-muted-foreground mt-1" />
			</div>
			<div>
				<p
					className={`font-headline font-extrabold text-3xl leading-none ${AQI_COLOR(env.airQuality.aqi)}`}
				>
					{env.airQuality.aqi}
				</p>
				<p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
					AQI · {env.airQuality.label}
				</p>
			</div>
			<p className="text-[11px] font-semibold text-muted-foreground">
				Environment
			</p>
		</Link>
	);
}

function InsightsBanner() {
	return (
		<div className="bg-navy-dark rounded-[1.5rem] p-6 text-white flex items-center gap-6 shadow-xl">
			<div className="flex-1 space-y-1">
				<p className="font-headline font-bold text-lg leading-tight">
					Personalized Protocol Updated
				</p>
				<p className="text-xs text-navy-text">
					Based on your recent Cardio score improvement.
				</p>
			</div>
			<button
				type="button"
				className="bg-teal/20 text-teal h-10 px-4 rounded-xl font-bold text-xs shrink-0"
			>
				View
			</button>
		</div>
	);
}

function HomePage() {
	const { data } = useReport();

	return (
		<>
			<main className="pt-10 pb-32 px-6 max-w-md mx-auto space-y-12">
				<section className="space-y-6">
					<BioAgeHeader status={data.bioAge.status} />
					<BioAgeWidget
						bio={data.bioAge.bio}
						chrono={data.bioAge.chrono}
						delta={data.bioAge.delta}
						status={data.bioAge.status}
					/>
				</section>
				<section className="space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="font-headline font-bold text-2xl tracking-tight">
							Disease Risk
						</h2>
						<button
							type="button"
							className="text-teal font-semibold text-sm hover:opacity-80 transition-opacity"
						>
							View All
						</button>
					</div>
					<DomainGrid domains={data.domains} />
				</section>
				<AgingTrajectoryChart data={data.bioAgeHistory} />
				<section className="space-y-4">
					<h2 className="font-headline font-bold text-2xl tracking-tight">
						Health Signals
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<ActivityPanel pa={data.physicalActivity} />
						<EnvironmentPanel env={data.environment} />
					</div>
				</section>
				<InsightsBanner />
			</main>
		</>
	);
}
