function wmoCodeToCondition(code: number): string {
	if (code === 0) return "Clear Sky";
	if (code <= 2) return "Partly Cloudy";
	if (code === 3) return "Overcast";
	if (code <= 48) return "Foggy";
	if (code <= 55) return "Drizzle";
	if (code <= 65) return "Rain";
	if (code <= 75) return "Snow";
	if (code <= 82) return "Showers";
	return "Thunderstorm";
}

export class ApiClient {
	/**
	 * Fetches mock data from the static public folder.
	 * In a real application, this would make an HTTP request to an API endpoint.
	 *
	 * @param endpoint The name of the JSON file to fetch (without the .json extension)
	 */
	private readonly mockModules = import.meta.glob("/mock-data/*.json", {
		eager: false,
	});

	protected async fetchMockData<T>(endpoint: string): Promise<T> {
		const load = this.mockModules[`/mock-data/${endpoint}.json`];
		if (!load) {
			throw new Error(`No mock data found for endpoint: ${endpoint}`);
		}
		const mod = (await load()) as { default: T };
		return mod.default;
	}

	// ---------------------------------------------------------------------------
	// API Methods (Endpoints)
	// ---------------------------------------------------------------------------

	async getReport(): Promise<import("./types").Report> {
		return this.fetchMockData<import("./types").Report>("report");
	}

	async getScanAlerts(): Promise<import("./types").ScanAlerts> {
		return this.fetchMockData<import("./types").ScanAlerts>("scan-alerts");
	}

	async getWeather(lat: number, lon: number): Promise<import("./types").WeatherData> {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,uv_index&timezone=auto`;
		const res = await fetch(url);
		if (!res.ok) throw new Error("Weather fetch failed");
		const json = await res.json();
		return {
			temp: Math.round(json.current.temperature_2m),
			condition: wmoCodeToCondition(json.current.weather_code),
			uvIndex: Math.round(json.current.uv_index),
		};
	}
}

// Export a singleton instance for use throughout the application
export const api = new ApiClient();
