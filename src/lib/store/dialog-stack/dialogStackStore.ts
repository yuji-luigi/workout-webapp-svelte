// dialogStackStore.ts
import { writable } from 'svelte/store';
import { mount, type SvelteComponent } from 'svelte';

export type DialogItem = {
	component: new (...args: any) => SvelteComponent;
	props?: Record<string, unknown>;
	target?: string; // The ID or selector of where to append the dialog
	title?: string;
	type?: string;
	description?: string;
	rawHtml?: string;
	data?: unknown;
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
	dialogStack.update((stack) => [...stack, dialog]);
	const dialogEl: HTMLDialogElement = document.createElement('dialog');
	dialogEl.addEventListener(
		'click',
		async (e: MouseEvent) => {
			if (e.target === dialogEl) {
				closeStackDialog();
			}
		},
		true
	);
	mount(dialog.component, { target: dialogEl, props: dialog.props });
	targetElement.appendChild(dialogEl);
	dialogEl.showModal();
}

export function closeStackDialog() {
	// close the top dialog programmatically
	dialogStack.update((stack) => stack.slice(0, -1));
}
