<script lang="ts">
	import dangerImgSrc from '$images/danger_photo_forest.jpg';
	import type { RoutineJoined } from '../../../../types/db/routine';
	import { closeStackDialogNew } from '../../../store/dialog-stack/dialogStackStoreNew';

	let props: { routine: RoutineJoined; onDelete: () => void } = $props();
	const { routine, onDelete } = props;
</script>

<div class="delete-confirm-dialog">
	<img src={dangerImgSrc} alt={routine.name} />
	<h2>Delete Confirmation</h2>
	<p>Are you sure you want to delete this routine?</p>
	<div class="actions">
		<button class="button error" onclick={onDelete}>Delete</button>
		<button class="button primary" onclick={closeStackDialogNew}>Cancel</button>
	</div>
</div>

<style>
	.delete-confirm-dialog {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--gap-md);
	}
	img {
		height: 150px;
		border-radius: 1rem;
	}
	.actions {
		width: 100%;
		max-width: 200px;
		display: flex;
		flex-direction: column;
		gap: var(--gap-sm);
	}
</style>
