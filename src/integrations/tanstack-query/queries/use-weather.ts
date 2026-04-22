import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "#/integrations/api";

const SF_LAT = 37.7749;
const SF_LON = -122.4194;

export const weatherQueryOptions = queryOptions({
	queryKey: ["weather", SF_LAT, SF_LON],
	queryFn: () => api.getWeather(SF_LAT, SF_LON),
	staleTime: 10 * 60 * 1000,
});

export const useWeather = () => useQuery(weatherQueryOptions);
