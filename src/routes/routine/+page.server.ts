import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const rawRoutines = await fetch('/src/data/routine.json');
	const routines = await rawRoutines.json();

	return { routines };
};
