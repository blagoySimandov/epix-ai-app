import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle, FileText, Maximize2, X, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { Badge } from "@design-system";

export const Route = createFileRoute("/blood-test/$id")({
  component: ReportPage,
});

function ReportPage() {
  const { id } = Route.useParams();
  if (id !== "apr-2026") return <NotFound />;
  return <BloodTestPage />;
}

function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center flex flex-col gap-3">
        <p className="text-muted-foreground text-sm">Report data not available yet.</p>
      </div>
    </main>
  );
}

interface Metric {
  name: string;
  value: string;
  unit: string;
  reference: string;
  flag?: "H" | "L" | "POSITIVE";
}

interface Section {
  title: string;
  status: "normal" | "warning" | "critical";
  metrics: Metric[];
}

const SECTIONS: Section[] = [
  {
    title: "Complete Blood Count",
    status: "warning",
    metrics: [
      { name: "WBC", value: "6.2", unit: "×10⁹/L", reference: "4.0–10.0" },
      { name: "Neutrophils", value: "3.8", unit: "×10⁹/L", reference: "2.0–7.0" },
      { name: "Lymphocytes", value: "1.9", unit: "×10⁹/L", reference: "1.0–3.0" },
      { name: "Monocytes", value: "0.5", unit: "×10⁹/L", reference: "0.2–1.0" },
      { name: "RBC", value: "4.8", unit: "×10¹²/L", reference: "4.2–5.8" },
      { name: "Hemoglobin", value: "148", unit: "g/L", reference: "130–175" },
      { name: "Hematocrit", value: "0.43", unit: "L/L", reference: "0.40–0.52" },
      { name: "MCHC", value: "362", unit: "g/L", reference: "315–360", flag: "H" },
      { name: "Platelets", value: "240", unit: "×10⁹/L", reference: "150–400" },
    ],
  },
  {
    title: "Biochemistry",
    status: "normal",
    metrics: [
      { name: "Creatinine", value: "84", unit: "umol/L", reference: "64–111" },
      { name: "Uric Acid", value: "319.45", unit: "umol/L", reference: "208–428" },
      { name: "AST", value: "24", unit: "U/L", reference: "10–40" },
      { name: "ALT", value: "30", unit: "U/L", reference: "7–56" },
    ],
  },
  {
    title: "Urinalysis",
    status: "critical",
    metrics: [
      { name: "Blood (strip)", value: "POSITIVE", unit: "", reference: "Negative", flag: "POSITIVE" },
      { name: "Erythrocytes", value: "4–5", unit: "/FOV", reference: "<1/FOV", flag: "H" },
      { name: "Leukocytes", value: "3–4", unit: "/FOV", reference: "<4/FOV" },
      { name: "Protein", value: "Negative", unit: "", reference: "Negative" },
      { name: "Glucose", value: "Negative", unit: "", reference: "Negative" },
      { name: "Bacteria", value: "None", unit: "", reference: "None" },
    ],
  },
];

const STATUS_CONFIG = {
  normal: { dot: "bg-green-glow", badge: "green" as const, bg: "bg-green-glow/8 border-green-glow/20" },
  warning: { dot: "bg-amber-500", badge: "yellow" as const, bg: "bg-amber-500/8 border-amber-500/20" },
  critical: { dot: "bg-rose-400", badge: "red" as const, bg: "bg-rose-500/8 border-rose-500/20" },
};

function MetricRow({ metric }: { metric: Metric }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{metric.name}</span>
        {metric.flag && (
          <Badge variant="red">{metric.flag === "POSITIVE" ? "POS" : metric.flag}</Badge>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-sm font-bold tabular-nums ${metric.flag ? "text-rose-400" : ""}`}>
          {metric.value}
          {metric.unit && <span className="text-[10px] text-muted-foreground font-normal ml-0.5">{metric.unit}</span>}
        </span>
        <span className="text-[10px] text-muted-foreground">{metric.reference}</span>
      </div>
    </div>
  );
}

function SectionCard({ section }: { section: Section }) {
  const [expanded, setExpanded] = React.useState(section.status !== "normal");
  const cfg = STATUS_CONFIG[section.status];
  const flagCount = section.metrics.filter((m) => m.flag).length;

  return (
    <div className={`glass-card rounded-3xl border overflow-hidden ${cfg.bg}`}>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          <span className="font-bold text-base">{section.title}</span>
          {flagCount > 0 && <Badge variant={cfg.badge}>{flagCount} flag{flagCount > 1 ? "s" : ""}</Badge>}
        </div>
        {expanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
      </button>

      {expanded && (
        <div className="px-5 pb-4">
          {section.metrics.map((m) => <MetricRow key={m.name} metric={m} />)}
        </div>
      )}
    </div>
  );
}

function PdfCard() {
  const [fullscreen, setFullscreen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setFullscreen(true)}
        className="glass-card rounded-2xl border border-border/40 p-4 flex items-center justify-between w-full active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal/10 text-teal">
            <FileText size={18} />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">Original Lab Report</p>
            <p className="text-[11px] text-muted-foreground">blood_test_english.pdf</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-teal text-[11px] font-bold">
          <Maximize2 size={14} />
          <span>Full Screen</span>
        </div>
      </button>

      {fullscreen && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-background">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 shrink-0">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-teal" />
              <span className="font-semibold text-sm">Lab Report</span>
            </div>
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              className="p-2 rounded-xl bg-muted text-muted-foreground active:scale-95 transition-transform"
            >
              <X size={18} />
            </button>
          </div>
          <iframe src="/blood_test_english.pdf" title="Blood Test Report" className="flex-1 w-full" />
        </div>
      )}
    </>
  );
}

function BloodTestPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lab Results</h1>
          <p className="text-sm text-muted-foreground">AI-interpreted · Genetically adjusted</p>
        </div>

        <div className="glass-card rounded-3xl border border-rose-500/30 bg-rose-500/5 p-5 flex gap-4">
          <AlertTriangle size={20} className="text-rose-400 mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm text-rose-400">Hematuria Detected</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Blood confirmed in urine (4–5 erythrocytes/FOV, ref &lt;1). CBC and biochemistry are clean. Consult your doctor for follow-up.
            </p>
          </div>
        </div>

        <PdfCard />

        <div className="glass-card rounded-3xl border border-green-glow/20 bg-green-glow/5 p-4 flex items-center gap-3">
          <CheckCircle size={16} className="text-green-text shrink-0" />
          <p className="text-xs text-muted-foreground">CBC and biochemistry within normal range. No anemia, infection, or organ dysfunction.</p>
        </div>

        <div className="flex flex-col gap-3">
          {SECTIONS.map((s) => <SectionCard key={s.title} section={s} />)}
        </div>

        <div className="p-4 rounded-3xl bg-teal/5 border border-teal/20">
          <p className="text-xs text-teal leading-relaxed font-medium">
            Reference ranges adjusted for your genetic profile. MCHC elevation is mild — possible dehydration. Hematuria warrants clinical investigation.
          </p>
        </div>
      </div>
    </main>
  );
}
