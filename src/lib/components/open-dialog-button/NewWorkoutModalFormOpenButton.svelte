<script lang="ts">
	import { openDialog } from '../../../store/dialog-store';
	import WorkoutForm from '../form/WorkoutForm.svelte';
	import OpenDialogButton from './OpenDialogButton.svelte';

	function handleOpenDialog() {
		openDialog({
			componentInDialog: {
				component: WorkoutForm,
				props: {}
			}
		});
	}
</script>

<OpenDialogButton DialogContentComponent={WorkoutForm}>Create new workout</OpenDialogButton>
