export const collections = [
	'workout',
	'exercise',
	'routine'
	// 'workout_type',
	// 'workout_workout_type',
	// 'timer'
] as const;

export type Collection = (typeof collections)[number];
