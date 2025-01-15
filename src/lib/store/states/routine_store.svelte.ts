import { onMount } from 'svelte';
import type { RoutineJoined } from '../../../types/db/routine';
import { db } from '../../db/dexie-db/dexie-db';

export const routinesStore: {
	list: RoutineJoined[];
	loading: boolean;
	error: string | null | unknown;
} = $state({
	list: [],
	loading: false,
	error: null
});

export const getRoutines = async () => {
	routinesStore.loading = true;
	try {
		const routines = await db.routines.toArray();
		routinesStore.list = routines;
	} catch (error) {
		routinesStore.error = error;
	} finally {
		routinesStore.loading = false;
	}
};
