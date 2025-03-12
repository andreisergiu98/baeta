import type { ItemRef } from './ref.ts';

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

	const aligned: Array<T | null> = [];

	let itemIndex = 0;

	for (const ref of partialRefs) {
		if (ref == null) {
			aligned.push(null);
		} else {
			aligned.push(items[itemIndex++]);
		}
	}

	return aligned;
}

export function fillNullItemsWithFallback<T>(items: Array<T | null>, fallbacks: T[]) {
	const completeItems: T[] = [];

	let fallbackIndex = 0;

	for (const item of items) {
		if (item != null) {
			completeItems.push(item);
			continue;
		}

		if (fallbackIndex < fallbacks.length) {
			completeItems.push(fallbacks[fallbackIndex++]);
		}
	}

	return {
		items: completeItems,
		missing: items.length - completeItems.length,
		extra: fallbacks.length - fallbackIndex,
	};
}
