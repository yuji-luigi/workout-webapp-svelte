<script lang="ts">
	import { onMount } from 'svelte';
	import { closeDialog } from '../../../store/global-dialog-store';
	import type { Workout } from '../../../../types/db/workout';
	import type { Exercise } from '../../../../types/db/exercise';
	import { createQueryParams } from '../../../helpers/search-params/createQueryParams';
	import type { Routine } from '../../../../types/db/routine';
	import type { Workout_set } from '../../../../types/db/workout-set';

	let { routine }: { routine: Routine } = $props();
	// let _routine: Routine & { workout_flows: WorkoutFlow[] };

	// onMount(async function join_routine() {
	// 	const flow_params = createQueryParams({ id_routine: routine.id });
	// 	const raw_flows = await fetch(`../../api/workout_flow${flow_params}`);
	// 	const _flows = await raw_flows.json();
	// 	const fl_promises = _flows.map(async (flow: WorkoutFlow) => {
	// 		const _flow: WorkoutFlow & { workout_sets?: Workout_set[] } = flow;
	// 		const ws_params = createQueryParams({ id: flow.id_workout_set });
	// 		const raw_sets = await fetch(`../../api/workout_set/${ws_params}`);
	// 		const _sets = await raw_sets.json();
	// 		_flow.workout_sets = _sets;
	// 		return flow;
	// 	});

	// 	const flows = (await Promise.all(fl_promises)) as WorkoutFlow[];
	// 	console.log(flows);
	// 	const raw_workouts = await fetch('../../api/workout');
	// const raw_exercises = await fetch('../../api/exercise');
	// const raw__workout_sets = await fetch('../../api/workout_set');
	// const raw_timers = await fetch('../../api/timer');
	// const timers = await raw_timers.json();
	// const exercises = await raw_exercises.json();
	// const workouts = await raw_workouts.json();
	// const workout_sets = await raw__workout_sets.json();

	// routine.workout_flows.forEach((workout_flow: WorkoutFlow, iwf: number) => {
	// 	workout_sets.forEach((set: Workout_set, iws: number) => {
	// 		const _workout: Workout = workouts.find(
	// 			(workout: Workout) => workout.exercise_id === set.id_workout
	// 		);
	// 		const _exercise = exercises.find(
	// 			(exercise: Exercise) => exercise.id === _workout.exercise_id
	// 		);
	// 		const _timer = timers.find((timer: Timer) => timer.id === set.id_timer);

	// 		if (!routine.workout_flows[iwf].workout_sets) {
	// 			routine.workout_flows[iwf].workout_sets = [];
	// 		}
	// 	// 		routine.workout_flows[iwf].workout_sets[iws] = {
	// 	// 			...workout_sets[iws],
	// 	// 			name: _exercise.name,
	// 	// 			timer: _timer
	// 	// 		};

	// 	// 		//  set.id === routine.workout_flows[iwf].id_workout_set;
	// 	// 	});
	// 	// });
	// });

	function handlePush() {
		closeDialog();
	}
</script>

<div class="contents">
	<img src={''} alt="" height="300px" />
	<h5>{routine?.name}</h5>

	<div class="counter-section">
		<h4>{routine?.description}</h4>
	</div>
</div>
<div class="actions flex-row sm-column">
	<button class="button" onclick={closeDialog}>Back</button>
	<button onclick={handlePush} class="button">Confirm</button>
</div>

<style>
	:root {
		--gap: 0.5rem;
	}
	.contents {
		display: grid;
		place-content: center;
		place-items: center;
		gap: var(--gap);
	}

	.counter-section {
		display: grid;
		place-content: center;
		gap: var(--gap);
	}
	.flex-row {
		gap: var(--gap);
	}
	.counter {
		display: grid;
		place-self: center;
		place-items: center;
		grid-template-columns: repeat(3, 1fr);
		& button {
			--size: 2rem;
			padding: 0;
			width: var(--size);
			height: var(--size);
			font-size: var(--font-size-lg);
			border-radius: 900px;
			color: var(--text-color-black);
		}
	}
	.actions {
		margin-top: 1rem;
	}
	.button {
		width: 100%;
	}
</style>
