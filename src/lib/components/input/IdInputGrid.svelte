<!--
@component InputGrid
- Is set id of the name from length of the yDB.

-->
<script lang="ts">
	import { onMount } from 'svelte';
	import type { Collection } from '../../../types/db/collections';
	import type { InputType } from '../../../types/input-type';
	import { lofi_db } from '../../store/lofi-db/lofi_db.svelte';
	import InputGroupGrid from './InputGroupGrid.svelte';
	import { sleep } from '../../helpers/sleep';

	let {
		label,
		name,
		type,
		className,
		collection,
		...other
	}: {
		label: string;
		collection: Collection;
		name: string;
		type: InputType | 'textarea' | null | undefined;
		className?: string;
		hidden?: boolean;
		value?: string | number;
	} = $props();

	let id = $state(0);
	let time = $state(0);

	$effect(() => {
		if (lofi_db.db_state_getter[collection]) {
			id = lofi_db.db_state_getter[collection]?.length + 1;
		}
	});
</script>

<InputGroupGrid {label} {className} {name} hidden={other.hidden}>
	{#snippet input()}
		<input {name} {type} bind:value={id} {...other} />
	{/snippet}
</InputGroupGrid>
