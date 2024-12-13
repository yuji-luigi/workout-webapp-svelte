// function that get input.name from object key and set error message to input in value of the key
export function setFormErrors(errors: Record<string, string>, form: HTMLFormElement) {
	Object.keys(errors).forEach((key) => {
		const input = form.querySelector(`[data-input-name="${key}"]`);
		if (!input) return;
		const errorSpan = input.querySelector('.error');
		if (!errorSpan) return;
		errorSpan.textContent = errors[key];
	});
}
export function resetFormError(target: HTMLElement) {
	const input = target.closest(`.input-error-container`);
	if (!input) return;
	const errorSpan = input.querySelector('.error');
	if (!errorSpan) return;
	errorSpan.textContent = '';
}
