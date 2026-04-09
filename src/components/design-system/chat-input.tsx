import { Send } from "lucide-react";
import * as React from "react";
import { cn } from "#/lib/utils";

interface ChatInputProps {
	/**
	 * The current message in the input field.
	 */
	value: string;
	/**
	 * Callback fired when the input value changes.
	 */
	onChange: (value: string) => void;
	/**
	 * Callback fired when the form is submitted.
	 */
	onSend: () => void;
	/**
	 * Placeholder text for the input.
	 */
	placeholder?: string;
	/**
	 * Optional className for the container.
	 */
	className?: string;
}

/**
 * A beautiful, glassmorphic chat input component.
 */
export function ChatInput({ 
	value, 
	onChange, 
	onSend, 
	placeholder = "Type a message...", 
	className 
}: ChatInputProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (value.trim()) {
			onSend();
		}
	};

	return (
		<div className={cn("fixed bottom-[85px] max-w-[390px] w-full mx-auto z-20 px-4 bg-gradient-to-t from-background via-background to-transparent pb-4 pt-10", className)}>
			<form 
				onSubmit={handleSubmit} 
				className="relative flex items-center bg-card/80 backdrop-blur-xl border border-border/60 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.05)] p-1.5 focus-within:ring-2 focus-within:ring-teal/50 transition-all duration-300"
			>
				<input
					className="flex-1 bg-transparent px-4 py-2.5 text-[15px] outline-none placeholder:text-muted-foreground w-full"
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				<button
					type="submit"
					className="bg-teal text-white p-2.5 rounded-full interactive-delight shadow-sm hover:opacity-90 disabled:opacity-50"
					disabled={!value.trim()}
				>
					<Send size={18} className="translate-x-0.5 translate-y-[0.5px]" />
				</button>
			</form>
		</div>
	);
}
