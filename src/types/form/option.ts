export interface Option {
	value: string | number;
	label: string;
}

export interface OptionWithIcon extends Option {
	icon?: string;
}
