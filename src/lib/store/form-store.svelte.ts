let formContext = $state<Record<string, any>>({});

export const getForm = (form_id: string) => {
	return formContext[form_id];
};

export const setForm = (form_id: string, dto: Record<string, any>) => {
	formContext[form_id] = dto;
};

export const resetFormById = (form_id: string) => {
	delete formContext[form_id];
};

export const resetForm = () => {
	formContext = {};
};
