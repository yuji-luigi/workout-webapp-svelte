<script>
	import why_this_app_img from '$lib/images/placeholder/placeholder-nike-home2.jpg';
	import program_img from '$lib/images/placeholder/placeholder-nike-program.jpg';
	import program_img2 from '$lib/images/placeholder/placeholder-nike-program-2.jpg';
	import CardColumn from '../../lib/components/card/CardColumn.svelte';

	const cards = [
		{
			title: 'Create timer',
			description:
				'Simple! Just create timer for single workout to routine just like a timer app. You can share it or you can use the other user created timer.',
			img: '/src/lib/images/placeholder/placeholder-nike-card1.jpg'
		},
		{
			title: 'Save records and progress',
			description:
				'You can also share these information with the community. You can also follow along with workout videos and track your progress. Or even by geologically. So you can influence others and motivate each other.',

			img: '/src/lib/images/placeholder/placeholder-nike-card-3.jpg'
		},
		{
			title: 'Create your own workout plans',
			description:
				'You can create your own plan. Then you can make it as a subscription plan. So you can earn money by sharing your workout plan. You can also follow along with workout videos and track your progress.',
			img: '/src/lib/images/placeholder/placeholder-nike-card-2.jpg'
		}
	];
</script>

<div class="stretch-container">
	<img src={why_this_app_img} alt="" />
</div>
<article class="container flex-column">
	<h2>Why you want to use this app??</h2>
	<p>
		This app will help you to monitor your workout progress and help you to achieve your fitness
		goals. You can create your own workout plans and share them with the community. You can also
		follow along with workout videos and track your progress. The app is responsive and works on
		both desktop and mobile devices. Stay tuned for more updates!
	</p>
</article>
<div class="stretch-container grid-card">
	{#each cards as card}
		<CardColumn {card} />
	{/each}
</div>
<div class="container">
	<img src={program_img} alt="" />
	<article class="flex-column">
		<h2>The program</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vero amet eaque ad doloremque
			maiores soluta iste eveniet voluptates enim sequi quaerat iure suscipit mollitia sapiente in
			quisquam ducimus, ipsam obcaecati quasi perspiciatis nisi? Provident molestiae repellendus
			optio nihil libero.
		</p>
	</article>
	<img src={program_img2} alt="" />
	<article>
		<h2>Program the app as you like!</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vero amet eaque ad doloremque
			maiores soluta iste eveniet voluptates enim sequi quaerat iure suscipit mollitia sapiente in
			quisquam ducimus, ipsam obcaecati quasi perspiciatis nisi? Provident molestiae repellendus
			optio nihil libero.
		</p>
	</article>
</div>

<style>
	h2 {
		text-align: start;
	}
	article {
		margin-block: 2rem;
	}
	.stretch-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.container {
		max-width: 60rem;
	}
	.grid-card {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
		& img {
			height: 600px;
		}
	}
	.flex-column {
		gap: 0.5rem;
	}
</style>
