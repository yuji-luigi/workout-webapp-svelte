<script lang="ts">
	let { children, ...props }: any = $props();
</script>

<button type="button" class="primary button" {...props}>
	{@render children?.()}
</button>

<style>
	button {
		font-weight: 700;
		text-transform: uppercase;
	}
</style>
