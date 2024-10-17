<!--
@component InputGrid
- Input component. that should be inside of a grid layout with container-type: inline.
-->
<script lang="ts">
	import type { InputType } from '../../../types/input-type';
	import InputGroupGrid from './InputGroupGrid.svelte';
	export let label: string;
	export let name: string;
	export let type: InputType | 'textarea' | null | undefined = 'text';
	export let className: string = '';
</script>

<InputGroupGrid {label} {className}>
	<input slot="input" {name} {type} />
</InputGroupGrid>
