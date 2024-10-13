<div class="grid">
	<div class="item">Item 1</div>
	<div class="item">Item 2</div>
	<div class="item">Item 3</div>
	<div class="item">Item 4</div>
	<div class="subgrid">
		<div class="item">Item 5_1</div>
		<div class="item">Item 5_2</div>
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		padding: 1rem;
		background-color: #aba7a7;
	}

	.subgrid {
		display: grid;
		/* grid-template-columns: repeat(2, 1fr); */
		grid-column: span 2;
		grid-template-columns: subgrid;

		gap: 1rem;
	}

	.item {
		background-color: #4e4b44;
		color: white;
		padding: 20px;
	}
	.subgrid .item {
		background-color: #c94545;
	}
</style>
