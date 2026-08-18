import type { Collection } from '../db/collections';
import type { Exercise, ExerciseJoined } from '../db/exercise';
import type { WorkoutJoined } from '../db/workout';
import type { Option } from './option';

export type BaseFormTableField = {
	name: string;
	label: string;
	multiple?: boolean;
	/** explicitly state for all the field */
	required: boolean;
	/** shared type with table cell and input. inputConfig field and tableConfig for specific setting for each view*/
	type: InputType; // Exclude 'slug' from BaseFormTableField
	/** only for select kinds with static options */
	options?: Option[];
	formFieldConfig?: InputConfig;
	tableConfig?: InputConfig;
	placeholder?: string;
	hidden?: boolean; // hidden in table + form
	defaultValue?: any;
	// only when type is 'id-input'
	collection?: Collection; //! can be circular dependency. watch out
};

export type SlugFormTableField = {
	name: string;
	label: string;
	type: 'slug'; // Explicitly 'slug'
	from: string; // 'from' is required
} & Omit<BaseFormTableField, 'type'>;

export type SetsConfigButtonField = {
	name: string;
	label: string;
	type: 'sets-config-section-input'; // Explicitly 'slug'
} & Omit<BaseFormTableField, 'type'>;

export type FormTableField = BaseFormTableField | SlugFormTableField | SetsConfigButtonField;

export type InputConfig = {
	type?: InputType | 'sets-config-section-input';
	hidden?: boolean;
};
export type TableConfig = {
	type?: string;
	hidden?: boolean;
};

type InputType =
	| 'text'
	| 'number'
	| 'boolean'
	| 'select-single'
	| 'multi-select'
	| 'static-select'
	| 'radio'
	| 'checkbox'
	| 'date'
	| 'time'
	| 'datetime'
	| 'file'
	| 'image'
	| 'color'
	| 'password'
	| 'email'
	| 'tel'
	| 'url'
	| 'textarea'
	// can be only for input
	| 'id-input';

type InputKey = keyof FormTableField;

// TODO: eliminate this function
export function isInputKey(key: string): key is InputKey {
	return [
		'name',
		'label',
		'multiple',
		'type',
		'options',
		'formFieldConfig',
		'tableConfig',
		'placeholder',
		'hidden',
		'collection',
		'from'
	].includes(key);
}

type TMap = {
	'id-input': number | string;
	text: string;
	slug: string;
	'multi-select': number[];
	number: number;
};
type CMap = {
	exercise: ExerciseJoined;
	workout: WorkoutJoined;
};

export type PayloadFromForm<
	FormType extends readonly { name: string; type: string; collection?: string }[]
> = {
	[F in FormType[number] as F['name']]: F['collection'] extends keyof CMap
		? F['type'] extends 'multi-select'
			? CMap[F['collection']][]
			: CMap[F['collection']]
		: F['type'] extends keyof TMap
			? TMap[F['type']]
			: unknown;
};
