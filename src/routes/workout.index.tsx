import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Calendar, Dumbbell, Flame, Plus, Trophy } from "lucide-react";
import { QuickStatCard } from "@design-system";
import {
	WEEKLY_FREQUENCY,
	PR_PROGRESSION,
	PR_EXERCISES,
	WORKOUT_HISTORY,
	type Workout,
} from "#/lib/workout-mock-data";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/workout/")({
	component: WorkoutDashboard,
});

function PageHeader() {
	return (
		<div className="flex items-center justify-between">
			<h1 className="font-headline font-bold text-2xl tracking-tight">
				Workouts
			</h1>
			<Link
				to="/workout/active"
				className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-bold"
				style={{ background: "var(--teal)", color: "var(--background)" }}
			>
				<Plus size={16} />
				Start
			</Link>
		</div>
	);
}

function QuickStats() {
	return (
		<div className="grid grid-cols-3 gap-3">
			<QuickStatCard
				icon={Dumbbell}
				label="Total"
				value={52}
				statusLabel="All time"
				accentColor="var(--teal)"
			/>
			<QuickStatCard
				icon={Calendar}
				label="This Week"
				value={1}
				statusLabel="Travel week"
				accentColor="var(--amber)"
			/>
			<QuickStatCard
				icon={Flame}
				label="Streak"
				value={1}
				unit="d"
				statusLabel="Best: 21d"
				accentColor="var(--rose)"
			/>
		</div>
	);
}

function WeeklyChart() {
	return (
		<div className="glass-card rounded-2xl p-4 border border-border/40">
			<p className="font-headline font-bold text-base mb-0.5">
				Workouts Per Week
			</p>
			<p className="text-xs text-muted-foreground mb-4">Activity</p>
			<div className="h-[140px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={WEEKLY_FREQUENCY}
						margin={{ top: 4, right: 0, left: -28, bottom: 0 }}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							stroke="var(--border)"
						/>
						<XAxis
							dataKey="week"
							stroke="var(--muted-foreground)"
							fontSize={10}
							tickLine={false}
							axisLine={false}
							dy={6}
						/>
						<YAxis
							stroke="var(--muted-foreground)"
							fontSize={10}
							tickLine={false}
							axisLine={false}
							ticks={[0, 3, 5]}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "var(--card)",
								borderColor: "var(--border)",
								borderRadius: "0.75rem",
								color: "var(--foreground)",
								fontSize: 12,
							}}
							cursor={{ fill: "rgba(0,103,126,0.08)" }}
							formatter={(v: number) => [v, "workouts"]}
						/>
						<Bar dataKey="count" fill="var(--teal)" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

function ExercisePills({
	selected,
	onChange,
}: {
	selected: string;
	onChange: (e: string) => void;
}) {
	return (
		<div className="flex gap-2 flex-wrap">
			{PR_EXERCISES.map((ex) => (
				<button
					key={ex}
					type="button"
					onClick={() => onChange(ex)}
					className={cn(
						"px-3 py-1 rounded-full text-xs font-semibold transition-all",
						selected === ex
							? "text-background"
							: "bg-secondary text-muted-foreground",
					)}
					style={selected === ex ? { background: "var(--teal)" } : undefined}
				>
					{ex}
				</button>
			))}
		</div>
	);
}

function PRLineChart({
	data,
}: { data: Array<{ date: string; value: number }> }) {
	return (
		<div className="h-[140px]">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					data={data}
					margin={{ top: 4, right: 8, left: -28, bottom: 0 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						vertical={false}
						stroke="var(--border)"
					/>
					<XAxis
						dataKey="date"
						stroke="var(--muted-foreground)"
						fontSize={10}
						tickLine={false}
						axisLine={false}
						dy={6}
					/>
					<YAxis
						stroke="var(--muted-foreground)"
						fontSize={10}
						tickLine={false}
						axisLine={false}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "var(--card)",
							borderColor: "var(--border)",
							borderRadius: "0.75rem",
							fontSize: 12,
						}}
						formatter={(v: number) => [`${v} kg`, "1RM"]}
					/>
					<Line
						type="monotone"
						dataKey="value"
						stroke="var(--teal)"
						strokeWidth={2}
						dot={{
							r: 4,
							fill: "var(--background)",
							stroke: "var(--teal)",
							strokeWidth: 2,
						}}
						activeDot={{ r: 6, fill: "var(--teal)" }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

function PRSection() {
	const [selected, setSelected] = React.useState<string>(PR_EXERCISES[0]);
	return (
		<div className="glass-card rounded-2xl p-4 border border-border/40 space-y-3">
			<div>
				<p className="font-headline font-bold text-base">{selected}</p>
				<p className="text-xs text-muted-foreground">PR Progression (1RM)</p>
			</div>
			<ExercisePills selected={selected} onChange={setSelected} />
			<PRLineChart data={PR_PROGRESSION[selected]} />
		</div>
	);
}

function WorkoutCard({ workout }: { workout: Workout }) {
	return (
		<div className="glass-card rounded-2xl p-4 border border-border/40 space-y-2.5">
			<div className="flex items-start justify-between">
				<div>
					<p className="font-headline font-bold text-sm">{workout.name}</p>
					<p className="text-xs text-muted-foreground">{workout.date}</p>
				</div>
				<div className="flex gap-3 text-xs text-muted-foreground font-medium">
					<span>{workout.duration} min</span>
					<span className="flex items-center gap-1">
						<Trophy size={11} style={{ color: "var(--amber)" }} />
						{(workout.volume / 1000).toFixed(1)}t
					</span>
				</div>
			</div>
			<div className="flex flex-wrap gap-1.5">
				{workout.exercises.map((e) => (
					<span
						key={e.id}
						className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
					>
						{e.name} · {e.sets.length}×
					</span>
				))}
			</div>
		</div>
	);
}

function HistorySection() {
	return (
		<div className="space-y-3">
			<p className="font-semibold text-sm text-muted-foreground uppercase tracking-wider px-1">
				Recent Workouts
			</p>
			{WORKOUT_HISTORY.map((w) => (
				<WorkoutCard key={w.id} workout={w} />
			))}
		</div>
	);
}

function WorkoutDashboard() {
	return (
		<main className="min-h-screen bg-background">
			<div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-6">
				<PageHeader />
				<QuickStats />
				<WeeklyChart />
				<PRSection />
				<HistorySection />
			</div>
		</main>
	);
}
