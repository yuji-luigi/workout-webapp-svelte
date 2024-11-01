import type { Collection } from '../db/collections';
import type { Option } from './option';

export type FormTableField = {
	name: string;
	label: string;
	multiple?: boolean;
	/** shared type with table cell and input. inputConfig field and tableConfig for specific setting for each view*/
	type: InputType;
	/** only for select kinds with static options */
	options?: Option[];
	formFieldConfig?: InputConfig;
	tableConfig?: InputConfig;
	hidden?: boolean; // hidden in table + form
	// only when type is 'id-input'
	collection?: Collection; //! can be circular dependency. watch out
};

export type InputConfig = {
	type?: InputType;
	hidden?: boolean;
};
export type TableConfig = {
	type?: string;
	hidden?: boolean;
};

type SharedInputType = InputType | 'id-input';

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

export function isInputKey(key: string): key is InputKey {
	return key in Inputs;
}
