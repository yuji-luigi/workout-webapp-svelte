<script lang="ts">
	import { workoutFormTable } from '../../../lib/data/template-json/dataTable/workouts-form-table-json';

	workoutFormTable;
</script>

<section class="workout-form-section">
	<h3>create workout</h3>
	<fieldset>
		<form action="">
			<div>
				<label for="name">name</label>
				<input type="text" name="name" />
			</div>
			<div>
				<label for="description">description</label>
				<input type="text" name="description" />
			</div>
			<div>
				<label for="sets">sets</label>
				<div>
					<div class="card">add set</div>
					<div class="card">add set</div>
				</div>
			</div>
		</form>
	</fieldset>
</section>

<style>
	fieldset {
		border: none;
	}
	.workout-form-section {
		max-width: 800px;
		margin: 0 auto;
	}
	form {
		display: grid;
		gap: 1rem;
	}
</style>
