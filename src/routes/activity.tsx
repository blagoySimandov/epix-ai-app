import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, Heart, Zap } from "lucide-react";
import { QuickStatCard } from "@design-system";
import { MetricTrendCard } from "@design-system/widgets";
import type { PhysicalActivity } from "#/integrations/api/types";
import {
	reportQueryOptions,
	useReport,
} from "#/integrations/tanstack-query/queries/use-report";

export const Route = createFileRoute("/activity")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(reportQueryOptions),
	component: ActivityPage,
});

function stepsStatus(steps: number) {
	if (steps >= 8000) return { label: "On Track", color: "var(--green-text)" };
	if (steps >= 5000) return { label: "Below Goal", color: "var(--amber)" };
	return { label: "Low", color: "var(--rose)" };
}

function hrStatus(hr: number) {
	if (hr <= 80) return { label: "Normal", color: "var(--teal)" };
	if (hr <= 100) return { label: "Elevated", color: "var(--amber)" };
	return { label: "High", color: "var(--rose)" };
}

function hrvStatus(hrv: number) {
	if (hrv >= 50) return { label: "Good", color: "var(--violet)" };
	if (hrv >= 30) return { label: "Fair", color: "var(--amber)" };
	return { label: "Low", color: "var(--rose)" };
}

function PageHeader() {
	return (
		<div className="flex items-center gap-3">
			<Link to="/" className="p-2 -ml-2 text-muted-foreground">
				<ArrowLeft size={20} />
			</Link>
			<h1 className="font-headline font-bold text-2xl tracking-tight">
				Physical Activity
			</h1>
		</div>
	);
}

function QuickStatsGrid({ pa }: { pa: PhysicalActivity }) {
	const steps = stepsStatus(pa.steps);
	const hr = hrStatus(pa.restingHR);
	const hrv = hrvStatus(pa.hrv);

	return (
		<div className="grid grid-cols-3 gap-3">
			<QuickStatCard
				icon={Activity}
				label="Steps"
				value={pa.steps.toLocaleString()}
				statusLabel={steps.label}
				accentColor={steps.color}
			/>
			<QuickStatCard
				icon={Heart}
				label="Resting HR"
				value={pa.restingHR}
				unit=" bpm"
				statusLabel={hr.label}
				accentColor={hr.color}
			/>
			<QuickStatCard
				icon={Zap}
				label="HRV"
				value={pa.hrv}
				unit=" ms"
				statusLabel={hrv.label}
				accentColor={hrv.color}
			/>
		</div>
	);
}

function TrendsSection({ pa }: { pa: PhysicalActivity }) {
	const steps = stepsStatus(pa.steps);
	const hr = hrStatus(pa.restingHR);
	const hrv = hrvStatus(pa.hrv);

	return (
		<div className="flex flex-col gap-4">
			<p className="font-semibold text-sm text-muted-foreground uppercase tracking-wider px-1">
				7-Day Trends
			</p>
			<MetricTrendCard
				icon={Activity}
				title="Steps"
				currentValue={pa.steps.toLocaleString()}
				data={pa.history.steps}
				color={steps.color}
				statusLabel={steps.label}
			/>
			<MetricTrendCard
				icon={Heart}
				title="Resting Heart Rate"
				currentValue={pa.restingHR}
				unit=" bpm"
				data={pa.history.restingHR}
				color={hr.color}
				statusLabel={hr.label}
			/>
			<MetricTrendCard
				icon={Zap}
				title="Heart Rate Variability"
				currentValue={pa.hrv}
				unit=" ms"
				data={pa.history.hrv}
				color={hrv.color}
				statusLabel={hrv.label}
			/>
		</div>
	);
}

function ActivityPage() {
	const { data } = useReport();
	const { physicalActivity: pa } = data;

	return (
		<main className="min-h-screen bg-background">
			<div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-6">
				<PageHeader />
				<QuickStatsGrid pa={pa} />
				<TrendsSection pa={pa} />
			</div>
		</main>
	);
}
