import { MapperKind, getDirectives, mapSchema } from '@graphql-tools/utils';
import type { GraphQLSchema } from 'graphql';
import { createObjectLens } from '../../utils/object.ts';
import {
	type ValidationOptions,
	addArgumentValidationsExtension,
	addValidationsExtension,
} from './input-extensions.ts';
import type { ValidateParams } from './input-schema.ts';

export type ValidationTarget = 'list' | 'object' | 'scalar';

type ValidationDirectiveFnParams<DirectiveConfig, Context> = ValidateParams<Context> & {
	directiveConfig: DirectiveConfig;
	getValue: () => unknown;
	setValue: (newValue: unknown) => void;
};

export type ValidationDirectiveFn<DirectiveConfig = Record<string, unknown>, Context = unknown> = (
	params: ValidationDirectiveFnParams<DirectiveConfig, Context>,
) => void;

function createMutateValueFn(args: Record<string, unknown>, path: Array<string | number>) {
	return (newValue: unknown) => {
		const lens = createObjectLens(args, path);
		lens.set(newValue);
	};
}

function createGetValueFn(args: Record<string, unknown>, path: Array<string | number>) {
	return () => {
		const lens = createObjectLens(args, path);
		return lens.get();
	};
}

function createValidationFn<DirectiveConfig, Context>(
	directiveConfig: DirectiveConfig,
	validate: ValidationDirectiveFn<DirectiveConfig, Context>,
) {
	return (params: ValidateParams<Context>) => {
		const getValue = createGetValueFn(params.args, params.path);
		const setValue = createMutateValueFn(params.args, params.path);
		return validate({ ...params, directiveConfig, getValue, setValue });
	};
}

export function applyInputDirective(
	schema: GraphQLSchema,
	name: string,
	target: ValidationTarget,
	validate: ValidationDirectiveFn,
	getDepth?: (config: unknown) => number,
) {
	return mapSchema(schema, {
		[MapperKind.INPUT_OBJECT_FIELD]: (fieldConfig) => {
			const directives = getDirectives(schema, fieldConfig);

			if (directives.length === 0) {
				return;
			}

			for (let i = 0; i < directives.length; i++) {
				const directive = directives[i];

				if (directive.name !== name) {
					continue;
				}

				const directiveConfig = directive.args ?? {};

				addValidationsExtension(fieldConfig, i, {
					target,
					listDepth: getDepth?.(directiveConfig) ?? 0,
					fn: createValidationFn(directiveConfig, validate),
				});
			}

			return fieldConfig;
		},
		[MapperKind.INPUT_OBJECT_TYPE]: (inputObjectType) => {
			const directives = getDirectives(schema, inputObjectType);

			if (directives.length === 0) {
				return;
			}

			for (let i = 0; i < directives.length; i++) {
				const directive = directives[i];

				if (directive.name !== name) {
					continue;
				}

				const directiveConfig = directive.args ?? {};

				addValidationsExtension(inputObjectType, i, {
					target,
					listDepth: 0,
					fn: createValidationFn(directiveConfig, validate),
				});
			}

			return inputObjectType;
		},
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const argsEntries = Object.entries(fieldConfig.args ?? {});
			const validationsByArgumentName: Record<
				string,
				Array<{ index: number; options: ValidationOptions }>
			> = {};

			for (const [argumentName, argumentConfig] of argsEntries) {
				const directives = getDirectives(schema, argumentConfig);

				if (directives.length === 0) {
					continue;
				}

				for (let i = 0; i < directives.length; i++) {
					const directive = directives[i];

					if (directive.name !== name) {
						continue;
					}

					if (validationsByArgumentName[argumentName] == null) {
						validationsByArgumentName[argumentName] = [];
					}

					const directiveConfig = directive.args ?? {};

					validationsByArgumentName[argumentName].push({
						index: i,
						options: {
							target,
							listDepth: getDepth?.(directiveConfig) ?? 0,
							fn: createValidationFn(directiveConfig, validate),
						},
					});
				}
			}

			const validationEntries = Object.entries(validationsByArgumentName);

			for (const [argumentName, argValidations] of validationEntries) {
				for (const validationMeta of argValidations) {
					addArgumentValidationsExtension(
						fieldConfig,
						argumentName,
						validationMeta.index,
						validationMeta.options,
					);
				}
			}

			return fieldConfig;
		},
	});
}

type InputDirectiveOptions<DirectiveConfig, Context> = {
	name: string;
	target: ValidationTarget;
	resolve: ValidationDirectiveFn<DirectiveConfig, Context>;
	getListDepth?: (config: DirectiveConfig) => number;
};

export function createInputDirective<DirectiveConfig, Context = unknown>(
	options: InputDirectiveOptions<DirectiveConfig, Context>,
) {
	return (schema: GraphQLSchema) => {
		return applyInputDirective(
			schema,
			options.name,
			options.target,
			options.resolve as ValidationDirectiveFn<Record<string, unknown>, unknown>,
			options.getListDepth as (config: unknown) => number,
		);
	};
}
