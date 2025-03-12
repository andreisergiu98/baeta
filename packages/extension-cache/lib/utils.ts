import type { ItemRef } from './ref.ts';

export function refillNullItems<T>(nullableRefs: Array<ItemRef | null>, items: T[]) {
	if (nullableRefs.length === items.length) {
		return items;
	}

	const filled: Array<T | null> = [];

	for (let i = 0, j = 0; i < nullableRefs.length; i++) {
		if (nullableRefs[i] == null) {
			filled.push(null);
		} else {
			filled.push(items[j]);
			j++;
		}
	}

	return filled;
}

export function validateRefType(ref: unknown): asserts ref is string | number | bigint {
	if (typeof ref !== 'string' && typeof ref !== 'number' && typeof ref !== 'bigint') {
		throw new Error(
			'Reference must be string, number or bigint. Define getRef function in cache options',
		);
	}
}
