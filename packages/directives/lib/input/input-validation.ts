import { BadUserInput } from '@baeta/errors';
import { createInputDirective } from '../directive.ts';

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
		const value = params.value;

		if (typeof value !== 'object' || value == null) {
			return;
		}

		const config = params.directiveConfig;
		let definedCount = 0;
		for (const v of Object.values(value)) {
			if (v != null) definedCount++;
		}

		if (config.maxFields != null && definedCount > config.maxFields) {
			throw new BadUserInput(
				`Maximum ${config.maxFields} number of fields allowed, got ${definedCount}!`,
			);
		}

		if (config.minFields != null && definedCount < config.minFields) {
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
