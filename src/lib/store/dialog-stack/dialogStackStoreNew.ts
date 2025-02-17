// dialogStackStore.ts
import { mount, unmount, type SvelteComponent } from 'svelte';
import { get, writable } from 'svelte/store';
import StackDialog from '../../components/dialog/global/StackDialog.svelte';
export type DialogStackConfig = {
	/** component must be component so .svelte file */
	component: any | (new (...args: any) => SvelteComponent);
	props?: Record<string, unknown>;
	/** target element to append the stackDialogConfig to.
	 *  TODO: check if form is getting the input value from it.  */
	target?: string; // The ID or selector of where to append the stackDialogConfig
	/** currently not using */
	/** handled internally in order to destroy the instantiated component. maybe not necessary. */
	/** handled internally in order to remove the created stackDialogConfig from dom tree. */
	disablePadding?: boolean;
	dialogClasses?: string[];
	id: string;
};

const createDialogId = () => {
	const dialogLength = get(dialogStackNew).length;
	return `genearated-stackDialogConfig-${dialogLength}`;
};

export const dialogStackNew = writable<DialogStackConfig[]>([]);
export function openStackDialogNew(stackDialogConfig: Omit<DialogStackConfig, 'id'>) {
	const bodyEl = document.body;
	const _stackDialogConfig = { ...stackDialogConfig, id: createDialogId() };

	if (!bodyEl) {
		console.warn(`Could not find target element: ${stackDialogConfig.target}`);
		throw new Error(`Could not find target element: ${stackDialogConfig.target}`);
	}

	_stackDialogConfig.props = { ..._stackDialogConfig.props, id: _stackDialogConfig.id };
	dialogStackNew.update((stack) => [...stack, _stackDialogConfig]);

	// put into the task queue. ensures that this function completed then run the scroll top
	// passed arg component is mounted inside the dialogEl
	mount(StackDialog, {
		target: bodyEl,
		props: {
			id: _stackDialogConfig.id,
			PassedChildren: _stackDialogConfig.component,
			childrenProps: _stackDialogConfig.props,
			isOpen: true,
			..._stackDialogConfig.props
		}
	});

	// mount(_stackDialogConfig.component, {
	// 	/** where to append the stackDialogConfig. see svelte docs for more info. */
	// 	target: bodyEl,
	// 	props: _stackDialogConfig.props
	// });
}

export function closeStackDialogNew() {
	const stack = get(dialogStackNew);
	if (stack.length === 0) return;
	console.log('stack', stack.length);
	const topDialog = stack.pop();
	console.log('popped stack', stack.length);
	if (!topDialog) {
		return;
	}
	const topDialogEl = document.getElementById(topDialog.id) as HTMLDialogElement | undefined;
	if (topDialogEl) {
		console.log('closi ng dialog in closeStackDialogNew handler');
		topDialogEl.close(); //  unmount the manually mounted component
		unmount(topDialog.component);
		topDialogEl.remove();
	}
}
