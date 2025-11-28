import { ForbiddenError } from '@baeta/errors';
import test, { sinon } from '@baeta/testing';
import type { GraphQLResolveInfo } from 'graphql';
import { createResolverPath } from '../utils/resolver.ts';
import {
	createMiddleware,
	createPostMiddleware,
	verifyMiddlewareScopes,
} from './auth-middlewares.ts';
import type { DefaultScopes } from './scope-defaults.ts';
import type { ScopeLoaderMap } from './scope-resolver.ts';
import type { ScopeRules } from './scope-rules.ts';
import { getAuthStore } from './store.ts';
import { loadAuthStore } from './store-loader.ts';

declare function setTimeout(callback: () => void, ms: number): void;
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type TestScopes = {
	trueScope: true;
	falseScope: true;
	lazyTrueScope: true;
	lazyFalseScope: true;
};

type TestGrants = 'grant';

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

function createArgs() {
	const ctx = {};

	loadAuthStore(ctx, loadScopes);

	const info = {
		path: { typename: 'Query', key: 'test' },
	} as unknown as GraphQLResolveInfo;

	return { ctx, info };
}

const postMiddlewareAdapter: typeof createMiddleware = (
	type,
	loadScopes,
	scopes,
	globalScopes,
	options,
	errorResolver,
) => {
	const getScopes = typeof scopes === 'function' ? scopes : async () => scopes;
	return createPostMiddleware(
		type,
		loadScopes,
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
		const { ctx, info } = createArgs();

		const scopes: ScopeRules<TestScopes, TestGrants> = {
			trueScope: true,
		};

		const middleware = createMiddlewareHelper('Query', loadScopes, scopes);
		const params = { source: null, args: {}, ctx, info };

		const resolver = sinon.spy(async () => 'result');
		const result = await middleware(resolver, params);

		t.is(result, 'result');
		t.true(resolver.calledOnce);
	});

	test(`${name} handles global scopes`, async (t) => {
		const { ctx, info } = createArgs();

		const scopes: ScopeRules<TestScopes, TestGrants> = {
			trueScope: true,
		};

		const globalScopes: DefaultScopes<TestScopes, TestGrants> = {
			Query: {
				falseScope: true,
			},
		};

		const resolver = sinon.spy(async () => 'result');
		const params = { source: null, args: {}, ctx, info };
		let middleware = createMiddlewareHelper('Query', loadScopes, scopes, globalScopes);
		await t.throwsAsync(middleware(resolver, params) as Promise<unknown>, {
			instanceOf: ForbiddenError,
		});

		// Making sure the middleware throws because of the global scopes
		middleware = createMiddlewareHelper('Query', loadScopes, scopes);
		await t.notThrowsAsync(middleware(resolver, params) as Promise<unknown>);
	});

	test(`${name} respects skipDefaultScopes`, async (t) => {
		const { ctx, info } = createArgs();

		const scopes: ScopeRules<TestScopes, TestGrants> = {
			trueScope: true,
		};

		const globalScopes: DefaultScopes<TestScopes, TestGrants> = {
			Query: {
				falseScope: true,
			},
		};

		const resolver = sinon.spy(async () => 'result');
		const params = { source: null, args: {}, ctx, info };

		const middleware = createMiddlewareHelper('Query', loadScopes, scopes, globalScopes, {
			skipDefaults: true,
		});
		await t.notThrowsAsync(middleware(resolver, params) as Promise<unknown>);

		t.true(resolver.calledOnce);
	});

	test(`${name} saves grants when resolved`, async (t) => {
		const { ctx, info } = createArgs();

		const next = sinon.spy(async () => 'result');
		const grantFn = sinon.spy(createGetGrantFn(['grant']));

		const scopes: ScopeRules<TestScopes, TestGrants> = {
			trueScope: true,
		};

		const middleware = createMiddlewareHelper('Query', loadScopes, scopes, undefined, {
			grants: grantFn,
		});
		const params = { source: null, args: {}, ctx, info };

		await middleware(next, params);

		const store = await getAuthStore(ctx);

		t.true(grantFn.calledOnce);
		t.deepEqual(store.grantCache.getGrants(createResolverPath(info.path)), ['grant']);
	});

	test(`${name} doesn't save grants when failing`, async (t) => {
		const { ctx, info } = createArgs();

		const next = sinon.spy(async () => 'result');
		const grantFn = sinon.spy(createGetGrantFn(['grant']));

		const scopes: ScopeRules<TestScopes, TestGrants> = {
			falseScope: true,
		};

		const middleware = createMiddlewareHelper('Query', loadScopes, scopes, undefined, {
			grants: grantFn,
		});
		const params = { source: null, args: {}, ctx, info };

		await t.throwsAsync(middleware(next, params) as Promise<unknown>, {
			instanceOf: ForbiddenError,
		});

		const store = await getAuthStore(ctx);

		t.true(grantFn.notCalled);
		t.notDeepEqual(store.grantCache.getGrants(createResolverPath(info.path)), ['grant']);
	});

	test(`${name} handles custom error resolver`, async (t) => {
		const { ctx, info } = createArgs();

		const errorResolver = sinon.spy((err: unknown) => {
			if (!(err instanceof Error)) {
				throw new Error('Expected error');
			}
			return err;
		});

		const scopes: ScopeRules<TestScopes, TestGrants> = {
			falseScope: true,
		};

		const middleware = createMiddlewareHelper(
			'Query',
			loadScopes,
			scopes,
			undefined,
			undefined,
			errorResolver,
		);

		const next = sinon.spy(async () => 'result');
		const params = { source: null, args: {}, ctx, info };

		await t.throwsAsync(middleware(next, params) as Promise<unknown>);
		t.true(errorResolver.calledOnce);
	});

	test(`${name} options error handler takes precedence`, async (t) => {
		const { ctx, info } = createArgs();

		const globalErrorResolver = sinon.spy((err: unknown) => {
			if (!(err instanceof Error)) {
				throw new Error('Expected error');
			}
			return err;
		});

		const localErrorResolver = sinon.spy((err: unknown) => {
			if (!(err instanceof Error)) {
				throw new Error('Expected error');
			}
			return err;
		});

		const scopes: ScopeRules<TestScopes, TestGrants> = {
			falseScope: true,
		};

		const middleware = createMiddlewareHelper(
			'Query',
			loadScopes,
			scopes,
			undefined,
			{ onError: localErrorResolver },
			globalErrorResolver,
		);

		const next = sinon.spy(async () => 'result');
		const params = { source: null, args: {}, ctx, info };

		await t.throwsAsync(middleware(next, params) as Promise<unknown>);

		t.true(localErrorResolver.calledOnce);
		t.true(globalErrorResolver.notCalled);
	});
}

testCreateMiddleware(createMiddleware, 'createMiddleware');
testCreateMiddleware(postMiddlewareAdapter, 'createPostMiddleware');

test("createMiddleware doesn't call resolver for failing scopes", async (t) => {
	const { ctx, info } = createArgs();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		falseScope: true,
	};

	const middleware = createMiddleware('Query', loadScopes, scopes);

	const resolver = sinon.spy(async () => 'result');
	const params = { source: null, args: {}, ctx, info };

	await t.throwsAsync(middleware(resolver, params) as Promise<unknown>, {
		instanceOf: ForbiddenError,
	});

	t.true(resolver.notCalled);
});

test('verifyMiddlewareScopes resolves valid scopes', async (t) => {
	const { ctx, info } = createArgs();

	const requiredScopes: ScopeRules<TestScopes, TestGrants> = { trueScope: true };

	await t.notThrowsAsync(verifyMiddlewareScopes(ctx, info, undefined, requiredScopes, () => null));
});

test('verifyMiddlewareScopes throws when scopes is false', async (t) => {
	const { ctx, info } = createArgs();

	await t.throwsAsync(
		verifyMiddlewareScopes(ctx, info, undefined, false, () => null),
		{ instanceOf: ForbiddenError },
	);
});

test('verifyMiddlewareScopes throws when no scopes are empty', async (t) => {
	const { ctx, info } = createArgs();

	await t.throwsAsync(
		verifyMiddlewareScopes(ctx, info, undefined, undefined, () => null),
		{ message: 'Scope definitions cannot be empty!' },
	);

	await t.throwsAsync(
		verifyMiddlewareScopes(ctx, info, undefined, {}, () => null),
		{ message: 'Scope definitions cannot be empty!' },
	);
});

test('verifyMiddlewareScopes throws for failing default scopes', async (t) => {
	const { ctx, info } = createArgs();

	const defaultScopes: ScopeRules<TestScopes, TestGrants> = { falseScope: true };
	const requiredScopes: ScopeRules<TestScopes, TestGrants> = { trueScope: true };

	await t.throwsAsync(
		verifyMiddlewareScopes(ctx, info, defaultScopes, requiredScopes, () => null),
		{
			instanceOf: ForbiddenError,
		},
	);
});

test('verifyMiddlewareScopes resolves default scopes', async (t) => {
	const { ctx, info } = createArgs();

	const defaultScopes: ScopeRules<TestScopes, TestGrants> = { trueScope: true };
	const requiredScopes: ScopeRules<TestScopes, TestGrants> = { trueScope: true };

	await t.notThrowsAsync(
		verifyMiddlewareScopes(ctx, info, defaultScopes, requiredScopes, () => null),
	);
});

test('verifyMiddlewareScopes handles errors with error resolver', async (t) => {
	const { ctx, info } = createArgs();

	const requiredScopes: ScopeRules<TestScopes, TestGrants> = { falseScope: true };

	const errorResolver = sinon.spy((err: unknown) => {
		if (!(err instanceof Error)) {
			throw new Error('Expected error');
		}
		return err;
	});

	await t.throwsAsync(verifyMiddlewareScopes(ctx, info, undefined, requiredScopes, errorResolver));

	t.true(errorResolver.calledOnce);
});
