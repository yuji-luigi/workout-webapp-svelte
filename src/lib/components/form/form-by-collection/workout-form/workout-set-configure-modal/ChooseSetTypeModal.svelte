<script lang="ts">
	import { db } from '../../../../../db/dexie-db/dexie-db';
	import { getTable } from '../../../../../db/dexie-db/getDexieDb.svelte';
	import { RoutineBlockType } from '../../../../../db/dexie-db/RoutineBlockType';
	import DialogGeneric from '../../../../dialog/global/DialogGeneric.svelte';
	import Menu from '../../../../menu/Menu.svelte';
	import FetcherComponent from '../../../../util-component/FetcherComponent.svelte';
	import { fetcherResults } from '../../../../util-component/fetcherData';
	let { isOpen = $bindable(false), addSet }: { isOpen: boolean; addSet: (data: any) => void } =
		$props();
	let results = $state(fetcherResults);
</script>

<FetcherComponent bind:results fetcher={RoutineBlockType.getAll} />
<DialogGeneric maxWidth="sm" bind:isOpen>
	<h2 class="title">Choose set type</h2>
	<section class="choose-set-type-container">
		<Menu onclick={addSet} list={results.data} />
	</section>
</DialogGeneric>

<style>
	h2 {
		margin-block: var(--spacing-md);
	}
</style>
