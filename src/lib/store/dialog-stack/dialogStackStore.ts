// dialogStackStore.ts
import { get, writable } from 'svelte/store';
import { mount, unmount, type SvelteComponent } from 'svelte';
import { sleep } from '../../helpers/sleep';

export type DialogItem = {
	/** component must be component so .svelte file */
	component: any | (new (...args: any) => SvelteComponent);
	props?: Record<string, unknown>;
	/** target element to append the dialog to.
	 *  TODO: check if form is getting the input value from it.  */
	target?: string; // The ID or selector of where to append the dialog
	/** currently not using */
	rawHtml?: string;
	/** handled internally in order to destroy the instantiated component. maybe not necessary. */
	componentInstance?: SvelteComponent;
	/** handled internally in order to remove the created dialog from dom tree. */
	dialogEl?: HTMLDialogElement;
	disablePadding?: boolean;
	dialogClasses?: string[];
};

export const dialogStack = writable<DialogItem[]>([]);

export function openStackDialog(dialog: DialogItem) {
	const targetElement: HTMLElement | null = dialog.target
		? document.querySelector(dialog.target)
		: document.body;
	if (!targetElement) {
		console.warn(`Could not find target element: ${dialog.target}`);
		throw new Error(`Could not find target element: ${dialog.target}`);
	}

	const dialogEl: HTMLDialogElement = document.createElement('dialog');

	dialogEl.autofocus = true;
	dialogEl.classList.add('dialog');
	if (!dialog.disablePadding) {
		dialogEl.classList.add('dialog-contents');
	}
	if (dialog.dialogClasses) {
		dialogEl.classList.add(...dialog.dialogClasses);
	}

	dialog.dialogEl = dialogEl;

	dialogStack.update((stack) => [...stack, dialog]);

	const backdropClickListener = (e: MouseEvent) => {
		if (e.target === dialogEl) {
			closeStackDialog();
		}
	};

	const handleCancel = () => {
		closeStackDialog();
	};
	// TODO: refactor. move outside of this function
	const handleClose = () => {
		// Remove event listeners
		dialogEl.removeEventListener('click', backdropClickListener, true);
		dialogEl.removeEventListener('cancel', handleCancel);
		dialogEl.removeEventListener('close', handleClose);

		// Destroy the Svelte component instance
		if (dialog.componentInstance) {
			unmount(dialog.componentInstance);
		}
		// Remove the dialog element from the DOM
		if (dialogEl.parentNode) {
			// this line should destroy the Component in the dialogEl
			dialogEl.parentNode.removeChild(dialogEl);
		}
		// make sure to resolve the promise if it exists
		if (dialog?.props?.resolve) {
			(dialog.props.resolve as (data: any) => void)?.(null);
		}
		// Remove the dialog from the stack
		dialogStack.update((stack) => stack.slice(0, -1));
	};

	// Add event listeners for backdrop clicks and 'cancel' events
	dialogEl.addEventListener('click', backdropClickListener, true);
	dialogEl.addEventListener('cancel', handleCancel);
	dialogEl.addEventListener('close', handleClose);
	// dialog.componentInstance = componentInstance as any;
	targetElement.appendChild(dialogEl);
	// put into the task queue. ensures that this function completed then run the scroll top
	// passed arg component is mounted inside the dialogEl

	dialogEl.showModal();
	mount(dialog.component, {
		/** where to append the dialog. see svelte docs for more info. */
		target: dialogEl,
		props: dialog.props
	});
	setTimeout(() => {
		dialogEl.scrollTop = 0; // Reset scroll position to the top
	}, 0);

	// mount(dialog.component, {
	// 	// where to append the dialog. see svelte docs for more info. */
	// 	target: dialogEl,
	// 	props: dialog.props
	// });
	// dialogEl.showModal();
	// dialogEl.scrollTop = 0; // Reset scroll position to the top
	// setTimeout(() => {
	// 	dialogEl.scrollTop = 0; // Reset scroll position to the top
	// }, 0);
}

export function closeStackDialog() {
	const stack = get(dialogStack);
	if (stack.length === 0) return;

	const topDialog = stack[stack.length - 1];
	if (topDialog.dialogEl) {
		topDialog.dialogEl.close(); // Triggers the 'close' event listener for cleanup
	}
}
