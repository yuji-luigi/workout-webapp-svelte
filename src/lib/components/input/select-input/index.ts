import InputGrid from '../InputGrid.svelte';
import SelectInputMulti from './SelectInputMulti.svelte';
import SelectInputSingle from './SelectInputSingle.svelte';

export const InputMap = {
	'select-multi': SelectInputMulti,
	'select-single': SelectInputSingle,
	text: InputGrid
};
