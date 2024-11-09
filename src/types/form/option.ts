export interface Option {
	/** id should be present when the value is stringified object to deselect options. it will be set to data-key attribute to handle deselect */
	id: string | number;
	value: string | number;
	label: string;
	image_url?: string;
}

export interface OptionWithIcon extends Option {
	icon?: string;
}
