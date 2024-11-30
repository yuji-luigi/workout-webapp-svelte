<script lang="ts">
	let count = 0;
	let min = 0;
	let max = 0;
	let unit = '';

	// in case of the sets input.
	// I want to change the form value by on change the count.
	// 1. Get correct form: can be form id to get the correct form form DOM
	// 2. correct index of the workout to mutate the form.workouts:ExerciseJoined[index] index workout should be updated to
	// shape of the workouts[]
	/* 	{
      ...ExerciseJoined, 
      n_sets: number, 
      seconds_rest: number, 
      seconds_active: number
  } */
	// 3. accept index, fieldName as argument so the value can be updated
</script>

<div class="counter">
	<button
		class="button"
		type="button"
		onclick={() => {
			if (count > min) {
				count--;
			}
		}}>-</button
	>
	<h4>
		{unit ? unit + ': ' : ''}
		{count}
	</h4>
	<button
		class="button"
		type="button"
		onclick={() => {
			if (max && count >= max) {
				return;
			}
			count++;
		}}>+</button
	>
</div>

<style>
	:root {
		/** to change the font-size of the counter and button. Change --font-size-scoped value in parent
class of the component*/
		--font-size-scoped: 2rem;
	}

	.counter {
		display: grid;
		place-self: center;
		place-items: center;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		& button {
			padding: 0;
			width: calc(var(--font-size-scoped) + 1rem);
			height: calc(var(--font-size-scoped) + 1rem);
			font-size: var(--font-size-scoped);
			border-radius: 900px;
			color: var(--text-color-black);
		}
	}
	h4 {
		font-size: var(--font-size-scoped);
	}
</style>
