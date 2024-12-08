<script lang="ts">
	import type { ExerciseJoined } from '../../../types/db/exercise';
	import { closeDialog } from '../../store/global-dialog-store';
	import { handleOpenDialog } from '../dialog/helper/handleOpenDialog';
	import ExerciseForm from '../form/form-by-collection/exercise-form/ExerciseForm.svelte';
	let { createdWorkout, children }: { createdWorkout: null | ExerciseJoined; children?: any } =
		$props();
</script>

<button
	type="button"
	onclick={(e) =>
		handleOpenDialog(e, {
			DialogContentComponent: ExerciseForm as any,
			dialogContentProps: {
				onSubmitCallback: (data: any) => {
					closeDialog();
				}
			}
		})}
	class="button"
>
	{@render children?.()}</button
>

<style>
	button {
		margin-left: auto;
		height: auto;
		padding: 0.25rem 0.5rem;
		border-radius: 3rem;
	}
</style>
