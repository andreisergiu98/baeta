import test from '@baeta/testing';
import { canSafelySerialize, createScopeCacheKey, isSerializablePrimitive } from './serialize.ts';

test('isSerializablePrimitive accepts string/number/boolean/null', (t) => {
	t.true(isSerializablePrimitive('a'));
	t.true(isSerializablePrimitive(1));
	t.true(isSerializablePrimitive(true));
	t.true(isSerializablePrimitive(null));
});

test('isSerializablePrimitive rejects undefined, bigint, symbol, function, object', (t) => {
	t.false(isSerializablePrimitive(undefined));
	t.false(isSerializablePrimitive(1n));
	t.false(isSerializablePrimitive(Symbol('x')));
	t.false(isSerializablePrimitive(() => 1));
	t.false(isSerializablePrimitive({}));
	t.false(isSerializablePrimitive([]));
});

test('canSafelySerialize accepts primitives, plain objects, and arrays of those', (t) => {
	t.true(canSafelySerialize(1));
	t.true(canSafelySerialize('x'));
	t.true(canSafelySerialize(null));
	t.true(canSafelySerialize([1, 'x', null]));
	t.true(canSafelySerialize({ a: 1, b: 'x' }));
	t.true(canSafelySerialize({ a: { b: [1, 2, 3] } }));
});

test('canSafelySerialize accepts null-prototype objects', (t) => {
	const obj = Object.create(null) as Record<string, unknown>;
	obj.a = 1;
	t.true(canSafelySerialize(obj));
});

test('canSafelySerialize rejects class instances', (t) => {
	class User {
		id = 1;
	}
	t.false(canSafelySerialize(new User()));
});

test('canSafelySerialize rejects Date', (t) => {
	t.false(canSafelySerialize(new Date()));
});

test('canSafelySerialize rejects Map and Set', (t) => {
	t.false(canSafelySerialize(new Map()));
	t.false(canSafelySerialize(new Set()));
});

test('canSafelySerialize rejects RegExp', (t) => {
	t.false(canSafelySerialize(/abc/));
});

test('canSafelySerialize rejects functions', (t) => {
	t.false(canSafelySerialize(() => 1));
});

test('canSafelySerialize rejects undefined and symbols', (t) => {
	t.false(canSafelySerialize(undefined));
	t.false(canSafelySerialize(Symbol('x')));
});

test('canSafelySerialize rejects objects with non-plain nested values', (t) => {
	t.false(canSafelySerialize({ user: new Map() }));
	t.false(canSafelySerialize([new Set()]));
});

test('canSafelySerialize rejects cycles (conservative)', (t) => {
	const a: Record<string, unknown> = { x: 1 };
	a.self = a;
	t.false(canSafelySerialize(a));
});

test('canSafelySerialize accepts shared (non-circular) refs without rejecting', (t) => {
	const shared = { kind: 'admin' };
	t.true(canSafelySerialize({ left: shared, right: shared }));
});

test('createScopeCacheKey produces stable, sorted output for plain objects', (t) => {
	const a = createScopeCacheKey({ b: 2, a: 1 });
	const b = createScopeCacheKey({ a: 1, b: 2 });
	t.is(a, b);
});

test('createScopeCacheKey produces distinct keys for different inputs', (t) => {
	t.not(createScopeCacheKey({ a: 1 }), createScopeCacheKey({ a: 2 }));
});
