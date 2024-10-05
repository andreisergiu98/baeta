import { createInputDirective } from '@baeta/core';
import { BadUserInput } from '@baeta/errors';
import type { Definition } from '../definition.ts';

interface Args {
	multipleOf?: number;
	max?: number;
	min?: number;
	exclusiveMin?: number;
	exclusiveMax?: number;
	oneOf?: number[];
	notOneOf?: number[];
}

const name = 'validInt';

const sdl = `directive @${name}(
    multipleOf: Int
    max: Int
    min: Int
    exclusiveMax: Int
    exclusiveMin: Int
    oneOf: [Int!]
    notOneOf: [Int!]
) on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
`;

const directive = createInputDirective<Args>({
	name,
	target: 'scalar',
	resolve(params) {
		const value = params.getValue();

		if (typeof value !== 'number') {
			return;
		}

		const config = params.directiveConfig;

		if (config.multipleOf != null && value % config.multipleOf !== 0) {
			throw new BadUserInput(`Value must be a multiple of ${config.multipleOf}`);
		}

		if (config.max != null && value > config.max) {
			throw new BadUserInput(`Value must not be greater than ${config.max}`);
		}

		if (config.min != null && value < config.min) {
			throw new BadUserInput(`Value must not be less than ${config.min}`);
		}

		if (config.exclusiveMax != null && value >= config.exclusiveMax) {
			throw new BadUserInput(`Value must be less than ${config.exclusiveMax}`);
		}

		if (config.exclusiveMin != null && value <= config.exclusiveMin) {
			throw new BadUserInput(`Value must be greater than ${config.exclusiveMin}`);
		}

		if (config.oneOf != null && !config.oneOf.includes(value)) {
			throw new BadUserInput(
				`Value must be one of ${config.oneOf.map((n) => n.toString()).join(', ')}`,
			);
		}

		if (config.notOneOf?.includes(value)) {
			throw new BadUserInput(
				`Value must not be one of ${config.notOneOf.map((n) => n.toString()).join(', ')}`,
			);
		}
	},
});

export const intValidation: Definition = {
	sdl,
	directive,
};
