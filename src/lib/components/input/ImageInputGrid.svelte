<!--
@component InputGrid
- Input component. that should be inside of a grid layout with container-type: inline.
-->
<script lang="ts">
	import type { InputType } from '../../../types/input-type';
	import InputGroupGrid from './InputGroupGrid.svelte';

	let {
		label,
		name,
		type,
		className,
		...other
	}: {
		label: string;
		name: string;
		type: InputType | 'textarea' | null | undefined;
		className?: string;
		hidden?: boolean;
		value?: string | number;
	} = $props();
</script>

<InputGroupGrid {label} {className} hidden={other.hidden}>
	{#snippet input()}
		<input {name} type="file" accept="images/*" {...other} />
	{/snippet}
</InputGroupGrid>
