import type { SvelteComponent } from 'svelte';
import { openDialog } from '../../../store/dialog-store';
import ErrorDialogContent from '../contents/ErrorDialogContent.svelte';

export function handleOpenDialog(
	e: MouseEvent,
	{
		DialogContentComponent,
		dialogContentProps
	}: {
		DialogContentComponent: new (...args: any) => SvelteComponent;
		dialogContentProps?: any;
	}
) {
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
