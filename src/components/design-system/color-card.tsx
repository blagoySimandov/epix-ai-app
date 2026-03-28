export function ColorCard({
	name,
	variable,
	textColor,
	border,
}: {
	name: string;
	variable: string;
	textColor: string;
	border?: boolean;
}) {
	return (
		<div
			className={`rounded-xl overflow-hidden shadow-sm ${border ? "border" : ""}`}
		>
			<div className={`h-24 ${variable} flex items-center justify-center`}>
				<span className={`font-medium ${textColor}`}>{name}</span>
			</div>
			<div className="p-3 bg-card border-t flex justify-between items-center text-sm">
				<span className="text-muted-foreground font-mono">
					{variable.replace("bg-", "")}
				</span>
			</div>
		</div>
	);
}
