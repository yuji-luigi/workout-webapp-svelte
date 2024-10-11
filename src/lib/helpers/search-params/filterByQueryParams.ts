export function filterByQueryParams<T extends Record<string, string | number>>(
	data: T[],
	searchParams: URLSearchParams
): T[] {
	const query = Object.fromEntries(searchParams.entries());
	return data.filter((item) =>
		Object.entries(query).every(([key, value]) => String(item[key]) === String(value))
	);
}
