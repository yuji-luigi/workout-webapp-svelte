import type { ExerciseJoined } from '../../../../types/db/exercise';
import type { Workout } from './../../../../types/db/workout';
// TODO: Automatic generation of the class from interface. and validation logic before pushing into lofi-db
export class WorkoutTest implements Workout {
	id: string | number;
	name: string;
	slug: string;
	type: WSetType;
	rest_time?: number | undefined;
	active_time?: number | undefined;
	exercises: (ExerciseJoined & {
		rest_time: number;
		active_time: number;
		rpe: number;
		n_sets: number;
		rep_range: string;
	})[];
	created_by: number;

	constructor({ id, name, slug, type, rest_time, active_time, exercises, created_by }: Workout) {
		if (!id || !name || !slug || !type || !exercises || !created_by) {
			throw new Error('Invalid Workout');
		}
		this.id = id;
		this.name = name;
		this.slug = slug;
		this.type = type;
		this.rest_time = rest_time;
		this.active_time = active_time;
		this.exercises = exercises;
		this.created_by = created_by;
	}
}
