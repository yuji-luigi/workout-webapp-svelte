<script lang="ts">
	import { onDestroy, unmount } from 'svelte';
	import ExerciseMenu from '../../lib/components/menu/ExerciseMenu.svelte';
	import { closeStackDialog } from '../../lib/store/dialog-stack/dialogStackStore';
	let {
		resolve,
		reject
	}: {
		resolve?: (data?: any) => void;
		reject?: (data?: any) => void;
	} = $props();
	function onclick(exercise: any) {
		closeStackDialog();
		resolve && resolve(exercise);
	}
</script>

<div class="">
	<ExerciseMenu {onclick} />
</div>

<style>
	
  
</style>
