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
		await t.throwsAsync(middleware(resolver, params) as Promise<unknown>, {
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
		await t.notThrowsAsync(middleware(resolver, params) as Promise<unknown>);
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

		await t.throwsAsync(middleware(next, params) as Promise<unknown>, {
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

		await t.throwsAsync(middleware(next, params) as Promise<unknown>);
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

	await t.throwsAsync(middleware(resolver, params) as Promise<unknown>, {
		instanceOf: ForbiddenError,
	});

	t.true(resolver.notCalled);
});

test('verifyMiddlewareScopes resolves valid scopes', async (t) => {
	const { params, store } = createArgs();
	await t.notThrowsAsync(
		verifyMiddlewareScopes(params, undefined, scopeRule('trueScope'), () => null, store),
	);
});

test('verifyMiddlewareScopes throws when scopes is false', async (t) => {
	const { params, store } = createArgs();
	await t.throwsAsync(
		verifyMiddlewareScopes(params, undefined, false, () => null, store),
		{
			instanceOf: ForbiddenError,
		},
	);
});

test('verifyMiddlewareScopes is a no-op when there are no scopes to check', async (t) => {
	const { params, store } = createArgs();
	await t.notThrowsAsync(verifyMiddlewareScopes(params, undefined, true, () => null, store));
});

test('verifyMiddlewareScopes throws for failing default scopes', async (t) => {
	const { params, store } = createArgs();
	await t.throwsAsync(
		verifyMiddlewareScopes(
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
		verifyMiddlewareScopes(
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
		verifyMiddlewareScopes(params, undefined, scopeRule('falseScope'), errorResolver, store),
	);
	t.true(errorResolver.calledOnce);
});
