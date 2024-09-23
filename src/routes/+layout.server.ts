import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = (event) => {
	if (event.route.id === '/') {
		redirect(307, '/home');
	}
};
