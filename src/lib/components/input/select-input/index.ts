import InputGrid from '../InputGrid.svelte';
import SelectInputMulti from './base/SelectInputMulti.svelte';
import SelectInputSingle from './base/SelectInputSingle.svelte';

export const InputMap = {
	'select-multi': SelectInputMulti,
	'select-single': SelectInputSingle,
	text: InputGrid
} as const;
