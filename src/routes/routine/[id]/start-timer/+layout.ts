import { browser } from '$app/environment';
import { db } from '../../../../lib/db/dexie-db/dexie-db';
import type { WorkoutFlow } from '../../../../types/db/workout-flow';
import { RoutineLogJoined } from '../../../../lib/sections/start-timer-components/sessionLogFactory';
import {
	initCurrentRoutineStore,
	routinesStore
} from '../../../../lib/store/states/routine_store.svelte';
import type { RoutineJoined } from '../../../../types/db/routine';
import { onDestroy } from 'svelte';

export const ssr = false; // Turn off SSR if you're using IndexDB in load

export async function load({ params }) {
	let routine = null;
	if (browser) {
		routine = (await db.routine.get({ id: Number(params.id) })) as RoutineJoined;
	}
	const sessionLog = RoutineLogJoined.fromRoutineJoined(routine as RoutineJoined);
	/// creates array of intervals to pass to timer so timer does not have to worry about anything but the current index(of interval).
	const workoutFlows: WorkoutFlow[] = sessionLog.block_logs.flatMap((block) => {
		return block.set_logs.flatMap((set) => {
			return set.exerciseLogs;
		});
	}, []);

	return { routine, sessionLog, workoutFlows };
}
