<script lang="ts">
	export let data_set_key: string = '';
</script>

<div data-key={data_set_key} class="chip">
	<slot />
</div>

<style>
	.chip {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: var(--button-radius);
		background-color: var(--color-primary);
		color: var(--color-white);
	}
</style>
