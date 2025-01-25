<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Routine, RoutineJoined } from '../../../../types/db/routine';
	import { closeDialog } from '../../../store/global-dialog-store.svelte';
	import SetCard from '../../card/cards/SetCard.svelte';

	let props: { routine: RoutineJoined } = $props();
	console.log(props);
	const { routine } = props;
	function handlePush() {
		// push the routine to the workout list
		goto(`/routine/${routine.id}/start-timer`);
		closeDialog();
	}
</script>

<div class="contents routine-confirm-dialog">
	<img src={''} alt="" height="300px" />
	<h2>{routine?.name}</h2>
	{#each routine?.blocks as set, index}
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

	.contents {
		display: grid;
		gap: var(--gap);
		height: 100%;
	}

	.counter-section {
		display: grid;
		place-content: center;
		gap: var(--gap);
	}
	.flex-row {
		gap: var(--gap);
	}
	.actions {
		margin-top: 1rem;
	}
	.button {
		width: 100%;
	}
</style>
