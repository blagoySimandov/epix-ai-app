# AI Assistant Instructions for epix-ai

## Project Overview
Epix AI is a health-genomics mobile application built as a PWA (Vite + React + TypeScript + Tailwind CSS) that translates a user's genetic and epigenetic data into personalised, real-time health intelligence across 9 core scenarios: a genomic risk report with biological age tracking and disease domain drill-downs (Cardio, Metabolic, Neuro, Onco); an aging velocity dashboard with time-series visualisation; a camera-based food and medication scanner that triggers pharmacogenomic and nutrigenomic alerts with safe alternatives; an activity dashboard that contextualises step deficits against cardiovascular genetic risk; a travel health advisory that cross-references destination environments with genetic predispositions; a blood test upload and AI interpretation flow with genetically-adjusted reference ranges and longitudinal biomarker tracking; a real-time workout screen with gene-based heart rate zone guidance and post-workout recovery estimation; an alcohol metabolism warning triggered on drink detection; and a sleep recovery dashboard linking circadian gene variants to aging speed — all screens use hardcoded mock data, a consistent design system (custom Tailwind tokens + CSS variables), a mobile-first 390px layout with a persistent bottom tab bar, and React Router v6 for navigation.

## Design System Workflow
When creating, updating, or modifying components within the `src/components/design-system` directory:
1. You MUST export the component from `src/components/design-system/index.ts`.
2. You MUST update the design system inventory route at `src/routes/design.tsx` to showcase the component and document its usage. This ensures `/design` remains a complete, live inventory of all available UI elements.
3. Use the `@design-system` alias when importing core design system components, and `@design-system/widgets` for widgets.
4. You MUST update the "Design System Components" section in both `GEMINI.md` and `CLAUDE.md` with a short explanation of the new or modified component.
5. For components that compose design system primitives but are more screen-specific, place them under `src/components/design-system/widgets/` and export from its `index.ts`. Screens should be built almost entirely from design system components and widgets.

## Design System Components
The following components are part of the core design system:
- **Badge**: A small, color-coded pill (`green`, `yellow`, `red`, `default`, `outline`) used to display status, tags, or small notification counts.
- **StatusDot**: A small circular indicator (`green`, `yellow`, `red`, `default`) with a subtle pulse/glow effect used for inline risk or status indicators next to text.
- **BarChartOverview**: A pre-styled responsive Bar Chart widget displaying comparative metrics using the Recharts library and standard design tokens.
- **LineChartTrend**: A pre-styled responsive Line Chart widget displaying trends over time using the Recharts library and standard design tokens.
- **ColorCard**: A specialized presentation card used purely within the design system inventory route to display and preview theme color tokens and their hex/CSS variables.
- **HalfCircleGauge**: An enhanced dual-arc SVG semicircle gauge that visualises two concurrent 0–100 levels with gradient strokes and a center value callout. `primaryColor` drives the outer arc (Risk); `secondaryColor` (defaults to `var(--teal)`) drives the inner arc (Activation). Used for displaying genetic risk vs. activation levels on domain cards.
- **MetricChart**: A compact, single-metric area chart (using Recharts) for 7-day trend data. Accepts `data: Array<{ day: string; value: number }>`, a `color` CSS string, and an optional `unit` label. Used in physical activity and environment detail pages.
- **AgingTrajectoryChart**: A dark-navy area chart card for displaying bio age vs baseline over a multi-week period. Accepts `data: TrajectoryPoint[]` (`{ week, bioAge, baseline }`). Automatically computes and displays the delta (improvement/regression in years) in the header with a trending icon. Features a teal gradient area fill and a glowing dot on the latest data point. Used on the home screen.
- **QuickStatCard**: A compact glanceable card for displaying a single health metric. Shows an icon, label, large value with optional unit, and a status label — all color-coded via `accentColor`. Designed for 2-column grids to give at-a-glance status of multiple metrics.

## Design System Widgets (`src/components/design-system/widgets/`)
Widgets are reusable components that compose design system primitives into higher-level patterns. They are more specific than core design system components but still reusable across multiple screens. Import from `@design-system/widgets`.
- **MetricTrendCard**: A card combining a header (icon + title + current value + optional status label) with a `MetricChart` 7-day sparkline. Accepts `icon`, `title`, `currentValue`, `unit`, `data`, `color`, and optional `statusLabel`. Used on environment, activity, blood test, and sleep screens.
- **BioAgeWidget**: Dark-navy hero card displaying biological age on a full-circle arc dial. Features a decorative outer tick-dot ring (60 dots), glowing arc with bloom effect, endpoint glow dot, delta badge inside the dial center, an insight sentence, and a two-column stats footer (Chrono / Age Delta). Accepts `bio`, `chrono`, `delta`, and `status` — all colors adapt to aging status (`Slower aging` → teal, `Average` → yellow, `Faster aging` → rose). Used on the home screen.