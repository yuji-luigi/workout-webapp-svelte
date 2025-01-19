// is used in ExerciseInRoutineJoined
// one to one relationship with exercise or exercise_in_history
export interface Weight {
	id?: number;
	amount: number;
	weight_type_id: number;
}

// barbel, dumbbell, body weight, weight vest, weight belt, weight plate.
export interface WeightType {
	id: number;
	name: string;
	description: string;
}

export interface WeightJoined extends Weight {
	weight_type: WeightType;
}
