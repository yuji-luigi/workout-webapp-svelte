<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Routine, RoutineJoined } from '../../../../types/db/routine';
	import { closeDialog } from '../../../store/global-dialog-store';
	import SetCard from '../../card/cards/SetCard.svelte';

	let { routine }: { routine: RoutineJoined } = $props();

	function handlePush() {
		// push the routine to the workout list
		goto(`/routine/${routine.id}/start-timer`);
		closeDialog();
	}
</script>

<div class="contents routine-confirm-dialog">
	<img src={''} alt="" height="300px" />
	<h2>{routine?.name}</h2>
	{#each routine.blocks as set, index}
		<SetCard {set} {index} />
	{/each}
	<div class="counter-section">
		<h4>{routine?.description}</h4>
	</div>

	<div class="actions flex-row sm-column">
		<button class="button" onclick={closeDialog}>Back</button>
		<button onclick={handlePush} class="button">Confirm</button>
	</div>
</div>

<style>
	:root {
		--gap: 0.5rem;
	}
	.routine-confirm-dialog {
	}
	.contents {
		display: grid;

		gap: var(--gap);
	}

	.counter-section {
		display: grid;
		place-content: center;
		gap: var(--gap);
	}
	.flex-row {
		gap: var(--gap);
	}
	.counter {
		display: grid;
		place-self: center;
		place-items: center;
		grid-template-columns: repeat(3, 1fr);
		& button {
			--size: 2rem;
			padding: 0;
			width: var(--size);
			height: var(--size);
			font-size: var(--font-size-lg);
			border-radius: 900px;
			color: var(--text-color-black);
		}
	}
	.actions {
		margin-top: 1rem;
	}
	.button {
		width: 100%;
	}
</style>
