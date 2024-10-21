export function createFormDataToObject(form_data: FormData) {
	return form_data
		.entries()
		.reduce<
			Record<string, string | number | boolean | File | (string | number | boolean | File)[]>
		>((acc, [key, value]) => {
			if (acc[key]) {
				if (Array.isArray(acc[key])) {
					acc[key].push(value);
				} else {
					acc[key] = [acc[key], value];
				}
				return acc;
			}
			acc[key] = value;
			return acc;
		}, {});
}
