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
		label,
		name,
		className,
		options: _options,
		input,
		collection,
		...others
	}: {
		className?: string;
		options?: Option[];
		input?: any;
	} & Omit<FormTableField, 'type'> = $props();
	let options = $state(_options);
	let loading = $state(true);
	onMount(() => {
		if (collection) {
			options = db_state_getter[collection as Collection].map((data) => {
				return {
					// value: workout.id,
					id: data.id,
					value: JSON.stringify(data),
					label: data.name
				};
			});
		}
		loading = false;
	});
</script>

<InputGroupGrid {className} {label} {...others}>
	{#snippet input()}
		<SelectInputSingle {options} {name} {loading} {...others} />
	{/snippet}
</InputGroupGrid>
