import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, QrCode } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useHotkeys from "use-hotkeys";

export const Route = createFileRoute("/scan")({
	component: ScanPage,
});

function ScanPage() {
	const navigate = useNavigate();
	const [isScanning, setIsScanning] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		let stream: MediaStream | null = null;
		if (isScanning) {
			navigator.mediaDevices
				.getUserMedia({ video: { facingMode: "environment" } })
				.then((s) => {
					stream = s;
					if (videoRef.current) {
						videoRef.current.srcObject = s;
					}
				})
				.catch((err) => console.error("Camera error:", err));
		}
		return () => {
			if (stream) {
				for (const track of stream.getTracks()) {
					track.stop();
				}
			}
		};
	}, [isScanning]);

	// Listen for f and m keys when scanning
	useHotkeys(
		(key) => {
			if (!isScanning) return;
			if (key === "f") {
				navigate({ to: "/scan/alert", search: { type: "food" } });
			} else if (key === "m") {
				navigate({ to: "/scan/alert", search: { type: "medication" } });
			}
		},
		["f", "m"],
		[isScanning, navigate]
	);

	return (
		<main className="min-h-screen bg-background relative">
			<div className="mx-auto max-w-[390px] px-4 pt-10 pb-32 flex flex-col gap-6 items-center justify-center min-h-screen">
				{/* Scanner viewport */}
				<div className="relative w-full aspect-square max-w-[280px] rounded-3xl overflow-hidden border-2 border-teal/40 bg-muted/30 flex items-center justify-center">
					{isScanning ? (
						<video
							ref={videoRef}
							autoPlay
							playsInline
							muted
							className="absolute inset-0 w-full h-full object-cover"
						/>
					) : null}

					{/* Corner brackets */}
					<span className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-teal rounded-tl-lg z-10" />
					<span className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-teal rounded-tr-lg z-10" />
					<span className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-teal rounded-bl-lg z-10" />
					<span className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-teal rounded-br-lg z-10" />

					{/* Scan line animation */}
					{isScanning && (
						<div
							className="absolute inset-x-4 h-0.5 bg-teal/60 rounded-full z-10"
							style={{
								animation: "scan-line 2s ease-in-out infinite",
								top: "40%",
							}}
						/>
					)}

					{!isScanning && (
						<div className="flex flex-col items-center gap-3 opacity-40">
							<Camera size={48} className="text-teal" />
							<p className="text-sm font-medium text-muted-foreground text-center px-4">
								Point camera at food or medication label
							</p>
						</div>
					)}
				</div>

				<h1 className="font-headline font-bold text-2xl tracking-tight text-center">
					Food &amp; Medication Scanner
				</h1>
				<p className="text-muted-foreground text-sm text-center leading-relaxed max-w-[240px]">
					Scan any food or medication to check for genetic interactions.
				</p>

				{!isScanning ? (
					<button
						type="button"
						onClick={() => setIsScanning(true)}
						className="flex items-center gap-3 bg-teal text-white font-bold text-base px-10 py-4 rounded-2xl shadow-lg hover:bg-teal/90 transition-all active:scale-95"
					>
						<Camera size={18} />
						Scan
					</button>
				) : (
					<div className="text-center">
						<p className="text-teal font-semibold animate-pulse">Scanning...</p>
						<p className="text-xs text-muted-foreground mt-2">
							Press 'f' to scan food, 'm' for medicine
						</p>
					</div>
				)}

				<div className="flex items-center gap-2 text-muted-foreground/60 mt-4">
					<QrCode size={14} />
					<p className="text-xs">Or enter a barcode manually</p>
				</div>
			</div>

			<style>{`
				@keyframes scan-line {
					0%, 100% { transform: translateY(-80px); opacity: 0.4; }
					50% { transform: translateY(120px); opacity: 1; }
				}
			`}</style>
		</main>
	);
}

