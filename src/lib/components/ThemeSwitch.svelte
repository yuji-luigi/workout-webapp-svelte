<script lang="ts">
	let checkbox: HTMLInputElement;
	function handleThemeChange() {
		console.log(checkbox.checked);
		document.body.classList.toggle('dark');
	}
</script>

<div>
	<input bind:this={checkbox} type="checkbox" class="checkbox" on:change={handleThemeChange} />
	<label for="checkbox" class="checkbox-label">
		<i class="fas fa-moon"></i>
		<i class="fas fa-sun"></i>
		<span class="ball"></span>
	</label>
</div>

<style>
	div {
		position: relative;
	}
	.checkbox {
		opacity: 0;
		inset: 0;
		position: absolute;
		z-index: 1;
	}

	.checkbox-label {
		background-color: #111;
		width: 50px;
		height: 26px;
		border-radius: 50px;
		position: relative;
		padding: 5px;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.fa-moon {
		color: #f1c40f;
	}

	.fa-sun {
		color: #f39c12;
	}

	.checkbox-label .ball {
		background-color: #fff;
		width: 22px;
		height: 22px;
		position: absolute;
		left: 2px;
		top: 2px;
		border-radius: 50%;
		transition: transform 0.2s linear;
	}

	.checkbox:checked + .checkbox-label .ball {
		transform: translateX(24px);
	}

	/* 
.support {
	position: absolute;
	right: 20px;
	bottom: 20px;
}

.support a {
  color: #292c35;
  font-size: 32px;
  backface-visibility: hidden;
  display: inline-block;
  transition: transform 0.2s ease;
}

.support a:hover{
  transform: scale(1.1);
} */
</style>
