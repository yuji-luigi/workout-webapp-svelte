import { initTables } from '../lib/db/table_states.svelte';

const ssr = false;

export const load = async ({ data }) => {
	if (ssr) {
		await initTables();
	}
	return data;
};
