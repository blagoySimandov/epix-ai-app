import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Activity, Heart, Zap } from "lucide-react";
import { MetricChart } from "@design-system";
import type { DayValue, PhysicalActivity } from "#/integrations/api/types";
import {
	reportQueryOptions,
	useReport,
} from "#/integrations/tanstack-query/queries/use-report";

export const Route = createFileRoute("/activity")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(reportQueryOptions),
	component: ActivityPage,
});

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

function StatCard({
	label,
	value,
	unit,
	icon: Icon,
	color,
}: {
	label: string;
	value: string | number;
	unit: string;
	icon: React.ComponentType<{ size?: number }>;
	color: string;
}) {
	return (
		<div className="flex-1 glass-card p-3 rounded-2xl border border-border/40 flex flex-col items-center gap-1">
			<Icon size={16} color={color} />
			<p className="font-headline font-bold text-xl leading-none">
				{value}
				<span className="text-[10px] font-normal text-muted-foreground ml-0.5">
					{unit}
				</span>
			</p>
			<p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
				{label}
			</p>
		</div>
	);
}

function StatsRow({ pa }: { pa: PhysicalActivity }) {
	return (
		<div className="flex gap-3">
			<StatCard
				label="Steps"
				value={pa.steps.toLocaleString()}
				unit=""
				icon={Activity}
				color="var(--teal)"
			/>
			<StatCard
				label="Resting HR"
				value={pa.restingHR}
				unit="bpm"
				icon={Heart}
				color="#f43f5e"
			/>
			<StatCard
				label="HRV"
				value={pa.hrv}
				unit="ms"
				icon={Zap}
				color="#facc15"
			/>
		</div>
	);
}

function MetricSection({
	title,
	data,
	color,
	unit,
}: {
	title: string;
	data: DayValue[];
	color: string;
	unit: string;
}) {
	return (
		<div className="glass-card rounded-[1.5rem] p-4 border border-border/40 space-y-3">
			<p className="font-semibold text-sm">{title} · 7 Days</p>
			<MetricChart data={data} color={color} unit={unit} />
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
				<StatsRow pa={pa} />
				<MetricSection
					title="Steps"
					data={pa.history.steps}
					color="var(--teal)"
					unit=""
				/>
				<MetricSection
					title="Resting Heart Rate"
					data={pa.history.restingHR}
					color="#f43f5e"
					unit=" bpm"
				/>
				<MetricSection
					title="Heart Rate Variability"
					data={pa.history.hrv}
					color="#facc15"
					unit=" ms"
				/>
			</div>
		</main>
	);
}
