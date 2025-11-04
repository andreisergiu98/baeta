/**
 * Originally based on graphql-validation-directives
 * Source: https://github.com/marcduez/graphql-validation-directives/blob/main/src/valid-string-directive.ts
 * Copyright (c) 2022-present Marc Duez
 * Adapted by Baeta developers
 */
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

		if (config.format != null) {
			validateFormat(value, config.format);
		}

		if (config.maxLength != null) {
			validateMaxLength(value, config.maxLength);
		}

		if (config.minLength != null) {
			validateMinLength(value, config.minLength);
		}

		if (config.startsWith != null) {
			validateStartsWith(value, config.startsWith);
		}

		if (config.endsWith != null) {
			validateEndsWith(value, config.endsWith);
		}

		if (config.includes != null) {
			validateIncludes(value, config.includes);
		}

		if (config.regex != null) {
			validateRegexp(value, config.regex, config.regexFlags);
		}

		if (config.oneOf != null) {
			validateOneOf(value, config.oneOf);
		}

		if (config.notOneOf != null) {
			validateNotOneOf(value, config.notOneOf);
		}
	},
});

export const stringValidation = {
	sdl,
	directive,
};

function getLength(value: string) {
	return [...value].length;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function validateFormat(value: string, format: 'EMAIL' | 'URL' | 'UUID') {
	if (format === 'EMAIL' && !validateEmail(value)) {
		throw new BadUserInput('Value must be be a valid email');
	}

	if (format === 'URL' && !isUrl(value)) {
		throw new BadUserInput('Value must be be a valid URL');
	}

	if (format === 'UUID' && !UUID_REGEX.test(value)) {
		throw new BadUserInput('Value must be be a valid UUID');
	}
}

function validateMaxLength(value: string, maxLength: number) {
	if (getLength(value) > maxLength) {
		throw new BadUserInput(`Value must be at most ${maxLength} characters`);
	}
}

function validateMinLength(value: string, minLength: number) {
	if (getLength(value) < minLength) {
		throw new BadUserInput(`Value must be at least ${minLength} characters`);
	}
}

function validateStartsWith(value: string, startsWith: string) {
	if (!value.startsWith(startsWith)) {
		throw new BadUserInput(`Value must start with '${startsWith}'`);
	}
}

function validateEndsWith(value: string, endsWith: string) {
	if (!value.endsWith(endsWith)) {
		throw new BadUserInput(`Value must end with '${endsWith}'`);
	}
}

function validateIncludes(value: string, includes: string) {
	if (!value.includes(includes)) {
		throw new BadUserInput(`Value must include '${includes}'`);
	}
}

function validateOneOf(value: string, oneOf: string[]) {
	if (!oneOf.includes(value)) {
		const options = oneOf.map((s) => `'${s}'`).join(', ');
		throw new BadUserInput(`Value must be one of ${options}`);
	}
}

function validateNotOneOf(value: string, notOneOf: string[]) {
	if (notOneOf.includes(value)) {
		const invalidOptions = notOneOf.map((s) => `'${s}'`).join(', ');
		throw new BadUserInput(`Value must not be one of ${invalidOptions}`);
	}
}

function validateRegexp(value: string, regex: string, flags?: string) {
	if (!new RegExp(regex, flags).test(value)) {
		const flagsMessage = flags == null ? '' : ` with flags '${flags}'`;
		throw new BadUserInput(`Value must match pattern '${regex}'${flagsMessage}`);
	}
}
