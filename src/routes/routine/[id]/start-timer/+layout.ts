import { browser } from '$app/environment';
import { db } from '../../../../lib/db/dexie-db/dexie-db';
import type { RoutineJoined } from '../../../../types/db/routine';
import type { SessionJoined, SetLogJoined } from '../../../../types/db/session_history';
import type { RoutineBlockJoined } from '../../../../types/db/routine_block_interface';
import type { Interval } from '../../../../types/db/interval';

export const ssr = false; // Turn off SSR if you're using IndexDB in load

export async function load({ params }) {
	let routine = null;
	if (browser) {
		routine = await db.routine.get({ id: Number(params.id) });
	}
	const sessionLog = SessionFactory.sessionJoinedFromRoutineJoined(routine as RoutineJoined);
	console.log(sessionLog);
	/// creates array of intervals to pass to timer so timer does not have to worry about anything but the current index(of interval).
	const intervals = sessionLog.block_logs.flatMap((block) => {
		const set_intervals = block.set_logs.reduce<any[]>((acc, set_log, index, array) => {
			if (set_log.interval_preset) {
				acc.push({
					exercise: set_log.exercise.name,
					interval: set_log.interval_preset,
					active_time: set_log.interval_preset.active_time,
					rest_time: set_log.interval_preset.rest_time
				});
			}
			// setting the interval of the set. not for individual exercises.			if (index === array.length - 1 && block.interval) {
				acc.push(block.interval);
			}
			return acc;
		}, []);
		return set_intervals;
	});
	console.log(intervals);
	return { routine, sessionLog };
}

class SessionFactory {
	static sessionJoinedFromRoutineJoined(routine: RoutineJoined) {
		const block_logs = routine.blocks.map((block, index) => {
			return {
				set_index: index,
				block_time_spent: 0,
				interval: block.interval,
				set_logs: SetLogFactory.fromRoutineBlockJoined(block)
			};
		});

		return {
			id: undefined,
			created_at: new Date(),
			created_by: 'yuji sato',
			routine: routine,
			block_logs,
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
					// set_index: i,
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
						amount: exercise.weight?.amount,
						weight_type_id: exercise.weight?.weight_type_id
					},
					weight_preset: {
						id: undefined as any, // TODO: fix this
						amount: exercise.weight?.amount,
						weight_type_id: exercise.weight?.weight_type_id
					}
				});
			});
		}
		return setLogs;
	}
}
