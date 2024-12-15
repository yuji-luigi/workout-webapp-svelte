<script lang="ts">
	import SelectInputSingle from './SelectInputSingle.svelte';
	let props = $props();
	let selectedOption = $state<null | any>(null);
</script>

<div class="menu-select-container">
	<SelectInputSingle {...props} --opacity="0" --position="absolute" />
</div>

<style>
	.menu-select-container {
		position: relative;
		width: 100%;
	}
</style>
