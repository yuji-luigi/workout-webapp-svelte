<script lang="ts">
	import { page } from '$app/stores';
	import * as AllFormTableFields from '$lib/data/template-json/dataTable';

	import * as formByCollection from '$lib/components/form/form-by-collection';
	import DataTable from '../../../lib/components/data-table/DataTable.svelte';
	import JsonForm from '../../../lib/components/form/JsonForm.svelte';
	import { db_state_getter } from '../../../lib/store/lofi-db/workout-lofi.svelte';
	import type { Collection } from '../../../types/db/collections';
	let loading = false;
	let collectionP = $state($page.params.collection) as Collection;
	let FormByCollection = $state(formByCollection[collectionP] || JsonForm);
	// TODO: type the page.params.collection
	let list = $state(db_state_getter[collectionP]);
	const formTableFields = AllFormTableFields[collectionP];
	$effect(() => {
		collectionP = $page.params.collection as Collection;
		list = db_state_getter[collectionP];
		FormByCollection = formByCollection[collectionP] || JsonForm;
	});
	/** form-by-collection/index.ts */
</script>

<FormByCollection />
<DataTable {list} {formTableFields} />
