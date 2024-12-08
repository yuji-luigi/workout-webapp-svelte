<script lang="ts">
	import type { FormTableField } from '../../../../types/form/form-table-field';
	import type { Option } from '../../../../types/form/option';
	import InputGroupGrid from '../InputGroupGrid.svelte';
	import SelectInputSingle from './base/SelectInputSingle.svelte';
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
