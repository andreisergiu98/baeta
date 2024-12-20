import { createInputDirective } from '@baeta/core';

interface TrimArgs {
	end?: boolean;
	start?: boolean;
}

const trimSdl =
	'directive @trim(start: Boolean, end: Boolean) on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION';

const upperSdl = 'directive @upper on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION';
const lowerSdl = 'directive @lower on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION';

const trimDirective = createInputDirective<TrimArgs>({
	name: 'trim',
	target: 'scalar',
	resolve(params) {
		const value = params.getValue();

		if (typeof value !== 'string') {
			return;
		}

		const config = params.directiveConfig;

		if (config.start === true && config.end !== true) {
			return params.setValue(value.trimStart());
		}

		if (config.end === true && config.start !== true) {
			return params.setValue(value.trimEnd());
		}

		params.setValue(value.trim());
	},
});

const lowerDirective = createInputDirective<{ [k: string]: never }>({
	name: 'lower',
	target: 'scalar',
	resolve(params) {
		const value = params.getValue();
		if (typeof value === 'string') {
			params.setValue(value.toLowerCase());
		}
	},
});

const upperDirective = createInputDirective<{ [k: string]: never }>({
	name: 'upper',
	target: 'scalar',
	resolve(params) {
		const value = params.getValue();
		if (typeof value === 'string') {
			params.setValue(value.toUpperCase());
		}
	},
});

export const trim = {
	sdl: trimSdl,
	directive: trimDirective,
};

export const lower = {
	sdl: lowerSdl,
	directive: lowerDirective,
};

export const upper = {
	sdl: upperSdl,
	directive: upperDirective,
};
