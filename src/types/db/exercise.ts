/** Primitive collection (no join needed) */
export interface Exercise {
	id: number; // primary key
	name: string; // Foreign key to Timer
	slug: string;
	description: string;
}
