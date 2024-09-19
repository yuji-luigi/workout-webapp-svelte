<script>
  import "../style/app.css";
  import "../style/component.css";
  import "../style/utility.css";
  import Dialog from "../lib/components/Dialog.svelte";
  import VideoHero from "../lib/components/hero/VideoHero.svelte";
  import SubHeader from "./SubHeader.svelte";
</script>

<div class="app">
  <SubHeader />
  <main>
    <slot />
  </main>

  <footer>
    <p>
      visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
    </p>
  </footer>
</div>
<Dialog />

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  main {
    width: 100%;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
