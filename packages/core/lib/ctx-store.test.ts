import test from '@baeta/testing';
import {
	type ContextStoreValue,
	createContextStore,
	createContextStoreWithLoader,
} from './ctx-store.ts';

test('store should wait for get before loading to ctx when lazy', (t) => {
	const storeKey = Symbol('storeKey');
	const [, set] = createContextStore(storeKey, {
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
	const [, set] = createContextStore(storeKey, {
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

	void get(ctx);

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

test('getMaybeSync should return sync loader value synchronously', async (t) => {
	const storeKey = Symbol('storeKey');
	const [get, set, getMaybeSync] = createContextStore(storeKey);

	const ctx = {} as Record<string | symbol, unknown>;
	set(ctx, () => 1);

	t.is(getMaybeSync(ctx), 1);
	t.is(await get(ctx), 1);
});

test('getMaybeSync should return eager sync loader value synchronously', (t) => {
	const storeKey = Symbol('storeKey');
	const [, set, getMaybeSync] = createContextStore(storeKey, { eager: true });

	const ctx = {} as Record<string | symbol, unknown>;
	set(ctx, () => 1);

	const store = ctx[storeKey] as ContextStoreValue<1>;
	t.true(store.isLoaded && store.isResolved);
	t.is(getMaybeSync(ctx), 1);
});

test('getMaybeSync should return a promise until async loader resolves', async (t) => {
	const storeKey = Symbol('storeKey');
	const [get, set, getMaybeSync] = createContextStore(storeKey);

	const ctx = {} as Record<string | symbol, unknown>;
	set(ctx, async () => 1);

	const first = getMaybeSync(ctx);
	t.true(first instanceof Promise);
	t.is(first, get(ctx));
	t.is(await first, 1);

	t.is(getMaybeSync(ctx), 1);
});

test('getMaybeSync should return eager value synchronously once resolved', async (t) => {
	const storeKey = Symbol('storeKey');
	const [get, set, getMaybeSync] = createContextStore(storeKey, { eager: true });

	const ctx = {} as Record<string | symbol, unknown>;
	set(ctx, async () => 1);

	await get(ctx);

	const store = ctx[storeKey] as ContextStoreValue<1>;
	t.true(store.isLoaded && store.isResolved);
	t.is(getMaybeSync(ctx), 1);
});

test('getMaybeSync should keep returning the rejected promise when loader rejects', async (t) => {
	const storeKey = Symbol('storeKey');
	const [, set, getMaybeSync] = createContextStore(storeKey);

	const ctx = {} as Record<string | symbol, unknown>;
	set(ctx, async () => {
		throw new Error('boom');
	});

	await t.throwsAsync(async () => getMaybeSync(ctx), { message: 'boom' });
	await t.throwsAsync(async () => getMaybeSync(ctx), { message: 'boom' });
});

test('getMaybeSync should return a rejected promise when sync loader throws', async (t) => {
	const storeKey = Symbol('storeKey');
	const [get, set, getMaybeSync] = createContextStore(storeKey);

	const ctx = {} as Record<string | symbol, unknown>;
	set(ctx, () => {
		throw new Error('boom');
	});

	const result = getMaybeSync(ctx);
	t.true(result instanceof Promise);
	await t.throwsAsync(async () => result, { message: 'boom' });
	await t.throwsAsync(get(ctx), { message: 'boom' });
});

test('getMaybeSync and get should share a single loader call', async (t) => {
	const storeKey = Symbol('storeKey');
	const [get, set, getMaybeSync] = createContextStore(storeKey);

	const ctx = {} as Record<string | symbol, unknown>;
	let calls = 0;
	set(ctx, async () => {
		calls++;
		return 1;
	});

	await getMaybeSync(ctx);
	await get(ctx);
	getMaybeSync(ctx);

	t.is(calls, 1);
});

test('getMaybeSync should throw when not set', (t) => {
	const storeKey = Symbol('storeKey');
	const [, , getMaybeSync] = createContextStore(storeKey);
	const ctx = {} as Record<string | symbol, unknown>;
	t.throws(() => getMaybeSync(ctx));
});

test('store with loader should expose getMaybeSync', async (t) => {
	const storeKey = Symbol('storeKey');
	const [, init, getMaybeSync] = createContextStoreWithLoader(storeKey, async () => 1);

	const ctx = {} as Record<string | symbol, unknown>;
	init(ctx);

	t.is(await getMaybeSync(ctx), 1);
	t.is(getMaybeSync(ctx), 1);
});
