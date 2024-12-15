import { getContext } from 'svelte';

let formState = $state<Record<string, any>>({ initial: 'initial' });

export const getForm = (form_id: string) => {
	return formState[form_id];
};

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
