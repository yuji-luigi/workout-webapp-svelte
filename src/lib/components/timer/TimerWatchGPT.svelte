<script lang="ts">
	const FULL_DASH_ARRAY = 283;
	const TIME_LIMIT = 20; // seconds
	let timePassed = 0;
	let timeLeft = TIME_LIMIT;
	let timerInterval = null;

	function startTimer() {
		timerInterval = setInterval(() => {
			timePassed += 1;
			timeLeft = TIME_LIMIT - timePassed;
			document.getElementById('base-interval-label').innerHTML = formatTime(timeLeft);
			setCircleProgress();

			if (timeLeft === 0) {
				clearInterval(timerInterval);
			}
		}, 1000);
	}

	function formatTime(time) {
		let seconds = time % 60;
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		return `00:${seconds}`;
	}

	function setCircleProgress() {
		const rotation = ((TIME_LIMIT - timeLeft) / TIME_LIMIT) * 360;
		document.querySelector('.base-timer__fill').style.transform = `rotate(${rotation}deg)`;
	}

	startTimer();
</script>

<div class="base-interval">
	<div class="base-timer__circle">
		<div class="base-timer__filler"></div>
		<div class="base-timer__mask full"></div>
		<div class="base-timer__mask half">
			<div class="base-timer__fill"></div>
		</div>
	</div>
	<span id="base-interval-label" class="base-timer__label">20:00</span>
</div>

<style>
	body {
		font-family: sans-serif;
		display: grid;
		height: 100vh;
		place-items: center;
	}

	.base-interval {
		position: relative;
		width: 300px;
		height: 300px;
	}

	.base-timer__circle {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: lightgrey;
		border-radius: 50%;
		overflow: hidden;
	}

	.base-timer__mask {
		position: absolute;
		width: 100%;
		height: 100%;
		clip: rect(0, 150px, 300px, 0);
	}

	.base-timer__filler {
		width: 100%;
		height: 100%;
		background-color: orange;
	}

	.base-timer__mask.half .base-timer__fill {
		width: 100%;
		height: 100%;
		background-color: orange;
		clip: rect(0, 150px, 300px, 0);
		transform: rotate(0deg); /* This is updated dynamically */
		transform-origin: 50% 100%;
		transition: transform 1s linear;
	}

	.base-timer__label {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 48px;
		color: black;
	}
</style>
