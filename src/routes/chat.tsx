import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import * as React from "react";
import { Badge, ChatBubble, ChatInput } from "@design-system";

export const Route = createFileRoute("/chat")({
	component: ChatPage,
});

const EPIX_LOGO_URL =
	"https://cdn.prod.website-files.com/6419776880f7ef69daff4b9c/64198230a00f8c0924918817_epix-colour-logo.svg";

function ChatBotResponse() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between border-b border-border/40 pb-2">
				<h4 className="font-headline font-bold text-sm uppercase tracking-wider text-rose">
					Health Advisory
				</h4>
				<Badge variant="outline" color="var(--rose)" className="opacity-80">Genomic Risk</Badge>
			</div>
			
			<div className="space-y-3">
				<p className="text-[16px] leading-relaxed font-semibold text-foreground">
					You have a very high genetic predisposition for <span className="text-rose">melanoma</span>.
				</p>
				
				<div className="grid grid-cols-1 gap-2">
					{[
						"Hydrate aggressively (4L+ daily)",
						"Seek shade between 11:00 - 16:00",
						"Apply SPF 50+ every 2 hours"
					].map((rec, i) => (
						<div key={i} className="flex items-center gap-2 text-[14px] text-muted-foreground">
							<div className="w-1.5 h-1.5 rounded-full bg-rose/40" />
							{rec}
						</div>
					))}
				</div>
			</div>

			<div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 flex gap-3 items-start mt-1">
				<div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 shrink-0">
					<AlertTriangle size={14} />
				</div>
				<p className="text-[12px] text-muted-foreground leading-relaxed">
					<span className="font-bold text-orange-500/80">Context:</span> High UV exposure detected for Mojave desert coordinates. Recommendations cross-referenced with your MC1R gene variants.
				</p>
			</div>
		</div>
	);
}

function ChatPage() {
	const [messages, setMessages] = React.useState<{ type: "bot" | "user"; content: React.ReactNode }[]>([
		{ type: "bot", content: "Hello! I am your genetic-aware travel assistant. Where are you travelling to today?" }
	]);
	const [input, setInput] = React.useState("I’m going to the Mojave Desert, what would you recommend, and I need to be careful about something.");
	const bottomRef = React.useRef<HTMLDivElement>(null);

	const scrollBottom = () => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	React.useEffect(() => {
		scrollBottom();
	}, [messages]);

	const onSend = () => {
		if (!input.trim()) return;
		
		setMessages(prev => [...prev, { type: "user", content: input }]);
		setInput("");
		
		setTimeout(() => {
			setMessages(prev => [...prev, { type: "bot", content: <ChatBotResponse /> }]);
		}, 600);
	};

	return (
		<main className="min-h-screen bg-background flex flex-col relative w-full mx-auto overflow-hidden text-foreground">
			{/* Header */}
			<div className="z-10 glass-card border-b border-border/40 px-4 pt-12 pb-4 shadow-sm flex justify-center w-full">
				<img src={EPIX_LOGO_URL} alt="Epix AI" className="h-7 w-auto" />
			</div>

			{/* Chat window */}
			<div className="flex-1 w-full px-4 py-6 overflow-y-auto pb-40">
				{messages.map((m, i) => (
					<ChatBubble key={i} variant={m.type}>
						{m.content}
					</ChatBubble>
				))}
				<div ref={bottomRef} className="h-4" />
			</div>

			<ChatInput 
				value={input} 
				onChange={setInput} 
				onSend={onSend} 
				placeholder="Ask about your trip..." 
			/>
		</main>
	);
}
