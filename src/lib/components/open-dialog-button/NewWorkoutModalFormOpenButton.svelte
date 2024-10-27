<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { WorkoutJoined } from '../../../types/db/workout';
	import { handleOpenDialog } from '../dialog/helper/handleOpenDialog';
	import WorkoutForm from '../form/workout-form/WorkoutForm.svelte';
	let { createdWorkout, children }: { createdWorkout: null | WorkoutJoined; children?: any } =
		$props();
</script>

<button
	type="button"
	onclick={(e) =>
		handleOpenDialog(e, {
			DialogContentComponent: WorkoutForm
		})}
	class="button primary"
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
