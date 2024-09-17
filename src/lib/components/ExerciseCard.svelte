<script lang="ts">
  import { dialogStore, openDialog } from "../../store/dialog-store";
  import Dialog from "./Dialog.svelte";
  type Exercise = {
    name: string;
    description: string;
    image: string;
  };
  export let exercise: Exercise;

  const handleOpenDialog = () => {
    openDialog({
      component: /* html */ `
      <div class="">
        <h1 style="">${exercise.name}</h1>
        <p style="">${exercise.description}</p>
      </div>
        `,
    });
  };
</script>

<div
  role="button"
  tabindex="-1"
  class="card"
  on:keydown={(e) => null}
  on:click={handleOpenDialog}
>
  <img alt="exercise" src="https://picsum.photos/410/300" />
  <div>
    <h4>{exercise.name}</h4>
    <p class="description">
      {exercise.description}
    </p>
  </div>
  <!-- <button on:click={handleOpenDialog} class="read-more">Read more</button> -->
</div>

<style>
  img {
    width: 100%;
    max-height: 150px;
    object-fit: cover;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    cursor: pointer;
    gap: 0.75rem;
  }
  .description {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box; /* Add this */
    -webkit-line-clamp: 3; /* Add this */
    -webkit-box-orient: vertical; /* Add this */
  }
  .read-more {
    border: none;
    background-color: transparent;
    margin: auto 0 0 auto;
  }
</style>
