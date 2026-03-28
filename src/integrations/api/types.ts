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
}

export interface Report {
	bioAge: BioAge;
	domains: Domain[];
}
