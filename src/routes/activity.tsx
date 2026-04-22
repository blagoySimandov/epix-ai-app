import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Activity,
	ArrowLeft,
	Dna,
	Heart,
	Moon,
	Zap,
} from "lucide-react";
import * as React from "react";
import { QuickStatCard, AlertBanner, BottomSheet, SheetRow } from "@design-system";
import { MetricTrendCard } from "@design-system/widgets";
import type {
	PhysicalActivity,
	PhysicalEnvironmentAlerts,
} from "#/integrations/api/types";
import {
	reportQueryOptions,
	useReport,
} from "#/integrations/tanstack-query/queries/use-report";

export const Route = createFileRoute("/activity")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(reportQueryOptions),
	component: ActivityPage,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function stepsStatus(steps: number) {
	if (steps >= 8000) return { label: "On Track",   color: "var(--green-text)" };
	if (steps >= 5000) return { label: "Below Goal", color: "var(--amber)" };
	return               { label: "Low",             color: "var(--rose)" };
}
function hrStatus(hr: number) {
	if (hr <= 80)  return { label: "Normal",   color: "var(--teal)" };
	if (hr <= 100) return { label: "Elevated", color: "var(--amber)" };
	return               { label: "High",      color: "var(--rose)" };
}
function hrvStatus(hrv: number) {
	if (hrv >= 50) return { label: "Good", color: "var(--violet)" };
	if (hrv >= 30) return { label: "Fair", color: "var(--amber)" };
	return               { label: "Low",  color: "var(--rose)" };
}
function sleepStatus(score: number) {
	if (score >= 70) return { label: "Good",  color: "var(--teal)" };
	if (score >= 50) return { label: "Fair",  color: "var(--amber)" };
	return               { label: "Poor",  color: "var(--rose)" };
}

// ─── Activity alert sheet ─────────────────────────────────────────────────────
function ActivityAlertSheet({
	alerts,
	onClose,
}: {
	alerts: PhysicalEnvironmentAlerts;
	onClose: () => void;
}) {
	const { activity } = alerts;

	return (
		<BottomSheet title="Activity Alert" onClose={onClose}>
			<SheetRow icon={Activity} accent="var(--rose)" title="Step Deficit">
				<div
					className="p-3 rounded-xl space-y-2"
					style={{
						background: "rgba(244,63,94,0.06)",
						border: "1px solid rgba(244,63,94,0.18)",
					}}
				>
					<div className="flex items-baseline gap-2">
						<span
							className="font-headline font-extrabold text-2xl"
							style={{ color: "var(--rose)" }}
						>
							{activity.steps.current.toLocaleString()}
						</span>
						<span className="text-xs text-muted-foreground">
							/ {activity.steps.goal.toLocaleString()} steps
						</span>
					</div>
					<p className="text-xs text-muted-foreground leading-relaxed">
						You're{" "}
						<span className="font-semibold text-foreground">
							{activity.steps.deficit.toLocaleString()} steps below target
						</span>
						. Your <span className="font-semibold">ACE (II)</span> variant elevates
						cardiovascular endurance requirement, compounding this deficit's risk.
					</p>
				</div>
				<div
					className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs"
					style={{
						background: "rgba(0,103,126,0.08)",
						border: "1px solid rgba(0,103,126,0.2)",
					}}
				>
					<Zap size={13} className="shrink-0 text-teal" />
					<span className="text-muted-foreground">
						<span className="font-semibold text-teal">
							{activity.recommendation.steps.toLocaleString()} more steps
						</span>{" "}
						≈ {activity.recommendation.estimatedMinutes} min walking
					</span>
				</div>
			</SheetRow>

			<div className="h-px bg-border" />

			<SheetRow icon={Dna} accent="var(--teal)" title="Relevant Variants">
				<div className="space-y-2">
					{activity.genes.map((g) => (
						<div
							key={g.name}
							className="flex items-start gap-3 p-2.5 rounded-xl"
							style={{
								background: "rgba(0,103,126,0.06)",
								border: "1px solid rgba(0,103,126,0.15)",
							}}
						>
							<span
								className="font-headline font-extrabold text-[11px] px-2 py-1 rounded-lg shrink-0"
								style={{ background: "rgba(0,103,126,0.15)", color: "var(--teal)" }}
							>
								{g.name}
							</span>
							<div className="min-w-0">
								<p className="text-xs font-semibold">
									{g.variant}{" "}
									<span className="text-muted-foreground font-normal">{g.snp}</span>
								</p>
								<p className="text-[11px] text-muted-foreground mt-0.5">{g.impact}</p>
							</div>
						</div>
					))}
				</div>
			</SheetRow>
		</BottomSheet>
	);
}

// ─── Original page sections (unchanged) ──────────────────────────────────────
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
	const hr    = hrStatus(pa.restingHR);
	const hrv   = hrvStatus(pa.hrv);

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

const SEVERITY: Record<string, number> = {
	"var(--rose)": 2,
	"var(--amber)": 1,
};

function severityOf(color: string) {
	return SEVERITY[color] ?? 0;
}

function buildTrendMetrics(pa: PhysicalActivity) {
	const steps = stepsStatus(pa.steps);
	const hr    = hrStatus(pa.restingHR);
	const hrv   = hrvStatus(pa.hrv);
	const sleep = sleepStatus(pa.sleepQuality);

	return [
		{ icon: Activity, title: "Steps",                currentValue: pa.steps.toLocaleString(),  unit: undefined,  data: pa.history.steps,       color: steps.color, statusLabel: steps.label },
		{ icon: Heart,    title: "Resting Heart Rate",   currentValue: pa.restingHR,               unit: " bpm",     data: pa.history.restingHR,   color: hr.color,    statusLabel: hr.label    },
		{ icon: Zap,      title: "Heart Rate Variability", currentValue: pa.hrv,                   unit: " ms",      data: pa.history.hrv,         color: hrv.color,   statusLabel: hrv.label   },
		{ icon: Moon,     title: "Sleep Quality",         currentValue: pa.sleepQuality,            unit: "%",        data: pa.history.sleepQuality, color: sleep.color, statusLabel: sleep.label },
	].sort((a, b) => severityOf(b.color) - severityOf(a.color));
}

function TrendsSection({ pa }: { pa: PhysicalActivity }) {
	const metrics = buildTrendMetrics(pa);

	return (
		<div className="flex flex-col gap-4">
			<p className="font-semibold text-sm text-muted-foreground uppercase tracking-wider px-1">
				7-Day Trends
			</p>
			{metrics.map((m) => (
				<MetricTrendCard
					key={m.title}
					icon={m.icon}
					title={m.title}
					currentValue={m.currentValue}
					unit={m.unit}
					data={m.data}
					color={m.color}
					statusLabel={m.statusLabel}
				/>
			))}
		</div>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function ActivityPage() {
	const { data } = useReport();
	const { physicalActivity: pa, physicalEnvironmentAlerts: alerts } = data;
	const [activitySheet, setActivitySheet] = React.useState(false);

	return (
		<>
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-6">
					<PageHeader />
					<AlertBanner
						label="Activity deficit detected"
						sublabel={`${alerts.activity.steps.deficit.toLocaleString()} steps below target · ACE gene risk`}
						onOpen={() => setActivitySheet(true)}
					/>
					<QuickStatsGrid pa={pa} />
					<TrendsSection pa={pa} />
				</div>
			</main>
			{activitySheet && (
				<ActivityAlertSheet
					alerts={alerts}
					onClose={() => setActivitySheet(false)}
				/>
			)}
		</>
	);
}
