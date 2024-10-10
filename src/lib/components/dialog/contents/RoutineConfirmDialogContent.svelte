<script lang="ts">
	import { onMount } from 'svelte';
	import { closeDialog } from '../../../../store/dialog-store';
	import type { Workout } from '../../../../types/db/workout';
	import type { Exercise } from '../../../../types/db/exercise';

	export let routine: Routine;
	onMount(async function join_routine() {
		const flow_params = new URLSearchParams();
		flow_params.append('id_routine', routine.id.toString());
		const raw_flows = await fetch(`../../api/workout_flow?${flow_params.toString()}`);
		const flows = await raw_flows.json();
		const routine_ids = flows.map((flow: WorkoutFlow) => flow.id_routine);
		const params = new URLSearchParams();

		routine_ids.forEach((id) => params.append('id', id));
		// const flow_params = params.toString();
		// const raw_flows_beta = await fetch(`../../api/workout_flow?${flow_params}`);

		const target_flows = flows.filter((flow: WorkoutFlow) => flow.id_routine === routine.id);
		routine.workout_flows = target_flows;

		const raw_workouts = await fetch('../../api/workout');
		const raw_exercises = await fetch('../../api/exercise');
		const raw__workout_sets = await fetch('../../api/workout_set');
		const raw_timers = await fetch('../../api/timer');
		const timers = await raw_timers.json();
		const exercises = await raw_exercises.json();
		const workouts = await raw_workouts.json();
		const workout_sets = await raw__workout_sets.json();

		routine.workout_flows.forEach((workout_flow: WorkoutFlow, iwf: number) => {
			workout_sets.forEach((set: Workout_set, iws: number) => {
				const _workout: Workout = workouts.find(
					(workout: Workout) => workout.id_exercise === set.id_workout
				);
				const _exercise = exercises.find(
					(exercise: Exercise) => exercise.id === _workout.id_exercise
				);
				const _timer = timers.find((timer: Timer) => timer.id === set.id_timer);

				if (!routine.workout_flows[iwf].workout_sets) {
					routine.workout_flows[iwf].workout_sets = [];
				}
				routine.workout_flows[iwf].workout_sets[iws] = {
					...workout_sets[iws],
					name: _exercise.name,
					timer: _timer
				};

				//  set.id === routine.workout_flows[iwf].id_set;
			});
		});
	});

	function handlePush() {
		closeDialog();
	}
</script>

<div class="contents">
	<img src={''} alt="" height="300px" />
	<h5>{routine.name}</h5>

	<div class="counter-section">
		<h4>{routine.description}</h4>
	</div>
</div>
<div class="actions flex-row sm-column">
	<button class="button-primary">Back</button>
	<button on:click={handlePush} class="button-primary">Confirm</button>
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
			color: var(--text-color-dark);
		}
	}
	.actions {
		margin-top: 1rem;
	}
	.button-primary {
		width: 100%;
	}
</style>
