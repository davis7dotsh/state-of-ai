<script lang="ts">
	import { marked } from 'marked';
	import Logo from './Logo.svelte';
	import type { RatingEntry } from './ratings';
	import { tagColors } from './ratings';

	let {
		title,
		entries
	}: {
		title: string;
		entries: RatingEntry[];
	} = $props();

	function getTagClasses(tag: string) {
		return tagColors[tag] ?? 'text-neutral-400/70 border-neutral-400/20';
	}

	function renderMarkdown(src: string) {
		return marked.parse(src, { async: false }) as string;
	}
</script>

<section>
	<h2 class="mb-6 text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
		{title}
	</h2>
	<ul class="divide-y divide-neutral-800/80">
		{#each entries as item, index (item.id)}
			<li class="flex items-start gap-4 py-5 first:pt-0">
				<span
					class="w-5 shrink-0 pt-3 text-right font-mono text-xs text-neutral-500 tabular-nums"
					aria-label={`Rank ${index + 1}`}
				>
					{index + 1}
				</span>
				<Logo logoId={item.logoId} />
				<div class="min-w-0 flex-1">
					<div>
						<h3 class="text-base font-medium tracking-tight text-neutral-100">
							{item.name}
						</h3>
					</div>
					{#if item.tags?.length}
						<div class="mt-1.5 flex flex-wrap gap-1.5">
							{#each item.tags as tag}
								<span
									class="rounded-full border px-2 py-0.5 font-mono text-[10px] leading-tight {getTagClasses(
										tag
									)}"
								>
									{tag}
								</span>
							{/each}
						</div>
					{/if}
					<div class="rating-prose mt-1.5 max-w-prose text-sm leading-relaxed text-neutral-400">
						{@html renderMarkdown(item.description)}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</section>
