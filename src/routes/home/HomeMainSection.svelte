<script>
	import placeholder_img from '$lib/images/placeholder/placeholder-home-1.jpg';
</script>

<section class="container">
	<h1>Workout web v1</h1>
	<p>
		The workout web v1 is a web application that allows users to view workout plans and follow along
		with workout videos. The application is built using Svelte and Tailwind CSS. The application has
		a homepage that displays a list of workout plans and a follow-along page that displays workout
		videos. Users can click on a workout plan to view more details and follow along with the workout
		videos. The application is responsive and works on both desktop and mobile devices.
	</p>
	<img src={placeholder_img} alt="app" />
	<p>
		There will be mobile app available soon. I will enhance the web app with more features and
		functionalities in the future. You will be able to track your progress, set goals, and share
		your achievements with friends. Also you will be able to create your own workout plans and share
		them with the community.
	</p>
	<p>Stay tuned for more updates!</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
		margin-bottom: 1rem;
	}
	img {
		margin-block: 2rem;
	}
	p {
		width: 100%;
		text-align: start;
	}
</style>
