export const collections = [
	'workout',
	'exercise',
	'workout_set_type',
	'workout_set',
	'routine'
	// 'workout_set'
	// 'interval'
] as const;

export type Collection = (typeof collections)[number];
