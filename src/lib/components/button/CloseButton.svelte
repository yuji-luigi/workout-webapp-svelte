<script lang="ts">
	let { onclick }: { onclick: () => void } = $props();
</script>

<button class="closebtn" {onclick}>&times;</button>

<style>
	.closebtn {
		--size-default: var(--size, 36px);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		width: var(--size-default);
		height: var(--size-default);
		/* position: absolute; */
		/* top: 1rem;
		right: 1rem; */
		font-size: calc(var(--size-default) + 6px);
		/* margin-left: 50px; */
		color: var(--text-color-white);
		transition: 0.3s ease-in-out;
		&:hover {
			background-color: var(--text-color-white);
			color: var(--text-color-black);
		}
	}
</style>
