import test from '@baeta/testing';
import type { ItemRef } from './ref.ts';
import { alignItemsWithRefs, arrayIsComplete, fillNullItemsWithFallback } from './utils.ts';

test('arrayIsComplete - returns false for null input', (t) => {
	const result = arrayIsComplete(null);
	t.is(result, false);
});

test('arrayIsComplete - returns false if array contains null', (t) => {
	const items = [1, null, 3];
	const result = arrayIsComplete(items);
	t.is(result, false);
});

test('arrayIsComplete - returns true for array with no nulls', (t) => {
	const items = [1, 2, 3];
	const result = arrayIsComplete(items);
	t.is(result, true);
});

test('arrayIsComplete - returns true for empty array', (t) => {
	const items: number[] = [];
	const result = arrayIsComplete(items);
	t.is(result, true);
});

test('alignItemsWithRefs - should return original items if no nulls in refs', (t) => {
	const refs = ['1', '2', '3'];
	const items = [{ id: '1' }, { id: '2' }, { id: '3' }];

	const result = alignItemsWithRefs(refs, items);

	t.is(result, items);
});

test('alignItemsWithRefs - should fill nulls in the correct positions', (t) => {
	const refs = ['1', null, '2', null, '3'];
	const items = [{ id: '1' }, { id: '2' }, { id: '3' }];

	const result = alignItemsWithRefs(refs, items);

	t.deepEqual(result, [{ id: '1' }, null, { id: '2' }, null, { id: '3' }]);
});

test('alignItemsWithRefs - should handle all null refs', (t) => {
	const refs = [null, null, null];
	const items: unknown[] = [];

	const result = alignItemsWithRefs(refs, items);

	t.deepEqual(result, [null, null, null]);
});

test('alignItemsWithRefs - should handle empty arrays', (t) => {
	const refs: Array<ItemRef | null> = [];
	const items: unknown[] = [];

	const result = alignItemsWithRefs(refs, items);

	t.deepEqual(result, []);
});

test('fillNullItemsWithFallback - replaces null items with fallbacks', (t) => {
	const items = [1, null, 3, null];
	const fallbacks = [10, 20];
	const result = fillNullItemsWithFallback(items, fallbacks);

	t.deepEqual(result.items, [1, 10, 3, 20]);
	t.is(result.extra, 0);
	t.is(result.missing, 0);
});

test('fillNullItemsWithFallback - handles more nulls than fallbacks', (t) => {
	const items = [null, null, 3, null];
	const fallbacks = [10];
	const result = fillNullItemsWithFallback(items, fallbacks);

	t.deepEqual(result.items, [10, 3]);
	t.is(result.extra, 0);
	t.is(result.missing, 2);
});

test('fillNullItemsWithFallback - handles more fallbacks than nulls', (t) => {
	const items = [1, null, 3];
	const fallbacks = [10, 20, 30];
	const result = fillNullItemsWithFallback(items, fallbacks);

	t.deepEqual(result.items, [1, 10, 3]);
	t.is(result.extra, 2);
	t.is(result.missing, 0);
});

test('fillNullItemsWithFallback - handles no nulls in items', (t) => {
	const items = [1, 2, 3];
	const fallbacks = [10, 20, 30];
	const result = fillNullItemsWithFallback(items, fallbacks);

	t.deepEqual(result.items, [1, 2, 3]);
	t.is(result.extra, 3);
	t.is(result.missing, 0);
});

test('fillNullItemsWithFallback - handles empty arrays', (t) => {
	const items: Array<number | null> = [];
	const fallbacks: number[] = [];
	const result = fillNullItemsWithFallback(items, fallbacks);

	t.deepEqual(result.items, []);
	t.is(result.extra, 0);
	t.is(result.missing, 0);
});
