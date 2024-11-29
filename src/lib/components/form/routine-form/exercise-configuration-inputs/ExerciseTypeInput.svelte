<script lang="ts">
	import SelectInputSingle from '../../../input/select-input/base/SelectInputSingle.svelte';
	import SelectSingleGrid from '../../../input/select-input/SelectSingleGrid.svelte';

	let {
		label,
		name
	}: {
		index: number;
		form_id: string;
		name: string;
		label: string;
	} = $props();

	let time = $state(1);
</script>

<div class="input-group">
	<div class="test">
		<SelectInputSingle
			borderFocus="none"
			{name}
			textAlign="end"
			collection="workout_type"
			label="Exercise"
		/>
	</div>
	<span> {label}</span>
</div>

<style>
	.input-group {
		display: grid;
		grid-column: 1/-1;
		grid-template-columns: subgrid;
		justify-content: end;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-md);
		justify-items: end;
		cursor: pointer;
	}
	.test {
		margin-left: auto;
	}
</style>
