import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/report/$domain")({
	component: DomainDetailPage,
});

function DomainDetailPage() {
	const { domain } = Route.useParams();
	const label = domain.charAt(0).toUpperCase() + domain.slice(1);

	return (
		<main className="min-h-screen bg-background">
			<div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-6">
				<div className="flex items-center gap-3">
					<Link to="/" className="p-2 -ml-2 text-muted-foreground">
						<ArrowLeft size={20} />
					</Link>
					<h1 className="text-2xl font-bold">{label}</h1>
				</div>
				<p className="text-muted-foreground">Disease list coming soon.</p>
			</div>
		</main>
	);
}
