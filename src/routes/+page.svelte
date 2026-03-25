<script lang="ts">
	import { resolve } from '$app/paths';
	import RankingSection from '$lib/RankingSection.svelte';

	let { data } = $props();

	const asOfLabel = $derived.by(() => {
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
	<header class="pb-6">
		<h1 class="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
			{asOfLabel}
		</h1>
		<p class="mt-3 text-sm text-neutral-400 italic">
			according to <a
				href="https://x.com/davis7"
				class="text-neutral-200 underline decoration-neutral-600 underline-offset-2 transition-colors hover:decoration-neutral-400"
				target="_blank">Ben Davis</a
			>
		</p>
		<p class="mt-3 max-w-2xl text-xs leading-relaxed text-neutral-500">
			<strong class="font-semibold text-neutral-400">DISCLAIMER:</strong> this is all just my opinion,
			based on my experiences and what i've used. it is impossible to try everything at the level of depth
			i would like to, so i've decided to simply focus this site on the tools that i am using the most
			everyday
		</p>

		{#if data.index.snapshots.length > 1}
			<nav class="mt-6 flex flex-wrap gap-2" aria-label="Snapshots">
				{#each data.index.snapshots as s (s.id)}
					<a
						href={resolve(
							s.id === data.index.defaultSnapshot ? '/' : `/?snapshot=${encodeURIComponent(s.id)}`
						)}
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

	<main class="space-y-16 pt-8">
		<RankingSection title="Models" entries={data.snapshot.models} />
		<RankingSection title="Harnesses" entries={data.snapshot.harnesses} />
		<RankingSection title="Subscriptions" entries={data.snapshot.subs} />
	</main>

	<footer class="mt-20 border-t border-neutral-800 pt-8 text-xs text-neutral-500">
		<p>Snapshot for this period, not a live ranking.</p>
	</footer>
</div>
