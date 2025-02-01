import type { Exercise, ExerciseInRoutineJoined } from '../../../types/db/exercise';
import type { FileDB } from '../../../types/db/file-db';
import type { RoutineBlockJoined } from '../../../types/db/routine_block_interface';
import { db } from '../dexie-db/dexie-db';
import { Routine } from '../dexie-db/Routine';

export async function seedDexieDB() {
	const { workout_set_type, exercise, routine } = db;
	if ((await workout_set_type.toArray()).length === 0) {
		// workout_set_typeY.push([...defaultWorkoutTypes]);
		db.workout_set_type.bulkAdd(defaultWorkoutTypes);
	}
	if ((await exercise.toArray()).length === 0) {
		// exercisesY?.push([...calisthenicExercises]);
		await db.exercise.bulkAdd(calisthenicExercises);
	}
	if ((await routine.toArray()).length === 0) {
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
}
// export async function seedLocalDB() {
// 	try {
// 		await persistenceWorkoutDB?.whenSynced;
// 		const routinesDexie = await db.routine.toArray();
// 		const { workout_set_types, exercises } = db_state;
// 		if (workout_set_types.length === 0) {
// 			workout_set_typeY.push([...defaultWorkoutTypes]);
// 			db.workout_set_type.bulkAdd(defaultWorkoutTypes);
// 		}
// 		if (exercises.length === 0) {
// 			exercisesY?.push([...calisthenicExercises]);
// 			await db.exercise.bulkAdd(calisthenicExercises);
// 		}
// 		if (routinesDexie.length === 0) {
// 			const routines = [
// 				{ name: 'Routine 1', description: 'desc 1' },
// 				{
// 					name: 'Routine 2',
// 					description: 'A sample routine with 3 workouts'
// 				},
// 				{ name: 'Routine 3', description: 'desc 3' },
// 				{ name: 'Routine 4', description: 'desc 4' },
// 				{ name: 'Routine 5', description: 'desc 5' },
// 				{ name: 'Routine 6', description: 'desc 6' }
// 			].map((r) => generateRoutines(r));
// 			await db.routine.bulkAdd(routines);
// 		}
// 	} catch (error: any) {
// 		console.error(error?.message || error || 'Error seeding local db');
// 		console.error('Error seeding local db', error ? JSON.stringify(error, null, 4) : 'no message');
// 	}
// }

function generateRoutines({ name, description }: { name: string; description: string }) {
	const setsLength = Math.round(Math.random() * 7 + 3);
	// const setsLength = 0;
	const blocks: RoutineBlockJoined[] = Array.from({ length: setsLength }, (_, i) => {
		const type = defaultWorkoutTypes[Math.floor(Math.random() * defaultWorkoutTypes.length)];
		// const exercisesLength = 0;
		const exercisesLength = Math.round(Math.random() * 10 + 1);
		const exercises: ExerciseInRoutineJoined[] = Array.from({ length: exercisesLength }, (_, j) => {
			const baseExercise =
				calisthenicExercises[Math.floor(Math.random() * calisthenicExercises.length)];
			const exercise: ExerciseInRoutineJoined = {
				...baseExercise,
				id: undefined as any, // TODO: fix this
				videoSrc: test_videos.find((v) => v.id === baseExercise.video)?.full_path,
				repetition: {
					id: undefined as any, // TODO: fix this
					count: Math.round(Math.random() * 10 + 1),
					seconds_static_hold: Math.round(Math.random() * 10 + 1)
				},
				weight: {
					id: undefined as any, // TODO: fix this
					amount: Math.round(Math.random() * 10 + 1),
					weight_type_id: 1,
					weight_type: {
						id: 1,
						name: 'body weight',
						description: 'body weight'
					}
				}
			};
			return exercise;
		});
		return {
			id: undefined as any,
			name: `Set ${i + 1}`,
			description: `Set ${i + 1} description`,
			slug: `${name.toLowerCase().replace(' ', '-')}-${i}`,
			n_set: Math.round(Math.random() * 5),
			exercises,
			type,
			...((!type.use_exercise_timer || Math.random() < 0.5) && {
				interval: {
					id: undefined as any,
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
		blocks
	});
}

export const calisthenicExercises: Exercise[] = [
	{
		id: 1,
		name: 'Pull Up',
		slug: 'pull-up',
		video: 1,
		description:
			'A bodyweight exercise where you pull yourself up until your chin is above the bar.',
		image: undefined, // Replace with actual image reference if available
		created_by_id: 1
	},
	{
		id: 2,
		name: 'Push Up',
		slug: 'push-up',
		video: 2,
		description: 'A classic upper-body exercise where you push your body up from a prone position.',
		image: undefined,
		created_by_id: 1
	},
	{
		id: 3,
		name: 'Body Rows',
		slug: 'body-rows',
		video: 3,
		description: 'An exercise performed by pulling your body towards a horizontal bar.',
		image: undefined,
		created_by_id: 1
	},
	{
		id: 4,
		name: 'Ring Push Ups',
		slug: 'ring-push-ups',
		video: 1,
		description: 'A push-up variation using gymnastic rings for additional instability.',
		image: undefined,
		created_by_id: 1
	},
	{
		id: 5,
		name: 'Ring Dips',
		slug: 'ring-dips',
		video: 2,
		description: 'A dip exercise using gymnastic rings to target triceps, shoulders, and chest.',
		image: undefined,
		created_by_id: 1
	},
	{
		id: 6,
		name: 'Dips',
		slug: 'dips',
		video: 3,
		description:
			'An exercise where you lower and raise your body using parallel bars or a dip station.',
		image: undefined,
		created_by_id: 1
	},
	{
		id: 7,
		name: 'Pike Push Ups',
		slug: 'pike-push-ups',
		video: 1,
		description:
			'A push-up variation focusing on the shoulders by performing the exercise in a pike position.',
		image: undefined,
		created_by_id: 1
	},
	{
		id: 8,
		name: 'Handstand Push Ups',
		slug: 'handstand-push-ups',
		video: 1,
		description:
			'An advanced exercise performed in a handstand position, pushing your body up and down.',
		image: undefined,
		created_by_id: 1
	},
	{
		id: 9,
		name: 'Squats',
		slug: 'squats',
		video: 2,
		description: 'A lower-body exercise focusing on the quadriceps, hamstrings, and glutes.',
		image: undefined,
		created_by_id: 1
	},
	{
		id: 10,
		name: 'Lunges',
		slug: 'lunges',
		video: 1,
		description:
			'A single-leg bodyweight exercise that strengthens the quads, glutes, and hamstrings.',
		image: undefined,
		created_by_id: 1
	},
	{
		id: 11,
		name: 'Plank',
		slug: 'plank',
		video: 2,
		description: 'A core-strength exercise where you hold a position similar to the push-up.',
		image: undefined,
		created_by_id: 1
	},
	{
		id: 12,
		name: 'Mountain Climbers',
		slug: 'mountain-climbers',
		video: 3,
		description: 'A dynamic bodyweight exercise that works the core and cardiovascular system.',
		image: undefined,
		created_by_id: 1
	}
];
const defaultWorkoutTypes: RoutineBlockTypeI[] = [
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

const test_videos: FileDB[] = [
	{
		id: 1,
		name: 'test_video.mp4',
		full_path: '/videos/test_video.mp4',
		field_in_parent: 'video',
		parent_collection: 'exercise',
		slug: 'test_video',
		description: 'test video'
	},
	{
		id: 2,
		name: 'test_video2.mp4',
		full_path: '/videos/test_video2.mp4',
		field_in_parent: 'video',
		parent_collection: 'exercise',
		slug: 'test_video2',
		description: 'test video 2'
	},
	{
		id: 3,
		name: 'test_video3.mp4',
		full_path: '/videos/test_video3.mp4',
		field_in_parent: 'video',
		parent_collection: 'exercise',
		slug: 'test_video3',
		description: 'test video 3'
	}
];
