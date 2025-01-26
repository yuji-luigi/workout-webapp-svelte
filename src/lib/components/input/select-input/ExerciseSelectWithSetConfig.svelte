<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { FormTableField } from '../../../../types/form/form-table-field';
	import SetConfigureSection from '../../form/form-by-collection/workout-form/workout-set-configure-modal/SetConfigureSection.svelte';

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

<section class="set-config-section-container">
	<SetConfigureSection {name} />
</section>

<style>
	.set-config-section-container {
		grid-column: 1 / -1;
	}
</style>
