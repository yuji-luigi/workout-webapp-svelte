<script>
	import { closeStackDialog } from '../../../../../store/dialog-stack/dialogStackStore';
	import TimerInput from '../../../../input/TimerInput.svelte';
</script>

<section class="dialog-container">
	<h2>set the timer</h2>
	<TimerInput />
	<button
		class="button primary"
		onclick={() => {
			closeStackDialog();
		}}
	>
		close
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
