import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle, FileText, Maximize2, X, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { Badge } from "@design-system";

export const Route = createFileRoute("/blood-test/$id")({
  component: ReportPage,
});

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

interface ReportData {
  pdfFile: string;
  alert: { title: string; body: string } | null;
  goodNews: string | null;
  footer: string;
  sections: Section[];
}

const REPORTS: Record<string, ReportData> = {
  "apr-2026": {
    pdfFile: "blood_test_english.pdf",
    alert: {
      title: "Hematuria Detected",
      body: "Blood confirmed in urine (4–5 erythrocytes/FOV, ref <1). CBC and biochemistry are clean. Consult your doctor for follow-up.",
    },
    goodNews: "CBC and biochemistry within normal range. No anemia, infection, or organ dysfunction.",
    footer: "Reference ranges adjusted for your genetic profile. MCHC elevation is mild — consistent with dehydration from long-haul travel (Sofia → SF, 11h flight). Hematuria warrants clinical follow-up.",
    sections: [
      {
        title: "Complete Blood Count",
        status: "warning",
        metrics: [
          { name: "WBC",         value: "6.2",  unit: "×10⁹/L",  reference: "4.0–10.0" },
          { name: "Neutrophils", value: "3.8",  unit: "×10⁹/L",  reference: "2.0–7.0" },
          { name: "Lymphocytes", value: "1.9",  unit: "×10⁹/L",  reference: "1.0–3.0" },
          { name: "Monocytes",   value: "0.5",  unit: "×10⁹/L",  reference: "0.2–1.0" },
          { name: "RBC",         value: "4.8",  unit: "×10¹²/L", reference: "4.2–5.8" },
          { name: "Hemoglobin",  value: "148",  unit: "g/L",      reference: "130–175" },
          { name: "Hematocrit",  value: "0.43", unit: "L/L",      reference: "0.40–0.52" },
          { name: "MCHC",        value: "362",  unit: "g/L",      reference: "315–360", flag: "H" },
          { name: "Platelets",   value: "240",  unit: "×10⁹/L",  reference: "150–400" },
        ],
      },
      {
        title: "Biochemistry",
        status: "normal",
        metrics: [
          { name: "Creatinine", value: "84",     unit: "umol/L", reference: "64–111" },
          { name: "Uric Acid",  value: "319.45", unit: "umol/L", reference: "208–428" },
          { name: "AST",        value: "24",     unit: "U/L",    reference: "10–40" },
          { name: "ALT",        value: "30",     unit: "U/L",    reference: "7–56" },
        ],
      },
      {
        title: "Urinalysis",
        status: "critical",
        metrics: [
          { name: "Blood (strip)",  value: "POSITIVE", unit: "",      reference: "Negative", flag: "POSITIVE" },
          { name: "Erythrocytes",  value: "4–5",       unit: "/FOV",  reference: "<1/FOV",   flag: "H" },
          { name: "Leukocytes",    value: "3–4",       unit: "/FOV",  reference: "<4/FOV" },
          { name: "Protein",       value: "Negative",  unit: "",      reference: "Negative" },
          { name: "Glucose",       value: "Negative",  unit: "",      reference: "Negative" },
          { name: "Bacteria",      value: "None",      unit: "",      reference: "None" },
        ],
      },
    ],
  },

  "jan-2026": {
    pdfFile: "blood_test_2.pdf",
    alert: {
      title: "Hematuria Detected",
      body: "Blood confirmed in urine (3–4 erythrocytes/FOV, ref <1). MCHC mildly elevated at 364. Persistent finding — clinical follow-up recommended.",
    },
    goodNews: "WBC, lymphocytes and biochemistry within normal range. No signs of infection or organ dysfunction.",
    footer: "MCHC elevation at 364 g/L is mild and may reflect dehydration. Hematuria is present for the second recorded time — a pattern warranting urological investigation.",
    sections: [
      {
        title: "Complete Blood Count",
        status: "warning",
        metrics: [
          { name: "WBC",         value: "5.9",  unit: "×10⁹/L",  reference: "4.0–10.0" },
          { name: "Neutrophils", value: "2.9",  unit: "×10⁹/L",  reference: "2.0–7.0" },
          { name: "Lymphocytes", value: "1.8",  unit: "×10⁹/L",  reference: "1.0–3.0" },
          { name: "Monocytes",   value: "0.4",  unit: "×10⁹/L",  reference: "0.2–1.0" },
          { name: "RBC",         value: "4.7",  unit: "×10¹²/L", reference: "4.2–5.8" },
          { name: "Hemoglobin",  value: "145",  unit: "g/L",      reference: "130–175" },
          { name: "Hematocrit",  value: "0.42", unit: "L/L",      reference: "0.40–0.52" },
          { name: "MCHC",        value: "364",  unit: "g/L",      reference: "315–360", flag: "H" },
          { name: "Platelets",   value: "235",  unit: "×10⁹/L",  reference: "150–400" },
        ],
      },
      {
        title: "Biochemistry",
        status: "normal",
        metrics: [
          { name: "Creatinine", value: "81",  unit: "umol/L", reference: "64–111" },
          { name: "Uric Acid",  value: "304", unit: "umol/L", reference: "208–428" },
          { name: "AST",        value: "22",  unit: "U/L",    reference: "10–40" },
          { name: "ALT",        value: "28",  unit: "U/L",    reference: "7–56" },
        ],
      },
      {
        title: "Urinalysis",
        status: "critical",
        metrics: [
          { name: "Blood (strip)", value: "POSITIVE", unit: "",     reference: "Negative", flag: "POSITIVE" },
          { name: "Erythrocytes", value: "3–4",       unit: "/FOV", reference: "<1/FOV",   flag: "H" },
          { name: "Leukocytes",   value: "2–3",       unit: "/FOV", reference: "<4/FOV" },
          { name: "Protein",      value: "Negative",  unit: "",     reference: "Negative" },
          { name: "Glucose",      value: "Negative",  unit: "",     reference: "Negative" },
          { name: "Bacteria",     value: "None",      unit: "",     reference: "None" },
        ],
      },
    ],
  },

  "oct-2025": {
    pdfFile: "blood_test_3.pdf",
    alert: {
      title: "Hematuria Detected",
      body: "Blood confirmed in urine (5–6 erythrocytes/FOV, ref <1). Earliest recorded instance. Biochemistry and CBC otherwise clean.",
    },
    goodNews: "MCHC within normal range (356 g/L). CBC and biochemistry show no signs of anemia or organ stress.",
    footer: "First recorded hematuria event. All other panels within range. Uric acid and creatinine normal but shifted from baseline — longitudinal tracking initiated.",
    sections: [
      {
        title: "Complete Blood Count",
        status: "normal",
        metrics: [
          { name: "WBC",         value: "7.1",  unit: "×10⁹/L",  reference: "4.0–10.0" },
          { name: "Neutrophils", value: "3.7",  unit: "×10⁹/L",  reference: "2.0–7.0" },
          { name: "Lymphocytes", value: "2.1",  unit: "×10⁹/L",  reference: "1.0–3.0" },
          { name: "Monocytes",   value: "0.6",  unit: "×10⁹/L",  reference: "0.2–1.0" },
          { name: "RBC",         value: "5.0",  unit: "×10¹²/L", reference: "4.2–5.8" },
          { name: "Hemoglobin",  value: "163",  unit: "g/L",      reference: "130–175" },
          { name: "Hematocrit",  value: "0.46", unit: "L/L",      reference: "0.40–0.52" },
          { name: "MCHC",        value: "356",  unit: "g/L",      reference: "315–360" },
          { name: "Platelets",   value: "252",  unit: "×10⁹/L",  reference: "150–400" },
        ],
      },
      {
        title: "Biochemistry",
        status: "normal",
        metrics: [
          { name: "Creatinine", value: "92",  unit: "umol/L", reference: "64–111" },
          { name: "Uric Acid",  value: "287", unit: "umol/L", reference: "208–428" },
          { name: "AST",        value: "21",  unit: "U/L",    reference: "10–40" },
          { name: "ALT",        value: "27",  unit: "U/L",    reference: "7–56" },
        ],
      },
      {
        title: "Urinalysis",
        status: "critical",
        metrics: [
          { name: "Blood (strip)", value: "POSITIVE", unit: "",     reference: "Negative", flag: "POSITIVE" },
          { name: "Erythrocytes", value: "5–6",       unit: "/FOV", reference: "<1/FOV",   flag: "H" },
          { name: "Leukocytes",   value: "3–4",       unit: "/FOV", reference: "<4/FOV" },
          { name: "Protein",      value: "Negative",  unit: "",     reference: "Negative" },
          { name: "Glucose",      value: "Negative",  unit: "",     reference: "Negative" },
          { name: "Bacteria",     value: "None",      unit: "",     reference: "None" },
        ],
      },
    ],
  },
};

const STATUS_CONFIG = {
  normal:   { dot: "bg-green-glow",  badge: "green"  as const, bg: "bg-green-glow/8 border-green-glow/20" },
  warning:  { dot: "bg-amber-500",   badge: "yellow" as const, bg: "bg-amber-500/8 border-amber-500/20" },
  critical: { dot: "bg-rose-400",    badge: "red"    as const, bg: "bg-rose-500/8 border-rose-500/20" },
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

function PdfCard({ pdfFile }: { pdfFile: string }) {
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
            <p className="text-[11px] text-muted-foreground">{pdfFile}</p>
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
          <iframe src={`/${pdfFile}`} title="Blood Test Report" className="flex-1 w-full" />
        </div>
      )}
    </>
  );
}

function BloodTestPage({ report }: { report: ReportData }) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lab Results</h1>
          <p className="text-sm text-muted-foreground">AI-interpreted · Genetically adjusted</p>
        </div>

        {report.alert && (
          <div className="glass-card rounded-3xl border border-rose-500/30 bg-rose-500/5 p-5 flex gap-4">
            <AlertTriangle size={20} className="text-rose-400 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-sm text-rose-400">{report.alert.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{report.alert.body}</p>
            </div>
          </div>
        )}

        <PdfCard pdfFile={report.pdfFile} />

        {report.goodNews && (
          <div className="glass-card rounded-3xl border border-green-glow/20 bg-green-glow/5 p-4 flex items-center gap-3">
            <CheckCircle size={16} className="text-green-text shrink-0" />
            <p className="text-xs text-muted-foreground">{report.goodNews}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {report.sections.map((s) => <SectionCard key={s.title} section={s} />)}
        </div>

        <div className="p-4 rounded-3xl bg-teal/5 border border-teal/20">
          <p className="text-xs text-teal leading-relaxed font-medium">{report.footer}</p>
        </div>
      </div>
    </main>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <p className="text-muted-foreground text-sm">Report data not available yet.</p>
    </main>
  );
}

function ReportPage() {
  const { id } = Route.useParams();
  const report = REPORTS[id];
  if (!report) return <NotFound />;
  return <BloodTestPage report={report} />;
}
