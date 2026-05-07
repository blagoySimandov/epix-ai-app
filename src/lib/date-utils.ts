const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export function generateDailyLabels(count: number): string[] {
	const today = new Date();
	return Array.from({ length: count }, (_, i) => {
		const d = new Date(today);
		d.setDate(d.getDate() - (count - 1 - i));
		return DAY_ABBR[d.getDay()];
	});
}

export function generateWeeklyDates(count: number): string[] {
	const today = new Date();
	return Array.from({ length: count }, (_, i) => {
		const d = new Date(today);
		d.setDate(d.getDate() - (count - 1 - i) * 7);
		return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	});
}
