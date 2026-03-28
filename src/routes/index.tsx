import { createFileRoute } from "@tanstack/react-router";
import { BioAgeCard } from "#/components/report/bio-age-card";
import { BottomNav } from "#/components/report/bottom-nav";
import { DomainCard } from "#/components/report/domain-card";
import type { BioAge, Domain } from "#/integrations/api/types";
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
	Average: "bg-yellow-100 text-yellow-700",
	"Faster aging": "bg-rose-100 text-rose-700",
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
				className="bg-teal-light/20 text-teal-light h-10 px-4 rounded-xl font-bold text-xs shrink-0"
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
					<BioAgeCard bioAge={data.bioAge} />
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
				<InsightsBanner />
			</main>
			<BottomNav />
		</>
	);
}
