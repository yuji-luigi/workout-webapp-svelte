import type { ExerciseInRoutineJoined, ExerciseJoined } from '../../../types/db/exercise';
import { hasInterval, type Interval } from '../../../types/db/interval';
import type { RoutineJoined } from '../../../types/db/routine';
import type { RoutineBlockJoined } from '../../../types/db/routine_block_interface';
import type {
	BlockLog,
	ExerciseLogJoined,
	IntervalOnlyLog,
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
		const block_logs = routine.blocks.map((block, index) => {
			return {
				set_index: index,
				block_time_spent: 0,
				interval: block.interval,
				set_logs: SetLogFactory.fromRoutineBlockJoined(block, index)
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
	static fromRoutineBlockJoined(
		block: RoutineBlockJoined,
		block_index: number
	): (SetLogJoined | IntervalOnlyLog)[] {
		// create RoutineBlockJoined for n_set times
		const setLogs: (SetLogJoined | IntervalOnlyLog)[] = [];
		for (let set_index = 0; set_index < block.n_set; set_index++) {
			setLogs.push({
				...this.fromExerciseInRoutineJoined({
					set_index,
					block_index,
					exercises: block.exercises
				}),
				block_index
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
			id: 0,
			set_index,
			block_index,
			time_spent: 0,
			exerciseLogs: exercises.map((exercise, exercise_index) => {
				return this.fromExerciseJoined({ exercise, exercise_index });
			})
		};
	}
	static fromExerciseJoined({
		exercise,
		exercise_index
	}: {
		exercise: ExerciseInRoutineJoined;
		exercise_index: number;
	}): ExerciseLogJoined {
		return {
			id: 0,
			exercise_index,
			exercise,
			time_spent: 0,
			repetition_done: exercise.repetition,
			repetition_preset: exercise.repetition,
			weight_done: exercise.weight,
			weight_preset: exercise.weight
		};
	}
	static fromSetInterval(
		block: RoutineBlockJoined & { interval: Interval },
		{
			set_index,
			block_index,
			exercise_index
		}: {
			set_index: number;
			block_index: number;
			exercise_index: number;
		}
	) {
		return {
			set_index,
			block_index,
			exercise_index,
			interval_preset: block.interval,
			interval_done: {
				id: undefined as any,
				rest_time: 0,
				active_time: 0
			}
		};
	}
}
