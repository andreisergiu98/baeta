import type { SchemaTransformer } from '@baeta/core/sdk';
import type { Definition } from './lib/definition.ts';
import { floatValidation } from './lib/float/float-validation.ts';
import { inputConstraints } from './lib/input/input-validation.ts';
import { intValidation } from './lib/int/int-validation.ts';
import { lower, trim, upper } from './lib/string/string-utils.ts';
import { stringValidation } from './lib/string/string-validation.ts';

export const definitions: Definition[] = [
	floatValidation,
	intValidation,
	stringValidation,
	inputConstraints,
	trim,
	lower,
	upper,
];

export function registerDirectives(module: {
	$directive: (transformer: SchemaTransformer) => void;
}) {
	for (const definition of definitions) {
		module.$directive(definition.directive);
	}
}
