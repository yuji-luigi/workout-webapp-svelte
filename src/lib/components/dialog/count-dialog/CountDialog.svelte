<script lang="ts">
	import TimeCounter from '../../time-counter/TimeCounter.svelte';
	import DialogGeneric from '../global/DialogGeneric.svelte';
	import { createDialogStates } from './count-dialog-states.svelte';

	let {
		isOpen = $bindable()
	}: {
		isOpen: boolean;
	} = $props();
	let states = $state(createDialogStates().states);
	let content = $state(createDialogStates().content);
</script>

<!-- 
TODO: 
create a dialog component uses store.
bind always "count" variable to che child component.
child component is fully customizable. but alway use "count" bindable.
  -->
<DialogGeneric bind:isOpen>
	<!-- specific contents here -->
	{@render states.content?.({})}
	{states.test}
	<button
		type="button"
		onclick={() => {
			states.content = TimeCounter;
			states.test = 'jjj';
		}}>click me</button
	>
	<!-- <TimeCounter /> -->
	<!-- specific contents end -->
	<!-- specific actions here -->
	<!-- {@render createDialogStates.actions?.()} -->
	<!-- specific actions end -->
</DialogGeneric>
