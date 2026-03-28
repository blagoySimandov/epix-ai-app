import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const statusDotVariants = cva("inline-block rounded-full flex-shrink-0", {
	variants: {
		variant: {
			default: "bg-primary",
			green: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
			yellow: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]",
			red: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]",
		},
		size: {
			sm: "h-1.5 w-1.5",
			default: "h-2 w-2",
			lg: "h-3 w-3",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export interface StatusDotProps
	extends HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof statusDotVariants> {}

export function StatusDot({ className, variant, size, ...props }: StatusDotProps) {
	return (
		<span
			className={cn(statusDotVariants({ variant, size }), className)}
			{...props}
		/>
	);
}
