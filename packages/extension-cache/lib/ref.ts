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
	constructor(
		private type: string,
		private field: string,
		private hash: string,
		private revision = 1,
	) {}

	toString() {
		return `${this.type}.${this.field}:r${this.revision}_${this.hash}`;
	}

	getRevision() {
		return this.revision;
	}

	setRevision(revision: number) {
		this.revision = revision;
	}

	getHash() {
		return this.hash;
	}
}

export function getRefFallback(root: unknown) {
	if (root == null) {
		return undefined;
	}

	if (typeof root === 'object' && 'id' in root) {
		validateRefType(root.id);
		return root.id.toString();
	}

	return undefined;
}

export function validateRefType(ref: unknown): asserts ref is string | number | bigint {
	if (typeof ref !== 'string' && typeof ref !== 'number' && typeof ref !== 'bigint') {
		throw new Error(
			'Reference must be string, number or bigint. Define getRef function in cache options',
		);
	}
}
