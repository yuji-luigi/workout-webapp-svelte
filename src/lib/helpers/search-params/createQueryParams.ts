export function createQueryParams(
	queryInObject: Record<string, string | number | string[] | number[]> | undefined
): string {
	if (!queryInObject) {
		return '';
	}
	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(queryInObject)) {
		if (Array.isArray(value)) {
			for (const item of value) {
				searchParams.append(key, String(item));
			}
		} else {
			searchParams.append(key, String(value));
		}
	}

	return '?' + searchParams.toString();
}
