import { ArrowRight, TriangleAlert } from "lucide-react";

interface AlertBannerProps {
	label: string;
	sublabel: string;
	onOpen: () => void;
}

export function AlertBanner({ label, sublabel, onOpen }: AlertBannerProps) {
	return (
		<button
			type="button"
			onClick={onOpen}
			className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all active:scale-[0.98]"
			style={{
				background: "linear-gradient(90deg, rgba(244,63,94,0.10) 0%, rgba(245,158,11,0.06) 100%)",
				border: "1px solid rgba(244,63,94,0.25)",
			}}
		>
			<div
				className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
				style={{ background: "rgba(244,63,94,0.15)" }}
			>
				<TriangleAlert size={13} style={{ color: "var(--rose)" }} />
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-xs font-semibold leading-tight" style={{ color: "var(--rose)" }}>
					{label}
				</p>
				<p className="text-[11px] text-muted-foreground truncate mt-0.5">
					{sublabel}
				</p>
			</div>
			<ArrowRight size={14} style={{ color: "var(--rose)" }} className="shrink-0" />
		</button>
	);
}
