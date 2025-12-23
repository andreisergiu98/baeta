import type { ExecutionContext } from '@baeta/testing';

interface UseStoreLike {
	useStore: <T>(key: symbol) => {
		get: () => T | undefined;
		set: (value: Readonly<T>) => void;
	};
}

interface SetStoreLike {
	useStore: <T>(key: symbol) => {
		get: () => T | undefined;
		set: (value: Readonly<T>) => void;
	};
	setStore: <T>(key: symbol, value: Readonly<T>) => void;
}

export function testUseStoreLike(t: ExecutionContext, useStoreLike: UseStoreLike) {
	const key1 = Symbol('1');
	const key2 = Symbol('2');
	useStoreLike.useStore<number>(key1).set(1);
	useStoreLike.useStore<number>(key1).set(2);
	useStoreLike.useStore<number>(key2).set(3);
	t.is(useStoreLike.useStore<number>(key1).get(), 2);
	t.is(useStoreLike.useStore<number>(key2).get(), 3);
}

export function testSetStoreLike(t: ExecutionContext, setStoreLike: SetStoreLike) {
	const key1 = Symbol('1');
	const key2 = Symbol('2');
	setStoreLike.setStore<number>(key1, 1);
	t.is(setStoreLike.useStore<number>(key1).get(), 1);
	t.is(setStoreLike.useStore<number>(key2).get(), undefined);
}

export function testUseStoreMutations(
	t: ExecutionContext,
	useStoreLike1: UseStoreLike,
	useStoreLike2: UseStoreLike,
) {
	const key1 = Symbol('1');
	const key2 = Symbol('2');
	useStoreLike1.useStore<number>(key1).set(1);
	useStoreLike2.useStore<number>(key1).set(2);
	useStoreLike2.useStore<number>(key2).set(3);
	t.is(useStoreLike1.useStore<number>(key1).get(), 1);
	t.is(useStoreLike2.useStore<number>(key1).get(), 2);
	t.is(useStoreLike1.useStore<number>(key2).get(), undefined);
	t.is(useStoreLike2.useStore<number>(key2).get(), 3);
}
