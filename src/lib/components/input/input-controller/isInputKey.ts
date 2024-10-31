import * as Inputs from './';
type InputKey = keyof typeof Inputs;

export function isInputKey(key: string): key is InputKey {
	return key in Inputs;
}
