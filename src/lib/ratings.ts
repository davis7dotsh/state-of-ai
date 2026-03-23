export type RatingEntry = {
	id: string;
	name: string;
	description: string;
	logoId: string;
	tags?: string[];
	recommended?: boolean;
};

export const tagColors: Record<string, string> = {
	reasoning: 'text-blue-400/70 border-blue-400/20',
	analysis: 'text-blue-400/70 border-blue-400/20',
	research: 'text-blue-400/70 border-blue-400/20',
	planning: 'text-blue-400/70 border-blue-400/20',
	coding: 'text-emerald-400/70 border-emerald-400/20',
	editor: 'text-emerald-400/70 border-emerald-400/20',
	typescript: 'text-emerald-400/70 border-emerald-400/20',
	refactoring: 'text-emerald-400/70 border-emerald-400/20',
	fast: 'text-amber-400/70 border-amber-400/20',
	budget: 'text-amber-400/70 border-amber-400/20',
	lightweight: 'text-amber-400/70 border-amber-400/20',
	minimal: 'text-amber-400/70 border-amber-400/20',
	flagship: 'text-violet-400/70 border-violet-400/20',
	premium: 'text-violet-400/70 border-violet-400/20',
	agentic: 'text-rose-400/70 border-rose-400/20',
	terminal: 'text-rose-400/70 border-rose-400/20',
	multimodal: 'text-cyan-400/70 border-cyan-400/20',
	tooling: 'text-cyan-400/70 border-cyan-400/20',
	balanced: 'text-neutral-400/70 border-neutral-400/20',
	conversational: 'text-neutral-400/70 border-neutral-400/20',
	opinionated: 'text-neutral-400/70 border-neutral-400/20',
	teams: 'text-neutral-400/70 border-neutral-400/20',
	throughput: 'text-neutral-400/70 border-neutral-400/20'
};

export type RatingsSnapshot = {
	id: string;
	label: string;
	asOf: string;
	subtitle: string;
	summary: string;
	models: RatingEntry[];
	harnesses: RatingEntry[];
	subs: RatingEntry[];
};

export type RatingsIndex = {
	title: string;
	defaultSnapshot: string;
	snapshots: { id: string; label: string; file: string }[];
};
