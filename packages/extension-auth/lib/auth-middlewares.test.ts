import { ForbiddenError } from '@baeta/errors';
import { sinon } from '@baeta/testing';
import test from 'ava';
import type { GraphQLResolveInfo } from 'graphql';
import { createResolverPath } from '../utils/resolver.ts';
import {
	createMiddleware,
	createPostMiddleware,
	verifyMiddlewareScopes,
} from './auth-middlewares.ts';
import type { GetGrantFn } from './grant.ts';
import type { DefaultScopes } from './scope-defaults.ts';
import type { ScopeRules } from './scope-rules.ts';
import { loadAuthStore } from './store-loader.ts';
import { getAuthStore } from './store.ts';

declare function setTimeout(callback: () => void, ms: number): void;
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function loadScopes() {
	return {
		isPublic: true,
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

function createGetGrantFn(grants: string[]) {
	return (() => grants as never[]) as GetGrantFn<unknown, unknown, unknown, unknown>;
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
	field,
	loadScopes,
	scopes,
	globalScopes,
	options,
	errorResolver,
) => {
	const getScopes = typeof scopes === 'function' ? scopes : async () => scopes;
	return createPostMiddleware(
		type,
		field,
		loadScopes,
		async (params, _result) => await getScopes(params),
		globalScopes,
		options,
		errorResolver,
	);
};

function testCreateMiddleware(createMiddlewareHelper: typeof createMiddleware, name: string) {
	test(`${name} calls resolver for valid scopes`, async (t) => {
		const { ctx, info } = createArgs();

		const scopes = {
			trueScope: true,
		} as ScopeRules;

		const middleware = createMiddlewareHelper('Query', 'test', loadScopes, scopes);

		const resolver = sinon.spy(async () => 'result');
		const result = await middleware(resolver)(null, {}, ctx, info);

		t.is(result, 'result');
		t.true(resolver.calledOnce);
	});

	test(`${name} handles global scopes`, async (t) => {
		const { ctx, info } = createArgs();

		const scopes = {
			trueScope: true,
		} as ScopeRules;

		const globalScopes = {
			Query: {
				falseScope: true,
			},
		} as DefaultScopes;

		const resolver = sinon.spy(async () => 'result');

		let middleware = createMiddlewareHelper('Query', 'test', loadScopes, scopes, globalScopes);
		await t.throwsAsync(middleware(resolver)(null, {}, ctx, info) as Promise<unknown>, {
			instanceOf: ForbiddenError,
		});

		// Making sure the middleware throws because of the global scopes
		middleware = createMiddlewareHelper('Query', 'test', loadScopes, scopes);
		await t.notThrowsAsync(middleware(resolver)(null, {}, ctx, info) as Promise<unknown>);
	});

	test(`${name} respects skipDefaultScopes`, async (t) => {
		const { ctx, info } = createArgs();

		const scopes = {
			trueScope: true,
		} as ScopeRules;

		const globalScopes = {
			Query: {
				falseScope: true,
			},
		} as DefaultScopes;

		const resolver = sinon.spy(async () => 'result');

		const middleware = createMiddlewareHelper('Query', 'test', loadScopes, scopes, globalScopes, {
			skipDefaults: true,
		});
		await t.notThrowsAsync(middleware(resolver)(null, {}, ctx, info) as Promise<unknown>);

		t.true(resolver.calledOnce);
	});

	test(`${name} saves grants when resolved`, async (t) => {
		const { ctx, info } = createArgs();

		const next = sinon.spy(async () => 'result');
		const grantFn = sinon.spy(createGetGrantFn(['grant']));

		const middleware = createMiddlewareHelper(
			'Query',
			'test',
			loadScopes,
			{ trueScope: true } as ScopeRules,
			undefined,
			{
				grants: grantFn,
			},
		);

		await middleware(next)(null, {}, ctx, info);

		const store = await getAuthStore(ctx);

		t.true(grantFn.calledOnce);
		t.deepEqual(store.grantCache.getGrants(createResolverPath(info.path)), ['grant']);
	});

	test(`${name} doesn't save grants when failing`, async (t) => {
		const { ctx, info } = createArgs();

		const next = sinon.spy(async () => 'result');
		const grantFn = sinon.spy(createGetGrantFn(['grant']));

		const middleware = createMiddlewareHelper(
			'Query',
			'test',
			loadScopes,
			{ falseScope: true } as ScopeRules,
			undefined,
			{
				grants: grantFn,
			},
		);

		await t.throwsAsync(middleware(next)(null, {}, ctx, info) as Promise<unknown>, {
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

		const middleware = createMiddlewareHelper(
			'Query',
			'test',
			loadScopes,
			{ falseScope: true } as ScopeRules,
			undefined,
			undefined,
			errorResolver,
		);

		const next = sinon.spy(async () => 'result');

		await t.throwsAsync(middleware(next)(null, {}, ctx, info) as Promise<unknown>);
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

		const middleware = createMiddlewareHelper(
			'Query',
			'test',
			loadScopes,
			{ falseScope: true } as ScopeRules,
			undefined,
			{ onError: localErrorResolver },
			globalErrorResolver,
		);

		const next = sinon.spy(async () => 'result');

		await t.throwsAsync(middleware(next)(null, {}, ctx, info) as Promise<unknown>);

		t.true(localErrorResolver.calledOnce);
		t.true(globalErrorResolver.notCalled);
	});
}

testCreateMiddleware(createMiddleware, 'createMiddleware');
testCreateMiddleware(postMiddlewareAdapter, 'createPostMiddleware');

test("createMiddleware doesn't call resolver for failing scopes", async (t) => {
	const { ctx, info } = createArgs();

	const scopes = {
		falseScope: true,
	} as ScopeRules;

	const middleware = createMiddleware('Query', 'test', loadScopes, scopes);

	const resolver = sinon.spy(async () => 'result');

	await t.throwsAsync(middleware(resolver)(null, {}, ctx, info) as Promise<unknown>, {
		instanceOf: ForbiddenError,
	});

	t.true(resolver.notCalled);
});

test('verifyMiddlewareScopes resolves valid scopes', async (t) => {
	const { ctx, info } = createArgs();

	const requiredScopes = { trueScope: true } as ScopeRules;

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

	const defaultScopes = { falseScope: true } as ScopeRules;
	const requiredScopes = { trueScope: true } as ScopeRules;

	await t.throwsAsync(
		verifyMiddlewareScopes(ctx, info, defaultScopes, requiredScopes, () => null),
		{
			instanceOf: ForbiddenError,
		},
	);
});

test('verifyMiddlewareScopes resolves default scopes', async (t) => {
	const { ctx, info } = createArgs();

	const defaultScopes = { trueScope: true } as ScopeRules;
	const requiredScopes = { trueScope: true } as ScopeRules;

	await t.notThrowsAsync(
		verifyMiddlewareScopes(ctx, info, defaultScopes, requiredScopes, () => null),
	);
});

test('verifyMiddlewareScopes handles errors with error resolver', async (t) => {
	const { ctx, info } = createArgs();

	const requiredScopes = { falseScope: true } as ScopeRules;

	const errorResolver = sinon.spy((err: unknown) => {
		if (!(err instanceof Error)) {
			throw new Error('Expected error');
		}
		return err;
	});

	await t.throwsAsync(verifyMiddlewareScopes(ctx, info, undefined, requiredScopes, errorResolver));

	t.true(errorResolver.calledOnce);
});
