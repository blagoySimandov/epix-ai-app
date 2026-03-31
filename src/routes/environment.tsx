import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Cloud, Gauge, Mountain, Sun, Zap } from "lucide-react";
import { MetricChart } from "@design-system";
import type { DayValue, Environment } from "#/integrations/api/types";
import {
	reportQueryOptions,
	useReport,
} from "#/integrations/tanstack-query/queries/use-report";

export const Route = createFileRoute("/environment")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(reportQueryOptions),
	component: EnvironmentPage,
});

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

const AQI_COLOR = (aqi: number) =>
	aqi <= 50
		? "var(--green-text)"
		: aqi <= 100
			? "#eab308"
			: "#f43f5e";

function AirQualityHero({ airQuality }: { airQuality: Environment["airQuality"] }) {
	return (
		<div className="glass-card rounded-[1.5rem] p-5 border border-border/40">
			<div className="flex items-center gap-2 mb-3">
				<Gauge size={16} className="text-teal" />
				<p className="font-semibold text-sm">Air Quality</p>
			</div>
			<p
				className="font-headline font-extrabold text-5xl leading-none mb-1"
				style={{ color: AQI_COLOR(airQuality.aqi) }}
			>
				{airQuality.aqi}
			</p>
			<p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
				AQI · {airQuality.label}
			</p>
		</div>
	);
}

function MetricSection({
	title,
	data,
	color,
	unit,
	icon: Icon,
}: {
	title: string;
	data: DayValue[];
	color: string;
	unit: string;
	icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
	return (
		<div className="glass-card rounded-[1.5rem] p-4 border border-border/40 space-y-3">
			<div className="flex items-center gap-2">
				<Icon size={14} className="text-muted-foreground" />
				<p className="font-semibold text-sm">{title} · 7 Days</p>
			</div>
			<MetricChart data={data} color={color} unit={unit} />
		</div>
	);
}

function MeteoCard({ env }: { env: Environment }) {
	return (
		<div className="glass-card rounded-[1.5rem] p-4 border border-border/40 flex items-center gap-4">
			<Cloud size={28} className="text-teal shrink-0" />
			<div>
				<p className="font-headline font-bold text-lg leading-tight">
					{env.meteorological.condition}
				</p>
				<p className="text-xs text-muted-foreground font-semibold mt-0.5">
					{env.meteorological.temp}°C · Meteorological
				</p>
			</div>
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
				<AirQualityHero airQuality={env.airQuality} />
				<MetricSection
					title="Air Quality Index"
					data={env.history.airQuality}
					color="var(--teal)"
					unit=""
					icon={Gauge}
				/>
				<MetricSection
					title="UV Index"
					data={env.history.uvIndex}
					color="#f97316"
					unit=""
					icon={Sun}
				/>
				<MeteoCard env={env} />
				<MetricSection
					title="Elevation"
					data={env.history.elevation}
					color="#8b5cf6"
					unit=" m"
					icon={Mountain}
				/>
				<MetricSection
					title="Magnetic Storms (Kp)"
					data={env.history.magneticStorms}
					color="#f43f5e"
					unit=""
					icon={Zap}
				/>
			</div>
		</main>
	);
}
