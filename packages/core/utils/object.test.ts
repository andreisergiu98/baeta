import test from '@baeta/testing';
import { createObjectLens } from './object.ts';

test('get function returns the value at the specified path', (t) => {
	const input = { foo: { bar: { baz: 'hello' } } };
	const path = ['foo', 'bar', 'baz'];
	const lens = createObjectLens<string>(input, path);

	const value = lens.get();

	t.is(value, 'hello');
});

test('get function works with arrays', (t) => {
	const input = { foo: { bar: { baz: [1, 2, 3] } } };
	const path = ['foo', 'bar', 'baz', 1];
	const lens = createObjectLens<number>(input, path);

	const value = lens.get();

	t.is(value, 2);
});

test('get function returns null for invalid paths', (t) => {
	const input = { foo: { bar: { baz: 'hello' } } };
	const path = ['__proto__'];
	const lens = createObjectLens<string>(input, path);

	const value = lens.get();

	t.is(value, null);
});

test('get function returns null for inaccessible paths', (t) => {
	const input = { foo: true };
	const path = ['foo', 'bar', 'baz'];
	const lens = createObjectLens<string>(input, path);

	const value = lens.get();

	t.is(value, null);
});

test('set function updates the value at the specified path', (t) => {
	const input = { foo: { bar: { baz: 'hello' } } };
	const path = ['foo', 'bar', 'baz'];
	const lens = createObjectLens<string>(input, path);

	lens.set('world');

	t.is(input.foo.bar.baz, 'world');
});

test('set function works with arrays', (t) => {
	const input = { foo: { bar: { baz: [1, 2, 3] } } };
	const path = ['foo', 'bar', 'baz', 4];
	const lens = createObjectLens<number>(input, path);

	lens.set(4);

	t.is(input.foo.bar.baz[4], 4);
});

test('set function does nothing if the path is invalid', (t) => {
	const input = { foo: { bar: { baz: 'hello' } } };
	const path = ['foo', 'bar', 'qux', 'biz'];
	const lens = createObjectLens<string>(input, path);

	lens.set('world');

	// @ts-expect-error - qux is not a valid key
	t.is(input.foo.bar.qux, undefined);
});

test('set function should return false if the path is invalid', (t) => {
	const input = { foo: { bar: { baz: 'hello' } } };
	const path = ['__proto__'];
	const lens = createObjectLens<string>(input, path);

	const result = lens.set('world');

	t.is(result, false);
});

test('set function should return false for inaccessible paths', (t) => {
	const input = { foo: true };
	const path = ['foo', 'bar', 'baz'];
	const lens = createObjectLens<string>(input, path);

	const result = lens.set('1');

	t.is(result, false);
});
