<script lang="ts">
	import { formatTime } from '$lib/helpers/formatTime';
	import SetTimeInput from './SetTimeInput.svelte';
	let {
		label,
		...props
	}: {
		index: number;
		form_id: string;
		name: string;
		label: string;
	} = $props();

	let time = $state(1);
	let display = $state('none');
	$effect(() => {
		display = formatTime(time);
	});
</script>

<div class="input-group">
	<SetTimeInput {...props} />
	<span>{label}</span>
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
		margin: var(--margin, 0);
	}
	input {
		width: 3rem;
		text-align: center;
		border: none;
	}
	span {
		margin-right: auto;
	}
</style>
