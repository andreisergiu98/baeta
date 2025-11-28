import { floatValidation } from './lib/float/float-validation.ts';
import { inputConstraints } from './lib/input/input-validation.ts';
import { intValidation } from './lib/int/int-validation.ts';
import { lower, trim, upper } from './lib/string/string-utils.ts';
import { stringValidation } from './lib/string/string-validation.ts';

export const definitions = [
	floatValidation,
	intValidation,
	stringValidation,
	inputConstraints,
	trim,
	lower,
	upper,
];
