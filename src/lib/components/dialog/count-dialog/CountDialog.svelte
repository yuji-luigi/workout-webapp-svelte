<script lang="ts">
	import TimeCounter from '../../time-counter/TimeCounter.svelte';
	import DialogGeneric from '../global/DialogGeneric.svelte';
	import { countDialogStates } from './count-dialog-states.svelte';

	let {
		isOpen = $bindable()
	}: {
		isOpen: boolean;
	} = $props();
</script>

<!-- 
TODO: 
create a dialog component uses store.
bind always "count" variable to che child component.
child component is fully customizable. but alway use "count" bindable.
  -->
<DialogGeneric bind:isOpen>
	<!-- specific contents here -->
	{@render countDialogStates.content?.({ count: 0 })}
	<!-- specific contents end -->
	<!-- specific actions here -->
	<!-- {@render countDialogStates.actions?.()} -->
	<!-- specific actions end -->
</DialogGeneric>
