<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { openDialog } from '../../../store/dialog-store';
	import WorkoutForm from '../form/WorkoutForm.svelte';
	import ErrorDialogContent from '../dialog/contents/ErrorDialogContent.svelte';
	export let DialogContentComponent: new (...args: any) => SvelteComponent;
	export let dialogContentProps: any = undefined;
	function handleOpenDialog() {
		if (!DialogContentComponent) {
			openDialog({
				componentInDialog: {
					component: ErrorDialogContent,
					props: {}
				}
			});
		}
		openDialog({
			componentInDialog: {
				component: DialogContentComponent,
				props: dialogContentProps
			}
		});
	}
</script>

<button
	class="button primary"
	style="background-color: var();"
	type="button"
	on:click={handleOpenDialog}><slot /></button
>
