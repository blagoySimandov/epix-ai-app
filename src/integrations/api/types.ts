export interface BioAge {
	chrono: number;
	bio: number;
	delta: number;
	status: "Slower aging" | "Average" | "Faster aging";
}

export type RiskLevel = "green" | "yellow" | "red";

export interface Disease {
	id: string;
	name: string;
	status: RiskLevel;
	geneticRisk: number; // 0-100 percentage
	geneticRiskDescription: string;
	activation: number; // 0-100 percentage
	activationDescription: string;
	geneticMarker: string;
}

export interface Domain {
	id: string;
	name: string;
	score: number;
	activation: string;
	risk: RiskLevel;
	geneticRisk: number;
	geneticActivation: number;
	diseases?: Disease[];
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

export interface Alternative {
	name: string;
	reason: string;
	emoji: string;
}

export interface ScanAlert {
	id: string;
	item: string;
	type: "food" | "medication";
	description: string;
	gene: string;
	snp: string;
	genotype: string;
	impact: string;
	mechanism: string;
	risks: string[];
	alternatives: Alternative[];
}

export interface ScanAlerts {
	alerts: Record<string, ScanAlert>;
}
