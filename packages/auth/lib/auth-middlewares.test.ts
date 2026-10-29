import { ForbiddenError } from '@baeta/errors';
import test, { sinon } from '@baeta/testing';
import type { GraphQLResolveInfo } from 'graphql';
import {
	createMiddleware,
	createPostMiddleware,
	verifyMiddlewareScopes,
} from './auth-middlewares.ts';
import { createAuthStore } from './auth-store.ts';
import type { DefaultScopes } from './scope-defaults.ts';
import type { ScopeLoaderMap } from './scope-resolver.ts';
import type { ScopeRules } from './scope-rules.ts';

declare function setTimeout(callback: () => void, ms: number): void;
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type TestScopes = {
	trueScope: boolean;
	falseScope: boolean;
	lazyTrueScope: boolean;
	lazyFalseScope: boolean;
};

type TestGrants = 'grant';

const scopeRule = <K extends keyof TestScopes>(key: K): ScopeRules<TestScopes, TestGrants> => ({
	type: 'scope',
	key,
	value: true,
});

async function loadScopes(): Promise<ScopeLoaderMap<TestScopes>> {
	return {
		trueScope: true,
		falseScope: false,
		lazyTrueScope: async () => {
			await delay(5);
			return true;
		},
		lazyFalseScope: async () => {
			await delay(5);
			return false;
		},
	};
}

function createGetGrantFn(grants: TestGrants[]) {
	return () => grants;
}

function createArgs<R = unknown>(result?: R) {
	const ctx = {};
	const store = createAuthStore<TestScopes, unknown>();
	store.load(ctx, loadScopes, {});

	const info = {
		path: { typename: 'Query', key: 'test' },
	} as unknown as GraphQLResolveInfo;

	return {
		ctx,
		info,
		result,
		store,
		params: { source: result ?? {}, args: {}, ctx, info } as const,
	};
}

const postMiddlewareAdapter: typeof createMiddleware = (
	type,
	loadScopes,
	cacheKeyMap,
	authStore,
	scopes,
	globalScopes,
	options,
	errorResolver,
) => {
	const getScopes = typeof scopes === 'function' ? scopes : async () => scopes;
	return createPostMiddleware(
		type,
		loadScopes,
		cacheKeyMap,
		authStore,
		async (params, _result) => await getScopes(params),
		globalScopes,
		options,
		errorResolver,
	);
};

function testCreateMiddleware(
	createMiddlewareHelper: typeof createMiddleware<
		TestScopes,
		TestGrants,
		unknown,
		unknown,
		unknown,
		unknown,
		GraphQLResolveInfo
	>,
	name: string,
) {
	test(`${name} calls resolver for valid scopes`, async (t) => {
		const { ctx, info, store } = createArgs();
		const middleware = createMiddlewareHelper(
			'Query',
			loadScopes,
			{},
			store,
			scopeRule('trueScope'),
		);

		const params = { source: null, args: {}, ctx, info };
		const resolver = sinon.spy(async () => 'result');
		const result = await middleware(resolver, params);

		t.is(result, 'result');
		t.true(resolver.calledOnce);
	});

	test(`${name} fails when global scopes deny`, async (t) => {
		const { ctx, info, store } = createArgs();

		const globalScopes: DefaultScopes<TestScopes, TestGrants> = {
			Query: scopeRule('falseScope'),
		};

		const resolver = sinon.spy(async () => 'result');
		const params = { source: null, args: {}, ctx, info };

		const middleware = createMiddlewareHelper(
			'Query',
			loadScopes,
			{},
			store,
			scopeRule('trueScope'),
			globalScopes,
		);
		await t.throwsAsync(async () => middleware(resolver, params), {
			instanceOf: ForbiddenError,
		});
	});

	test(`${name} respects skipDefaults`, async (t) => {
		const { ctx, info, store } = createArgs();

		const globalScopes: DefaultScopes<TestScopes, TestGrants> = {
			Query: scopeRule('falseScope'),
		};

		const resolver = sinon.spy(async () => 'result');
		const params = { source: null, args: {}, ctx, info };

		const middleware = createMiddlewareHelper(
			'Query',
			loadScopes,
			{},
			store,
			scopeRule('trueScope'),
			globalScopes,
			{ skipDefaults: true },
		);
		await t.notThrowsAsync(async () => middleware(resolver, params));
		t.true(resolver.calledOnce);
	});

	test(`${name} saves grants when resolved`, async (t) => {
		const { ctx, info, store } = createArgs();

		const resolverResult = { id: 'r1' };
		const next = sinon.spy(async () => resolverResult);
		const grantFn = sinon.spy(createGetGrantFn(['grant']));

		const middleware = createMiddlewareHelper(
			'Query',
			loadScopes,
			{},
			store,
			scopeRule('trueScope'),
			undefined,
			{ grants: grantFn },
		);
		const params = { source: null, args: {}, ctx, info };

		await middleware(next, params);

		const { grantCache } = await store.get(ctx);
		t.true(grantFn.calledOnce);
		t.deepEqual(Array.from(grantCache.getGrants(resolverResult)!), ['grant']);
	});

	test(`${name} doesn't save grants when failing`, async (t) => {
		const { ctx, info, store } = createArgs();

		const resolverResult = { id: 'r1' };
		const next = sinon.spy(async () => resolverResult);
		const grantFn = sinon.spy(createGetGrantFn(['grant']));

		const middleware = createMiddlewareHelper(
			'Query',
			loadScopes,
			{},
			store,
			scopeRule('falseScope'),
			undefined,
			{ grants: grantFn },
		);
		const params = { source: null, args: {}, ctx, info };

		await t.throwsAsync(async () => middleware(next, params), {
			instanceOf: ForbiddenError,
		});

		const { grantCache } = await store.get(ctx);
		t.true(grantFn.notCalled);
		t.is(grantCache.getGrants(resolverResult), undefined);
	});

	test(`${name} delegates to a custom error resolver`, async (t) => {
		const { ctx, info, store } = createArgs();

		const errorResolver = sinon.spy((err: unknown) => {
			if (!(err instanceof Error)) throw new Error('Expected error');
			return err;
		});

		const middleware = createMiddlewareHelper(
			'Query',
			loadScopes,
			{},
			store,
			scopeRule('falseScope'),
			undefined,
			undefined,
			errorResolver,
		);

		const next = sinon.spy(async () => 'result');
		const params = { source: null, args: {}, ctx, info };

		await t.throwsAsync(async () => middleware(next, params));
		t.true(errorResolver.calledOnce);
	});
}

testCreateMiddleware(createMiddleware, 'createMiddleware');
testCreateMiddleware(postMiddlewareAdapter, 'createPostMiddleware');

test("createMiddleware doesn't call resolver for failing scopes", async (t) => {
	const { ctx, info, store } = createArgs();

	const middleware = createMiddleware('Query', loadScopes, {}, store, scopeRule('falseScope'));

	const resolver = sinon.spy(async () => 'result');
	const params = { source: null, args: {}, ctx, info };

	await t.throwsAsync(async () => middleware(resolver, params), {
		instanceOf: ForbiddenError,
	});

	t.true(resolver.notCalled);
});

test('verifyMiddlewareScopes resolves valid scopes', async (t) => {
	const { params, store } = createArgs();
	await t.notThrowsAsync(
		async () =>
			await verifyMiddlewareScopes(params, undefined, scopeRule('trueScope'), () => null, store),
	);
});

test('verifyMiddlewareScopes throws when scopes is false', async (t) => {
	const { params, store } = createArgs();
	await t.throwsAsync(
		async () => await verifyMiddlewareScopes(params, undefined, false, () => null, store),
		{
			instanceOf: ForbiddenError,
		},
	);
});

test('verifyMiddlewareScopes is a no-op when there are no scopes to check', async (t) => {
	const { params, store } = createArgs();
	await t.notThrowsAsync(
		async () => await verifyMiddlewareScopes(params, undefined, true, () => null, store),
	);
});

test('verifyMiddlewareScopes throws for failing default scopes', async (t) => {
	const { params, store } = createArgs();
	await t.throwsAsync(
		async () =>
			await verifyMiddlewareScopes(
				params,
				scopeRule('falseScope'),
				scopeRule('trueScope'),
				() => null,
				store,
			),
		{ instanceOf: ForbiddenError },
	);
});

test('verifyMiddlewareScopes resolves default scopes alongside required', async (t) => {
	const { params, store } = createArgs();
	await t.notThrowsAsync(
		async () =>
			await verifyMiddlewareScopes(
				params,
				scopeRule('trueScope'),
				scopeRule('trueScope'),
				() => null,
				store,
			),
	);
});

test('verifyMiddlewareScopes invokes the error resolver on failure', async (t) => {
	const { params, store } = createArgs();

	const errorResolver = sinon.spy((err: unknown) => {
		if (!(err instanceof Error)) throw new Error('Expected error');
		return err;
	});

	await t.throwsAsync(
		async () =>
			await verifyMiddlewareScopes(
				params,
				undefined,
				scopeRule('falseScope'),
				errorResolver,
				store,
			),
	);
	t.true(errorResolver.calledOnce);
});

test('createMiddleware runs synchronously for sync scopes, resolver and grants', (t) => {
	const ctx = {};
	const store = createAuthStore<TestScopes, unknown>();
	const loadSyncScopes = (): ScopeLoaderMap<TestScopes> => ({
		trueScope: () => true,
		falseScope: false,
		lazyTrueScope: true,
		lazyFalseScope: false,
	});
	const info = { path: { typename: 'Query', key: 'test' } } as unknown as GraphQLResolveInfo;

	const resolverResult = { id: 'r1' };
	const next = sinon.spy(() => resolverResult);
	const middleware = createMiddleware(
		'Query',
		loadSyncScopes,
		{},
		store,
		scopeRule('trueScope'),
		{ Query: scopeRule('lazyTrueScope') },
		{ grants: ['grant'] },
	);

	const result = middleware(next, { source: null, args: {}, ctx, info });

	t.is(result, resolverResult);
	t.true(next.calledOnce);

	const authStore = store.getMaybeSync(ctx);
	t.false(authStore instanceof Promise);
	if (!(authStore instanceof Promise)) {
		t.deepEqual(Array.from(authStore.grantCache.getGrants(resolverResult)!), ['grant']);
	}
});

test('createMiddleware throws synchronously for failing sync scopes', (t) => {
	const ctx = {};
	const store = createAuthStore<TestScopes, unknown>();
	const loadSyncScopes = (): ScopeLoaderMap<TestScopes> => ({
		trueScope: true,
		falseScope: false,
		lazyTrueScope: true,
		lazyFalseScope: false,
	});
	const info = { path: { typename: 'Query', key: 'test' } } as unknown as GraphQLResolveInfo;

	const next = sinon.spy(() => 'result');
	const middleware = createMiddleware('Query', loadSyncScopes, {}, store, () => false);

	t.throws(() => middleware(next, { source: null, args: {}, ctx, info }), {
		instanceOf: ForbiddenError,
	});
	t.false(next.called);
});
