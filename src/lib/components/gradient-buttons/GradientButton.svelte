<script>
  export let text = "Click me";
  export let icon = "🚀";
</script>

<button style="--slist: #ffda5f, #f9376b" data-ico={icon}>{text}</button>

<style>
  button {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 0.5em;
    border: solid 0.25em transparent;
    padding: 1em 1.5em;
    border-radius: 9em;
    background:
      linear-gradient(to right bottom, var(--slist)) border-box,
      conic-gradient(from 90deg, #ffda5f, #f9376b);
    font:
      700 1.5em/ 1.25 ubuntu,
      sans-serif;
    text-transform: uppercase;

    &::after {
      content: attr(data-ico);
    }
  }
</style>
