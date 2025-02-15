import { db } from '../dexie-db';
import type { RoutineBlockJoined } from '$types/db/routine_block_interface';

// RoutineBlockTypeI Class
export class RoutineBlockType implements RoutineBlockTypeI {
	image_url?: string | undefined;
	description!: string;
	use_exercise_timer!: boolean;
	id!: number;
	slug!: string;
	name!: string;
	repeat!: boolean;
	use_active_time!: boolean;
	use_rest_time!: boolean;

	private validate() {
		if (!this.name || typeof this.name !== 'string') {
			throw new Error('Name is required and must be a string');
		}

		if (!this.slug || typeof this.slug !== 'string') {
			throw new Error('Slug is required and must be a string');
		}

		if (typeof this.use_exercise_timer !== 'boolean') {
			throw new Error('use_exercise_timer must be a boolean');
		}

		if (typeof this.use_active_time !== 'boolean') {
			throw new Error('use_active_time must be a boolean');
		}

		if (typeof this.use_rest_time !== 'boolean') {
			throw new Error('use_rest_time must be a boolean');
		}

		if (typeof this.repeat !== 'boolean') {
			throw new Error('repeat must be a boolean');
		}

		if (this.image_url !== undefined && typeof this.image_url !== 'string') {
			throw new Error('image_url must be a string if provided');
		}

		if (typeof this.description !== 'string') {
			throw new Error('description must be a string');
		}
	}

	async save() {
		this.validate();
		return db.workout_set_type.put(this);
	}

	static async add(fields: Partial<RoutineBlockType>): Promise<RoutineBlockType> {
		const instance = new RoutineBlockType();
		Object.assign(instance, fields);
		await instance.save();
		return instance;
	}
	static async getAll(): Promise<RoutineBlockTypeI[]> {
		return await db.workout_set_type.toArray();
	}
}
