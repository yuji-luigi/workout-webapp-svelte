<script lang="ts">
	import { onMount } from 'svelte';
	import type { FormTableField } from '../../../../types/form/form-table-field';
	import type { Option } from '../../../../types/form/option';
	import type { InputType } from '../../../../types/input-type';
	import InputGroupGrid from '../InputGroupGrid.svelte';
	import SelectInputSingle from './base/SelectInputSingle.svelte';
	import type { Collection } from '../../../../types/db/collections';
	import { db_state, db_state_getter } from '../../../store/lofi-db/workout-lofi.svelte';
	('');
	let {
		name,
		className,
		options,
		input,
		placeholder,
		...others
	}: {
		className?: string;
		options?: Option[];
		input?: any;
	} & Omit<FormTableField, 'type'> = $props();
</script>

<InputGroupGrid {className} {name} {...others}>
	{#snippet input()}
		<SelectInputSingle {placeholder} {options} {name} {...others} />
	{/snippet}
</InputGroupGrid>
