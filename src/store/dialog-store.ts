import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

type ComponentInDialog = {
	component: new (...args: any) => SvelteComponent; // The component to render
	props?: any; // Optional props to pass to the component
};
export type DialogStore = {
	isOpen: boolean;
	title?: string | null;
	type?: string | null;
	description?: string | null;
	componentInDialog?: ComponentInDialog | null;
	rawHtml?: string | null;
	data?: any;
};
const defaultDialogStore: DialogStore = {
	isOpen: false,
	title: null,
	type: null,
	description: null,
	data: null,
	componentInDialog: null
};

export const dialogStore = writable<DialogStore>(defaultDialogStore);

export const openDialog = (dialogStoreParams: Omit<DialogStore, 'isOpen'>) => {
	dialogStore.set({
		isOpen: true,
		...dialogStoreParams
	});
};

export const closeDialog = () => {
	dialogStore.set(defaultDialogStore);
};
