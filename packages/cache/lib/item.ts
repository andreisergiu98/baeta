/**
 * Reference type for cached items
 */
export type ItemRef = string | number | bigint;

/**
 * Type constraint for objects that are compatible with default cache ref
 */
export type RefCompatibleItem = { id: string | number | bigint };

/**
 * Asserts that a given reference is of a valid type (string, number, or bigint) and that it can be safely serialized.
 */
export function assertValidRefType(ref: unknown): asserts ref is string | number | bigint {
	if (typeof ref !== 'string' && typeof ref !== 'number' && typeof ref !== 'bigint') {
		throw new TypeError(
			'Reference must be string, number or bigint. Define getRef function in cache options',
		);
	}
}
