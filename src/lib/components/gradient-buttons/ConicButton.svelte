<button>
	<div class="fancy"></div>
	<span class="text">Download For Free</span>
</button>

<style>
	@property --rotate {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}
	button {
		--blue: #007bff;
		--rotate: 0deg;
		--radius: 50px;
		margin: 1rem;
		position: relative;
		padding: 1rem 2rem;
		border-radius: var(--radius);
		color: white;
		font-size: 1.5rem;
		font-weight: bold;
		overflow: hidden;
		background-color: var(--blue);
		.fancy {
			position: absolute;
			inset: 0;
			&:before {
				content: '';
				position: absolute;
				inset: 0;
				background: conic-gradient(from var(--rotate), transparent 0%, white 5%, transparent 10%);
				animation: rotate 2s linear infinite;
			}
			&:after {
				content: '';
				position: absolute;
				inset: 2px;
				/* background: red; */
				background: var(--blue);
				border-radius: calc(var(--radius) - 2px);
			}
		}
		.text {
			position: relative;
		}
	}
	@keyframes rotate {
		to {
			--rotate: 360deg;
		}
	}
</style>
