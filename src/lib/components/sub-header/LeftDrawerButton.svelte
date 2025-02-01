<!--
@component
- visibility of the buttons are controlled via body tag with has selector.
-->
<script>
	import ToggleRoutineDrawer from '$lib/sections/start-timer-components/ToggleRoutineDrawer.svelte';
</script>

<div>
	<ToggleRoutineDrawer />
</div>

<style>
	div {
		display: flex;
		justify-content: start;
		align-items: center;
	}
</style>
