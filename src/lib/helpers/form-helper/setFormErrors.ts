// function that get input.name from object key and set error message to input in value of the key
export function setFormErrors(errors: Record<string, string>, form: HTMLFormElement) {
	Object.keys(errors).forEach((key) => {
		const input = form.querySelector(`[data-input-name="${key}"]`);
		if (!input) return;
		const errorSpan = input.querySelector('.input-error-message') as HTMLElement;
		if (!errorSpan) return;
		errorSpan.dataset.hasError = 'true';
		errorSpan.textContent = errors[key];
	});
}
export function resetFormError(target: HTMLElement) {
	const input = target.closest(`.input-error-container`);
	if (!input) return;
	const errorSpan = input.querySelector('.input-error-message') as HTMLElement;
	if (!errorSpan) return;
	resetErrorSpan(errorSpan);
}

export function resetErrorSpan(errorSpan: HTMLElement) {
	errorSpan.dataset.hasError = 'false';
	errorSpan.textContent = '';
}
