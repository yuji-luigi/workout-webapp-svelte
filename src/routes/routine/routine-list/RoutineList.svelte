<script lang="ts">
	import { onMount } from 'svelte';
	import type { RoutineJoined } from '../../../types/db/routine';
	import { db } from '../../../lib/db/dexie-db/dexie-db';
	import RoutineCard from '../../../lib/components/card/cards/RoutineCard.svelte';
	import { createRandomImage } from '../../../lib/images/random-images';
	let { sectionClicked, routines }: { sectionClicked: () => void; routines: RoutineJoined[] } =
		$props();

	onMount(async () => {
		routines = await db.routines.toArray();
	});
</script>

{#each routines as routine, index}
	<RoutineCard {routine} active={false} {index} --image-url={`url(${createRandomImage()}`} />
{/each}
