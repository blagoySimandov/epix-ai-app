import * as React from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
	title: string;
	children: React.ReactNode;
	onClose: () => void;
}

export function BottomSheet({ title, children, onClose }: BottomSheetProps) {
	return (
		<div
			className="fixed inset-0 z-[100] flex flex-col justify-end"
			style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div
				className="w-full max-w-[390px] mx-auto rounded-t-[2rem] flex flex-col"
				style={{
					background: "var(--card)",
					border: "1px solid var(--border)",
					borderBottom: "none",
					maxHeight: "90vh", // Increased from 82vh for better accessibility/viewing
					animation: "slideUp 0.3s cubic-bezier(0.34,1.3,0.64,1)",
				}}
			>
				{/* Pull handle */}
				<div className="flex justify-center pt-3 pb-1 shrink-0">
					<div className="w-10 h-1 rounded-full bg-border" />
				</div>

				{/* Sheet header */}
				<div className="flex items-center justify-between px-5 py-3 shrink-0">
					<h2 className="font-headline font-bold text-base tracking-tight">{title}</h2>
					<button
						type="button"
						onClick={onClose}
						className="p-1.5 rounded-xl bg-muted text-muted-foreground"
					>
						<X size={15} />
					</button>
				</div>

				{/* Scrollable content - flex-1 with overflow handles the scrolling */}
				<div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-24 space-y-5">
					{children}
				</div>
			</div>

			<style>{`
				@keyframes slideUp {
					from { transform: translateY(40%); opacity: 0; }
					to   { transform: translateY(0);   opacity: 1; }
				}
			`}</style>
		</div>
	);
}

interface SheetRowProps {
	icon: React.ElementType;
	accent: string;
	title: string;
	children: React.ReactNode;
}

export function SheetRow({ icon: Icon, accent, title, children }: SheetRowProps) {
	return (
		<div className="space-y-2.5">
			<div className="flex items-center gap-2">
				<div
					className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
					style={{ background: `${accent}18` }}
				>
					<Icon size={13} style={{ color: accent }} />
				</div>
				<h3 className="font-headline font-bold text-sm tracking-tight">{title}</h3>
			</div>
			{children}
		</div>
	);
}
