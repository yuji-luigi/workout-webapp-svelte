<!--
@component
- on click event for select input must be defined in parent element/component.
See 
@link src/lib/components/input/select-input/tile/SelectTiles.svelte for example.

-->

<script lang="ts">
	import type { Option } from '../../../../../types/form/option';

	let {
		data,
		name,
		selected
	}: {
		data: {
			label: string;
			value: string | number;
			image_url?: string;
		};
		name?: string;
		selected?: boolean;
	} = $props();
</script>

<div data-active={selected} data-id={data.value} class="card flex-column reactive-card">
	{#if name}
		<input {name} hidden type="checkbox" checked={selected} value={data.value} />
	{/if}
	<img src={data.image_url || 'https://picsum.photos/200'} alt={data.label} />
	<p>
		{data.label}
	</p>
</div>

<style>
	img {
		width: 75%;
		height: 75%;
		object-fit: cover;
	}
	.card {
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 0.75rem 0.5rem;
		cursor: pointer;
		&[data-active='true'] {
			border: 2px solid var(--color-primary);
		}
	}

	.flex-column {
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
	}
	p {
		text-align: center;
		font-size: 1rem;
	}
</style>
