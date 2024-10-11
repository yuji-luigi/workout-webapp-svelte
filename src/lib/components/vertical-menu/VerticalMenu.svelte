<script lang="ts">
	import {
		closeVerticalMenu,
		openVerticalMenu,
		verticalMenuStore,
		type DrawerStore
	} from '../../../store/vertical-menu-store';
	let verticalMenuParams: DrawerStore;
	verticalMenuStore.subscribe((value) => (verticalMenuParams = value));

	$: {
		console.log(verticalMenuStore);
		verticalMenuParams = $verticalMenuStore;
	}
</script>

<div id="mySidenav" class="sidenav" data-open={verticalMenuParams.isOpen}>
	<a href="" class="closebtn" on:click={closeVerticalMenu}>&times;</a>
	<a
		href="
  /manage/routine">create routine</a
	>
</div>

<style>
	.sidenav {
		height: calc(100% - var(--sub-header-height));
		width: var(--vertical-menu-width);
		transform: translate(100%);
		position: fixed;
		z-index: 1;
		right: 0;
		bottom: 0;
		background-color: #111;
		overflow-x: hidden;
		transition: 0.5s;
		padding-top: 60px;
		transition: transform 0.5s ease-in-out;
		&[data-open='true'] {
			transform: translate(0);
		}
	}

	.sidenav a {
		padding: 8px 8px 8px 32px;
		text-decoration: none;
		font-size: 25px;
		color: #818181;
		display: block;
		transition: 0.3s;
	}

	.sidenav a:hover {
		color: #f1f1f1;
	}

	.sidenav .closebtn {
		position: absolute;
		top: 0;
		right: 25px;
		font-size: 36px;
		margin-left: 50px;
	}

	@media screen and (max-height: 450px) {
		.sidenav {
			padding-top: 15px;
		}
		.sidenav a {
			font-size: 18px;
		}
	}
</style>
