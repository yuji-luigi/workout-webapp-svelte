<script lang="ts">
	export let videoSrc;
	export let videoStyle: string | undefined = '';
</script>

<div class={`video-container video-hero ${$$props.class}`}>
	<video
		style={videoStyle}
		class={`video ${$$props.class}`}
		autoplay
		loop
		muted
		playsinline
		webkit-playsinline
	>
		<source src={videoSrc} type="video/mp4" />
	</video>
	<div class="hero-content-container">
		<div class="hero-content-top-right">
			<slot name="top-right"></slot>
		</div>
		<div class="hero-content-bottom-left">
			<slot name="bottom-left"></slot>
		</div>
	</div>
</div>

<style>
	video {
		--video-object-position: center;
		height: 100%;
		width: 100%;
		transform: scale(1.2);
		object-fit: cover;
		object-position: var(--video-object-position);
		z-index: 0;
		transform: translate(-50%, -50%);
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-playsinline: true;
	}
	.video-container {
		min-height: 100dvh;
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		transition: min-height 0.75s ease;
		transform: translateZ(-1px);

		@media (max-width: 768px) {
			min-height: 100dvh;
		}
		/* overflow: hidden; */
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.8);
			z-index: 1;
		}
	}
	.hero-content-container {
		display: flex;
		color: var(--text-color-white);
		flex-direction: column;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		padding: 2rem var(--padding-inline-main);
		padding-top: calc(var(--sub-header-height) + 2rem);
		z-index: 1;
	}
	.hero-content-bottom-left {
		margin-top: auto;
		margin-right: auto;
	}
	.hero-content-top-right {
		margin-bottom: auto;
		margin-left: auto;
	}
</style>
