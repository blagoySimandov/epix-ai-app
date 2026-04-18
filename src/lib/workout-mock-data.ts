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
	{ week: "12/4", count: 4 },
	{ week: "19/4", count: 5 },
	{ week: "26/4", count: 3 },
	{ week: "3/5", count: 5 },
	{ week: "10/5", count: 4 },
	{ week: "17/5", count: 2 },
	{ week: "24/5", count: 4 },
	{ week: "31/5", count: 1 },
];

export const PR_EXERCISES = ["Bench Press", "Squat", "Deadlift"] as const;

export const PR_PROGRESSION: Record<string, PRDataPoint[]> = {
	"Bench Press": [
		{ date: "Apr", value: 75 },
		{ date: "Apr 2", value: 77.5 },
		{ date: "May", value: 80 },
		{ date: "May 2", value: 82.5 },
		{ date: "Jun", value: 85 },
	],
	Squat: [
		{ date: "Apr", value: 100 },
		{ date: "Apr 2", value: 105 },
		{ date: "May", value: 107.5 },
		{ date: "May 2", value: 112.5 },
		{ date: "Jun", value: 115 },
	],
	Deadlift: [
		{ date: "Apr", value: 120 },
		{ date: "Apr 2", value: 125 },
		{ date: "May", value: 127.5 },
		{ date: "May 2", value: 132.5 },
		{ date: "Jun", value: 137.5 },
	],
};

export const WORKOUT_HISTORY: Workout[] = [
	{
		id: "1",
		name: "Push Day",
		date: "Today",
		duration: 62,
		volume: 4850,
		exercises: [
			{
				id: "e1",
				name: "Bench Press",
				sets: [
					{ weight: 80, reps: 8, completed: true },
					{ weight: 82.5, reps: 6, completed: true },
					{ weight: 85, reps: 5, completed: true },
				],
			},
			{
				id: "e2",
				name: "Overhead Press",
				sets: [
					{ weight: 55, reps: 8, completed: true },
					{ weight: 57.5, reps: 6, completed: true },
				],
			},
			{
				id: "e3",
				name: "Incline Press",
				sets: [
					{ weight: 65, reps: 10, completed: true },
					{ weight: 65, reps: 8, completed: true },
				],
			},
		],
	},
	{
		id: "2",
		name: "Pull Day",
		date: "Yesterday",
		duration: 55,
		volume: 5200,
		exercises: [
			{
				id: "e4",
				name: "Deadlift",
				sets: [
					{ weight: 130, reps: 5, completed: true },
					{ weight: 135, reps: 3, completed: true },
				],
			},
			{
				id: "e5",
				name: "Barbell Row",
				sets: [
					{ weight: 75, reps: 8, completed: true },
					{ weight: 77.5, reps: 8, completed: true },
				],
			},
			{
				id: "e6",
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
		id: "3",
		name: "Leg Day",
		date: "2 days ago",
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
		name: "Upper Body",
		date: "4 days ago",
		duration: 58,
		volume: 4200,
		exercises: [
			{
				id: "e10",
				name: "Bench Press",
				sets: [
					{ weight: 77.5, reps: 8, completed: true },
					{ weight: 80, reps: 6, completed: true },
				],
			},
			{
				id: "e11",
				name: "Barbell Row",
				sets: [
					{ weight: 72.5, reps: 8, completed: true },
					{ weight: 75, reps: 8, completed: true },
				],
			},
		],
	},
	{
		id: "5",
		name: "Full Body",
		date: "6 days ago",
		duration: 75,
		volume: 6100,
		exercises: [
			{
				id: "e12",
				name: "Squat",
				sets: [
					{ weight: 107.5, reps: 5, completed: true },
					{ weight: 110, reps: 5, completed: true },
				],
			},
			{
				id: "e13",
				name: "Bench Press",
				sets: [
					{ weight: 77.5, reps: 8, completed: true },
					{ weight: 80, reps: 6, completed: true },
				],
			},
			{
				id: "e14",
				name: "Deadlift",
				sets: [
					{ weight: 127.5, reps: 5, completed: true },
					{ weight: 130, reps: 3, completed: true },
				],
			},
		],
	},
];
