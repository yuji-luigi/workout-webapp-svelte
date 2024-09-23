<script lang="ts">
	export let title: string | undefined = undefined;
	export let content: string | undefined = undefined;
</script>

<div>
	<slot />
</div>

<style>
	div {
		max-width: 20rem;
		/* word-break: break-word; */
		/* hyphens: auto; */
	}
</style>
