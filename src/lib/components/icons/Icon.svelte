<script lang="ts">
  export let src: string;
  export let alt: string | undefined = "icon";
  export let href: string | undefined;
  export let _class: string | undefined;
</script>

<div class={`corner ${_class}`}>
  {#if href}
    <a {href}>
      <img {src} {alt} />
    </a>
  {:else}
    <img {src} {alt} />
  {/if}
</div>

<style>
  .corner {
    width: 2em;
    height: 2em;
  }
</style>
