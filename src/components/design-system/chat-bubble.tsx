import { Bot } from "lucide-react";
import * as React from "react";
import { cn } from "#/lib/utils";

interface ChatBubbleProps {
	/**
	 * The content of the message.
	 */
	children: React.ReactNode;
	/**
	 * The sender of the message.
	 * 'user' messages appear on the right, 'bot' messages on the left.
	 */
	variant: "user" | "bot";
	/**
	 * Optional className for additional styling.
	 */
	className?: string;
}

/**
 * A reusable chat bubble component for bot and user interactions.
 */
export function ChatBubble({ children, variant, className }: ChatBubbleProps) {
	const isUser = variant === "user";

	return (
		<div className={cn("flex w-full mb-4 animate-in", isUser ? "justify-end" : "justify-start", className)}>
			<div className={cn("flex max-w-[92%] gap-2", isUser && "flex-row-reverse")}>
				{!isUser && (
					<div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center shrink-0 mt-1 text-teal shadow-sm border border-teal/20">
						<Bot size={18} />
					</div>
				)}
				
				<div 
					className={cn(
						"px-5 py-4 shadow-sm text-foreground",
						isUser 
							? "rounded-[1.5rem] rounded-br-[0.5rem] bg-teal text-white border border-teal-light/20" 
							: "glass-card border border-border/80 rounded-[1.5rem] rounded-bl-[0.5rem] backdrop-blur-3xl"
					)}
				>
					{typeof children === "string" ? (
						<p className="text-[15px] leading-relaxed">{children}</p>
					) : (
						children
					)}
				</div>
			</div>
		</div>
	);
}
