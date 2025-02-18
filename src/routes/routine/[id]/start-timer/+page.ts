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
import { initializeIntervalTimer } from '../../../../lib/store/timers/interval_timer.svelte';
import { initRoutineLogStore } from '../../../../lib/store/states/routine_log_store.svelte';

export const ssr = false; // Turn off SSR if you're using IndexDB in load

export async function load({ params }) {
	const routine = (await db.routine.get({ id: Number(params.id) })) as RoutineJoined;
	const sessionLog = RoutineLogJoined.fromRoutineJoined(routine as RoutineJoined);
	/// creates array of intervals to pass to timer so timer does not have to worry about anything but the current index(of interval).
	const workoutFlows: WorkoutFlow[] = sessionLog.block_logs.flatMap((block) => {
		return block.set_logs.flatMap((set) => {
			return set.exerciseLogs;
		});
	});

	const _workoutFlows = [];
	for (const block of sessionLog.block_logs) {
		for (const set of block.set_logs) {
			for (let i = 0; i < set.exerciseLogs.length; i++) {
				const exercise = set.exerciseLogs[i];
				_workoutFlows.push({
					...exercise,
					block_index: block.block_index,
					set_index: set.set_index,
					exercise_index: i
				});
				if (i === set.exerciseLogs.length - 1 && set.interval_preset) {
					_workoutFlows.push({
						...set.interval_preset,
						block_index: block.block_index,
						set_index: set.set_index,
						exercise: {
							name: 'interval',
							id: set.interval_preset.id
						}
					});
				}
			}
		}
	}

	const intervalTimer = initializeIntervalTimer(_workoutFlows);
	initCurrentRoutineStore({ routine, intervalTimer });
	initRoutineLogStore(sessionLog, intervalTimer);
}
