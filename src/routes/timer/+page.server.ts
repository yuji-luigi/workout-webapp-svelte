import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('https://jsonplaceholder.typicode.com/todos/1').catch((error) => {
		console.error(error);
	});
	const rawTimers = await fetch('/src/data/timers.json');
	const rawWorkoutTypes = await fetch('/src/data/workout_types.json');
	const timers = await rawTimers.json();
	const todo = res ? await res.json() : null;
	return { timers, workoutTypes: await rawWorkoutTypes.json() };
};
