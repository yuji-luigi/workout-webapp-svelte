<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { WorkoutJoined } from '../../../types/db/workout';
	import { handleOpenDialog } from '../dialog/helper/handleOpenDialog';
	import WorkoutForm from '../form/workout-form/WorkoutForm.svelte';
	import { closeDialog } from '../../store/global-dialog-store';
	import ExerciseForm from '../form/exercise-form/ExerciseForm.svelte';
	let { createdWorkout, children }: { createdWorkout: null | WorkoutJoined; children?: any } =
		$props();
</script>

<button
	type="button"
	onclick={(e) =>
		handleOpenDialog(e, {
			// DialogContentComponent: WorkoutForm,
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
