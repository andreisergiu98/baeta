import { MapperKind, getDirectives, mapSchema } from '@graphql-tools/utils';
import type { GraphQLSchema } from 'graphql';
import { createObjectLens } from '../../utils/object.ts';
import {
	type ValidateParams,
	type ValidationOptions,
	type ValidationTarget,
	addArgumentValidationsExtension,
	addValidationsExtension,
} from './input-extensions.ts';

export type ValidationDirectiveFnParams<DirectiveConfig, Context> = ValidateParams<Context> & {
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

/**
 * Configuration options for creating an input directive.
 * @template DirectiveConfig - Type of the directive arguments
 * @template Context - Type of the context
 */
export type InputDirectiveOptions<DirectiveConfig, Context> = {
	/**
	 * Name of the directive as it appears in the GraphQL schema (without '@' prefix)
	 * @example 'trim' for '@trim' directive
	 */
	name: string;
	/**
	 * Validation target indicating when the directive should be applied
	 */
	target: ValidationTarget;
	/**
	 * Function that implements the directive's validation/transformation logic
	 */
	resolve: ValidationDirectiveFn<DirectiveConfig, Context>;
	/**
	 * Returns the depth of list of lists validated by this directive.
	 * The depth 0 indicates the topmost list of a field or argument.
	 * The depth 1 indicates the first nested list.
	 * The depth 2 indicates the second nested list, and so on.
	 *
	 * The directive config is provided as an argument, so depth can be based on directive arguments.
	 *
	 * So in the following example:
	 * ```
	 * input Input {
	 *   list: [[[String!]!]!]! @validList(maxItems: 2, listDepth: 0) @validList(maxItems: 5, listDepth: 1) @validList(maxItems: 3, listDepth: 2)
	 * }
	 * ```
	 */
	getListDepth?: (config: DirectiveConfig) => number;
};

/**
 * Creates a schema transformer that applies an input directive to a GraphQL schema.
 * The directive can be used to validate or transform input fields, arguments, and input types.
 * See https://baeta.io/docs/guides/directives and https://baeta.io/docs/guides/input-directives
 *
 * @template DirectiveConfig - Type of the directive configuration object
 * @template Context - Type of the GraphQL context
 *
 * @param options - Configuration options for the input directive
 * @returns A function that transforms a GraphQL schema by applying the directive
 *
 * @example
 * ```typescript
 * const trimDirective = createInputDirective<TrimArgs>({
 * 	name: 'trim',
 * 	target: 'scalar',
 * 	resolve(params) {
 * 		const value = params.getValue();
 *
 * 		if (typeof value !== 'string') {
 * 			return;
 * 		}
 *
 * 		const config = params.directiveConfig;
 *
 * 		if (config.start === true && config.end !== true) {
 * 			return params.setValue(value.trimStart());
 * 		}
 * 		if (config.end === true && config.start !== true) {
 * 			return params.setValue(value.trimEnd());
 * 		}
 *
 * 		params.setValue(value.trim());
 * 	},
 * });
 */
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
