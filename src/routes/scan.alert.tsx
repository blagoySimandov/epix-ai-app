import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/scan/alert")({
	component: () => <Outlet />,
});
