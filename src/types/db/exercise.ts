import type { FileDB } from './file-db';
import type { Interval } from './interval';
import type { Repetition } from './Repetition';
import type { Weight, WeightJoined } from './weight';

/**
 * Primitive collection (no join needed)
 * GLOBALLY create exercise with name REST.
 * collection name is exercise but for commodity ue also REST as exercise.
 * */
export interface Exercise {
	id?: number; // primary key
	name: string; // Foreign key to Interval
	slug: string;
	description?: string;
	image?: FileDB | number | File;
	created_by_id: number;
}

export interface ExerciseJoined extends Exercise {
	created_by_name?: string;
}

// TODO: this is not a Exercise table, it should be separated table. creating new def under this interface.
export interface _ExerciseInRoutineJoined extends ExerciseJoined {
	interval?: Interval;
	// the target repetition.
	repetition: Repetition;
	// target or default weight value of the exercise when created under routine
	weight: Weight;
}

// New def of the ExerciseInRoutineJoined
export interface ExerciseInRoutine {
	exercise_id: number;
	interval_id?: number;
	repetition_id: number;
	weight_id: number;
}
export interface ExerciseInRoutineJoined extends Exercise {
	id: number;
	interval?: Interval;
	repetition: Repetition;
	weight?: WeightJoined;
}
