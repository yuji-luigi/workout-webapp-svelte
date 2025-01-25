import { browser } from '$app/environment';
import { db } from '../../../../lib/db/dexie-db/dexie-db';
import type { RoutineJoined } from '../../../../types/db/routine';
import type { WorkoutFlow } from '../../../../types/db/workout-flow';
import { SessionJoinedFactory } from '../../../../lib/sections/start-timer-components/sessionLogFactory';

export const ssr = false; // Turn off SSR if you're using IndexDB in load

export async function load({ params }) {
	let routine = null;
	if (browser) {
		routine = await db.routine.get({ id: Number(params.id) });
	}
	const sessionLog = SessionJoinedFactory.fromRoutineJoined(routine as RoutineJoined);
	/// creates array of intervals to pass to timer so timer does not have to worry about anything but the current index(of interval).
	const workoutFlows: WorkoutFlow[] = sessionLog.block_logs.flatMap((block) => {
		return block.set_logs;
	}, []);
	return { routine, sessionLog, workoutFlows };
}
