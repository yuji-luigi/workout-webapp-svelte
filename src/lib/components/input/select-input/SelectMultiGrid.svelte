<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Option } from '../../../../types/form/option';
	import InputGroupGrid from '../InputGroupGrid.svelte';
	import SelectInputMulti from './base/SelectInputMulti.svelte';

	let {
		className,
		label,
		name
	}: {
		name: string;
		label: string;
		options: Option[];
		className?: string;
		input: Snippet;
		loading: boolean;
	} = $props();
</script>

<InputGroupGrid {className} {label} {name}>
	{#snippet input()}
		<SelectInputMulti {name} options={[]} />
	{/snippet}
</InputGroupGrid>
