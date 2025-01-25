<script>
	import { closeStackDialog } from '../../../../../../store/dialog-stack/dialogStackStore';
	import TimerInput from '../../../../../input/TimerInput.svelte';

	let { resolve } = $props();
	let time = $state(0);
</script>

<section class="dialog-contents">
	<h2>set the interval</h2>
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
