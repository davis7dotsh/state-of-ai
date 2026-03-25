<script lang="ts">
	import { marked } from 'marked';
	import Logo from '$lib/Logo.svelte';
	import type { RatingEntry } from '$lib/ratings';
	import { tagColors } from '$lib/ratings';

	let { data } = $props();

	const asOfLabel = $derived.by(() => {
		const [year, month, day] = data.snapshot.asOf.split('-').map(Number);
		return new Date(year, month - 1, day).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});

	function md(src: string) {
		return marked.parse(src, { async: false }) as string;
	}

	const sections: { title: string; num: string; entries: RatingEntry[] }[] = $derived([
		{ title: 'Models', num: '01', entries: data.snapshot.models },
		{ title: 'Harnesses', num: '02', entries: data.snapshot.harnesses },
		{ title: 'Subscriptions', num: '03', entries: data.snapshot.subs }
	]);
</script>

<svelte:head>
	<title>{data.index.title} — {data.snapshot.label}</title>
	<meta name="description" content="{data.snapshot.subtitle} — {data.snapshot.label}." />
</svelte:head>

<div class="v2-root">
	<div class="v2-page">
		<header class="v2-header">
			<div class="v2-header-row">
				<span class="v2-label">Rankings</span>
				<span class="v2-date">{asOfLabel}</span>
			</div>
			<h1 class="v2-hero">State<br />of AI</h1>
			<div class="v2-meta">
				<p class="v2-by">
					by <a href="https://x.com/davis7" target="_blank" rel="noopener noreferrer">Ben Davis</a>
				</p>
				<p class="v2-note">
					DISCLAIMER — this is all just my opinion, based on my experiences and what i've used. it
					is impossible to try everything at the level of depth i would like to, so i've decided to
					simply focus this site on the tools that i am using the most everyday
				</p>
			</div>
		</header>

		{#each sections as section (section.title)}
			<section class="v2-section">
				<div class="v2-section-header">
					<span class="v2-section-num">{section.num}</span>
					<h2 class="v2-section-title">{section.title}</h2>
				</div>

				<div class="v2-grid">
					{#each section.entries as item, i (item.id)}
						<article class="v2-card" class:v2-card--rec={item.recommended}>
							<div class="v2-card-top">
								<span class="v2-card-rank">{String(i + 1).padStart(2, '0')}</span>
								<div class="v2-card-logo">
									<Logo logoId={item.logoId} />
								</div>
								<div class="v2-card-info">
									<h3 class="v2-card-name">
										<a href={item.url} target="_blank" rel="noopener noreferrer external"
											>{item.name}</a
										>
									</h3>
									{#if item.tags?.length}
										<div class="v2-card-tags">
											{#each item.tags as tag (tag)}
												<span class="v2-card-tag {tagColors[tag] ?? 'text-neutral-400/70 border-neutral-400/20'}">{tag}</span>
											{/each}
										</div>
									{/if}
								</div>
								{#if item.recommended}
									<span class="v2-rec-dot" title="Recommended"></span>
								{/if}
							</div>

							<div class="v2-card-body">
								<div class="v2-card-desc">
									{@html md(item.description)}
								</div>
								{#if item.pros?.length || item.cons?.length}
									<div class="v2-card-details">
										{#if item.pros?.length}
											<div>
												<span class="v2-detail-label">+</span>
												<ul class="v2-detail-list">
													{#each item.pros as line}<li>{line}</li>{/each}
												</ul>
											</div>
										{/if}
										{#if item.cons?.length}
											<div>
												<span class="v2-detail-label">&minus;</span>
												<ul class="v2-detail-list">
													{#each item.cons as line}<li>{line}</li>{/each}
												</ul>
											</div>
										{/if}
									</div>
								{/if}
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/each}

		<footer class="v2-footer">
			<p>Snapshot for this period, not a live ranking.</p>
			<a href="https://github.com/davis7dotsh/state-of-ai" target="_blank" rel="noopener noreferrer" class="v2-footer-link">GitHub</a>
		</footer>
	</div>
</div>

<style>
	@keyframes v2-rise {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.v2-root {
		min-height: 100vh;
		background: #0a0a0a;
		color: #e5e5e5;
		font-family: 'Geist', system-ui, sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	.v2-page {
		max-width: 800px;
		margin: 0 auto;
		padding: 4rem 1.5rem 6rem;
		animation: v2-rise 0.6s ease-out;
	}

	/* ── Header ── */
	.v2-header {
		margin-bottom: 5rem;
	}
	.v2-header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #333;
		padding-bottom: 0.75rem;
		margin-bottom: 2rem;
	}
	.v2-label {
		font-size: 0.65rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #666;
	}
	.v2-date {
		font-size: 0.65rem;
		color: #666;
	}
	.v2-hero {
		font-weight: 700;
		font-size: clamp(3rem, 10vw, 5.5rem);
		line-height: 0.92;
		letter-spacing: -0.04em;
		color: #fff;
	}
	.v2-meta {
		margin-top: 2rem;
		max-width: 420px;
	}
	.v2-by {
		font-size: 0.8rem;
		color: #aaa;
		font-style: italic;
	}
	.v2-by a {
		color: #e5e5e5;
		text-decoration: none;
		border-bottom: 1px solid #444;
		transition: border-color 0.2s;
	}
	.v2-by a:hover {
		border-color: #3b82f6;
	}
	.v2-note {
		margin-top: 0.75rem;
		font-size: 0.65rem;
		line-height: 1.7;
		color: #777;
	}

	/* ── Sections ── */
	.v2-section {
		margin-bottom: 4rem;
	}
	.v2-section-header {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		border-bottom: 1px solid #222;
		padding-bottom: 0.5rem;
		margin-bottom: 1.25rem;
	}
	.v2-section-num {
		font-size: 0.65rem;
		color: #3b82f6;
		font-weight: 500;
	}
	.v2-section-title {
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #999;
	}

	/* ── Card grid ── */
	.v2-grid {
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	.v2-card {
		padding: 1.25rem 0;
		border-bottom: 1px solid #1a1a1a;
	}
	.v2-card:last-child {
		border-bottom: none;
	}

	/* recommended green left line */
	.v2-card--rec {
		border-left: 2px solid #34d399;
		padding-left: 1rem;
	}

	.v2-card-top {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.v2-card-rank {
		font-size: 0.65rem;
		color: #444;
		width: 1.5rem;
		text-align: right;
		flex-shrink: 0;
	}
	.v2-card-logo {
		flex-shrink: 0;
	}
	.v2-card-info {
		flex: 1;
		min-width: 0;
	}
	.v2-card-name {
		font-size: 0.95rem;
		font-weight: 500;
		letter-spacing: -0.01em;
	}
	.v2-card-name a {
		color: #f5f5f5;
		text-decoration: none;
		transition: color 0.15s;
	}
	.v2-card-name a:hover {
		color: #3b82f6;
	}
	.v2-card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-top: 0.3rem;
	}
	.v2-card-tag {
		font-size: 0.55rem;
		letter-spacing: 0.05em;
		padding: 0.1rem 0.4rem;
		border-radius: 2px;
	}
	.v2-rec-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 8px #34d39960;
		flex-shrink: 0;
	}

	/* body */
	.v2-card-body {
		margin-left: calc(1.5rem + 0.75rem + 44px + 0.75rem);
		margin-top: 0.5rem;
	}
	.v2-card-desc {
		font-size: 0.82rem;
		line-height: 1.7;
		color: #aaa;
	}
	.v2-card-desc :global(p) {
		margin: 0.3rem 0;
	}
	.v2-card-desc :global(a) {
		color: #3b82f6;
		text-decoration: underline;
		text-decoration-color: #3b82f630;
		text-underline-offset: 2px;
	}
	.v2-card-desc :global(strong) {
		color: #e5e5e5;
		font-weight: 600;
	}
	.v2-card-desc :global(ul),
	.v2-card-desc :global(ol) {
		margin: 0.3rem 0;
		padding-left: 1rem;
	}
	.v2-card-desc :global(li) {
		margin: 0.15rem 0;
	}

	.v2-card-details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.6rem;
	}
	.v2-detail-label {
		font-size: 0.7rem;
		font-weight: 500;
		color: #777;
		display: block;
		margin-bottom: 0.25rem;
	}
	.v2-detail-list {
		list-style: none;
		padding: 0;
		font-size: 0.75rem;
		line-height: 1.6;
		color: #999;
	}
	.v2-detail-list li::before {
		content: '—';
		margin-right: 0.4rem;
		color: #555;
	}

	/* footer */
	.v2-footer {
		margin-top: 5rem;
		font-size: 0.6rem;
		color: #666;
		text-align: center;
		letter-spacing: 0.08em;
	}
	.v2-footer-link {
		color: #666;
		text-decoration: none;
		border-bottom: 1px solid #333;
		transition: border-color 0.2s, color 0.2s;
		margin-top: 0.4rem;
		display: inline-block;
	}
	.v2-footer-link:hover {
		color: #aaa;
		border-color: #666;
	}

	/* mobile */
	@media (max-width: 639px) {
		.v2-card-body {
			margin-left: 0;
			margin-top: 0.75rem;
		}
	}
</style>
