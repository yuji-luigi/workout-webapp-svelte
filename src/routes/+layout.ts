import { initTables } from '../lib/db/table_states.svelte';

export const ssr = false;

export const load = async ({ data }) => {
	await initTables();

	return data;
};
