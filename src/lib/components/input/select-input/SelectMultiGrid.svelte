<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Option } from '../../../../types/form/option';
	import InputGroupGrid from '../InputGroupGrid.svelte';
	import SelectInputMulti from './base/SelectInputMulti.svelte';
	import type { FormTableField } from '../../../../types/form/form-table-field';

	let {
		className,
		label,
		name,
		...other
	}: FormTableField & {
		name: string;
		label: string;
		className?: string;
		input: Snippet;
		loading: boolean;
	} = $props();
</script>

<InputGroupGrid {className} {label} {name}>
	{#snippet input()}
		<SelectInputMulti {name} {...other} />
	{/snippet}
</InputGroupGrid>
