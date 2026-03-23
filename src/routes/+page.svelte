<script lang="ts">
	import RankingSection from '$lib/RankingSection.svelte';

	let { data } = $props();

	const asOfLabel = $derived(() => {
		const [year, month, day] = data.snapshot.asOf.split('-').map(Number);
		return new Date(year, month - 1, day).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});
</script>

<svelte:head>
	<title>{data.index.title} — {data.snapshot.label}</title>
	<meta name="description" content="{data.snapshot.subtitle} — {data.snapshot.label}." />
</svelte:head>

<div class="px-3 pb-16">
	<header class="border-b border-neutral-800 pb-10">
		<p class="text-xs font-semibold tracking-[0.22em] text-neutral-500 uppercase">
			{data.index.title}
		</p>
		<h1 class="mt-3 text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
			{data.snapshot.label}
		</h1>
		<p class="mt-3 text-sm text-neutral-400">
			{data.snapshot.subtitle} · <time datetime={data.snapshot.asOf}>{asOfLabel()}</time>
		</p>
		<p class="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400">
			{data.snapshot.summary}
		</p>

		{#if data.index.snapshots.length > 1}
			<nav class="mt-6 flex flex-wrap gap-2" aria-label="Snapshots">
				{#each data.index.snapshots as s (s.id)}
					<a
						href={s.id === data.index.defaultSnapshot ? '/' : `/?snapshot=${s.id}`}
						class="rounded-md border px-3 py-1.5 text-xs font-medium transition-colors {s.id ===
						data.activeSnapshotId
							? 'border-neutral-100 bg-neutral-100 text-neutral-900'
							: 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:border-neutral-600'}"
					>
						{s.label}
					</a>
				{/each}
			</nav>
		{/if}
	</header>

	<main class="space-y-16 pt-14">
		<RankingSection title="Models" entries={data.snapshot.models} />
		<RankingSection title="Harnesses" entries={data.snapshot.harnesses} />
		<RankingSection title="Subscriptions" entries={data.snapshot.subs} />
	</main>

	<footer class="mt-20 border-t border-neutral-800 pt-8 text-xs text-neutral-500">
		<p>Scores are editorial snapshots for this period, not live rankings.</p>
	</footer>
</div>
