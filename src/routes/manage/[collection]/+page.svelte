<script lang="ts">
  import { page } from "$app/stores";
  import * as AllFormTableFields from "$lib/data/template-json/dataTable";
  import type { RouteParams } from "./$types";

  import RoutineForm from "../../../lib/components/form/routine-form/RoutineForm.svelte";
  import {
    db_state,
    db_state_getter,
    type DBStateField,
  } from "../../../lib/store/lofi-db/workout-lofi.svelte";
  import type { Collection } from "../../../types/db/collections";
  import DataTable from "../../../lib/components/data-table/DataTable.svelte";
  import JsonForm from "../../../lib/components/form/routine-form/JsonForm.svelte";
  let loading = false;
  const collectionP = $page.params.collection as Collection;
  // TODO: type the page.params.collection
  let list = $state(db_state_getter[collectionP]);
  const formTableFields = AllFormTableFields[collectionP];
  $effect(() => {
    list = db_state_getter[collectionP];
  });
</script>

<RoutineForm />
<JsonForm {formTableFields} className="container" />
<DataTable {list} {formTableFields} />
