import { json } from '@sveltejs/kit';
import { filterByQueryParams } from '../../../lib/helpers/search-params/filterByQueryParams.js';

export async function GET({ fetch, params, url, ...other }) {
	const response = await fetch(`/src/data/${params.collection}.json`);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data = (await response.json()) as Record<string, number | string>[];
	if (url.searchParams.size > 0) {
		return json(filterByQueryParams(data, url.searchParams));
	}
	return json(data);
}
