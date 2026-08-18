<!--
@component InputGrid
- Input component. that should be inside of a grid layout with container-type: inline.
-->
<script lang="ts">
	import type { InputType } from '../../../types/input-type';
	import { getFormIdCtx } from '../../store/form/form-context';
	import { getForm } from '../../store/form/form-store.svelte';
	import InputGroupGrid from './InputGroupGrid.svelte';

	let {
		label,
		name,
		type,
		className,
		value,
		...other
	}: {
		label: string;
		name: string;
		type: InputType | 'textarea' | null | undefined;
		className?: string;
		hidden?: boolean;
		value?: string | number;
	} = $props();
	const form = getForm(getFormIdCtx());
	let defaultValue = $state(form?.[name] || value);
</script>

<InputGroupGrid {name} {label} {className} hidden={other.hidden}>
	{#snippet input()}
		<input {name} {type} bind:value={defaultValue} {...other} />
	{/snippet}
</InputGroupGrid>
