<script>
	export let card;
</script>

<div class="flex-column">
	<img src={card.img} alt="" />
	<h3>{card.title}</h3>
	<p>{card.description}</p>
</div>

<style>
	.flex-column {
		gap: 1rem;
	}
</style>
