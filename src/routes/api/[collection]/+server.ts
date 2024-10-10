import { json } from '@sveltejs/kit';

export async function GET({ fetch, params, url, ...other }) {
	console.log(other);

	const raw_data = await fetch(`/src/data/${params.collection}.json`);
	if (url.searchParams.size > 0) {
		const searchParams = new URLSearchParams(url.search);
		const searchKey = searchParams.keys().next().value;
		const searchValue = searchParams.get(searchKey);
		const data = await raw_data.json();
		const filteredData = data.filter((item) => item[searchKey]?.toString?.() === searchValue);
		return json(filteredData);
	}
	const _data = await raw_data.json();
	return json(_data);
}
