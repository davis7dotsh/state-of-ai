import { loadSnapshotData } from '$lib/loadSnapshot';

export function load({ url }) {
	return loadSnapshotData(url);
}
