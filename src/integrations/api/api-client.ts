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
}

// Export a singleton instance for use throughout the application
export const api = new ApiClient();
