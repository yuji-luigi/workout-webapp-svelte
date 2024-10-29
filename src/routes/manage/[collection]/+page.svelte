<script lang="ts">
	import { page } from '$app/stores';
	import * as tableDefs from '$lib/data/template-json/dataTable';
	import type { RouteParams } from './$types';

	import RoutineForm from '../../../lib/components/form/routine-form/RoutineForm.svelte';
	import {
		db_state,
		db_state_getter,
		type DBStateField
	} from '../../../lib/store/lofi-db/workout-lofi.svelte';
	import type { Collection } from '../../../types/db/collections';
	let loading = false;
	const collectionP = $page.params.collection as Collection;
	// TODO: type the page.params.collection
	let list = $state(db_state_getter[collectionP]);
	const tableDef = tableDefs[collectionP];
	$effect(() => {
		list = db_state_getter[collectionP];
	});
</script>

<RoutineForm />

<table>
	<tbody>
		<tr>
			{#each tableDef as row}
				<td>{row.label}</td>
			{/each}
		</tr>
		{#each list as item}
			<tr>
				{#each tableDef as row}
					<td>{(item as any)[row.name]}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		border: 1px solid var(--text-color);
		padding: 0.5em;
	}

	td {
		white-space: nowrap;
		padding: 0.5em;
	}
</style>
