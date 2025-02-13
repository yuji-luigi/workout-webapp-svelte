import type { BlockLog, ExerciseLogJoined, SetLogJoined } from './routine_log';

// TODO: workout flow is now mixed with blockLog, setLog, and exerciseLog.
// TODO: workout flow should be only setLog.
export type WorkoutFlow = SetLogJoined | BlockLog | ExerciseLogJoined;
