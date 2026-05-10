import type { ExecutionContext } from '@baeta/testing';

type StoreAccessor = <T>(key: symbol) => {
	get: () => T | undefined;
	set: (value: Readonly<T>) => void;
};

export function testStoreLike(t: ExecutionContext, store: StoreAccessor) {
	const key1 = Symbol('1');
	const key2 = Symbol('2');
	store<number>(key1).set(1);
	store<number>(key1).set(2);
	store<number>(key2).set(3);
	t.is(store<number>(key1).get(), 2);
	t.is(store<number>(key2).get(), 3);
}

export function testStoreMutations(
	t: ExecutionContext,
	store1: StoreAccessor,
	store2: StoreAccessor,
) {
	const key1 = Symbol('1');
	const key2 = Symbol('2');
	store1<number>(key1).set(1);
	store2<number>(key1).set(2);
	store2<number>(key2).set(3);
	t.is(store1<number>(key1).get(), 1);
	t.is(store2<number>(key1).get(), 2);
	t.is(store1<number>(key2).get(), undefined);
	t.is(store2<number>(key2).get(), 3);
}
