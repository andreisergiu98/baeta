import { createInputDirective } from '@baeta/core';
import { BadUserInput } from '@baeta/errors';
import { validate as validateEmail } from 'email-validator';
import isUrl from 'is-url';

interface Args {
	format?: 'EMAIL' | 'UUID' | 'URL';
	maxLength?: number;
	minLength?: number;
	startsWith?: string;
	endsWith?: string;
	includes?: string;
	regex?: string;
	regexFlags?: string;
	oneOf?: string[];
	notOneOf?: string[];
}

const name = 'validString';

const sdl = `enum StringFormat {
    EMAIL
    UUID
    URL
}

directive @${name}(
    format: StringFormat
    maxLength: Int
    minLength: Int
    startsWith: String
    endsWith: String
    includes: String
    regex: String
    regexFlags: String
    oneOf: [String!]
    notOneOf: [String!]
) on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
`;

const directive = createInputDirective<Args>({
	name,
	target: 'scalar',
	resolve(params) {
		const value = params.getValue();

		if (typeof value !== 'string') {
			return;
		}

		const config = params.directiveConfig;

		if (config.format === 'EMAIL' && !validateEmail(value)) {
			throw new BadUserInput('Value must be be a valid email');
		}

		if (config.format === 'URL' && !isUrl(value)) {
			throw new BadUserInput('Value must be be a valid URL');
		}

		if (
			config.format === 'UUID' &&
			!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
				value,
			)
		) {
			throw new BadUserInput('Value must be be a valid UUID');
		}

		if (config.maxLength != null && value.length > config.maxLength) {
			throw new BadUserInput(`Value must be at most ${config.maxLength} characters`);
		}

		if (config.minLength != null && value.length < config.minLength) {
			throw new BadUserInput(`Value must be at least ${config.minLength} characters`);
		}

		if (config.startsWith != null && !value.startsWith(config.startsWith)) {
			throw new BadUserInput(`Value must start with '${config.startsWith}'`);
		}

		if (config.endsWith != null && !value.endsWith(config.endsWith)) {
			throw new BadUserInput(`Value must end with '${config.endsWith}'`);
		}

		if (config.includes != null && !value.includes(config.includes)) {
			throw new BadUserInput(`Value must include '${config.includes}'`);
		}

		if (config.regex != null && !new RegExp(config.regex, config.regexFlags).test(value)) {
			throw new BadUserInput(
				`Value must match pattern '${config.regex}'${
					config.regexFlags != null ? ` with flags '${config.regexFlags}'` : ''
				}`,
			);
		}

		if (config.oneOf != null && !config.oneOf.includes(value)) {
			throw new BadUserInput(
				`Value must be one of ${config.oneOf.map((s) => `'${s}'`).join(', ')}`,
			);
		}

		if (config.notOneOf?.includes(value)) {
			throw new BadUserInput(
				`Value must not be one of ${config.notOneOf.map((s) => `'${s}'`).join(', ')}`,
			);
		}
	},
});

export const stringValidation = {
	sdl,
	directive,
};
