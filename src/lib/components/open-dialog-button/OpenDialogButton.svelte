<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { openDialog } from '../../store/dialog-store';
	import WorkoutForm from '../form/WorkoutForm.svelte';
	import ErrorDialogContent from '../dialog/contents/ErrorDialogContent.svelte';
	5;
	export let DialogContentComponent: new (...args: any) => SvelteComponent;
	export let dialogContentProps: any = undefined;
	function handleOpenDialog(e: MouseEvent) {
		e.stopImmediatePropagation();
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

<div role="button" tabindex="0" on:keydown={null} on:click={handleOpenDialog}><slot /></div>
