import type { ItemRef } from './item.ts';

export function arrayIsComplete<T>(items: Array<T | null> | null): items is T[] {
	if (items == null) {
		return false;
	}
	return items.every((item) => item != null);
}

export function alignItemsWithRefs<T>(partialRefs: Array<ItemRef | null>, items: T[]) {
	if (partialRefs.length === items.length) {
		return items;
	}
	let itemIndex = 0;
	const aligned: Array<T | null> = [];
	for (const ref of partialRefs) {
		if (ref == null) {
			aligned.push(null);
		} else {
			aligned.push(items[itemIndex++]);
		}
	}
	return aligned;
}

export function toArray<T>(item: T | T[]): T[] {
	return Array.isArray(item) ? item : [item];
}

export function zip<T, U, R>(array1: T[], array2: U[], fn: (a: T, b: U) => R): R[] {
	if (array1.length !== array2.length) {
		throw new Error('Arrays must have the same length to be zipped');
	}
	const result: R[] = [];
	for (let i = 0; i < array1.length; i++) {
		result.push(fn(array1[i], array2[i]));
	}
	return result;
}
