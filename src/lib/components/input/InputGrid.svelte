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

<InputGroupGrid {label}>
	<input slot="input" {name} {type} />
</InputGroupGrid>

<style>
	.input-group {
		display: grid;
		grid-column: span 2;
		gap: 0.5rem;
		grid-template-columns: subgrid;
		grid-auto-flow: dense;
		align-items: baseline;
		justify-items: end;
		@container (max-width: 600px) {
			&.input-group {
				display: none;
				gap: 0.25rem;
				justify-items: start;
				grid-column: 1/-1;
			}
		}
	}
</style>
