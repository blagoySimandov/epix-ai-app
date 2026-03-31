export interface BioAge {
	chrono: number;
	bio: number;
	delta: number;
	status: "Slower aging" | "Average" | "Faster aging";
}

export interface Domain {
	id: string;
	name: string;
	score: number;
	activation: string;
	risk: "green" | "yellow" | "red";
	geneticRisk: number;
	geneticActivation: number;
}

export interface DayValue {
	day: string;
	value: number;
}

export interface WeekPoint {
	week: string;
	bioAge: number;
	baseline: number;
}

export interface PhysicalActivity {
	steps: number;
	restingHR: number;
	hrv: number;
	history: {
		steps: DayValue[];
		restingHR: DayValue[];
		hrv: DayValue[];
	};
}

export interface Environment {
	airQuality: { aqi: number; label: string };
	uvIndex: number;
	meteorological: { condition: string; temp: number };
	elevation: number;
	magneticStorms: { level: string; active: boolean };
	history: {
		airQuality: DayValue[];
		uvIndex: DayValue[];
		elevation: DayValue[];
		magneticStorms: DayValue[];
	};
}

export interface Report {
	bioAge: BioAge;
	bioAgeHistory: WeekPoint[];
	domains: Domain[];
	physicalActivity: PhysicalActivity;
	environment: Environment;
}
