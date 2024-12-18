// src/store/dialogStackStore.ts
import { writable } from 'svelte/store';

export const dialogStack = writable<HTMLDialogElement[]>([]);

// Utility functions to manage the stack
export function pushDialog(dialog: HTMLDialogElement) {
	dialogStack.update((stack) => {
		stack.push(dialog);
		return stack;
	});
}

export function popDialog() {
	dialogStack.update((stack) => {
		stack.pop();
		return stack;
	});
}

export function getTopDialog() {
	let topDialog: HTMLDialogElement | undefined;
	dialogStack.subscribe((stack) => {
		topDialog = stack[stack.length - 1];
	})();
	return topDialog;
}
