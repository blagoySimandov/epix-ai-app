export type WorkoutSet = { weight: number; reps: number; completed: boolean };
export type WorkoutExercise = { id: string; name: string; sets: WorkoutSet[] };
export type Workout = {
	id: string;
	name: string;
	date: string;
	duration: number;
	volume: number;
	exercises: WorkoutExercise[];
};
export type PRDataPoint = { date: string; value: number };

export const EXERCISE_LIST = [
	"Bench Press",
	"Squat",
	"Deadlift",
	"Overhead Press",
	"Pull-up",
	"Barbell Row",
	"Dumbbell Curl",
	"Tricep Pushdown",
	"Leg Press",
	"Romanian Deadlift",
	"Incline Press",
	"Cable Fly",
];

export const WEEKLY_FREQUENCY = [
	{ week: "3/3",  count: 4 },
	{ week: "10/3", count: 5 },
	{ week: "17/3", count: 5 },
	{ week: "24/3", count: 4 },
	{ week: "31/3", count: 5 },
	{ week: "7/4",  count: 4 },
	{ week: "14/4", count: 1 },
];

export const PR_EXERCISES = ["Bench Press", "Squat", "Deadlift"] as const;

export const PR_PROGRESSION: Record<string, PRDataPoint[]> = {
	"Bench Press": [
		{ date: "Jan", value: 70 },
		{ date: "Feb", value: 75 },
		{ date: "Mar", value: 80 },
		{ date: "Apr 6", value: 85 },
	],
	Squat: [
		{ date: "Jan", value: 95 },
		{ date: "Feb", value: 100 },
		{ date: "Mar", value: 107.5 },
		{ date: "Apr 6", value: 115 },
	],
	Deadlift: [
		{ date: "Jan", value: 115 },
		{ date: "Feb", value: 122.5 },
		{ date: "Mar", value: 130 },
		{ date: "Apr 6", value: 137.5 },
	],
};

export const WORKOUT_HISTORY: Workout[] = [
	{
		id: "1",
		name: "Hotel Gym · Recovery",
		date: "Today",
		duration: 32,
		volume: 2640,
		exercises: [
			{
				id: "e1",
				name: "Bench Press",
				sets: [
					{ weight: 70, reps: 10, completed: true },
					{ weight: 72.5, reps: 8, completed: true },
					{ weight: 75, reps: 6, completed: true },
				],
			},
			{
				id: "e2",
				name: "Overhead Press",
				sets: [
					{ weight: 45, reps: 10, completed: true },
					{ weight: 47.5, reps: 8, completed: true },
				],
			},
			{
				id: "e3",
				name: "Incline Press",
				sets: [
					{ weight: 55, reps: 10, completed: true },
					{ weight: 55, reps: 8, completed: true },
				],
			},
		],
	},
	{
		id: "2",
		name: "Push Day",
		date: "5 days ago",
		duration: 62,
		volume: 4850,
		exercises: [
			{
				id: "e4",
				name: "Bench Press",
				sets: [
					{ weight: 80, reps: 8, completed: true },
					{ weight: 82.5, reps: 6, completed: true },
					{ weight: 85, reps: 5, completed: true },
				],
			},
			{
				id: "e5",
				name: "Overhead Press",
				sets: [
					{ weight: 55, reps: 8, completed: true },
					{ weight: 57.5, reps: 6, completed: true },
				],
			},
			{
				id: "e6",
				name: "Incline Press",
				sets: [
					{ weight: 65, reps: 10, completed: true },
					{ weight: 65, reps: 8, completed: true },
				],
			},
		],
	},
	{
		id: "3",
		name: "Leg Day",
		date: "6 days ago",
		duration: 70,
		volume: 7800,
		exercises: [
			{
				id: "e7",
				name: "Squat",
				sets: [
					{ weight: 110, reps: 5, completed: true },
					{ weight: 115, reps: 3, completed: true },
					{ weight: 117.5, reps: 2, completed: true },
				],
			},
			{
				id: "e8",
				name: "Leg Press",
				sets: [
					{ weight: 180, reps: 12, completed: true },
					{ weight: 180, reps: 10, completed: true },
				],
			},
			{
				id: "e9",
				name: "Romanian Deadlift",
				sets: [
					{ weight: 80, reps: 10, completed: true },
					{ weight: 85, reps: 8, completed: true },
				],
			},
		],
	},
	{
		id: "4",
		name: "Pull Day",
		date: "8 days ago",
		duration: 55,
		volume: 5200,
		exercises: [
			{
				id: "e10",
				name: "Deadlift",
				sets: [
					{ weight: 130, reps: 5, completed: true },
					{ weight: 135, reps: 3, completed: true },
				],
			},
			{
				id: "e11",
				name: "Barbell Row",
				sets: [
					{ weight: 75, reps: 8, completed: true },
					{ weight: 77.5, reps: 8, completed: true },
				],
			},
			{
				id: "e12",
				name: "Pull-up",
				sets: [
					{ weight: 0, reps: 10, completed: true },
					{ weight: 0, reps: 9, completed: true },
					{ weight: 0, reps: 8, completed: true },
				],
			},
		],
	},
	{
		id: "5",
		name: "Full Body",
		date: "10 days ago",
		duration: 75,
		volume: 6100,
		exercises: [
			{
				id: "e13",
				name: "Squat",
				sets: [
					{ weight: 107.5, reps: 5, completed: true },
					{ weight: 110, reps: 5, completed: true },
				],
			},
			{
				id: "e14",
				name: "Bench Press",
				sets: [
					{ weight: 77.5, reps: 8, completed: true },
					{ weight: 80, reps: 6, completed: true },
				],
			},
			{
				id: "e15",
				name: "Deadlift",
				sets: [
					{ weight: 127.5, reps: 5, completed: true },
					{ weight: 130, reps: 3, completed: true },
				],
			},
		],
	},
];
