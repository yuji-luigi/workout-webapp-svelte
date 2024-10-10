// Type for Routine table
interface Routine {
	id: number; // primary key
	slug: string;
	name: string;
	description: string;
	image?: string;
}
