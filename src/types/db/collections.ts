export const collections = [
	'workout',
	'exercise',
	'workout_set_type',
	'routine'
	// 'workout_set_type',
	// 'workout_workout_type',
	// 'timer'
] as const;

export type Collection = (typeof collections)[number];
