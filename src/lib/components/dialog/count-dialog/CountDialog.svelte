<script lang="ts">
	import type { Snippet } from 'svelte';
	import DialogGeneric from '../global/DialogGeneric.svelte';
	import { counterDialogStates } from './count-dialog-states.svelte';
	let data = counterDialogStates.data || { noData: true };
</script>

<DialogGeneric bind:isOpen={counterDialogStates.isOpen}>
	{JSON.stringify(data)}
	{@render counterDialogStates.content?.()}
</DialogGeneric>
