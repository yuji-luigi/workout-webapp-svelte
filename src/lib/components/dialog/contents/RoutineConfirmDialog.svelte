<script lang="ts">
	import { goto } from '$app/navigation';
	import type { RoutineJoined } from '../../../../types/db/routine';
	import { RoutineDexie } from '../../../db/dexie-db/orm/RoutineDexie';
	import {
		closeStackDialogNew,
		openStackDialogNew
	} from '../../../store/dialog-stack/dialogStackStoreNew';
	import { closeDialog } from '../../../store/global-dialog-store.svelte';
	import { getRoutines } from '../../../store/states/routine_store.svelte';
	import EditButton from '../../button/EditButton.svelte';
	import TrashButton from '../../button/TrashButton.svelte';
	import SetCard from '../../card/cards/SetCard.svelte';
	import DeleteConfirmDialog from './DeleteConfirmDialog.svelte';

	let props: { routine: RoutineJoined; id: string } = $props();
	const { routine } = props;
	async function handlePush() {
		// push the routine to the workout list
		closeStackDialogNew();
		await goto(`/routine/${routine.id}/start-timer`);
	}

	async function handleDelete() {
		await RoutineDexie.removeById(routine.id);
		closeStackDialogNew();
		closeStackDialogNew();
		await getRoutines();
	}

	function openConfirmDialog() {
		openStackDialogNew({
			component: DeleteConfirmDialog,
			props: { routine, onDelete: handleDelete }
		});
	}
	function editClicked() {
		goto(`/routine/${routine.id}/edit`);
		closeStackDialogNew();
	}
</script>

{#if routine.image}
	<img src={routine.image} alt="" height="300px" />
{/if}
<div class="routine-header">
	<h2>{routine?.name}</h2>
	<div class="flex-row">
		<TrashButton onclick={openConfirmDialog} />
		<EditButton onclick={editClicked} />
	</div>
</div>

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

	.routine-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
