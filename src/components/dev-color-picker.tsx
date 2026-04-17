import * as React from "react";
import { Palette, X, Copy } from "lucide-react";

const THEME_COLORS = [
	{ label: "Background", cssVar: "--background" },
	{ label: "Foreground", cssVar: "--foreground" },
	{ label: "Card", cssVar: "--card" },
	{ label: "Card Fore", cssVar: "--card-foreground" },
	{ label: "Primary", cssVar: "--primary" },
	{ label: "Primary Fore", cssVar: "--primary-foreground" },
	{ label: "Secondary", cssVar: "--secondary" },
	{ label: "Secondary Fore", cssVar: "--secondary-foreground" },
	{ label: "Muted", cssVar: "--muted" },
	{ label: "Muted Fore", cssVar: "--muted-foreground" },
	{ label: "Destructive", cssVar: "--destructive" },
	{ label: "Teal (Brand)", cssVar: "--teal" },
	{ label: "Teal Light", cssVar: "--teal-light" },
	{ label: "Navy Dark", cssVar: "--navy-dark" },
	{ label: "Navy Text", cssVar: "--navy-text" },
	{ label: "Green Glow", cssVar: "--green-glow" },
	{ label: "Green Text", cssVar: "--green-text" },
	{ label: "Rose (Alert/Red)", cssVar: "--rose" },
	{ label: "Amber (Warn/Yellow)", cssVar: "--amber" },
	{ label: "Violet", cssVar: "--violet" },
];

export function DevColorPicker() {
	const [isOpen, setIsOpen] = React.useState(false);
	const [colors, setColors] = React.useState<Record<string, string>>({});

	// Initialize colors from computed styles or localStorage
	React.useEffect(() => {
		const rootStyles = getComputedStyle(document.documentElement);
		const saved = localStorage.getItem('dev-colors');
		const savedObj = saved ? JSON.parse(saved) : null;
		
		const initialColors: Record<string, string> = {};
		THEME_COLORS.forEach(({ cssVar }) => {
			let val = savedObj?.[cssVar] || rootStyles.getPropertyValue(cssVar).trim();
			initialColors[cssVar] = val;
			if (savedObj?.[cssVar]) {
				document.documentElement.style.setProperty(cssVar, val);
			}
		});
		setColors(initialColors);
	}, []);

	const handleColorChange = (cssVar: string, val: string) => {
		const newColors = { ...colors, [cssVar]: val };
		setColors(newColors);
		document.documentElement.style.setProperty(cssVar, val);
		localStorage.setItem('dev-colors', JSON.stringify(newColors));
	};

	const resetColors = () => {
		localStorage.removeItem('dev-colors');
		THEME_COLORS.forEach(({ cssVar }) => {
			document.documentElement.style.removeProperty(cssVar);
		});
		const rootStyles = getComputedStyle(document.documentElement);
		const initialColors: Record<string, string> = {};
		THEME_COLORS.forEach(({ cssVar }) => {
			initialColors[cssVar] = rootStyles.getPropertyValue(cssVar).trim();
		});
		setColors(initialColors);
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};



	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="fixed top-28 right-4 z-[100] p-2 rounded-full bg-card/80 backdrop-blur-sm border shadow-sm hover:bg-muted transition-colors"
				aria-label="Theme Colors Dev"
			>
				<Palette className="w-5 h-5 text-teal-500" />
			</button>

			{isOpen && (
				<div className="fixed top-4 right-4 z-[110] w-80 bg-card border rounded-xl shadow-xl overflow-hidden glass-card flex flex-col p-4 animate-in">
					<div className="flex justify-between items-center mb-4 border-b border-border/50 pb-2">
						<h3 className="font-semibold text-sm">Theme Colors</h3>
						<button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-muted text-muted-foreground">
							<X className="w-4 h-4" />
						</button>
					</div>
					
					<div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
						{THEME_COLORS.map(({ label, cssVar }) => {
							const val = colors[cssVar] || "#000000";
							return (
								<div key={cssVar} className="flex flex-col gap-1.5">
									<label className="text-xs font-semibold text-foreground">
										{label}
									</label>
									<div className="flex items-center gap-2">
										<input
											type="color"
											value={val}
											onChange={(e) => handleColorChange(cssVar, e.target.value)}
											className="w-8 h-8 p-0 border-0 rounded cursor-pointer shrink-0"
										/>
										<div className="flex-1 flex gap-1 items-center bg-muted/50 rounded-md px-2 py-1">
											<span className="text-[10px] text-muted-foreground flex-1 font-mono">{cssVar}</span>
											<span className="text-xs font-mono font-medium">{val}</span>
											<button 
												onClick={() => copyToClipboard(`${cssVar}: ${val};`)}
												className="p-1 hover:bg-background rounded"
												title="Copy CSS rule"
											>
												<Copy className="w-3 h-3 text-muted-foreground" />
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					
					<button
						onClick={resetColors}
						className="mt-4 w-full py-2 text-xs font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-md transition-colors"
					>
						Reset to Default
					</button>
				</div>
			)}
		</>
	);
}
