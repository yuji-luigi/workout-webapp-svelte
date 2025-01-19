import { browser } from '$app/environment';
import { db } from '../../../../lib/db/dexie-db/dexie-db';
import type { RoutineJoined } from '../../../../types/db/routine';
import type { SessionJoined, SetLogJoined } from '../../../../types/db/session_history';
import type { RoutineBlockJoined } from '../../../../types/db/routine_block_interface';

export const ssr = false; // Turn off SSR if you're using IndexDB in load

export async function load({ params }) {
	let routine = null;
	if (browser) {
		routine = await db.routine.get({ id: Number(params.id) });
	}
	const session = SessionFactory.sesionJoinedFromRoutineJoined(routine as RoutineJoined);
	return { routine };
}

class SessionFactory {
	static sesionJoinedFromRoutineJoined(routine: RoutineJoined) {
		const setLogs = routine.blocks.map(SetLogFactory.fromRoutineBlockJoined);
		console.log(setLogs);
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
	static fromRoutineBlockJoined(wset: RoutineBlockJoined): SetLogJoined[] {
		// create RoutineBlockJoined for n_set times
		const setLogs: SetLogJoined[] = [];
		for (let i = 0; i < wset.n_set; i++) {
			wset.exercises.forEach((exercise, index) => {
				return setLogs.push({
					id: 0,
					set_index: i,
					exercise_index: index,
					exercise: exercise,
					time_spent: 0,
					interval_done: {
						id: undefined as any, // TODO: fix this
						rest_time: 0,
						active_time: 0
					},
					interval_preset: wset.interval,
					repetition_done: {
						id: undefined as any, // TODO: fix this
						count: 0,
						seconds_static_hold: 0
					},
					repetition_preset: {
						id: undefined as any, // TODO: fix this
						count: 0,
						seconds_static_hold: 0
					},
					weight_done: {
						id: undefined as any, // TODO: fix this
						amount: exercise.weight.amount,
						weight_type_id: exercise.weight.weight_type_id
					},
					weight_preset: {
						id: undefined as any, // TODO: fix this
						amount: exercise.weight.amount,
						weight_type_id: exercise.weight.weight_type_id
					}
				});
			});
		}
		return setLogs;
	}
}
