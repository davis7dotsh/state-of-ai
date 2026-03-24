import { error } from '@sveltejs/kit';
import { parse } from 'yaml';
import type { RatingsIndex, RatingsSnapshot } from '$lib/ratings';

const yamlFiles = import.meta.glob('../data/*.yaml', {
	eager: true,
	import: 'default',
	query: '?raw'
}) as Record<string, string>;

function loadYaml<T>(filename: string): T {
	const raw = yamlFiles[`../data/${filename}`];

	if (!raw) {
		throw error(500, `Missing bundled data file: ${filename}`);
	}

	return parse(raw) as T;
}

export function load({ url }) {
	const index = loadYaml<RatingsIndex>('index.yaml');

	const requested = url.searchParams.get('snapshot') ?? index.defaultSnapshot;
	const meta = index.snapshots.find((s) => s.id === requested);
	if (!meta) error(404, 'Snapshot not found');

	const snapshot = loadYaml<RatingsSnapshot>(meta.file);

	return {
		index,
		snapshot,
		activeSnapshotId: meta.id
	};
}
