import { onMount } from 'svelte';
import type { Collection } from '../../../types/db/collections';
import { db, type TableRowMap } from './dexie-db';

export function getTable(tableName: Collection) {
	// Reactive store
	let isLoading = $state(false);

	// Strongly type `data` as the awaited return of .toArray()
	let rows = $state<any>([]);
	let data = $derived(rows);
	onMount(async () => {
		isLoading = true;
		rows = await db[tableName].toArray();
		isLoading = false;
		// rows will have the correct row type for that table.
	});

	return { data, isLoading };
}
