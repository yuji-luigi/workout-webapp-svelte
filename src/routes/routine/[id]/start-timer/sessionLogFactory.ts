import type { ExerciseInRoutineJoined, ExerciseJoined } from '../../../../types/db/exercise';
import { hasInterval, type Interval } from '../../../../types/db/interval';
import type { RoutineJoined } from '../../../../types/db/routine';
import type { RoutineBlockJoined } from '../../../../types/db/routine_block_interface';
import type {
	IntervalOnlyLog,
	SessionJoined,
	SetLogJoined
} from '../../../../types/db/session_history';

export class SessionJoinedFactory {
	/** pass whole routine and get sessionJoined. nested with SetLogFactory  */
	static fromRoutineJoined(routine: RoutineJoined): SessionJoined {
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

export class SetLogFactory {
	// iterates exercises and sets to create array of interval + exercise that will be passed in timer.
	static fromRoutineBlockJoined(block: RoutineBlockJoined): (SetLogJoined | IntervalOnlyLog)[] {
		// create RoutineBlockJoined for n_set times
		const setLogs: (SetLogJoined | IntervalOnlyLog)[] = [];
		for (let i = 0; i < block.n_set; i++) {
			// TODO: refactor with another factory that creates setLogJoined and intervalOnlyLog
			block.exercises.forEach((exercise, index) => {
				setLogs.push(this.fromExerciseInRoutineJoined(exercise, i));
				// case there is interval implemented at the set level then impose it at end of the set
				if (index === block.exercises.length - 1 && hasInterval(block)) {
					setLogs.push(this.fromSetInterval(block, i));
				}
			});
		}
		return setLogs;
	}
	static fromExerciseInRoutineJoined(
		exercise: ExerciseInRoutineJoined,
		index: number
	): SetLogJoined {
		return {
			id: 0,
			set_index: index,
			exercise_index: index,
			exercise: exercise,
			time_spent: 0,
			...(exercise.interval && {
				interval_done: {
					id: undefined as any, // TODO: fix this
					rest_time: 0,
					active_time: 0
				},
				interval_preset: exercise.interval
			}),
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
		};
	}
	static fromSetInterval(block: RoutineBlockJoined & { interval: Interval }, index: number) {
		return {
			set_index: index,
			interval_preset: block.interval,
			interval_done: {
				id: undefined as any,
				rest_time: 0,
				active_time: 0
			}
		};
	}
}
