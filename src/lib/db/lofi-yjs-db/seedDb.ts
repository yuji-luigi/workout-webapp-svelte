// import { exercisesY, workout_set_typeY } from './workout-lofi.svelte';

import type { Exercise, ExerciseInRoutineJoined } from '../../../types/db/exercise';
import type { WSetJoined } from '../../../types/db/WSetI';
import { db } from '../dexie-db/dexie-db';
import { Routine } from '../dexie-db/Routine';
import { lofi_db } from './lofi_db.svelte';
const { persistenceWorkoutDB, db_state, workout_set_typeY, exercisesY } = lofi_db;

export async function seedLocalDB() {
	try {
		await persistenceWorkoutDB?.whenSynced;
		const routinesDexie = await db.routine.toArray();
		const { workout_set_types, exercises } = db_state;
		if (workout_set_types.length === 0) {
			workout_set_typeY.push([...defaultWorkoutTypes]);
			db.workout_set_type.bulkAdd(defaultWorkoutTypes);
		}
		if (exercises.length === 0) {
			exercisesY?.push([...calisthenicExercises]);
			await db.exercise.bulkAdd(calisthenicExercises);
		}
		if (routinesDexie.length === 0) {
			const routines = [
				{ name: 'Routine 1', description: 'desc 1' },
				{
					name: 'Routine 2',
					description: 'A sample routine with 3 workouts'
				},
				{ name: 'Routine 3', description: 'desc 3' },
				{ name: 'Routine 4', description: 'desc 4' },
				{ name: 'Routine 5', description: 'desc 5' },
				{ name: 'Routine 6', description: 'desc 6' }
			].map((r) => generateRoutines(r));
			await db.routine.bulkAdd(routines);
		}
	} catch (error: any) {
		console.error(error?.message || error || 'Error seeding local db');
		console.error('Error seeding local db', error ? JSON.stringify(error, null, 4) : 'no message');
	}
}

function generateRoutines({ name, description }: { name: string; description: string }) {
	const setsLength = Math.round(Math.random() * 7 + 3);
	// const setsLength = 0;
	const sets: WSetJoined[] = Array.from({ length: setsLength }, (_, i) => {
		const type = defaultWorkoutTypes[Math.floor(Math.random() * defaultWorkoutTypes.length)];
		// const exercisesLength = 0;
		const exercisesLength = Math.round(Math.random() * 10 + 1);
		const exercises: ExerciseInRoutineJoined[] = Array.from({ length: exercisesLength }, (_, j) => {
			const exercise: ExerciseInRoutineJoined =
				calisthenicExercises[Math.floor(Math.random() * calisthenicExercises.length)];
			return {
				...exercise,
				...(type.use_exercise_timer && {
					interval: {
						// id: j,
						active_time: j + 1,
						rest_time: j + 2
						// active_time: Math.round(Math.random() * 30),
						// rest_time: Math.round(Math.random() * 20 + 30)
					}
				})
			};
		});
		return {
			// id: i,
			name: `Set ${i + 1}`,
			description: `Set ${i + 1} description`,
			slug: `${name.toLowerCase().replace(' ', '-')}-${i}`,
			n_set: Math.round(Math.random() * 5),
			exercises,
			type,
			...((!type.use_exercise_timer || Math.random() < 0.5) && {
				interval: {
					active_time: i + 11,
					rest_time: i + 33
					// active_time: Math.round(Math.random() * 60 + 20),
					// rest_time: Math.round(Math.random() * 60 + 40)
				}
			})
		};
	});
	return new Routine({
		slug: name.toLowerCase().replace(' ', '-'),
		name: name,
		description: 'A sample routine with 3 workouts',
		created_by: '',
		workout_sets: sets
	});
}

export const calisthenicExercises: Exercise[] = [
	{
		id: 1,
		name: 'Pull Up',
		slug: 'pull-up',
		description:
			'A bodyweight exercise where you pull yourself up until your chin is above the bar.',
		image: undefined // Replace with actual image reference if available
	},
	{
		id: 2,
		name: 'Push Up',
		slug: 'push-up',
		description: 'A classic upper-body exercise where you push your body up from a prone position.',
		image: undefined
	},
	{
		id: 3,
		name: 'Body Rows',
		slug: 'body-rows',
		description: 'An exercise performed by pulling your body towards a horizontal bar.',
		image: undefined
	},
	{
		id: 4,
		name: 'Ring Push Ups',
		slug: 'ring-push-ups',
		description: 'A push-up variation using gymnastic rings for additional instability.',
		image: undefined
	},
	{
		id: 5,
		name: 'Ring Dips',
		slug: 'ring-dips',
		description: 'A dip exercise using gymnastic rings to target triceps, shoulders, and chest.',
		image: undefined
	},
	{
		id: 6,
		name: 'Dips',
		slug: 'dips',
		description:
			'An exercise where you lower and raise your body using parallel bars or a dip station.',
		image: undefined
	},
	{
		id: 7,
		name: 'Pike Push Ups',
		slug: 'pike-push-ups',
		description:
			'A push-up variation focusing on the shoulders by performing the exercise in a pike position.',
		image: undefined
	},
	{
		id: 8,
		name: 'Handstand Push Ups',
		slug: 'handstand-push-ups',
		description:
			'An advanced exercise performed in a handstand position, pushing your body up and down.',
		image: undefined
	},
	{
		id: 9,
		name: 'Squats',
		slug: 'squats',
		description: 'A lower-body exercise focusing on the quadriceps, hamstrings, and glutes.',
		image: undefined
	},
	{
		id: 10,
		name: 'Lunges',
		slug: 'lunges',
		description:
			'A single-leg bodyweight exercise that strengthens the quads, glutes, and hamstrings.',
		image: undefined
	},
	{
		id: 11,
		name: 'Plank',
		slug: 'plank',
		description: 'A core-strength exercise where you hold a position similar to the push-up.',
		image: undefined
	},
	{
		id: 12,
		name: 'Mountain Climbers',
		slug: 'mountain-climbers',
		description: 'A dynamic bodyweight exercise that works the core and cardiovascular system.',
		image: undefined
	}
];
const defaultWorkoutTypes: WSetTypeI[] = [
	{
		id: 1,
		name: 'Reps And Sets',
		slug: 'reps-and-sets',
		use_active_time: false,
		use_rest_time: true,
		use_exercise_timer: false,
		description: 'Conventional workout with reps and sets',
		repeat: false
	},
	{
		id: 2,
		name: 'HIIT',
		slug: 'hiit',
		use_active_time: true,
		use_rest_time: true,
		use_exercise_timer: true,
		description: 'High Intensity Interval Training',
		repeat: false
	},
	{
		id: 3,
		name: 'Tabata',
		slug: 'tabata',
		use_active_time: true,
		use_rest_time: true,
		use_exercise_timer: true,
		description: 'Tabata workout',
		repeat: false
	},
	{
		id: 4,
		name: 'Circuit Training interval per exercise',
		slug: 'circuit-training-interval-per-exercise',
		use_active_time: true,
		use_rest_time: true,
		use_exercise_timer: false,
		description: 'Complete a series of exercises one after another with minimal rest',
		repeat: true
	},
	{
		id: 5,
		name: 'EMOM',
		slug: 'emom',
		use_active_time: true,
		use_rest_time: false,
		use_exercise_timer: false, // EMOM typically uses a global interval per minute
		description: 'Every Minute On the Minute - Perform a set number of reps each minute',
		repeat: true
	},
	{
		id: 6,
		name: 'AMRAP',
		slug: 'amrap',
		use_active_time: true,
		use_rest_time: false,
		use_exercise_timer: false, // AMRAP uses a single interval for the entire duration
		description:
			'As Many Rounds As Possible - Perform as many rounds of a set of exercises within a time limit',
		repeat: false
	},
	{
		id: 7,
		name: 'Pyramid',
		slug: 'pyramid',
		use_active_time: false,
		use_rest_time: true,
		use_exercise_timer: false, // Focuses on reps and sets rather than timers
		description: 'Gradually increase or decrease reps in a pyramid structure',
		repeat: false
	},
	{
		id: 8,
		name: 'Ladder',
		slug: 'ladder',
		use_active_time: false,
		use_rest_time: true,
		use_exercise_timer: false, // Increment/decrement reps without individual timers
		description: 'Increment or decrement the reps for each exercise in a ladder structure',
		repeat: true
	},
	{
		id: 9,
		name: 'Endurance',
		slug: 'endurance',
		use_active_time: true,
		use_rest_time: true,
		use_exercise_timer: false, // Long-duration focus without per-exercise timers
		description: 'Focus on long-duration exercises with minimal rest',
		repeat: false
	},
	{
		id: 10,
		name: 'Strength Training',
		slug: 'strength-training',
		use_active_time: false,
		use_rest_time: true,
		use_exercise_timer: false, // Heavy lifting with rest periods
		description: 'Focused on lifting heavy weights with sufficient rest between sets',
		repeat: false
	},
	{
		id: 11,
		name: 'Core Blast',
		slug: 'core-blast',
		use_active_time: true,
		use_rest_time: true,
		use_exercise_timer: false, // High-intensity core workouts without per-exercise timers
		description: 'Short, high-intensity workouts focused on the core',
		repeat: false
	},
	{
		id: 12,
		name: 'Stretch and Mobility',
		slug: 'stretch-and-mobility',
		use_active_time: true,
		use_rest_time: false,
		use_exercise_timer: false, // Focuses on flexibility without timers
		description: 'Focus on improving flexibility and mobility',
		repeat: false
	},
	{
		id: 13,
		name: 'Warm-Up',
		slug: 'warm-up',
		use_active_time: true,
		use_rest_time: false,
		use_exercise_timer: false, // Low-intensity prep without timers
		description: 'Low-intensity exercises to prepare the body for the main workout',
		repeat: false
	},
	{
		id: 14,
		name: 'Cooldown',
		slug: 'cooldown',
		use_active_time: true,
		use_rest_time: false,
		use_exercise_timer: false, // Low-intensity cooldown without timers
		description: 'Low-intensity exercises to cool down the body after a workout',
		repeat: false
	},
	{
		id: 15,
		name: 'Yoga Flow',
		slug: 'yoga-flow',
		use_active_time: true,
		use_rest_time: false,
		use_exercise_timer: true, // Each pose may have its own interval
		description: 'A series of yoga poses for relaxation and flexibility',
		repeat: false
	}
];
