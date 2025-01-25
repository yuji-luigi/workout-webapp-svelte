import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

type ComponentInDialog = {
	component?: (new (...args: any) => SvelteComponent) | null; // The component to render
	props?: any | null; // Optional props to pass to the component
};
export type DialogStore = {
	isOpen: boolean;
	title?: string | null;
	type?: string | null;
	description?: string | null;
	componentInDialog: ComponentInDialog;
	rawHtml?: string | null;
	data?: any;
};
const defaultDialogStore: DialogStore = {
	isOpen: false,
	title: null,
	type: null,
	description: null,
	data: null,
	componentInDialog: {}
};

// export const dialogStore = writable<DialogStore>(defaultDialogStore);
export const dialogStore = $state<DialogStore>(defaultDialogStore);

export const openDialog = (dialogStoreParams: Omit<DialogStore, 'isOpen'>) => {
	dialogStore.isOpen = true;
	dialogStore.componentInDialog.component = dialogStoreParams.componentInDialog.component;
	dialogStore.componentInDialog.props = dialogStoreParams.componentInDialog.props;
};

export const closeDialog = () => {
	dialogStore.isOpen = false;
	dialogStore.componentInDialog = {
		props: null,
		component: null
	};
	dialogStore.title = null;
	dialogStore.description = null;
	dialogStore.data = null;
	dialogStore.rawHtml = null;
	dialogStore.type = null;
};
