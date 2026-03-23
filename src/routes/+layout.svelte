<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="relative min-h-screen w-full bg-neutral-950 text-neutral-50">
	<div
		class="fixed inset-0 h-full w-full bg-[url('/grid.svg')] mask-[linear-gradient(to_bottom,white_0%,white_75%,transparent_100%)]"
	></div>

	<div class="relative z-10 flex h-full w-full justify-center overflow-auto p-4 sm:p-8">
		<div class="animate-fade-in-up w-full max-w-3xl">
			{@render children()}
		</div>
	</div>
</div>
