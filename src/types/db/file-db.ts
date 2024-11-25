export type FileDB = {
	id: number;
	name: string;
	full_path: string;
	parent_collection: string;
	field_in_parent: string;
	slug: string;
	description: string;
	src?: string;
};
