import { browser } from '$app/environment';
import { db } from '../../../../lib/db/dexie-db/dexie-db';
import type { RoutineJoined } from '../../../../types/db/routine';
import type { SessionJoined, SetLogJoined } from '../../../../types/db/session_history';
import type { User } from '../../../../types/db/user';
import type { WSetJoined } from '../../../../types/db/WSetI';

export const ssr = false; // Turn off SSR if you're using IndexDB in load

export async function load({ params }) {
	let routine = null;
	if (browser) {
		routine = await db.routine.get({ id: Number(params.id) });
	}

	return { routine };
}

class SessionFactory {
	static sesionJoinedFromRoutineJoined(routine: RoutineJoined) {
		const session: SessionJoined = {
			id: 0,
			routine_id: routine.id,
			created_at: new Date(),
			workout_logs: [],
			created_by: routine.created_by,
			time_spent: 0,
			created_by_id: routine.created_by.id
		};
		return {
			routine: routine,
			workout_logs: [],
			created_by: routine.created_by,
			time_spent: 0
		};
	}
}

class SetLogFactory {
	static fromWsetJoined(wset: WSetJoined): SetLogJoined[] {
		// create WSetJoined for n_set times
		const setLogs: SetLogJoined[] = [];
		for (let i = 0; i < wset.n_set; i++) {
			wset.exercises.forEach((exercise, index) => {
				setLogs.push({
					id: 0,
					set_index: i,
					exercise_index: index,
					exercise: exercise,
					time_spent: 0,
					interval_done: wset.interval,
					interval_preset: wset.interval
				});
			});
		}
		return setLogs;
	}
}
