import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Cloud, Gauge, Mountain, Sun, Zap } from "lucide-react";
import { QuickStatCard } from "@design-system";
import { MetricTrendCard } from "@design-system/widgets";
import type { Environment } from "#/integrations/api/types";
import {
	reportQueryOptions,
	useReport,
} from "#/integrations/tanstack-query/queries/use-report";

export const Route = createFileRoute("/environment")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(reportQueryOptions),
	component: EnvironmentPage,
});

function aqiStatus(aqi: number) {
	if (aqi <= 50) return { label: "Good", color: "var(--green-text)" };
	if (aqi <= 100) return { label: "Moderate", color: "#f59e0b" };
	return { label: "Unhealthy", color: "#f43f5e" };
}

function uvStatus(uv: number) {
	if (uv <= 2) return { label: "Low", color: "var(--green-text)" };
	if (uv <= 5) return { label: "Moderate", color: "#f59e0b" };
	if (uv <= 7) return { label: "High", color: "#f97316" };
	return { label: "Very High", color: "#f43f5e" };
}

function kpStatus(active: boolean) {
	return active
		? { label: "Active", color: "#f43f5e" }
		: { label: "Quiet", color: "var(--green-text)" };
}

function PageHeader() {
	return (
		<div className="flex items-center gap-3">
			<Link to="/" className="p-2 -ml-2 text-muted-foreground">
				<ArrowLeft size={20} />
			</Link>
			<h1 className="font-headline font-bold text-2xl tracking-tight">
				Environment
			</h1>
		</div>
	);
}

function WeatherCard({ env }: { env: Environment }) {
	return (
		<div className="glass-card rounded-[1.5rem] p-5 border border-border/40 flex items-center gap-5">
			<div className="rounded-2xl bg-teal/10 p-3">
				<Cloud size={28} className="text-teal" />
			</div>
			<div className="flex-1 min-w-0">
				<p className="font-headline font-bold text-xl leading-tight">
					{env.meteorological.condition}
				</p>
				<p className="text-sm text-muted-foreground mt-0.5">
					Meteorological conditions
				</p>
			</div>
			<div className="text-right shrink-0">
				<p className="font-headline font-extrabold text-3xl leading-none text-teal">
					{env.meteorological.temp}°
				</p>
				<p className="text-xs text-muted-foreground font-semibold mt-0.5">
					Celsius
				</p>
			</div>
		</div>
	);
}

function QuickStatsGrid({ env }: { env: Environment }) {
	const aqi = aqiStatus(env.airQuality.aqi);
	const uv = uvStatus(env.uvIndex);
	const kp = kpStatus(env.magneticStorms.active);

	return (
		<div className="grid grid-cols-2 gap-3">
			<QuickStatCard
				icon={Gauge}
				label="Air Quality"
				value={env.airQuality.aqi}
				statusLabel={aqi.label}
				accentColor={aqi.color}
			/>
			<QuickStatCard
				icon={Sun}
				label="UV Index"
				value={env.uvIndex}
				statusLabel={uv.label}
				accentColor={uv.color}
			/>
			<QuickStatCard
				icon={Mountain}
				label="Elevation"
				value={env.elevation.toLocaleString()}
				unit=" m"
				statusLabel="Normal"
				accentColor="var(--teal)"
			/>
			<QuickStatCard
				icon={Zap}
				label="Magnetic Kp"
				value={env.magneticStorms.level}
				statusLabel={kp.label}
				accentColor={kp.color}
			/>
		</div>
	);
}

function TrendsSection({ env }: { env: Environment }) {
	const aqi = aqiStatus(env.airQuality.aqi);
	const uv = uvStatus(env.uvIndex);
	const kp = kpStatus(env.magneticStorms.active);

	return (
		<div className="flex flex-col gap-4">
			<p className="font-semibold text-sm text-muted-foreground uppercase tracking-wider px-1">
				7-Day Trends
			</p>
			<MetricTrendCard
				icon={Gauge}
				title="Air Quality"
				currentValue={env.airQuality.aqi}
				data={env.history.airQuality}
				color={aqi.color}
				statusLabel={aqi.label}
			/>
			<MetricTrendCard
				icon={Sun}
				title="UV Index"
				currentValue={env.uvIndex}
				data={env.history.uvIndex}
				color={uv.color}
				statusLabel={uv.label}
			/>
			<MetricTrendCard
				icon={Mountain}
				title="Elevation"
				currentValue={env.elevation.toLocaleString()}
				unit=" m"
				data={env.history.elevation}
				color="var(--teal)"
			/>
			<MetricTrendCard
				icon={Zap}
				title="Magnetic Storms (Kp)"
				currentValue={env.magneticStorms.level}
				data={env.history.magneticStorms}
				color={kp.color}
				statusLabel={kp.label}
			/>
		</div>
	);
}

function EnvironmentPage() {
	const { data } = useReport();
	const { environment: env } = data;

	return (
		<main className="min-h-screen bg-background">
			<div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-6">
				<PageHeader />
				<QuickStatsGrid env={env} />
				<WeatherCard env={env} />
				<TrendsSection env={env} />
			</div>
		</main>
	);
}
