<script lang="ts">
	let { onclick }: { onclick: () => void } = $props();
</script>

<button class="closebtn" {onclick}>&times;</button>

<style>
	.closebtn {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		width: 36px;
		height: 36px;
		/* position: absolute; */
		/* top: 1rem;
		right: 1rem; */
		font-size: 46px;
		/* margin-left: 50px; */
		color: var(--text-color-white);
		transition: 0.3s ease-in-out;
		&:hover {
			background-color: var(--text-color-white);
			color: var(--text-color-black);
		}
	}
</style>
