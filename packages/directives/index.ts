import type { InputDirective } from './lib/directive.ts';
import { floatValidation } from './lib/float/float-validation.ts';
import { inputConstraints } from './lib/input/input-validation.ts';
import { intValidation } from './lib/int/int-validation.ts';
import { stringValidation } from './lib/string/string-validation.ts';

export {
	createInputDirective,
	type InputDirective,
	type InputDirectiveOptions,
	type InputDirectiveParams,
	type InputDirectiveTarget,
} from './lib/directive.ts';
export { inputDirectives, inputValidationAppPlugin } from './lib/plugin.ts';

export const definitions: Array<{ sdl: string; directive: InputDirective }> = [
	floatValidation,
	intValidation,
	stringValidation,
	inputConstraints,
];
