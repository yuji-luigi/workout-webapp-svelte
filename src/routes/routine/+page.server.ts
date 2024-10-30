import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as jsons from '$lib/data/json';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		return { routines: jsons.routines };
	} catch (err) {
		console.error(err);
		return { routines: [] };
	}
};
