import { routineFormTableJson } from '../../../../lib/data/template-json/dataTable/routine-form-table-json';
import { RoutineDexie } from '../../../../lib/db/dexie-db/orm/RoutineDexie';
import { getFormDefaultValues } from '../../../../lib/helpers/form-helper/get_default_values';
import { setFormIdCtx } from '../../../../lib/store/form/form-context';
import { setForm } from '../../../../lib/store/form/form-store.svelte';

export const ssr = false;

export const load = async ({ params }) => {
	const routine = await RoutineDexie.getById(Number(params.id));

	return { routine };
};
