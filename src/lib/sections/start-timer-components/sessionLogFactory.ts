import type { ExerciseInRoutineJoined, ExerciseJoined } from '../../../types/db/exercise';
import { hasInterval, type Interval } from '../../../types/db/interval';
import type { RoutineJoined } from '../../../types/db/routine';
import type { RoutineBlockJoined } from '../../../types/db/routine_block_interface';
import type {
	BlockLog,
	ExerciseLogJoined,
	RoutineLogJoinedInterface,
	SetLogJoined
} from '../../../types/db/routine_log';

export class RoutineLogJoined implements RoutineLogJoinedInterface {
	id: undefined;
	created_at!: Date;
	created_by!: string;
	routine!: RoutineJoined;
	block_logs!: BlockLog[];
	time_spent!: number;
	/** pass whole routine and get sessionJoined. nested with SetLogFactory  */
	static fromRoutineJoined(routine: RoutineJoined): RoutineLogJoinedInterface {
		// const block_logs = routine.blocks.map((block, index) => {
		// 	return {
		// 		set_index: index,
		// 		block_time_spent: 0,
		// 		interval: block.interval,
		// 		set_logs: SetLogFactory.fromRoutineBlockJoined(block, index)
		// 	};
		// });
		const block_logs = routine.blocks.map(BlockLogFactory.fromRoutineBlockJoined);
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

export class BlockLogFactory {
	static fromRoutineBlockJoined(block: RoutineBlockJoined, block_index: number): BlockLog {
		return {
			block_index,
			time_spent: 0,
			interval_preset: block.interval,
			interval_done: undefined,
			set_logs: SetLogFactory.fromRoutineBlockJoined(block, block_index)
		};
	}
}

export class SetLogFactory {
	// iterates exercises and sets to create array of interval + exercise that will be passed in timer.
	static fromRoutineBlockJoined(block: RoutineBlockJoined, block_index: number): SetLogJoined[] {
		// create RoutineBlockJoined for n_set times
		const setLogs: SetLogJoined[] = [];
		for (let set_index = 0; set_index < block.n_set; set_index++) {
			setLogs.push({
				...this.fromExerciseInRoutineJoined({
					set_index,
					block_index,
					exercises: block.exercises
				})
			});
		}
		return setLogs;
	}
	static fromExerciseInRoutineJoined({
		exercises,
		set_index,
		block_index
	}: {
		exercises: ExerciseInRoutineJoined[];
		set_index: number;
		block_index: number;
	}): SetLogJoined {
		return {
			set_index,
			time_spent: 0,
			block_index,
			interval_preset: undefined,
			interval_done: undefined,
			exerciseLogs: exercises.map((exercise, exercise_index) => {
				return ExerciseLogFactory.fromExerciseJoined({
					exercise,
					exercise_index,
					block_index,
					set_index
				});
			})
		};
	}

	// static fromSetInterval(
	// 	block: RoutineBlockJoined & { interval: Interval },
	// 	{
	// 		set_index,
	// 		block_index,
	// 		exercise_index
	// 	}: {
	// 		set_index: number;
	// 		block_index: number;
	// 		exercise_index: number;
	// 	}
	// ) {
	// 	return {
	// 		set_index,
	// 		block_index,
	// 		exercise_index,
	// 		interval_preset: block.interval,
	// 		interval_done: {
	// 			id: undefined as any,
	// 			rest_time: 0,
	// 			active_time: 0
	// 		}
	// 	};
	// }
}
class ExerciseLogFactory {
	static fromExerciseJoined({
		exercise,
		exercise_index,
		block_index,
		set_index
	}: {
		exercise: ExerciseInRoutineJoined;
		exercise_index: number;
		block_index: number;
		set_index: number;
	}): ExerciseLogJoined {
		return {
			exercise_index,
			block_index,
			set_index,
			exercise,
			time_spent: 0,
			interval_preset: exercise.interval,
			interval_done: {
				id: undefined as any,
				rest_time: 0,
				active_time: 0
			},
			repetition_done: {
				id: undefined as any,
				count: 0,
				seconds_static_hold: 0,
				rpe_from: 0,
				rpe_to: 0
			},
			repetition_preset: exercise.repetition,
			weight_done: exercise.weight,
			weight_preset: exercise.weight
		};
	}
}
