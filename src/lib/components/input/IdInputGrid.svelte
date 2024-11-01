<!--
@component InputGrid
- Is set id of the name from length of the yDB.

-->
<script lang="ts">
	import { onMount } from 'svelte';
	import type { Collection } from '../../../types/db/collections';
	import type { InputType } from '../../../types/input-type';
	import { db_state, db_state_getter } from '../../store/lofi-db/workout-lofi.svelte';
	import InputGroupGrid from './InputGroupGrid.svelte';

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
	console.log(collection);
	let id = $state(db_state_getter[collection]?.length + 1);
	onMount(() => {
		id = db_state_getter[collection]?.length + 1;
		console.log(collection);
		console.log(db_state_getter[collection]);
	});
</script>

<InputGroupGrid {label} {className} hidden={other.hidden}>
	{#snippet input()}
		<input {name} value={id} {type} {...other} />
	{/snippet}
</InputGroupGrid>
