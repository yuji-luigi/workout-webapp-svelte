import type { Option } from './option';

export type FormTableField = {
	name: string;
	label: string;
	multiple?: boolean;
	/** shared type with table cell and input. inputConfig field and tableConfig for specific setting for each view*/
	type: 'text' | 'number' | 'boolean';
	/** only for select kinds with static options */
	options?: Option[];
	formFieldConfig?: InputConfig;
	tableConfig?: InputConfig;
};

export type InputConfig = {
	type?: InputType;
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
	| 'select'
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
	| 'textarea';
