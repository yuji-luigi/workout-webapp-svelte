export const collections = [
	'workout',
	'exercise',
	'workout_set_type',
	'routine',
	'workout_set'
	// 'timer'
] as const;

export type Collection = (typeof collections)[number];
