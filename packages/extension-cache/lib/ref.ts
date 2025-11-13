/**
 * Reference type for cached items
 */
export type ItemRef = string | number | bigint;
/**
 * Reference type for query parent
 */
export type ParentRef = ItemRef | null | undefined;

/**
 * Type constraint for objects that are compatible with default cache ref
 */
export type RefCompatibleRoot = { id: string | number | bigint } | { [key: string]: never };

/**
 * Cache reference for a type field or query
 */
export class CacheRef<_Result, _Root, _Args> {
	readonly type: string;
	readonly field: string;

	constructor(type: string, field: string) {
		this.type = type;
		this.field = field;
	}

	toString() {
		return `${this.type}:${this.field}`;
	}
}

export function getRefFallback(root: unknown) {
	if (typeof root === 'object' && root != null && 'id' in root) {
		assertValidRefType(root.id);
		return root.id.toString();
	}
	return undefined;
}

export function assertValidRefType(ref: unknown): asserts ref is string | number | bigint {
	if (typeof ref !== 'string' && typeof ref !== 'number' && typeof ref !== 'bigint') {
		throw new TypeError(
			'Reference must be string, number or bigint. Define getRef function in cache options',
		);
	}
}
