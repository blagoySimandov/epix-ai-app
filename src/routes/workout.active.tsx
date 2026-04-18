import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Check, Plus, Timer, Trash2, X } from "lucide-react";
import { BottomSheet } from "@design-system";
import { EXERCISE_LIST, WORKOUT_HISTORY } from "#/lib/workout-mock-data";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/workout/active")({
	component: ActiveWorkoutPage,
});

type ActiveSet = {
	id: string;
	weight: string;
	reps: string;
	completed: boolean;
};
type ActiveExercise = { id: string; name: string; sets: ActiveSet[] };

function uid() {
	return Math.random().toString(36).slice(2);
}

function makeSet(): ActiveSet {
	return { id: uid(), weight: "", reps: "", completed: false };
}

function makeExercise(name: string): ActiveExercise {
	return { id: uid(), name, sets: [makeSet()] };
}

const INITIAL_EXERCISES: ActiveExercise[] = WORKOUT_HISTORY[0].exercises.map(
	(e) => ({
		id: e.id,
		name: e.name,
		sets: e.sets.map((s) => ({
			id: uid(),
			weight: String(s.weight),
			reps: String(s.reps),
			completed: false,
		})),
	}),
);

function useTimer() {
	const [seconds, setSeconds] = React.useState(0);
	const startRef = React.useRef(Date.now());
	React.useEffect(() => {
		const id = setInterval(
			() => setSeconds(Math.floor((Date.now() - startRef.current) / 1000)),
			1000,
		);
		return () => clearInterval(id);
	}, []);
	return seconds;
}

function formatTime(s: number) {
	const m = Math.floor(s / 60);
	return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function WorkoutHeader({
	seconds,
	onFinish,
}: { seconds: number; onFinish: () => void }) {
	return (
		<div className="flex items-center justify-between py-2">
			<div className="flex items-center gap-2">
				<Timer size={16} style={{ color: "var(--teal)" }} />
				<span
					className="font-headline font-bold text-lg tabular-nums"
					style={{ color: "var(--teal)" }}
				>
					{formatTime(seconds)}
				</span>
			</div>
			<button
				type="button"
				onClick={onFinish}
				className="px-5 py-2 rounded-2xl text-sm font-bold"
				style={{ background: "var(--teal)", color: "var(--background)" }}
			>
				Finish
			</button>
		</div>
	);
}

function SetRow({
	setData,
	index,
	prevLabel,
	onToggle,
	onUpdate,
}: {
	setData: ActiveSet;
	index: number;
	prevLabel: string;
	onToggle: () => void;
	onUpdate: (field: "weight" | "reps", val: string) => void;
}) {
	return (
		<div
			className={cn(
				"grid gap-1 items-center rounded-xl px-2 py-1.5 transition-colors",
				"grid-cols-[1.5rem_1fr_3.5rem_3.5rem_2.5rem]",
			)}
			style={setData.completed ? { background: "rgba(0,103,126,0.07)" } : undefined}
		>
			<span className="text-xs text-muted-foreground font-semibold text-center">
				{index + 1}
			</span>
			<span className="text-xs text-muted-foreground truncate">{prevLabel}</span>
			<input
				defaultValue={setData.weight}
				onChange={(e) => onUpdate("weight", e.target.value)}
				inputMode="decimal"
				placeholder="—"
				className="w-full bg-secondary rounded-lg text-center text-sm py-1.5 outline-none border border-transparent focus:border-teal/40"
				style={{ color: "var(--foreground)" }}
			/>
			<input
				defaultValue={setData.reps}
				onChange={(e) => onUpdate("reps", e.target.value)}
				inputMode="numeric"
				placeholder="—"
				className="w-full bg-secondary rounded-lg text-center text-sm py-1.5 outline-none border border-transparent focus:border-teal/40"
				style={{ color: "var(--foreground)" }}
			/>
			<button
				type="button"
				onClick={onToggle}
				className={cn(
					"w-8 h-8 rounded-full flex items-center justify-center transition-colors",
					setData.completed ? "text-background" : "bg-secondary text-muted-foreground",
				)}
				style={setData.completed ? { background: "var(--teal)" } : undefined}
			>
				<Check size={13} />
			</button>
		</div>
	);
}

function SetsHeader() {
	return (
		<div className="grid gap-1 grid-cols-[1.5rem_1fr_3.5rem_3.5rem_2.5rem] px-2 text-[11px] text-muted-foreground font-medium">
			<span className="text-center">Set</span>
			<span>Prev</span>
			<span className="text-center">kg</span>
			<span className="text-center">Reps</span>
			<span />
		</div>
	);
}

function ExerciseCard({
	exercise,
	onAddSet,
	onToggleSet,
	onUpdateSet,
	onRemove,
}: {
	exercise: ActiveExercise;
	onAddSet: () => void;
	onToggleSet: (setId: string) => void;
	onUpdateSet: (setId: string, field: "weight" | "reps", val: string) => void;
	onRemove: () => void;
}) {
	const completedCount = exercise.sets.filter((s) => s.completed).length;

	return (
		<div className="glass-card rounded-2xl p-4 border border-border/40 space-y-3">
			<div className="flex items-center justify-between">
				<div>
					<p
						className="font-headline font-bold text-base"
						style={{ color: "var(--teal)" }}
					>
						{exercise.name}
					</p>
					<p className="text-xs text-muted-foreground">
						{completedCount}/{exercise.sets.length} sets done
					</p>
				</div>
				<button
					type="button"
					onClick={onRemove}
					className="p-1.5 rounded-xl text-muted-foreground"
				>
					<Trash2 size={15} />
				</button>
			</div>

			<SetsHeader />

			{exercise.sets.map((s, i) => {
				const prev =
					i > 0
						? `${exercise.sets[i - 1].weight}×${exercise.sets[i - 1].reps}`
						: "—";
				return (
					<SetRow
						key={s.id}
						setData={s}
						index={i}
						prevLabel={prev}
						onToggle={() => onToggleSet(s.id)}
						onUpdate={(field, val) => onUpdateSet(s.id, field, val)}
					/>
				);
			})}

			<button
				type="button"
				onClick={onAddSet}
				className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
				style={{ background: "rgba(0,103,126,0.07)", color: "var(--teal)" }}
			>
				<Plus size={13} />
				Add Set
			</button>
		</div>
	);
}

function AddExerciseSheet({
	onClose,
	onAdd,
	existing,
}: {
	onClose: () => void;
	onAdd: (name: string) => void;
	existing: string[];
}) {
	return (
		<BottomSheet title="Add Exercise" onClose={onClose}>
			<div className="space-y-2">
				{EXERCISE_LIST.map((name) => {
					const added = existing.includes(name);
					return (
						<button
							key={name}
							type="button"
							onClick={() => {
								if (!added) {
									onAdd(name);
									onClose();
								}
							}}
							disabled={added}
							className={cn(
								"w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition-all",
								added ? "opacity-40 bg-secondary" : "bg-secondary active:scale-[0.98]",
							)}
						>
							<span>{name}</span>
							{added ? (
								<X size={14} className="text-muted-foreground" />
							) : (
								<Plus size={14} style={{ color: "var(--teal)" }} />
							)}
						</button>
					);
				})}
			</div>
		</BottomSheet>
	);
}

function useWorkoutState() {
	const [exercises, setExercises] =
		React.useState<ActiveExercise[]>(INITIAL_EXERCISES);

	const addSet = (exId: string) =>
		setExercises((prev) =>
			prev.map((e) =>
				e.id !== exId ? e : { ...e, sets: [...e.sets, makeSet()] },
			),
		);

	const toggleSet = (exId: string, setId: string) =>
		setExercises((prev) =>
			prev.map((e) =>
				e.id !== exId
					? e
					: {
							...e,
							sets: e.sets.map((s) =>
								s.id !== setId ? s : { ...s, completed: !s.completed },
							),
						},
			),
		);

	const updateSet = (
		exId: string,
		setId: string,
		field: "weight" | "reps",
		val: string,
	) =>
		setExercises((prev) =>
			prev.map((e) =>
				e.id !== exId
					? e
					: {
							...e,
							sets: e.sets.map((s) =>
								s.id !== setId ? s : { ...s, [field]: val },
							),
						},
			),
		);

	const removeExercise = (id: string) =>
		setExercises((prev) => prev.filter((e) => e.id !== id));

	const addExercise = (name: string) =>
		setExercises((prev) => [...prev, makeExercise(name)]);

	return { exercises, addSet, toggleSet, updateSet, removeExercise, addExercise };
}

function ActiveWorkoutPage() {
	const navigate = useNavigate();
	const seconds = useTimer();
	const [showPicker, setShowPicker] = React.useState(false);
	const { exercises, addSet, toggleSet, updateSet, removeExercise, addExercise } =
		useWorkoutState();

	const finish = () => navigate({ to: "/workout" });

	return (
		<>
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-4">
					<WorkoutHeader seconds={seconds} onFinish={finish} />

					<h1 className="font-headline font-bold text-2xl tracking-tight">
						Morning Workout
					</h1>

					{exercises.map((ex) => (
						<ExerciseCard
							key={ex.id}
							exercise={ex}
							onAddSet={() => addSet(ex.id)}
							onToggleSet={(setId) => toggleSet(ex.id, setId)}
							onUpdateSet={(setId, field, val) => updateSet(ex.id, setId, field, val)}
							onRemove={() => removeExercise(ex.id)}
						/>
					))}

					<button
						type="button"
						onClick={() => setShowPicker(true)}
						className="w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 border border-dashed"
						style={{
							borderColor: "color-mix(in srgb, var(--teal) 40%, transparent)",
							color: "var(--teal)",
						}}
					>
						<Plus size={16} />
						Add Exercise
					</button>

					<button
						type="button"
						onClick={finish}
						className="w-full py-3.5 rounded-2xl text-sm font-semibold"
						style={{
							color: "var(--rose)",
							background: "rgba(244,63,94,0.06)",
						}}
					>
						Cancel Workout
					</button>
				</div>
			</main>

			{showPicker && (
				<AddExerciseSheet
					onClose={() => setShowPicker(false)}
					onAdd={addExercise}
					existing={exercises.map((e) => e.name)}
				/>
			)}
		</>
	);
}
