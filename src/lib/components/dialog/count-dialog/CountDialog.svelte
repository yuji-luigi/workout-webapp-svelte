<script lang="ts">
	import TimeCounter from '../../time-counter/TimeCounter.svelte';
	import DialogGeneric from '../global/DialogGeneric.svelte';
	import { countDialogStates } from './count-dialog-states.svelte';

	let {
		isOpen = $bindable()
	}: {
		isOpen: boolean;
	} = $props();
	let states = $state(countDialogStates().states);
	let content = $state(countDialogStates().content);
</script>

<!-- 
TODO: 
create a dialog component uses store.
bind always "count" variable to che child component.
child component is fully customizable. but alway use "count" bindable.
  -->
<DialogGeneric bind:isOpen>
	<!-- specific contents here -->
	{@render states.content?.()}
	{states.test}
	<!-- <TimeCounter /> -->
	<!-- specific contents end -->
	<!-- specific actions here -->
	<!-- {@render countDialogStates.actions?.()} -->
	<!-- specific actions end -->
</DialogGeneric>
