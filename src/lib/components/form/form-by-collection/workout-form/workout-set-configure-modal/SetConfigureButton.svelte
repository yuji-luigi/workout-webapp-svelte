<script lang="ts">
	import { getContext } from 'svelte';
	import SetConfigureSection from './SetConfigureSection.svelte';
	import AnimatedDialog from '../../../../dialog/global/AnimatedDialog.svelte';

	let isOpen = $state(false);
	let { name }: { name: string } = $props();

	async function openConfig() {
		isOpen = true;
	}
</script>

<div class="full-width flex-row">
	<button onclick={openConfig} type="button" class="button primary">configure sets</button>
</div>
<AnimatedDialog fullScreen bind:isOpen>
	<SetConfigureSection {name} />
</AnimatedDialog>

<style>
	button {
		margin-left: auto;
	}
</style>
