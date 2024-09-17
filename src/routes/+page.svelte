<script>
  import Counter from "./Counter.svelte";
  import WorkoutPlanCard from "../lib/components/WorkoutPlanCard.svelte";
  import GradientButton from "../lib/components/GradientButton.svelte";
  import Layout from "./+layout.svelte";
  import Container from "../lib/components/Container.svelte";
  import VideoHero from "../lib/components/hero/VideoHero.svelte";
  const workoutPlans = [
    {
      name: "Workout Plan",
      description: "This is a workout plan",
      duration: "1 hour",
      intensity: "High",
    },

    {
      name: "Workout Plan",
      description: "This is a workout plan",
      duration: "1 hour",
      intensity: "High",
    },
  ];
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
<VideoHero videoSrc="/videos/cover/box_male.mp4" />
<Container>
  <section>
    <h1>
      to your new<br />SvelteKit app
    </h1>

    <h2>
      try editing <strong>src/routes/+page.svelte</strong>
    </h2>
    <!-- for loop -->

    <Counter />
    <div class="workout-plans">
      {#each workoutPlans as workoutPlan}
        <WorkoutPlanCard {workoutPlan} />
      {/each}
    </div>
    <GradientButton text="Click me" icon="🚀" />
  </section>
</Container>

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
  }
  .workout-plans {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 0.6;
    gap: 1rem;
    overflow: auto;
  }
  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
