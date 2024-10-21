export interface Option {
	value: string | number;
	label: string;
	image_url?: string;
}

export interface OptionWithIcon extends Option {
	icon?: string;
}
