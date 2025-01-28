<script lang="ts">
	import { getContext } from 'svelte';
	import SetConfigureSection from './SetConfigureSection.svelte';
	import DialogGeneric from '../../../../dialog/global/DialogGeneric.svelte';

	let isOpen = $state(false);
	let { name }: { name: string } = $props();

	async function openConfig() {
		isOpen = true;
	}
</script>

<div class="full-width flex-row">
	<button onclick={openConfig} type="button" class="button primary">configure sets</button>
</div>
<DialogGeneric fullScreen bind:isOpen>
	<SetConfigureSection {name} />
</DialogGeneric>

<style>
	button {
		margin-left: auto;
	}
</style>
