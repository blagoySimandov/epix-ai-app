import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Activity, Brain, Heart, Shield, TrendingUp, TrendingDown } from "lucide-react";
import { useReport } from "#/integrations/tanstack-query/queries/use-report";
import { DiseaseItem, HalfCircleGauge } from "@design-system";
import type { DomainTrend } from "#/integrations/api/types";

export const Route = createFileRoute("/report/$domain")({
  component: DomainDetailPage,
});

const DOMAIN_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  cardio: Heart,
  metabolic: Activity,
  neuro: Brain,
  onco: Shield,
};

const RISK_COLORS: Record<string, string> = {
  yellow: "var(--amber)",
  green: "var(--green-glow)",
  red: "var(--rose)",
};

const SEVERITY_ORDER: Record<string, number> = { red: 0, yellow: 1, green: 2 };

function sortBySeverity<T extends { status: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => (SEVERITY_ORDER[a.status] ?? 3) - (SEVERITY_ORDER[b.status] ?? 3)
  );
}

function Trend24hBox({ trend }: { trend: DomainTrend }) {
  const isUp = trend.direction === "up";
  const color = isUp ? "var(--rose)" : "var(--green-text)";
  const Icon = isUp ? TrendingUp : TrendingDown;

  return (
    <div
      className="rounded-2xl p-4 flex gap-4 items-start border"
      style={{ background: isUp ? "rgba(244,63,94,0.06)" : "rgba(34,197,94,0.06)", borderColor: isUp ? "rgba(244,63,94,0.2)" : "rgba(34,197,94,0.2)" }}
    >
      <div className="shrink-0 mt-0.5 p-2 rounded-xl" style={{ background: isUp ? "rgba(244,63,94,0.1)" : "rgba(34,197,94,0.1)" }}>
        <Icon size={16} style={{ color }} />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last 24h</span>
          <span className="text-xs font-extrabold font-headline" style={{ color }}>
            {isUp ? "+" : "-"}{trend.delta}% activation
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{trend.summary}</p>
      </div>
    </div>
  );
}

function DomainDetailPage() {
  const { domain: domainId } = Route.useParams();
  const { data: report } = useReport();

  const domain = report.domains.find((d) => d.id === domainId);

  if (!domain) {
    return (
      <main className="min-h-screen bg-background p-10">
        <h1 className="text-xl font-bold">Domain not found</h1>
        <Link to="/" className="text-teal underline mt-4 block">
          Back to Dashboard
        </Link>
      </main>
    );
  }

  const Icon = DOMAIN_ICONS[domain.id] ?? Heart;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2 -ml-2 text-muted-foreground interactive-delight"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-white/5 text-teal">
              <Icon size={18} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{domain.name}</h1>
          </div>
        </div>

        {/* Domain Stats Summary */}
        <div className="glass-card p-6 rounded-[2.5rem] border border-white/5 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 blur-[60px] -mr-16 -mt-16" />

          <div className="flex justify-between items-center relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
                Domain Score
              </span>
              <span className="text-3xl font-bold tabular-nums">
                {domain.score}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold text-right">
                Status
              </span>
              <span
                className={`text-sm font-bold ${
                  domain.risk === "red"
                    ? "text-rose-400"
                    : domain.risk === "yellow"
                      ? "text-yellow-400"
                      : "text-green-glow"
                }`}
              >
                {domain.activation} Activation
              </span>
            </div>
          </div>

          <div className="px-4 relative z-10">
            <HalfCircleGauge
              primaryLevel={domain.geneticRisk}
              secondaryLevel={domain.geneticActivation}
              primaryColor={RISK_COLORS[domain.risk]}
            />
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold tracking-wider relative z-10 px-2">
            <div className="flex flex-col gap-1">
              <span>Genetic Risk</span>
              <span className="text-foreground text-xs">
                {domain.geneticRisk}%
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span>Epigenetic Activity</span>
              <span className="text-teal text-xs">
                {domain.geneticActivation}%
              </span>
            </div>
          </div>
        </div>

        <Trend24hBox trend={domain.trend24h} />

        {/* Disease List */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold tracking-tight">
              Disease Propensity
            </h2>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-1 rounded-full">
              {domain.diseases?.length || 0} Conditions
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {sortBySeverity(domain.diseases ?? []).map((disease) => (
              <DiseaseItem key={disease.id} disease={disease} />
            ))}
          </div>
        </div>

        {/* Insights Footer */}
        <div className="p-4 rounded-3xl bg-teal/5 border border-teal/20">
          <p className="text-xs text-teal leading-relaxed font-medium">
            Based on your polygenic risk scores and current methylation markers,
            these conditions represent your primary preventive focus areas for
            the next 6 months.
          </p>
        </div>
      </div>
    </main>
  );
}
