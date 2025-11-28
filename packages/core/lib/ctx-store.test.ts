import test from '@baeta/testing';
import {
	type ContextStoreValue,
	createContextStore,
	createContextStoreWithLoader,
} from './ctx-store.ts';

test('store should wait for get before loading to ctx when lazy', (t) => {
	const storeKey = Symbol('storeKey');
	const [_get, set] = createContextStore(storeKey, {
		eager: false,
	});

	const ctx = {} as Record<string | symbol, unknown>;

	const loader = async () => 1;
	set(ctx, loader);

	const store = ctx[storeKey] as ContextStoreValue<1>;

	t.is(store.isLoaded, false);
});

test('store should preload when not lazy', async (t) => {
	const storeKey = Symbol('storeKey');
	const [_get, set] = createContextStore(storeKey, {
		eager: true,
	});

	const ctx = {} as Record<string | symbol, unknown>;

	const loader = async () => 1;
	set(ctx, loader);

	const store = ctx[storeKey] as ContextStoreValue<1>;

	t.is(store.isLoaded, true);
	if (store.isLoaded) {
		t.is(await store.result, 1);
	}
});

test("store should be loaded when get is called and it's lazy", async (t) => {
	const storeKey = Symbol('storeKey');
	const [get, set] = createContextStore(storeKey, {
		eager: false,
	});

	const ctx = {} as Record<string | symbol, unknown>;

	const loader = async () => 1;
	set(ctx, loader);

	let store = ctx[storeKey] as ContextStoreValue<1>;

	t.is(store.isLoaded, false);

	get(ctx);

	store = ctx[storeKey] as ContextStoreValue<1>;
	t.is(store.isLoaded, true);
});

test('get should return loader value', async (t) => {
	const storeKey = Symbol('storeKey');
	const [get, set] = createContextStore(storeKey);

	const ctx = {} as Record<string | symbol, unknown>;

	const loader = async () => 1;
	set(ctx, loader);

	t.is(await get(ctx), await loader());
});

test('get should return the same promise when called multiple times', (t) => {
	const storeKey = Symbol('storeKey');
	const [get, set] = createContextStore(storeKey);

	const ctx = {} as Record<string | symbol, unknown>;

	const loader = async () => 1;
	set(ctx, loader);

	t.is(get(ctx), get(ctx));
});

test('get should throw when not set', (t) => {
	const storeKey = Symbol('storeKey');
	const [get] = createContextStore(storeKey);
	const ctx = {} as Record<string | symbol, unknown>;
	t.throws(() => get(ctx));
});

test('set should be skipped when already set', async (t) => {
	const storeKey = Symbol('storeKey');
	const [get, set] = createContextStore(storeKey);

	const ctx = {} as Record<string | symbol, unknown>;

	set(ctx, async () => 1);
	set(ctx, async () => 2);

	t.is(await get(ctx), 1);
});

test('store with loader should work when initialized', async (t) => {
	const storeKey = Symbol('storeKey');
	const [get, init] = createContextStoreWithLoader(storeKey, async () => 1);

	const ctx = {} as Record<string | symbol, unknown>;
	init(ctx);

	t.is(await get(ctx), 1);
});

test('store with loader should throw when not initialized', (t) => {
	const storeKey = Symbol('storeKey');
	const [get] = createContextStoreWithLoader(storeKey, async () => 1);
	const ctx = {} as Record<string | symbol, unknown>;
	t.throws(() => get(ctx));
});
