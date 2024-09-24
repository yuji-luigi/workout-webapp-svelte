import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const timers = [
	{
		name: 'Hypertrophy 1:30',
		timer: 90,
		description: '4 to 5 sets of 6 to 12 reps',
		image: 'url(https://picsum.photos/400/301)'
	},
	{
		name: 'Hypertrophy 1:00',
		timer: 90,
		description: '3 to 4 sets of 13 to 25 reps',
		image: 'url(https://picsum.photos/410/300)',
		active: true
	},
	{
		name: 'Strength 3:00',
		timer: 180,
		description: '5 to 7 sets of 2 to 5 reps',
		image: 'url(https://picsum.photos/410/303)'
	},
	{
		name: 'Strength 3:30',
		timer: 210,
		description: '5 to 7 sets of 2 to 5 reps',
		image: 'url(https://picsum.photos/410/302)'
	},
	{
		name: 'Hypertrophy 1:00',
		timer: 90,
		description: '3 to 4 sets of 13 to 25 reps',
		image: 'url(https://picsum.photos/410/309)'
	}
];

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('https://jsonplaceholder.typicode.com/todos/1').catch((error) => {
		console.error(error);
	});
	const todo = res ? await res.json() : null;
	return { timers, res: todo };
};
