import type { GraphQLInputType, GraphQLResolveInfo } from 'graphql';

/**
 * The kind of input value an input directive validates.
 *
 * - `scalar` — leaf values (scalars and enums). On list fields it runs once per item.
 * - `list` — list values, at the list depth returned by `getListDepth`.
 * - `object` — input object values. Applies to input object types and to fields or arguments of an input object type.
 */
export type InputDirectiveTarget = 'list' | 'object' | 'scalar';

/**
 * Parameters passed to an input directive's `resolve` function.
 * @template DirectiveConfig - Type of the directive arguments
 * @template Context - Type of the GraphQL context
 */
export type InputDirectiveParams<DirectiveConfig, Context> = {
	/**
	 * The input value being validated. Never `null` or `undefined`.
	 */
	value: unknown;
	/**
	 * The directive arguments, as written in the schema.
	 */
	directiveConfig: DirectiveConfig;
	/**
	 * Path to the value, starting with the argument name.
	 * @example ['input', 'tags', 0]
	 */
	path: ReadonlyArray<number | string>;
	/**
	 * The GraphQL type of the value, without the non-null wrapper.
	 */
	type: GraphQLInputType;
	root: unknown;
	/**
	 * All arguments of the field being resolved.
	 */
	args: Readonly<Record<string, unknown>>;
	ctx: Context;
	info: GraphQLResolveInfo;
};

/**
 * Configuration options for creating an input directive.
 * @template DirectiveConfig - Type of the directive arguments
 * @template Context - Type of the GraphQL context
 */
export type InputDirectiveOptions<DirectiveConfig, Context> = {
	/**
	 * Name of the directive as it appears in the GraphQL schema (without '@' prefix)
	 * @example 'validString' for '@validString' directive
	 */
	name: string;
	/**
	 * The kind of input value the directive validates
	 */
	target: InputDirectiveTarget;
	/**
	 * Validates the value. Throw a GraphQLError (for example `BadUserInput` from `@baeta/errors`) to reject it.
	 * Must be synchronous and must not modify the value; use custom scalars to transform input.
	 */
	resolve: (params: InputDirectiveParams<DirectiveConfig, Context>) => void;
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
 * An input directive created with {@link createInputDirective}.
 */
export type InputDirective<DirectiveConfig = any, Context = any> = Readonly<
	InputDirectiveOptions<DirectiveConfig, Context>
>;

/**
 * Creates an input directive that validates input fields, arguments and input types.
 * Register it on the module that declares it with `$use(inputDirectives([...]))`, and add
 * `inputValidationAppPlugin` to the application's plugins.
 * See https://baeta.io/docs/guides/input-directives
 *
 * @template DirectiveConfig - Type of the directive configuration object
 * @template Context - Type of the GraphQL context
 *
 * @param options - Configuration options for the input directive
 * @returns The input directive
 *
 * @example
 * ```typescript
 * const multipleOfDirective = createInputDirective<{ of: number }>({
 * 	name: 'multipleOf',
 * 	target: 'scalar',
 * 	resolve({ value, directiveConfig }) {
 * 		if (typeof value === 'number' && value % directiveConfig.of !== 0) {
 * 			throw new BadUserInput(`Value must be a multiple of ${directiveConfig.of}`);
 * 		}
 * 	},
 * });
 * ```
 */
export function createInputDirective<DirectiveConfig, Context = unknown>(
	options: InputDirectiveOptions<DirectiveConfig, Context>,
): InputDirective<DirectiveConfig, Context> {
	return { ...options };
}
