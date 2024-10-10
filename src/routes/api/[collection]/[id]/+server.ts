import { json } from '@sveltejs/kit';

export async function GET({ params, fetch }) {
	const raw_data = await fetch(`/src/data/${params.collection}.json`);
	const dataArray = await raw_data.json();
	const data = dataArray.find((routine: { id: number }) => String(routine.id) === params.id);
	return json(data);
}
