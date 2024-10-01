import { SchemaTransformer } from '@baeta/core/sdk';
import { Definition } from './lib/definition';
import { floatValidation } from './lib/float/float-validation';
import { inputConstraints } from './lib/input/input-validation';
import { intValidation } from './lib/int/int-validation';
import { lower, trim, upper } from './lib/string/string-utils';
import { stringValidation } from './lib/string/string-validation';

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
