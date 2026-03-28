export class ApiClient {
	/**
	 * Fetches mock data from the static public folder.
	 * In a real application, this would make an HTTP request to an API endpoint.
	 *
	 * @param endpoint The name of the JSON file to fetch (without the .json extension)
	 */
	protected async fetchMockData<T>(endpoint: string): Promise<T> {
		try {
			// Fetch the static JSON file from the public/mock-data directory
			const response = await fetch(`/mock-data/${endpoint}.json`);

			if (!response.ok) {
				throw new Error(
					`Failed to fetch mock data for endpoint: ${endpoint} (Status: ${response.status})`,
				);
			}

			return (await response.json()) as T;
		} catch (error) {
			console.error(`API Client Error (${endpoint}):`, error);
			throw error;
		}
	}

	// ---------------------------------------------------------------------------
	// API Methods (Endpoints)
	// ---------------------------------------------------------------------------
	// Note: No endpoints created yet. We will add methods here that utilize
	// this.fetchMockData<ExpectedReturnType>("endpoint-name") once we have mock data.
}

// Export a singleton instance for use throughout the application
export const api = new ApiClient();
