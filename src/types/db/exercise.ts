// Type for Set table
export interface Exercise {
	id: number; // primary key
	name: number; // Foreign key to Timer
	slug: string;
	description: string;
}
