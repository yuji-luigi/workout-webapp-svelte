<script lang="ts">
	import { lofi_db } from '../../../../../store/lofi-db/lofi_db.svelte';
	import DialogGeneric from '../../../../dialog/global/DialogGeneric.svelte';
	import Menu from '../../../../menu/Menu.svelte';
	let { isOpen = $bindable(false), addSet }: { isOpen: boolean; addSet: (data: any) => void } =
		$props();
	let { workout_set_types } = lofi_db.db_state;
</script>

<DialogGeneric maxWidth="sm" bind:isOpen>
	<h2 class="title">Choose set type</h2>
	<section class="choose-set-type-container">
		<Menu
			onclick={addSet}
			list={workout_set_types.map((type) => ({ title: type.name, value: type.id }))}
		/>
	</section>
</DialogGeneric>

<style>
	h2 {
		margin-block: var(--spacing-md);
	}
</style>
