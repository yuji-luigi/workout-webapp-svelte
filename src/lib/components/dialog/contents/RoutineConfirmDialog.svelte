<script lang="ts">
	import { goto } from '$app/navigation';
	import type { RoutineJoined } from '../../../../types/db/routine';
	import { closeStackDialogNew } from '../../../store/dialog-stack/dialogStackStoreNew';
	import { closeDialog } from '../../../store/global-dialog-store.svelte';
	import SetCard from '../../card/cards/SetCard.svelte';

	let props: { routine: RoutineJoined; id: string } = $props();
	const { routine } = props;
	async function handlePush() {
		// push the routine to the workout list
		await goto(`/routine/${routine.id}/start-timer`);
		closeStackDialogNew();
	}
</script>

{#if routine.image}
	<img src={routine.image} alt="" height="300px" />
{/if}
<h2>{routine?.name}</h2>
{#each routine?.blocks as set, index}
	<SetCard {set} {index} />
{/each}
<div class="counter-section">
	<h4>{routine?.description}</h4>
</div>

<div class="actions">
	<button class="button" onclick={closeDialog}>Back</button>
	<button onclick={handlePush} class="button">Confirm</button>
</div>

<style>
	:root {
		--gap: 0.5rem;
	}

	.counter-section {
		display: grid;
		place-content: center;
		gap: var(--gap);
	}

	.actions {
		margin-top: 1rem;
		display: flex;
		gap: var(--gap);
		@media (max-width: 768px) {
			flex-direction: column;
			flex-direction: column-reverse;
		}
	}
	.button {
		width: 100%;
	}
</style>
