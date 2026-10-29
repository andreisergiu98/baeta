import { ForbiddenError } from '@baeta/errors';
import test from '@baeta/testing';
import { createGrantCache } from './grant-cache.ts';
import { createScopeCache } from './scope-cache.ts';
import { createScopeResolverMap, type ScopeLoaderMap } from './scope-resolver.ts';
import {
	type LogicRule,
	type ScopeLogicRule,
	type ScopeRules,
	verifyAndScopes,
	verifyChainScopes,
	verifyGrant,
	verifyOrScopes,
	verifyRaceScopes,
	verifyScope,
	verifyScopeRule,
} from './scope-rules.ts';

declare function setTimeout(callback: () => void, ms: number): void;
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type TestScopes = {
	trueScope: boolean;
	trueFnScope: boolean;
	trueLazyScope: boolean;
	falseScope: boolean;
	falseFnScope: boolean;
	falseLazyScope: boolean;
};

type TestGrants = 'test-grant';

const scopeRule = <K extends keyof TestScopes>(key: K): ScopeRules<TestScopes, TestGrants> => ({
	type: 'scope',
	key,
	value: true,
});

const grantRule = (grant: TestGrants): ScopeRules<TestScopes, TestGrants> => ({
	type: 'grant',
	grant,
});

const logicRule = (
	rule: LogicRule,
	scopes: ScopeRules<TestScopes, TestGrants>[],
): ScopeLogicRule<TestScopes, TestGrants> => ({
	type: 'rule',
	rule,
	scopes,
});

function createCtx() {
	const executionOrder: string[] = [];

	const scopes: ScopeLoaderMap<TestScopes> = {
		trueScope: true,
		trueFnScope: () => {
			executionOrder.push('trueFnScope');
			return true;
		},
		trueLazyScope: async () => {
			await wait(2);
			executionOrder.push('trueLazyScope');
			return true;
		},
		falseScope: false,
		falseFnScope: () => {
			executionOrder.push('falseFnScope');
			return false;
		},
		falseLazyScope: async () => {
			await wait(10);
			executionOrder.push('falseLazyScope');
			throw new ForbiddenError();
		},
	};
	const store = {
		scopeResolverMap: createScopeResolverMap(createScopeCache({}), scopes),
		grantCache: createGrantCache(),
	};
	const params = { source: {}, args: {}, ctx: {}, info: {} } as const;
	return { params, store, executionOrder };
}

test('verifyGrant throws when grant is undefined', async (t) => {
	const { params, store } = createCtx();
	await t.throwsAsync(async () => verifyGrant(params, undefined, store.grantCache), {
		instanceOf: Error,
	});
});

test("verifyGrant throws ForbiddenError when grant doesn't exist", async (t) => {
	const { params, store } = createCtx();
	await t.throwsAsync(async () => verifyGrant(params, 'test-grant', store.grantCache), {
		instanceOf: ForbiddenError,
	});
});

test('verifyGrant resolves when grant exists on the source', (t) => {
	const { params, store } = createCtx();
	store.grantCache.addGrants(params.source, ['test-grant']);

	const result = verifyGrant(params, 'test-grant', store.grantCache);
	t.is(result, true);
});

test('verifyScope throws when scope is undefined', async (t) => {
	const { params, store } = createCtx();
	await t.throwsAsync(async () => await verifyScope(params, undefined, store), {
		message: 'Scope rules cannot be undefined!',
	});
});

test('verifyScope resolves grant-type rule', async (t) => {
	const { params, store } = createCtx();
	store.grantCache.addGrants(params.source, ['test-grant']);

	const result = await verifyScope(params, grantRule('test-grant'), store);
	t.is(result, true);
});

test('verifyScope throws when grant is missing', async (t) => {
	const { params, store } = createCtx();
	await t.throwsAsync(async () => await verifyScope(params, grantRule('test-grant'), store), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope resolves boolean scope', async (t) => {
	const { params, store } = createCtx();
	const result = await verifyScope(params, scopeRule('trueScope'), store);
	t.is(result, true);
});

test('verifyScope throws for false boolean scope', async (t) => {
	const { params, store } = createCtx();
	await t.throwsAsync(async () => await verifyScope(params, scopeRule('falseScope'), store), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope resolves function scope', async (t) => {
	const { params, store } = createCtx();
	const result = await verifyScope(params, scopeRule('trueFnScope'), store);
	t.is(result, true);
});

test('verifyScope throws for failing function scope', async (t) => {
	const { params, store } = createCtx();
	await t.throwsAsync(async () => await verifyScope(params, scopeRule('falseFnScope'), store), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope resolves lazy scope', async (t) => {
	const { params, store } = createCtx();
	const result = await verifyScope(params, scopeRule('trueLazyScope'), store);
	t.is(result, true);
});

test('verifyScope throws for failing lazy scope', async (t) => {
	const { params, store } = createCtx();
	await t.throwsAsync(async () => await verifyScope(params, scopeRule('falseLazyScope'), store), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope throws when scope key has no resolver', async (t) => {
	const { params, store } = createCtx();
	const rule = { type: 'scope', key: 'unknown', value: true } as unknown as ScopeRules<
		TestScopes,
		TestGrants
	>;
	await t.throwsAsync(async () => await verifyScope(params, rule, store), {
		message: "No scope resolver found for key 'unknown'!",
	});
});

test('verifyScopeRule throws when scopes array is empty', async (t) => {
	const { params, store } = createCtx();
	await t.throwsAsync(async () => await verifyScopeRule(params, logicRule('and', []), store), {
		message: 'Scope rule cannot be empty!',
	});
});

test('verifyScopeRule throws for invalid logic rule', async (t) => {
	const { params, store } = createCtx();
	const rule = {
		type: 'rule',
		rule: 'bogus',
		scopes: [scopeRule('trueScope')],
	} as unknown as Parameters<typeof verifyScopeRule<TestScopes, TestGrants>>[1];
	await t.throwsAsync(async () => await verifyScopeRule(params, rule, store), {
		message: "Invalid logic rule! Must be one of 'chain', 'race', 'or', or 'and'.",
	});
});

test('verifyScopeRule dispatches to each logic rule for valid scopes', async (t) => {
	const { params, store } = createCtx();
	const scopes = [scopeRule('trueScope'), scopeRule('trueFnScope'), scopeRule('trueLazyScope')];

	await t.notThrowsAsync(
		async () => await verifyScopeRule(params, logicRule('chain', scopes), store),
	);
	await t.notThrowsAsync(
		async () => await verifyScopeRule(params, logicRule('race', scopes), store),
	);
	await t.notThrowsAsync(async () => await verifyScopeRule(params, logicRule('or', scopes), store));
	await t.notThrowsAsync(
		async () => await verifyScopeRule(params, logicRule('and', scopes), store),
	);
});

test('verifyScopeRule throws for each logic rule when all scopes fail', async (t) => {
	const { params, store } = createCtx();
	const scopes = [scopeRule('falseScope'), scopeRule('falseFnScope'), scopeRule('falseLazyScope')];

	await t.throwsAsync(
		async () => await verifyScopeRule(params, logicRule('chain', scopes), store),
		{
			instanceOf: ForbiddenError,
		},
	);
	await t.throwsAsync(async () => await verifyScopeRule(params, logicRule('race', scopes), store), {
		instanceOf: ForbiddenError,
	});
	await t.throwsAsync(async () => await verifyScopeRule(params, logicRule('or', scopes), store), {
		instanceOf: AggregateError,
	});
	await t.throwsAsync(async () => await verifyScopeRule(params, logicRule('and', scopes), store), {
		instanceOf: ForbiddenError,
	});
});

test('verifyChainScopes executes scopes in sequence', async (t) => {
	const { params, store, executionOrder } = createCtx();

	const result = await verifyChainScopes(
		params,
		[scopeRule('trueLazyScope'), scopeRule('trueFnScope')],
		store,
	);

	t.is(result, true);
	t.deepEqual(executionOrder, ['trueLazyScope', 'trueFnScope']);
});

test('verifyChainScopes throws on first failure', async (t) => {
	const { params, store, executionOrder } = createCtx();

	await t.throwsAsync(
		async () =>
			await verifyChainScopes(
				params,
				[scopeRule('falseLazyScope'), scopeRule('trueLazyScope')],
				store,
			),
		{ instanceOf: ForbiddenError },
	);

	t.deepEqual(executionOrder, ['falseLazyScope']);
});

test('verifyRaceScopes resolves on first success', async (t) => {
	const { params, store, executionOrder } = createCtx();

	const result = await verifyRaceScopes(
		params,
		[
			scopeRule('falseLazyScope'),
			scopeRule('trueLazyScope'),
			scopeRule('trueFnScope'),
			scopeRule('trueScope'),
		],
		store,
	);

	t.is(result, true);
	t.deepEqual(executionOrder, ['falseLazyScope', 'trueLazyScope']);
});

test('verifyRaceScopes throws ForbiddenError if all candidates fail', async (t) => {
	const { params, store, executionOrder } = createCtx();

	await t.throwsAsync(
		async () =>
			await verifyRaceScopes(
				params,
				[scopeRule('falseLazyScope'), scopeRule('falseFnScope')],
				store,
			),
		{ instanceOf: ForbiddenError },
	);

	t.deepEqual(executionOrder, ['falseLazyScope', 'falseFnScope']);
});

test('verifyOrScopes resolves as soon as any scope succeeds', async (t) => {
	const { params, store } = createCtx();

	const result = await verifyOrScopes(
		params,
		[scopeRule('trueLazyScope'), scopeRule('falseLazyScope'), scopeRule('falseFnScope')],
		store,
	);

	t.is(result, true);
});

test('verifyOrScopes throws AggregateError if all scopes fail', async (t) => {
	const { params, store } = createCtx();

	await t.throwsAsync(
		async () =>
			await verifyOrScopes(params, [scopeRule('falseFnScope'), scopeRule('falseLazyScope')], store),
		{ instanceOf: AggregateError },
	);
});

test('verifyAndScopes resolves when all scopes succeed', async (t) => {
	const { params, store } = createCtx();

	const result = await verifyAndScopes(
		params,
		[scopeRule('trueScope'), scopeRule('trueFnScope'), scopeRule('trueLazyScope')],
		store,
	);

	t.is(result, true);
});

test('verifyAndScopes throws if any scope fails', async (t) => {
	const { params, store } = createCtx();

	await t.throwsAsync(
		async () =>
			await verifyAndScopes(
				params,
				[scopeRule('trueFnScope'), scopeRule('trueLazyScope'), scopeRule('falseLazyScope')],
				store,
			),
		{ instanceOf: ForbiddenError },
	);
});

test('verifyScopeRule handles nested combinations of rules', async (t) => {
	const { params, store } = createCtx();

	const nested = logicRule('and', [
		scopeRule('trueFnScope'),
		logicRule('or', [scopeRule('trueLazyScope'), scopeRule('falseLazyScope')]),
		logicRule('race', [scopeRule('falseLazyScope'), scopeRule('trueFnScope')]),
	]);

	await t.notThrowsAsync(async () => await verifyScopeRule(params, nested, store));
});

test('verifyScopeRule fails when a nested branch fails', async (t) => {
	const { params, store } = createCtx();

	const nested = logicRule('and', [
		scopeRule('trueFnScope'),
		logicRule('or', [scopeRule('falseLazyScope'), scopeRule('falseFnScope')]),
	]);

	await t.throwsAsync(async () => await verifyScopeRule(params, nested, store));
});

test('verifyScopeRule resolves sync scopes synchronously for every rule', (t) => {
	const { params, store } = createCtx();
	const scopes = [scopeRule('trueScope'), scopeRule('trueFnScope')];

	for (const rule of ['chain', 'race', 'or', 'and'] as const) {
		t.is(verifyScopeRule(params, logicRule(rule, scopes), store), true, rule);
	}
});

test('verifyScopeRule returns a promise when a scope is async', async (t) => {
	const scopes = [scopeRule('trueScope'), scopeRule('trueLazyScope')];

	for (const rule of ['chain', 'and'] as const) {
		// fresh store per rule, the resolved lazy scope is cached as a plain boolean
		const { params, store } = createCtx();
		const result = verifyScopeRule(params, logicRule(rule, scopes), store);
		t.true(result instanceof Promise, rule);
		t.is(await result, true, rule);
	}
});

test('verifyOrScopes passes synchronously when a sync scope passes', async (t) => {
	const { params, store, executionOrder } = createCtx();

	const result = verifyOrScopes(
		params,
		[scopeRule('falseLazyScope'), scopeRule('falseFnScope'), scopeRule('trueScope')],
		store,
	);
	t.is(result, true);

	// Every branch still runs, and the pending rejection must not surface as unhandled
	await wait(20);
	t.deepEqual(executionOrder, ['falseFnScope', 'falseLazyScope']);
});

test('verifyAndScopes rejects when a sync scope fails', async (t) => {
	const { params, store } = createCtx();

	const result = verifyAndScopes(params, [scopeRule('trueScope'), scopeRule('falseScope')], store);
	t.true(result instanceof Promise);
	await t.throwsAsync(async () => await result, { instanceOf: ForbiddenError });
});
