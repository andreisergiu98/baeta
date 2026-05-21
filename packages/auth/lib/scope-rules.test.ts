import { ForbiddenError } from '@baeta/errors';
import test from '@baeta/testing';
import type { ScopeLoaderMap } from './scope-resolver.ts';
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
import { loadAuthStore } from './store-loader.ts';
import { getAuthStore } from './store.ts';

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
	const ctx = {};
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
	loadAuthStore<TestScopes, typeof ctx>(ctx, async () => scopes, {});
	const params = { source: {}, args: {}, ctx, info: {} } as const;
	return { ctx, params, executionOrder };
}

test('verifyGrant throws when grant is undefined', async (t) => {
	const { params } = createCtx();
	await t.throwsAsync(verifyGrant(params, undefined), { instanceOf: Error });
});

test("verifyGrant throws ForbiddenError when grant doesn't exist", async (t) => {
	const { params } = createCtx();
	await t.throwsAsync(verifyGrant(params, 'test-grant'), { instanceOf: ForbiddenError });
});

test('verifyGrant resolves when grant exists on the source', async (t) => {
	const { params } = createCtx();
	const store = await getAuthStore(params.ctx);
	store.grantCache.addGrants(params.source, ['test-grant']);

	const result = await verifyGrant(params, 'test-grant');
	t.is(result, true);
});

test('verifyScope throws when scope is undefined', async (t) => {
	const { params } = createCtx();
	await t.throwsAsync(verifyScope(params, undefined), {
		message: 'Scope rules cannot be undefined!',
	});
});

test('verifyScope resolves grant-type rule', async (t) => {
	const { params } = createCtx();
	const store = await getAuthStore(params.ctx);
	store.grantCache.addGrants(params.source, ['test-grant']);

	const result = await verifyScope(params, grantRule('test-grant'));
	t.is(result, true);
});

test('verifyScope throws when grant is missing', async (t) => {
	const { params } = createCtx();
	await t.throwsAsync(verifyScope(params, grantRule('test-grant')), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope resolves boolean scope', async (t) => {
	const { params } = createCtx();
	const result = await verifyScope(params, scopeRule('trueScope'));
	t.is(result, true);
});

test('verifyScope throws for false boolean scope', async (t) => {
	const { params } = createCtx();
	await t.throwsAsync(verifyScope(params, scopeRule('falseScope')), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope resolves function scope', async (t) => {
	const { params } = createCtx();
	const result = await verifyScope(params, scopeRule('trueFnScope'));
	t.is(result, true);
});

test('verifyScope throws for failing function scope', async (t) => {
	const { params } = createCtx();
	await t.throwsAsync(verifyScope(params, scopeRule('falseFnScope')), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope resolves lazy scope', async (t) => {
	const { params } = createCtx();
	const result = await verifyScope(params, scopeRule('trueLazyScope'));
	t.is(result, true);
});

test('verifyScope throws for failing lazy scope', async (t) => {
	const { params } = createCtx();
	await t.throwsAsync(verifyScope(params, scopeRule('falseLazyScope')), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope throws when scope key has no resolver', async (t) => {
	const { params } = createCtx();
	const rule = { type: 'scope', key: 'unknown', value: true } as unknown as ScopeRules<
		TestScopes,
		TestGrants
	>;
	await t.throwsAsync(verifyScope(params, rule), {
		message: "No scope resolver found for key 'unknown'!",
	});
});

test('verifyScopeRule throws when scopes array is empty', async (t) => {
	const { params } = createCtx();
	await t.throwsAsync(verifyScopeRule(params, logicRule('and', [])), {
		message: 'Scope rule cannot be empty!',
	});
});

test('verifyScopeRule throws for invalid logic rule', async (t) => {
	const { params } = createCtx();
	const rule = {
		type: 'rule',
		rule: 'bogus',
		scopes: [scopeRule('trueScope')],
	} as unknown as Parameters<typeof verifyScopeRule>[1];
	await t.throwsAsync(verifyScopeRule(params, rule), {
		message: "Invalid logic rule! Must be one of 'chain', 'race', 'or', or 'and'.",
	});
});

test('verifyScopeRule dispatches to each logic rule for valid scopes', async (t) => {
	const { params } = createCtx();
	const scopes = [scopeRule('trueScope'), scopeRule('trueFnScope'), scopeRule('trueLazyScope')];

	await t.notThrowsAsync(verifyScopeRule(params, logicRule('chain', scopes)));
	await t.notThrowsAsync(verifyScopeRule(params, logicRule('race', scopes)));
	await t.notThrowsAsync(verifyScopeRule(params, logicRule('or', scopes)));
	await t.notThrowsAsync(verifyScopeRule(params, logicRule('and', scopes)));
});

test('verifyScopeRule throws for each logic rule when all scopes fail', async (t) => {
	const { params } = createCtx();
	const scopes = [scopeRule('falseScope'), scopeRule('falseFnScope'), scopeRule('falseLazyScope')];

	await t.throwsAsync(verifyScopeRule(params, logicRule('chain', scopes)), {
		instanceOf: ForbiddenError,
	});
	await t.throwsAsync(verifyScopeRule(params, logicRule('race', scopes)), {
		instanceOf: ForbiddenError,
	});
	await t.throwsAsync(verifyScopeRule(params, logicRule('or', scopes)), {
		instanceOf: AggregateError,
	});
	await t.throwsAsync(verifyScopeRule(params, logicRule('and', scopes)), {
		instanceOf: ForbiddenError,
	});
});

test('verifyChainScopes executes scopes in sequence', async (t) => {
	const { params, executionOrder } = createCtx();

	const result = await verifyChainScopes(params, [
		scopeRule('trueLazyScope'),
		scopeRule('trueFnScope'),
	]);

	t.is(result, true);
	t.deepEqual(executionOrder, ['trueLazyScope', 'trueFnScope']);
});

test('verifyChainScopes throws on first failure', async (t) => {
	const { params, executionOrder } = createCtx();

	await t.throwsAsync(
		verifyChainScopes(params, [scopeRule('falseLazyScope'), scopeRule('trueLazyScope')]),
		{ instanceOf: ForbiddenError },
	);

	t.deepEqual(executionOrder, ['falseLazyScope']);
});

test('verifyRaceScopes resolves on first success', async (t) => {
	const { params, executionOrder } = createCtx();

	const result = await verifyRaceScopes(params, [
		scopeRule('falseLazyScope'),
		scopeRule('trueLazyScope'),
		scopeRule('trueFnScope'),
		scopeRule('trueScope'),
	]);

	t.is(result, true);
	t.deepEqual(executionOrder, ['falseLazyScope', 'trueLazyScope']);
});

test('verifyRaceScopes throws ForbiddenError if all candidates fail', async (t) => {
	const { params, executionOrder } = createCtx();

	await t.throwsAsync(
		verifyRaceScopes(params, [scopeRule('falseLazyScope'), scopeRule('falseFnScope')]),
		{ instanceOf: ForbiddenError },
	);

	t.deepEqual(executionOrder, ['falseLazyScope', 'falseFnScope']);
});

test('verifyOrScopes resolves as soon as any scope succeeds', async (t) => {
	const { params } = createCtx();

	const result = await verifyOrScopes(params, [
		scopeRule('trueLazyScope'),
		scopeRule('falseLazyScope'),
		scopeRule('falseFnScope'),
	]);

	t.is(result, true);
});

test('verifyOrScopes throws AggregateError if all scopes fail', async (t) => {
	const { params } = createCtx();

	await t.throwsAsync(
		verifyOrScopes(params, [scopeRule('falseFnScope'), scopeRule('falseLazyScope')]),
		{ instanceOf: AggregateError },
	);
});

test('verifyAndScopes resolves when all scopes succeed', async (t) => {
	const { params } = createCtx();

	const result = await verifyAndScopes(params, [
		scopeRule('trueScope'),
		scopeRule('trueFnScope'),
		scopeRule('trueLazyScope'),
	]);

	t.is(result, true);
});

test('verifyAndScopes throws if any scope fails', async (t) => {
	const { params } = createCtx();

	await t.throwsAsync(
		verifyAndScopes(params, [
			scopeRule('trueFnScope'),
			scopeRule('trueLazyScope'),
			scopeRule('falseLazyScope'),
		]),
		{ instanceOf: ForbiddenError },
	);
});

test('verifyScopeRule handles nested combinations of rules', async (t) => {
	const { params } = createCtx();

	const nested = logicRule('and', [
		scopeRule('trueFnScope'),
		logicRule('or', [scopeRule('trueLazyScope'), scopeRule('falseLazyScope')]),
		logicRule('race', [scopeRule('falseLazyScope'), scopeRule('trueFnScope')]),
	]);

	await t.notThrowsAsync(verifyScopeRule(params, nested));
});

test('verifyScopeRule fails when a nested branch fails', async (t) => {
	const { params } = createCtx();

	const nested = logicRule('and', [
		scopeRule('trueFnScope'),
		logicRule('or', [scopeRule('falseLazyScope'), scopeRule('falseFnScope')]),
	]);

	await t.throwsAsync(verifyScopeRule(params, nested));
});
