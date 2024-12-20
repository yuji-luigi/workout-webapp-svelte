import { getContext, onMount } from 'svelte';

let formState = $state<Record<string, any>>({ initial: 'initial' });

export const getForm = (form_id: string) => {
	return formState[form_id];
};
export function getFormById(form_id: string): null | HTMLFormElement {
	if (typeof window === 'undefined') return null;
	return document.getElementById(form_id) as HTMLFormElement;
}
export const setForm = (form_id: string, dto: Record<string, any>) => {
	formState[form_id] = dto;
};

export const resetFormById = (form_id: string) => {
	delete formState[form_id];
};

export const resetForm = () => {
	formState = {};
};

export const getFormIDContext = () => getContext<string>('form_id') || 'no_form_id';

export function dispatchFormInputEvent() {
	if (typeof window === 'undefined') return;
	const event = new Event('input', {
		bubbles: true,
		cancelable: true
	});
	getFormById(getFormIDContext())?.dispatchEvent(
		new Event('input', { bubbles: true, cancelable: true })
	);
}
