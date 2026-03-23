import { error } from '@sveltejs/kit';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';
import type { RatingsIndex, RatingsSnapshot } from '$lib/ratings';

const dataDir = resolve('src/data');

function loadYaml<T>(filename: string): T {
	const raw = readFileSync(resolve(dataDir, filename), 'utf-8');
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
