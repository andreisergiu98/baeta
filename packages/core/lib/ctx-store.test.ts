import test from '@baeta/testing';
import { type ContextStoreValue, createContextStore } from './ctx-store.ts';

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
