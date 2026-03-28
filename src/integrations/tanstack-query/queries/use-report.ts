import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { api } from "#/integrations/api";

export const reportQueryOptions = queryOptions({
	queryKey: ["report"],
	queryFn: () => api.getReport(),
});

export const useReport = () => useSuspenseQuery(reportQueryOptions);
