import test from '@baeta/testing';
import type { ItemRef } from './item.ts';
import { alignItemsWithRefs, arrayIsComplete, toArray, zip } from './utils.ts';

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

test('toArray - wraps single item in array', (t) => {
	t.deepEqual(toArray('a'), ['a']);
});

test('toArray - returns same array if already array', (t) => {
	const arr = [1, 2];
	t.is(toArray(arr), arr);
});

test('zip - pairs elements from two arrays', (t) => {
	const result = zip([1, 2], ['a', 'b'], (a, b) => [a, b]);
	t.deepEqual(result, [
		[1, 'a'],
		[2, 'b'],
	]);
});

test('zip - returns empty array for empty inputs', (t) => {
	const result = zip([], [], (a, b) => [a, b]);
	t.deepEqual(result, []);
});

test('zip - throws on mismatched lengths', (t) => {
	t.throws(() => zip([1], [1, 2], (a, b) => [a, b]), {
		message: 'Arrays must have the same length to be zipped',
	});
});
