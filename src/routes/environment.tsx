import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Cloud,
	Gauge,
	MapPin,
	Moon,
	Mountain,
	Shield,
	Sun,
	Wind,
	Zap,
} from "lucide-react";
import * as React from "react";
import { QuickStatCard, AlertBanner, BottomSheet, SheetRow } from "@design-system";
import { MetricTrendCard } from "@design-system/widgets";
import type { Environment, PhysicalEnvironmentAlerts } from "#/integrations/api/types";
import {
	reportQueryOptions,
	useReport,
} from "#/integrations/tanstack-query/queries/use-report";

export const Route = createFileRoute("/environment")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(reportQueryOptions),
	component: EnvironmentPage,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

function uvColor(uv: number) {
	if (uv <= 2) return "var(--green-text)";
	if (uv <= 5) return "var(--amber)";
	if (uv <= 7) return "#f97316";
	return "var(--rose)";
}

function aqiColor(aqi: number) {
	if (aqi <= 50) return "var(--green-text)";
	if (aqi <= 100) return "var(--amber)";
	return "var(--rose)";
}

// ─── Local UI Components ──────────────────────────────────────────────────────
function CompBar({
	lhs,
	rhs,
}: {
	lhs: { name: string; value: number; max: number; color: string };
	rhs: { name: string; value: number; max: number; color: string };
}) {
	return (
		<div className="space-y-2">
			{[lhs, rhs].map((side) => (
				<div key={side.name} className="flex items-center gap-2">
					<span className="text-[11px] w-16 text-muted-foreground truncate shrink-0">
						{side.name}
					</span>
					<div className="flex-1 h-2 bg-border/50 rounded-full overflow-hidden">
						<div
							className="h-full rounded-full"
							style={{ width: `${(side.value / side.max) * 100}%`, background: side.color }}
						/>
					</div>
					<span className="text-xs font-bold w-6 text-right shrink-0" style={{ color: side.color }}>
						{side.value}
					</span>
				</div>
			))}
		</div>
	);
}

function EnvironmentAlertSheet({
	alerts,
	onClose,
}: {
	alerts: PhysicalEnvironmentAlerts;
	onClose: () => void;
}) {
	const { location, environment } = alerts;
	const uvCurrent = uvColor(environment.uv.current);
	const uvPrev = uvColor(environment.uv.previous);
	const aqiCurrent = aqiColor(environment.airQuality.current.aqi);
	const aqiPrev = aqiColor(environment.airQuality.previous.aqi);

	return (
		<BottomSheet title="Environment Alert" onClose={onClose}>
			<SheetRow icon={MapPin} accent="var(--amber)" title="Location Change">
				<div className="flex items-center gap-3">
					<div className="flex-1 p-2.5 rounded-xl text-center" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
						<div className="text-xl mb-0.5">{location.previous.flag}</div>
						<p className="font-semibold text-xs">{location.previous.city}</p>
						<p className="text-[10px] text-muted-foreground mt-0.5">{location.previous.timezone}</p>
					</div>
					<div className="flex flex-col items-center gap-1 shrink-0">
						<ArrowRight size={15} className="text-muted-foreground" />
						<span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "var(--amber)" }}>
							{location.jetLagHours}h
						</span>
					</div>
					<div className="flex-1 p-2.5 rounded-xl text-center" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.25)" }}>
						<div className="text-xl mb-0.5">{location.current.flag}</div>
						<p className="font-semibold text-xs" style={{ color: "var(--amber)" }}>{location.current.city}</p>
						<p className="text-[10px] text-muted-foreground mt-0.5">{location.current.timezone}</p>
					</div>
				</div>
				<div className="flex items-start gap-2 p-2.5 rounded-xl text-xs" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)" }}>
					<Moon size={13} className="mt-0.5 shrink-0" style={{ color: "var(--amber)" }} />
					<span className="text-muted-foreground leading-relaxed">
						<span className="font-semibold" style={{ color: "var(--amber)" }}>Jet-lag risk ({location.jetLagHours}h shift). </span>
						Rest, avoid strain for 24–48h, stay hydrated.
					</span>
				</div>
			</SheetRow>
			<div className="h-px bg-border" />
			<SheetRow icon={Sun} accent="#f97316" title="UV Index">
				<CompBar
					lhs={{ name: location.previous.city, value: environment.uv.previous, max: 12, color: uvPrev }}
					rhs={{ name: location.current.city, value: environment.uv.current, max: 12, color: uvCurrent }}
				/>
				<div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs" style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.18)" }}>
					<Shield size={13} style={{ color: "#f97316" }} className="shrink-0" />
					<span className="text-muted-foreground">
						<span className="font-semibold" style={{ color: "#f97316" }}>Rec: </span>
						{environment.uv.recommendation}
					</span>
				</div>
			</SheetRow>
			<div className="h-px bg-border" />
			<SheetRow icon={Wind} accent="var(--violet)" title="Air Quality">
				<CompBar
					lhs={{ name: location.previous.city, value: environment.airQuality.previous.aqi, max: 150, color: aqiPrev }}
					rhs={{ name: location.current.city, value: environment.airQuality.current.aqi, max: 150, color: aqiCurrent }}
				/>

			</SheetRow>
		</BottomSheet>
	);
}

// ─── Page Sections ────────────────────────────────────────────────────────────
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
	const { environment: env, physicalEnvironmentAlerts: alerts } = data;
	const [envSheet, setEnvSheet] = React.useState(false);

	return (
		<>
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-6">
					<PageHeader />
					<AlertBanner
						label="Location & environment change"
						sublabel={`${alerts.location.previous.city} → ${alerts.location.current.city} · UV ${alerts.environment.uv.current} (Very High)`}
						onOpen={() => setEnvSheet(true)}
					/>
					<QuickStatsGrid env={env} />
					<WeatherCard env={env} />
					<TrendsSection env={env} />
				</div>
			</main>
			{envSheet && (
				<EnvironmentAlertSheet
					alerts={alerts}
					onClose={() => setEnvSheet(false)}
				/>
			)}
		</>
	);
}
