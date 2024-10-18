<div class="fancy-container">
	<div class="fancy"></div>
	<slot />
</div>

<style>
	@property --rotate {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}
	.fancy-container {
		--blue: #007bff;
		--rotate: 0deg;
		--radius: 50px;
		position: relative;
		border-radius: var(--radius);
		transition: 0.5s ease-in-out;
		.fancy {
			&:before {
				content: '';
				position: absolute;
				inset: 0;
				opacity: 0;
				transition: 0.5s ease-in-out;
				background: conic-gradient(
					from var(--rotate),
					transparent 0%,
					transparent 20%,
					rgba(0, 212, 255, 1) 50%,
					transparent 80%,
					transparent 100%
				);
				animation: rotate 4s linear infinite;
			}
			&:after {
				content: '';
				position: absolute;
				inset: 2px 0 2px 0;
				background: var(--bg-dark);
			}
		}

		&:hover {
			background-color: var(--bg-dark);
			transform: var(--scale-up-hover);
			.fancy {
				position: absolute;
				inset: 0;
				&:before {
					opacity: 1;
					content: '';
					position: absolute;
					inset: 0;
					background: conic-gradient(
						from var(--rotate),
						transparent 0%,
						transparent 20%,
						rgba(0, 212, 255, 1) 50%,
						transparent 80%,
						transparent 100%
					);
					animation: rotate 4s linear infinite;
				}

				&:after {
					content: '';
					position: absolute;
					inset: 2px 0 2px 0;
					background: var(--bg-dark);
				}
			}
		}
	}
	@keyframes rotate {
		to {
			--rotate: 360deg;
		}
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
