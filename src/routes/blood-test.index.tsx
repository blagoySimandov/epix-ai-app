import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, ChevronRight, Lock } from "lucide-react";
import { Badge } from "@design-system";

export const Route = createFileRoute("/blood-test/")({
  component: ReportsListPage,
});

interface ReportSummary {
  id: string;
  date: string;
  label: string;
  finding: string;
  status: "critical" | "warning" | "normal";
  available: boolean;
}

const REPORTS: ReportSummary[] = [
  {
    id: "apr-2026",
    date: "Apr 18, 2026",
    label: "Complete Panel",
    finding: "Hematuria detected",
    status: "critical",
    available: true,
  },
  {
    id: "jan-2026",
    date: "Jan 5, 2026",
    label: "Complete Panel",
    finding: "All values normal",
    status: "normal",
    available: false,
  },
  {
    id: "oct-2025",
    date: "Oct 12, 2025",
    label: "Complete Panel",
    finding: "Mild vitamin D deficiency",
    status: "warning",
    available: false,
  },
  {
    id: "jul-2025",
    date: "Jul 3, 2025",
    label: "CBC only",
    finding: "All values normal",
    status: "normal",
    available: false,
  },
];

const STATUS_CONFIG = {
  normal: { badge: "green" as const },
  warning: { badge: "yellow" as const },
  critical: { badge: "red" as const },
};

function ReportRow({ report }: { report: ReportSummary }) {
  const cfg = STATUS_CONFIG[report.status];

  const inner = (
    <div className="glass-card rounded-2xl border border-border/40 p-4 flex items-center gap-4 w-full transition-all active:scale-[0.98]">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-teal/10">
        <FileText size={18} className="text-teal" />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">{report.date}</p>
          {!report.available && <Lock size={11} className="text-muted-foreground" />}
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5">{report.label} · {report.finding}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Badge variant={cfg.badge}>{report.status === "normal" ? "Clear" : "Flag"}</Badge>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>
    </div>
  );

  if (report.available) {
    return (
      <Link to="/blood-test/$id" params={{ id: report.id }}>
        {inner}
      </Link>
    );
  }

  return <div className="opacity-50 cursor-not-allowed">{inner}</div>;
}

function ReportsListPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal/10 text-teal">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lab Reports</h1>
            <p className="text-sm text-muted-foreground">Blood test history</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {REPORTS.map((r) => (
            <ReportRow key={r.id} report={r} />
          ))}
        </div>

        <p className="text-center text-[11px] text-muted-foreground">
          Older reports are imported automatically when available.
        </p>
      </div>
    </main>
  );
}
