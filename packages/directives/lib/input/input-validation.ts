import { createInputDirective } from '@baeta/core';
import { BadUserInput } from '@baeta/errors';

interface Args {
	minFields?: number;
	maxFields?: number;
}

const name = 'constraints';

const sdl = `directive @${name}(
    minFields: Int
    maxFields: Int
) on INPUT_OBJECT
`;

const directive = createInputDirective<Args>({
	name,
	target: 'object',
	resolve(params) {
		const value = params.getValue();

		if (typeof value !== 'object' || value == null) {
			return;
		}

		const config = params.directiveConfig;
		let definedCount = 0;
		for (const v of Object.values(value)) {
			if (v != null) definedCount++;
		}

		if (config.maxFields && definedCount > config.maxFields) {
			throw new BadUserInput(
				`Maximum ${config.maxFields} number of fields allowed, got ${definedCount}!`,
			);
		}

		if (config.minFields && definedCount < config.minFields) {
			throw new BadUserInput(
				`Minimum ${config.minFields} number of fields allowed, got ${definedCount}!`,
			);
		}
	},
});

export const inputConstraints = {
	sdl,
	directive,
};
