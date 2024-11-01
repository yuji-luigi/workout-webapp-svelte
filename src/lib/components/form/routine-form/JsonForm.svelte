<script lang="ts">
  import type { FormTableField } from "../../../../types/form/form-table-field";
  import { createFormDataToObject } from "../../../helpers/handle-array-form-data";
  import { sleep } from "../../../helpers/sleep";
  import InputController from "../../input/input-controller/InputController.svelte";
  import FormGrid from "../FormGrid.svelte";

  let {
    formTableFields,
    className,
  }: { formTableFields: FormTableField[]; className?: string } = $props();
  let loading = false;
  async function handleSubmit(event: SubmitEvent) {
    loading = true;
    const form_data = new FormData(event.target as HTMLFormElement);
    const dto = createFormDataToObject(form_data);
    console.log(dto);
    await sleep(500);
    loading = false;
  }
</script>

<FormGrid {handleSubmit} {loading} {className}>
  {#each formTableFields as formTableField}
    <InputController {formTableField} />
  {/each}

  <div class="fullWidth flex-column button-div">
    <button class="button" type="submit">Submit</button>
  </div>
</FormGrid>

<style>
  label {
    white-space: nowrap;
  }

  .input-group {
    display: grid;
    grid-column: span 2;
    gap: 0.5rem;
    grid-template-columns: subgrid;
    grid-auto-flow: dense;
    align-items: baseline;
    justify-items: end;
  }

  @container (max-width: 600px) {
    .input-group {
      gap: 0.25rem;
      justify-items: start;
      grid-column: 1/-1;
    }
  }
  .fullWidth {
    grid-column: 1/-1;
  }
  .button {
    width: unset;
    margin-left: auto;
  }
</style>
