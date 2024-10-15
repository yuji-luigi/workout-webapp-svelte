<script lang="ts">
	export let data_set_key: string = '';
	export let cursor: string = 'pointer';
</script>

<div data-key={data_set_key} class="chip" style={`--cursor: ${cursor}`}>
	<slot />
</div>

<style>
	.chip {
		--cursor: pointer;
		display: inline-block;
		padding: var(--chip-padding);
		border-radius: var(--button-radius);
		background-color: var(--color-primary);
		color: var(--color-white);
		cursor: var(--cursor);
	}
</style>
