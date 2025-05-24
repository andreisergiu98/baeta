/**
 * Supported environment variable types.
 */
export type EnvTypes = 'string' | 'number' | 'boolean';

/**
 * Maps environment variable types to their TypeScript equivalents.
 * @template T - The environment variable type
 */
export type EnvInferType<T extends EnvTypes> = T extends 'string'
	? string
	: T extends 'number'
		? number
		: boolean;

type InferTypeFromOptions<
	O extends EnvOptions<EnvTypes, boolean | undefined, EnvInferType<EnvTypes> | undefined>,
> = O extends EnvOptions<infer T, infer R, infer D>
	? R extends true
		? EnvInferType<T>
		: D extends undefined
			? EnvInferType<T> | undefined
			: EnvInferType<T>
	: never;

export interface EnvOptions<
	T extends EnvTypes,
	R extends boolean | undefined,
	D extends EnvInferType<T> | undefined,
> {
	/**
	 * Whether the environment variable is required.
	 */
	required?: R;
	/**
	 * Default value if the environment variable is not provided.
	 */
	default?: D;
	/**
	 * The expected type of the environment variable.
	 */
	type: T;
	/**
	 * Custom resolver to convert the environment variable to the expected type.
	 */
	resolver?: (value: string) => EnvInferType<T>;
}

function resolveString(value: string) {
	return value;
}

function resolveNumber(value: string) {
	return Number(value);
}

function resolveBoolean(value: string) {
	return value === 'true';
}

function resolveParam<
	T extends EnvTypes,
	R extends boolean | undefined,
	D extends EnvInferType<T> | undefined,
>(key: string, options: EnvOptions<T, R, D>, rawValue: string | undefined) {
	if (!rawValue) {
		return options.default;
	}

	if (options.type === 'number') {
		if (options.resolver) {
			return options.resolver(rawValue);
		}
		return resolveNumber(rawValue);
	}

	if (options.type === 'boolean') {
		if (options.resolver) {
			return options.resolver(rawValue);
		}
		return resolveBoolean(rawValue);
	}

	if (options.type === 'string') {
		if (options.resolver) {
			return options.resolver(rawValue);
		}
		return resolveString(rawValue);
	}

	throw new Error(
		`Cannot resolve env param '${key}'. Unknown type ${options.type}. Type must be Number, Boolean or String!`,
	);
}

function validateValue<
	T extends EnvTypes,
	R extends boolean | undefined,
	D extends EnvInferType<T> | undefined,
>(key: string, value: string | number | boolean | undefined, options: EnvOptions<T, R, D>) {
	if (value == null && options.required !== true) {
		return;
	}

	if (value == null && options.required === true) {
		throw new Error(
			`Env param '${key}' is required, not provided and doesn't have a default value!`,
		);
	}

	if (typeof value !== options.type) {
		if (options.resolver) {
			throw new Error(
				`Return type of custom resolver not matching type of property for key '${key}'. Expected '${options.type}' but got '${typeof value}'`,
			);
		}

		throw new Error(
			`Type mismatch for property with key '${key}'. Expected '${options.type}' but got '${typeof value}'.`,
		);
	}
}

/**
 * Creates an environment variable parser..
 * See https://baeta.io/docs/guides/environment
 *
 * @param getValue - Function to retrieve environment variable values
 * @returns A parsing function that converts environment variables to strongly-typed values
 *
 * @example
 * ```typescript
 * const parse = createEnvParser((key) => process.env[key]);
 *
 * const port = parse('PORT', {
 *   type: 'number',
 *   required: true,
 *   default: 3000
 * });
 *
 * const debug = parse('DEBUG', {
 *   type: 'boolean',
 *   default: false
 * });
 * ```
 *
 * @throws {Error} When:
 * - A required value is missing and has no default
 * - The value type doesn't match the specified type
 * - A custom resolver returns an incorrect type
 */
export function createEnvParser(getValue: (key: string) => string | undefined) {
	return function parse<
		T extends EnvTypes,
		R extends boolean | undefined,
		D extends EnvInferType<T> | undefined,
	>(key: string, options: EnvOptions<T, R, D>) {
		const value = resolveParam(key, options, getValue(key));
		validateValue(key, value, options);
		return value as InferTypeFromOptions<EnvOptions<T, R, D>>;
	};
}
