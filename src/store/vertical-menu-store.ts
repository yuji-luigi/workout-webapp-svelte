import { writable } from 'svelte/store';

export type DrawerStore = {
	isOpen: boolean;
};
const defaultVerticalMenuStore: DrawerStore = {
	isOpen: false
};

export const verticalMenuStore = writable<DrawerStore>(defaultVerticalMenuStore);

export const openVerticalMenu = (verticalMenuParams?: Omit<DrawerStore, 'isOpen'>) => {
	verticalMenuStore.set({
		...verticalMenuParams,
		isOpen: true
	});
};

export const closeVerticalMenu = () => {
	verticalMenuStore.set({
		...defaultVerticalMenuStore,
		isOpen: false
	});
};
