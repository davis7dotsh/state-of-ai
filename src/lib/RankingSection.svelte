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
	<ul class="space-y-1">
		{#each entries as item, index (item.id)}
			<li class="flex items-start gap-4 px-3 py-4">
				<span
					class="w-5 shrink-0 pt-3 text-right font-mono text-xs text-neutral-500 tabular-nums"
					aria-label={`Rank ${index + 1}`}
				>
					{index + 1}
				</span>
				<Logo
					logoId={item.logoId}
					class={item.recommended
						? 'border-emerald-500/30 shadow-[0_0_16px_2px_rgba(52,211,153,0.25)]'
						: ''}
				/>
				<div class="min-w-0 flex-1">
					<h3 class="text-base font-medium tracking-tight text-neutral-100">
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer external"
							class="text-inherit no-underline decoration-neutral-500/60 underline-offset-[5px] transition-[text-decoration-color] hover:underline"
						>
							{item.name}
						</a>
					</h3>
					{#if item.tags?.length}
						<div class="mt-1.5 flex flex-wrap gap-1.5">
							{#each item.tags as tag (tag)}
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
						<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted: server-loaded YAML -->
						{@html renderMarkdown(item.description)}
					</div>
					{#if item.pros?.length || item.cons?.length}
						<div class="mt-3 max-w-prose space-y-3">
							{#if item.pros?.length}
								<div>
									<h4
										class="text-[10px] font-semibold tracking-[0.18em] text-neutral-500 uppercase"
									>
										Pros
									</h4>
									<ul
										class="mt-1.5 list-disc space-y-0.5 pl-4 text-sm leading-relaxed text-neutral-400"
									>
										{#each item.pros as line, i (`${item.id}-pro-${i}`)}
											<li>{line}</li>
										{/each}
									</ul>
								</div>
							{/if}
							{#if item.cons?.length}
								<div>
									<h4
										class="text-[10px] font-semibold tracking-[0.18em] text-neutral-500 uppercase"
									>
										Cons
									</h4>
									<ul
										class="mt-1.5 list-disc space-y-0.5 pl-4 text-sm leading-relaxed text-neutral-400"
									>
										{#each item.cons as line, i (`${item.id}-con-${i}`)}
											<li>{line}</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</section>
