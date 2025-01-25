<script lang="ts">
	let {
		data_set_key = '',
		cursor = 'pointer',
		children
	}: {
		data_set_key?: string | number;
		cursor?: string;
		children?: any;
	} = $props();
</script>

<div data-key={data_set_key} class="chip" style={`--cursor: ${cursor}`}>
	{@render children?.()}
</div>

<style>
	.chip {
		--cursor: pointer;
		display: flex;
		padding: var(--chip-padding);
		border-radius: var(--button-radius);
		background-color: var(--background-color, var(--color-primary));
		color: var(--text-color-white);
		cursor: var(--cursor);
	}
</style>
