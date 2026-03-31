import {
	Badge,
	BarChartOverview,
	ColorCard,
	LineChartTrend,
	StatusDot,
} from "@design-system";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/design")({
	component: DesignSystem,
});

function DesignSystem() {
	return (
		<main className="container mx-auto max-w-5xl px-4 py-12">
			<div className="mb-12">
				<h1 className="text-4xl font-bold text-foreground tracking-tight sm:text-5xl mb-4">
					Design System
				</h1>
				<p className="text-lg text-muted-foreground max-w-2xl">
					The foundation of our user interface. Explore the colors, typography,
					and interactive components that make up the visual language.
				</p>
			</div>

			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6 border-b pb-2">Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<ColorCard
						name="Background"
						variable="bg-background"
						textColor="text-foreground"
					/>
					<ColorCard
						name="Foreground"
						variable="bg-foreground"
						textColor="text-background"
					/>
					<ColorCard
						name="Primary"
						variable="bg-primary"
						textColor="text-primary-foreground"
					/>
					<ColorCard
						name="Secondary"
						variable="bg-secondary"
						textColor="text-secondary-foreground"
						border
					/>
					<ColorCard
						name="Muted"
						variable="bg-muted"
						textColor="text-muted-foreground"
						border
					/>
					<ColorCard
						name="Accent"
						variable="bg-accent"
						textColor="text-accent-foreground"
						border
					/>
					<ColorCard
						name="Destructive"
						variable="bg-destructive"
						textColor="text-destructive-foreground"
					/>
					<ColorCard
						name="Card"
						variable="bg-card"
						textColor="text-card-foreground"
						border
					/>
					<ColorCard
						name="Border"
						variable="bg-border"
						textColor="text-foreground"
					/>
					<ColorCard
						name="Ring"
						variable="bg-ring"
						textColor="text-background"
					/>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6 border-b pb-2">
					Graphs & Charts
				</h2>
				<p className="text-muted-foreground mb-6">
					Idiomatic charts built with{" "}
					<code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
						recharts
					</code>{" "}
					using standard design tokens for styling to ensure theming
					consistency.
				</p>
				<div className="grid md:grid-cols-2 gap-8">
					<BarChartOverview />
					<LineChartTrend />
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6 border-b pb-2">
					Typography
				</h2>
				<div className="bg-card border rounded-2xl p-8 space-y-8 shadow-sm">
					<div>
						<p className="text-sm font-medium text-muted-foreground mb-1">
							Headline 1
						</p>
						<h1 className="text-5xl font-bold tracking-tight">
							The quick brown fox
						</h1>
					</div>
					<div>
						<p className="text-sm font-medium text-muted-foreground mb-1">
							Headline 2
						</p>
						<h2 className="text-4xl font-semibold tracking-tight">
							The quick brown fox
						</h2>
					</div>
					<div>
						<p className="text-sm font-medium text-muted-foreground mb-1">
							Headline 3
						</p>
						<h3 className="text-3xl font-semibold tracking-tight">
							The quick brown fox
						</h3>
					</div>
					<div>
						<p className="text-sm font-medium text-muted-foreground mb-1">
							Headline 4
						</p>
						<h4 className="text-2xl font-semibold tracking-tight">
							The quick brown fox
						</h4>
					</div>
					<div>
						<p className="text-sm font-medium text-muted-foreground mb-1">
							Body Large
						</p>
						<p className="text-lg">
							The quick brown fox jumps over the lazy dog. Pack my box with five
							dozen liquor jugs.
						</p>
					</div>
					<div>
						<p className="text-sm font-medium text-muted-foreground mb-1">
							Body Default
						</p>
						<p className="text-base">
							The quick brown fox jumps over the lazy dog. Pack my box with five
							dozen liquor jugs. How vexingly quick daft zebras jump!
						</p>
					</div>
					<div>
						<p className="text-sm font-medium text-muted-foreground mb-1">
							Body Small
						</p>
						<p className="text-sm text-muted-foreground">
							The quick brown fox jumps over the lazy dog. Pack my box with five
							dozen liquor jugs.
						</p>
					</div>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6 border-b pb-2">
					Interactive Elements
				</h2>
				<div className="bg-card border rounded-2xl p-8 grid gap-8 sm:grid-cols-2 shadow-sm">
					<div>
						<h3 className="text-lg font-medium mb-4">Buttons</h3>
						<div className="flex flex-wrap gap-4 items-center">
							<button
								type="button"
								className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium interactive-delight hover:opacity-90"
							>
								Primary Button
							</button>
							<button
								type="button"
								className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium interactive-delight hover:bg-secondary/80"
							>
								Secondary Button
							</button>
							<button
								type="button"
								className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md text-sm font-medium interactive-delight"
							>
								Outline Button
							</button>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-medium mb-4">Inputs</h3>
						<div className="space-y-4 max-w-sm">
							<input
								type="text"
								placeholder="Default Input"
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
							/>
						</div>
					</div>

					<div className="sm:col-span-2">
						<h3 className="text-lg font-medium mb-4">Badges & Status</h3>
						<div className="flex flex-wrap gap-4 items-center mb-6">
							<Badge variant="green">Success</Badge>
							<Badge variant="yellow">Warning</Badge>
							<Badge variant="red">Critical</Badge>
							<Badge variant="default">Default</Badge>
							<Badge variant="outline" className="border">
								Outline
							</Badge>
						</div>

						<h4 className="text-sm font-medium text-muted-foreground mb-3">
							Inline Status Dots
						</h4>
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-2 text-sm">
								<StatusDot variant="green" /> Server operational
							</div>
							<div className="flex items-center gap-2 text-sm">
								<StatusDot variant="yellow" /> High latency detected
							</div>
							<div className="flex items-center gap-2 text-sm">
								<StatusDot variant="red" /> Connection failed
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<StatusDot variant="default" /> Connecting...
							</div>
						</div>
					</div>

					<div className="sm:col-span-2">
						<h3 className="text-lg font-medium mb-4">
							Cards (Delight Animation)
						</h3>
						<div className="grid sm:grid-cols-3 gap-4">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="card-delight border rounded-xl p-4 bg-card text-card-foreground"
								>
									<h4 className="font-medium mb-2 flex items-center justify-between">
										Interactive Card {i}
										<StatusDot
											variant={i === 1 ? "green" : i === 2 ? "yellow" : "red"}
										/>
									</h4>
									<p className="text-sm text-muted-foreground">
										Hover over me to see the subtle lift and shadow animation.
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
