# AI Assistant Instructions for epix-ai

## Design System Workflow
When creating, updating, or modifying components within the `src/components/design-system` directory:
1. You MUST export the component from `src/components/design-system/index.ts`.
2. You MUST update the design system inventory route at `src/routes/design.tsx` to showcase the component and document its usage. This ensures `/design` remains a complete, live inventory of all available UI elements.
3. Use the `@design-system` alias when importing components from the design system.
4. You MUST update the "Design System Components" section in both `GEMINI.md` and `CLAUDE.md` with a short explanation of the new or modified component.

## Design System Components
The following components are part of the core design system:
- **Badge**: A small, color-coded pill (`green`, `yellow`, `red`, `default`, `outline`) used to display status, tags, or small notification counts.
- **StatusDot**: A small circular indicator (`green`, `yellow`, `red`, `default`) with a subtle pulse/glow effect used for inline risk or status indicators next to text.
- **BarChartOverview**: A pre-styled responsive Bar Chart widget displaying comparative metrics using the Recharts library and standard design tokens.
- **LineChartTrend**: A pre-styled responsive Line Chart widget displaying trends over time using the Recharts library and standard design tokens.
- **ColorCard**: A specialized presentation card used purely within the design system inventory route to display and preview theme color tokens and their hex/CSS variables.