import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const timers = [
	{
		id: 1,
		name: 'Hypertrophy',
		seconds: 90,
		description: '4 to 5 sets of 6 to 12 reps',
		image: 'url(https://picsum.photos/400/301)'
	},
	{
		id: 2,
		name: 'Hypertrophy',
		seconds: 90,
		description: '3 to 4 sets of 13 to 25 reps',
		image: 'url(https://picsum.photos/410/300)',
		active: false
	},
	{
		id: 3,
		name: 'Strength',
		seconds: 180,
		description: '5 to 7 sets of 2 to 5 reps',
		image: 'url(https://picsum.photos/410/303)'
	},
	{
		id: 4,
		name: 'Strength',
		seconds: 210,
		description: '5 to 7 sets of 2 to 5 reps',
		image: 'url(https://picsum.photos/410/302)'
	},
	{
		id: 5,
		name: 'Hypertrophy',
		seconds: 90,
		description: '3 to 4 sets of 13 to 25 reps',
		image: 'url(https://picsum.photos/410/309)'
	},
	{
		id: 6,
		name: 'Hypertrophy',
		seconds: 60 * 8 + 0,
		description: '3 to 4 sets of 13 to 25 reps',
		image: 'url(https://picsum.photos/410/305)'
	}
];

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('https://jsonplaceholder.typicode.com/todos/1').catch((error) => {
		console.error(error);
	});
	console.log(JSON.stringify(timers, null, 2));
	const todo = res ? await res.json() : null;
	return { timers, res: todo };
};
