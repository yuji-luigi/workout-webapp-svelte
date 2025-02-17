import type { ExerciseInRoutineJoined } from '../../../../types/db/exercise';
import type { RoutineJoined } from '../../../../types/db/routine';
import type { Workout } from '../../../../types/db/workout';
import type { RoutineBlockJoined } from '../../../../types/db/routine_block_interface';
import { hasId } from '../../../../types/util-types/hasID';
import type { SetOptional } from '../../../../types/util-types/setOptional';
import { ValidationError } from '../../../errors/validation-error';
import { db } from '../dexie-db';
import { RoutineBlock } from './RoutineBlock';
import type { User } from '../../../../types/db/user';

// api for using the dexie db
export class RoutineDexie {
	id?: number;
	slug: string;
	name: string;
	description: string;
	image?: string | undefined;
	blocks: RoutineBlockJoined[];
	created_by: User;

	constructor(fields: {
		slug: string;
		name: string;
		description: string;
		blocks: RoutineBlockJoined[];
		created_by: User;
	}) {
		const _blocks = fields.blocks.map((block) => {
			return new RoutineBlock(block);
		});
		fields.blocks = _blocks;
		RoutineDexie.validate(fields);
		const { slug, name, description, blocks, created_by } = fields;
		/** id is created for temporal purpose. before creation of the record it will be set to undefined to get the auto inc-ID */
		this.slug = slug;
		this.name = name;
		this.description = description;
		this.blocks = blocks;
		this.created_by = created_by;
	}

	static async getById(id: number) {
		return db.routines.get(id);
	}
	static validate(fields: Partial<RoutineJoined>) {
		const errors: Record<string, string> = {};
		if (!fields.name) {
			errors['name'] = 'Name is required';
		}
		if (!fields.slug) {
			errors['slug'] = 'Slug is required';
		}
		if (!fields.description) {
			errors['description'] = 'Description is required';
		}
		if (!fields.blocks || !fields.blocks.length) {
			errors['blocks'] = 'Workout sets are required';
		}

		if (fields.blocks?.length) {
			fields.blocks.forEach((workoutSet, index) => {
				try {
					RoutineBlock.validate(workoutSet);
				} catch (error: any) {
					errors[`blocks[${index}]`] = error.message;
				}
			});
		}
		if (Object.keys(errors).length) {
			throw new ValidationError(errors);
		}
		return true;
	}
	static async getAll() {
		return db.routines.toArray();
	}

	async create() {}
	static async update(routine: RoutineJoined) {
		return await db.routines.put(routine);
	}
	async save() {
		if (hasId(this)) {
			return await db.routines.put(this as any);
		} else {
			return await RoutineDexie.add(this as any);
		}
	}

	static async add(fields: Omit<RoutineJoined, 'id'>): Promise<RoutineJoined> {
		const instance = new RoutineDexie(fields as any);
		// 2. Validate. If invalid, it throws ValidationError
		// this.validate(fields);
		const newID = await db.routines.add({
			...instance,
			// id should be undefined to get the auto-incremented id from the db
			// @ts-ignore
			id: undefined
		});
		return {
			...instance,
			id: newID,
			created_by_id: instance.created_by.id
		};
	}
	static async removeById(id: number) {
		return db.routines.delete(id);
	}
}
