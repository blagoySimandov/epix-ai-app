import {
	AgingTrajectoryChart,
	Badge,
	BarChartOverview,
	ColorCard,
	HalfCircleGauge,
	LineChartTrend,
	MetricChart,
	QuickStatCard,
	StatusDot,
	DiseaseItem,
	GeneticRiskChart,
	ActivationGauge,
	PulsingAlertIcon,
	GeneticProfileChip,
	AlertBanner,
	BottomSheet,
	SheetRow,
	ChatBubble,
	ChatInput,
} from "@design-system";
import { BioAgeWidget } from "@design-system/widgets";
import { Gauge, Sun, Zap, AlertTriangle } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/design")({
	component: DesignSystem,
});

function DesignSystem() {
	return (
		<main className="container mx-auto max-w-5xl px-4 pt-12 pb-32">
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
				<div className="mt-8 max-w-sm">
					<h3 className="text-lg font-medium mb-2">
						AgingTrajectoryChart — Bio Age History
					</h3>
					<p className="text-sm text-muted-foreground mb-4">
						Dark-card trend chart showing a diagonal standard-aging baseline and
						a biological-age line that can cross above/below it with color-coded
						segments. Computes delta automatically from the data and highlights
						the latest point.
					</p>
					<AgingTrajectoryChart
						data={[
							{ week: "W1", bioAge: 26.4, baseline: 28 },
							{ week: "W2", bioAge: 26.1, baseline: 28 },
							{ week: "W3", bioAge: 25.8, baseline: 28 },
							{ week: "W4", bioAge: 25.2, baseline: 28 },
							{ week: "W5", bioAge: 25.0, baseline: 28 },
							{ week: "W6", bioAge: 24.8, baseline: 28 },
							{ week: "W7", bioAge: 24.5, baseline: 28 },
							{ week: "W8", bioAge: 24.3, baseline: 28 },
							{ week: "W9", bioAge: 24.1, baseline: 28 },
							{ week: "W10", bioAge: 23.9, baseline: 28 },
							{ week: "W11", bioAge: 24.0, baseline: 28 },
							{ week: "W12", bioAge: 24.1, baseline: 28 },
						]}
					/>
				</div>
				<div className="mt-8 bg-card border rounded-2xl p-6 shadow-sm space-y-3">
					<h3 className="text-lg font-medium">
						MetricChart — 7-Day Area Trend
					</h3>
					<p className="text-sm text-muted-foreground">
						Compact area chart for displaying a single metric over a 7-day window. Accepts any{" "}
						<code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">color</code> string and optional{" "}
						<code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">unit</code> label.
					</p>
					<MetricChart
						data={[
							{ day: "Mon", value: 61 },
							{ day: "Tue", value: 59 },
							{ day: "Wed", value: 62 },
							{ day: "Thu", value: 60 },
							{ day: "Fri", value: 58 },
							{ day: "Sat", value: 57 },
							{ day: "Sun", value: 58 },
						]}
						color="var(--teal)"
						unit=" bpm"
					/>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6 border-b pb-2">
					Half Circle Gauge
				</h2>
				<p className="text-muted-foreground mb-6">
					Enhanced dual-arc SVG gauge featuring gradient strokes and a center
					value callout. The outer arc is{" "}
					<code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">
						primaryColor
					</code>{" "}
					(risk level), the inner arc defaults to{" "}
					<code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">
						var(--teal)
					</code>{" "}
					(activation level).
				</p>
				<div className="grid grid-cols-3 gap-6 max-w-lg">
					{[
						{
							label: "Low Risk",
							primaryLevel: 22,
							secondaryLevel: 18,
							primaryColor: "var(--green-glow)",
						},
						{
							label: "Moderate",
							primaryLevel: 60,
							secondaryLevel: 40,
							primaryColor: "#facc15",
						},
						{
							label: "High Risk",
							primaryLevel: 88,
							secondaryLevel: 72,
							primaryColor: "#f43f5e",
						},
					].map(({ label, primaryLevel, secondaryLevel, primaryColor }) => (
						<div
							key={label}
							className="bg-card border rounded-2xl p-4 shadow-sm space-y-4"
						>
							<HalfCircleGauge
								primaryLevel={primaryLevel}
								secondaryLevel={secondaryLevel}
								primaryColor={primaryColor}
							/>
							<div className="space-y-1">
								<p className="text-sm font-bold text-center">{label}</p>
								<div className="flex justify-between text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
									<span>Risk {primaryLevel}%</span>
									<span>Act {secondaryLevel}%</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6 border-b pb-2">
					QuickStatCard
				</h2>
				<p className="text-muted-foreground mb-6">
					Compact glanceable card for displaying a single health metric at a glance. Shows an icon, label, large value, and color-coded status label via{" "}
					<code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">accentColor</code>.
					Used in 2-column grids for at-a-glance dashboards.
				</p>
				<div className="grid grid-cols-3 gap-4 max-w-md">
					<QuickStatCard
						icon={Gauge}
						label="Air Quality"
						value={42}
						statusLabel="Good"
						accentColor="var(--green-text)"
					/>
					<QuickStatCard
						icon={Sun}
						label="UV Index"
						value={6}
						statusLabel="High"
						accentColor="#f97316"
					/>
					<QuickStatCard
						icon={Zap}
						label="Magnetic Kp"
						value="G2"
						statusLabel="Active"
						accentColor="#f43f5e"
					/>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6 border-b pb-2">
					Widgets
				</h2>
				<p className="text-muted-foreground mb-6">
					Higher-level components that compose design system primitives into screen-ready patterns.
				</p>
				<div className="space-y-8">
					<div>
						<h3 className="text-lg font-medium mb-2">BioAgeWidget</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Dark-card hero widget showing biological age on a glowing arc dial with decorative tick ring, delta badge, insight sentence, and stats footer. Adapts color to aging status.
						</p>
						<div className="grid sm:grid-cols-3 gap-4 max-w-2xl">
							<BioAgeWidget bio={24} chrono={28} delta={-4} status="Slower aging" />
							<BioAgeWidget bio={32} chrono={32} delta={0} status="Average" />
							<BioAgeWidget bio={38} chrono={34} delta={4} status="Faster aging" />
						</div>
					</div>
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
						<h3 className="text-lg font-medium mb-4">Disease Items</h3>
						<p className="text-sm text-muted-foreground mb-6">
							Rich collapsible cards for genetic propensity. Collapsed: mini progress bars for genetic risk + activation at a glance. Expands with smooth grid-row animation into a horizontal gradient risk track and activation gauge.
						</p>
						<div className="flex flex-col gap-3 max-w-sm">
							<DiseaseItem
								disease={{
									id: "1",
									name: "Atrial Fibrillation",
									geneticMarker: "PITX2",
									status: "red",
									geneticRisk: 82,
									geneticRiskDescription: "Your heart has a genetic tendency to follow an irregular rhythm. Your risk is above the average for this disease.",
									activation: 78,
									activationDescription: "These 'beat-skipping' genes are 78% active. Your lifestyle habits have huge room to shine.",
								}}
							/>
							<DiseaseItem
								disease={{
									id: "2",
									name: "Hypertension",
									geneticMarker: "CYP11B2",
									status: "yellow",
									geneticRisk: 58,
									geneticRiskDescription: "Slightly elevated genetic risk for salt sensitivity. Your body might hold on to sodium more than most.",
									activation: 45,
									activationDescription: "Low-moderate activation. Potassium-rich foods and daily movement are keeping this in check.",
								}}
							/>
							<DiseaseItem
								disease={{
									id: "3",
									name: "Heart Failure",
									geneticMarker: "TTN",
									status: "green",
									geneticRisk: 32,
									geneticRiskDescription: "Your genetic predisposition for structural heart weakness is below average.",
									activation: 15,
									activationDescription: "Minimal activation. Regular exercise and sleep quality are maintaining high resilience.",
								}}
							/>
						</div>
					</div>

					<div className="sm:col-span-2">
						<h3 className="text-lg font-medium mb-4">Disease Primitives</h3>
						<div className="grid sm:grid-cols-2 gap-8">
							<div className="glass-card p-6 rounded-3xl space-y-4">
								<h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Genetic Risk Distribution</h4>
								<p className="text-xs text-muted-foreground">Horizontal gradient track (green→amber→rose) with population bell curve and glowing diamond pin at user percentile.</p>
								<GeneticRiskChart userRisk={75} />
							</div>
							<div className="glass-card p-6 rounded-3xl space-y-4">
								<h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Epigenetic Activation Gauge</h4>
								<p className="text-xs text-muted-foreground">Semi-circle arc gauge with tick ring, glowing needle and center value readout.</p>
								<ActivationGauge level={62} />
							</div>
						</div>
					</div>

					<div className="sm:col-span-2">
						<h3 className="text-lg font-medium mb-4">Scan &amp; Alert Elements</h3>
						<div className="grid sm:grid-cols-2 gap-8 items-start">
							<div className="bg-red-600 p-8 rounded-3xl space-y-4 overflow-hidden relative">
								<div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-900 pointer-events-none" />
								<div className="relative z-10 text-center space-y-4">
									<h4 className="text-sm font-bold uppercase tracking-widest text-white/70">Pulsing Alert Icon</h4>
									<div className="py-4">
										<PulsingAlertIcon icon={AlertTriangle} />
									</div>
								</div>
							</div>
							<div className="bg-slate-900/40 p-8 rounded-3xl space-y-6">
								<div>
									<h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Alert Banner</h4>
									<AlertBanner
										label="Action Required"
										sublabel="Genetic risk detected for current environmental change."
										onOpen={() => alert("Banner tapped")}
									/>
								</div>
								<div>
									<h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Genetic Profile Chip</h4>
									<div className="space-y-3">
										<GeneticProfileChip gene="CYP3A4" snp="rs35599367" genotype="C/T" />
										<GeneticProfileChip gene="SLCO1B1" snp="rs4149056" genotype="C/C" className="bg-teal-900/40 border-teal-500/30" />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="sm:col-span-2">
						<h3 className="text-lg font-medium mb-4">Bottom Sheet (Detailed Alert)</h3>
						<p className="text-sm text-muted-foreground mb-6">
							A slide-up modal used for detailed health briefings. Features a blurred overlay, handle, and scrollable content area with consistent spacing.
						</p>
						<div className="flex gap-4">
							<button
								onClick={() => {
									const el = document.getElementById("demo-sheet");
									if (el) el.style.display = "block";
								}}
								className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium"
							>
								Preview Bottom Sheet
							</button>
						</div>
						{/* Inline demo for BottomSheet (simulated open state) */}
						<div id="demo-sheet" style={{ display: "none" }}>
							<BottomSheet title="Design System Preview" onClose={() => {
								const el = document.getElementById("demo-sheet");
								if (el) el.style.display = "none";
							}}>
								<SheetRow icon={Zap} accent="var(--rose)" title="Demo Metric">
									<div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
										<p className="text-sm text-muted-foreground">This is a preview of the sheet content scrolling behavior and Row styling.</p>
									</div>
								</SheetRow>
								<div className="h-px bg-border" />
								<SheetRow icon={Sun} accent="var(--teal)" title="Another Row">
									<p className="text-sm text-muted-foreground">The sheet handles scrolling automatically when content exceeds 90vh.</p>
									<div className="h-32 bg-muted/20 rounded-xl" />
									<div className="h-32 bg-muted/20 rounded-xl" />
									<div className="h-32 bg-muted/20 rounded-xl" />
								</SheetRow>
							</BottomSheet>
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

					<div className="sm:col-span-2">
						<h3 className="text-lg font-medium mb-4">
							Chat Interface
						</h3>
						<p className="text-sm text-muted-foreground mb-6">
							Unified chat bubble component for both bot and user messages. Supports both plain text and rich React content.
						</p>
						<div className="bg-muted p-6 rounded-3xl space-y-2 max-w-sm">
							<ChatBubble variant="bot">
								Hello! How can I help you with your health data today?
							</ChatBubble>
							<ChatBubble variant="user">
								I'm traveling to the Mojave Desert soon.
							</ChatBubble>
							<ChatBubble variant="bot">
								<div className="flex items-center gap-2">
									<Badge variant="outline" color="var(--rose)">Alert</Badge>
									<span className="font-bold text-rose">High UV Detected</span>
								</div>
								<p className="mt-2 text-sm">Based on your genomic risk, please apply SPF 50+.</p>
							</ChatBubble>
						</div>
					</div>

					<div className="sm:col-span-2">
						<h3 className="text-lg font-medium mb-4">
							Chat Input
						</h3>
						<p className="text-sm text-muted-foreground mb-6">
							Reusable input component with glassmorphism and send button. Note: This component is absolutely positioned at the bottom of the viewport by default.
						</p>
						<div className="relative h-48 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/30 overflow-hidden">
							<div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground uppercase tracking-widest pointer-events-none">
								Viewport Mock
							</div>
							<ChatInput 
								value="" 
								onChange={() => {}} 
								onSend={() => alert("Message sent!")} 
								className="absolute bottom-4 translate-y-0!" // Override fixed position for demo
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
