<script lang="ts">
	import { RoutineBlockType } from '../../../../../db/dexie-db/orm/RoutineBlockTypeDexie';
	import AnimatedDialog from '../../../../dialog/global/AnimatedDialog.svelte';
	import Menu from '../../../../menu/Menu.svelte';
	import FetcherComponent from '../../../../util-component/FetcherComponent.svelte';
	import { fetcherResults } from '../../../../util-component/fetcherData';
	let {
		isOpen = $bindable(false),
		addSet
	}: {
		isOpen: boolean;
		addSet: (data: any) => void;
	} = $props();
	let results = $state(fetcherResults);
	console.log();
</script>

<FetcherComponent bind:results fetcher={RoutineBlockType.getAll} />
<AnimatedDialog maxWidth="md" bind:isOpen>
	<h2 class="title">Choose set type</h2>
	<section class="choose-set-type-container">
		<Menu onclick={addSet} list={results.data} />
	</section>
</AnimatedDialog>

<style>
	h2 {
		margin-block: var(--spacing-md);
	}
</style>
