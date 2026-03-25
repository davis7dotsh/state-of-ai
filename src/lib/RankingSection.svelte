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
	<ul class="divide-y divide-neutral-800/50">
		{#each entries as item, index (item.id)}
			<li class="px-1 py-4 sm:flex sm:flex-nowrap sm:items-start sm:gap-4 sm:px-3">
				<!-- Mobile: rank + logo + title/tags in a row; Desktop: rank + logo column -->
				<div class="flex shrink-0 items-center gap-3 sm:items-start sm:gap-4">
					<span
						class="w-5 shrink-0 pt-0 text-right font-mono text-xs text-neutral-500 tabular-nums sm:pt-3"
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
					<!-- Mobile-only: title + tags next to logo -->
					<div class="min-w-0 sm:hidden">
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
					</div>
				</div>
				<!-- Mobile: description + pros/cons full width below; Desktop: everything -->
				<div class="mt-2.5 min-w-0 sm:mt-0 sm:flex-1">
					<!-- Desktop-only: title + tags -->
					<div class="hidden sm:block">
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
					</div>
					<div class="rating-prose max-w-prose text-sm leading-relaxed text-neutral-400 sm:mt-1.5">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted: server-loaded YAML -->
						{@html renderMarkdown(item.description)}
					</div>
					{#if item.pros?.length || item.cons?.length}
						<div class="mt-2.5 max-w-prose space-y-2.5 sm:mt-3 sm:space-y-3">
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
