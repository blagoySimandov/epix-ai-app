import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { api } from "#/integrations/api";

export const scanAlertsQueryOptions = queryOptions({
	queryKey: ["scan-alerts"],
	queryFn: () => api.getScanAlerts(),
});

export const useScanAlerts = () => useSuspenseQuery(scanAlertsQueryOptions);
