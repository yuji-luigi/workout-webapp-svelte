<script>
	import { closeStackDialog } from '../../../../../store/dialog-stack/dialogStackStore';
	import TimerInput from '../../../../input/TimerInput.svelte';

	let { resolve } = $props();
	let time = $state(0);
</script>

<section class="dialog-container">
	<h2>set the timer</h2>
	<TimerInput bind:time />
	<button
		class="button primary"
		onclick={() => {
			resolve(time);
			closeStackDialog();
		}}
	>
		Confirm
	</button>
</section>

<style>
	section {
		display: flex;
		place-items: center;
		place-content: center;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.55rem;
	}
</style>
