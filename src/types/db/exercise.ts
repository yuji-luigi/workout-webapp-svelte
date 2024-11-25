import type { FileDB } from './file-db';

/**
 * Primitive collection (no join needed)
 * GLOBALLY create exercise with name REST.
 * collection name is exercise but for commodity ue also REST as exercise.
 * */
export interface Exercise {
	id: number; // primary key
	name: string; // Foreign key to Timer
	slug: string;
	description: string;
	image?: FileDB | number | File;
}
