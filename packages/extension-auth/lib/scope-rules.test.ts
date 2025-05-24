import { ForbiddenError } from '@baeta/errors';
import test from '@baeta/testing';
import type { LogicRule } from './rule.ts';
import type { ScopeLoaderMap } from './scope-resolver.ts';
import {
	type ScopeRules,
	verifyAndScopes,
	verifyChainScopes,
	verifyGrant,
	verifyOrScopes,
	verifyRaceScopes,
	verifyScope,
	verifyScopes,
} from './scope-rules.ts';
import { getAuthStore } from './store.ts';
import { loadAuthStore } from './store-loader.ts';

declare function setTimeout(callback: () => void, ms: number): void;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type TestScopes = {
	trueScope: true;
	trueFnScope: true;
	trueLazyScope: true;
	falseScope: true;
	falseFnScope: true;
	falseLazyScope: true;
};

type TestGrants = 'test-grant';

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
	loadAuthStore<TestScopes, typeof ctx>(ctx, async () => scopes);
	return { ctx, executionOrder };
}

test('verifyGrant throws when grant is undefined', async (t) => {
	const { ctx } = createCtx();
	await t.throwsAsync(verifyGrant(ctx, undefined, 'path'), {
		instanceOf: Error,
	});
});

test("verifyGrant throws ForbiddenError when grant doesn't exist", async (t) => {
	const { ctx } = createCtx();

	await t.throwsAsync(verifyGrant(ctx, 'test-grant', 'path'), {
		instanceOf: ForbiddenError,
	});
});

test('verifyGrant resolves when grant exists', async (t) => {
	const { ctx } = createCtx();

	const store = await getAuthStore(ctx);
	store.grantCache.setGrants('path', ['test-grant']);

	const result = await verifyGrant(ctx, 'test-grant', 'path');
	t.is(result, true);
});

test('verifyScopes throws error when scopes is undefined', async (t) => {
	const ctx = {};
	await t.throwsAsync(verifyScopes(ctx, undefined, '$and' as LogicRule, 'path'), {
		message: 'Scope definitions cannot be empty!',
	});
});

test('verifyScopes throws error when scopes object is empty', async (t) => {
	const ctx = {};
	await t.throwsAsync(verifyScopes(ctx, {}, '$and' as LogicRule, 'path'), {
		message: 'Scope definitions cannot be empty!',
	});
});

test('verifyScopes throws error for invalid logic rule', async (t) => {
	const ctx = {};
	const scopes: ScopeRules<TestScopes, TestGrants> = { trueScope: true };
	await t.throwsAsync(verifyScopes(ctx, scopes, '$invalid' as LogicRule, 'path'), {
		message: "Invalid logic rule! Must be one of '$chain', '$race', '$or', or '$and'.",
	});
});

test('verifyScope resolves when grant is granted', async (t) => {
	const { ctx } = createCtx();
	const scopes: ScopeRules<TestScopes, TestGrants> = {
		$granted: 'test-grant',
	};

	const store = await getAuthStore(ctx);
	store.grantCache.setGrants('path', ['test-grant']);

	const result = await verifyScope(ctx, scopes, '$granted', 'path');
	t.is(result, true);
});

test('verifyScope throws when grant is missing', async (t) => {
	const { ctx } = createCtx();
	const scopes: ScopeRules<TestScopes, TestGrants> = {
		$granted: 'test-grant',
	};

	await t.throwsAsync(verifyScope(ctx, scopes, '$granted', 'path'), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope resolvers inline scopes', async (t) => {
	const { ctx } = createCtx();
	const scopes: ScopeRules<TestScopes, TestGrants> = {
		trueScope: true,
	};

	const result = await verifyScope(ctx, scopes, 'trueScope', 'path');
	t.is(result, true);
});

test('verifyScope throws for inline scopes', async (t) => {
	const { ctx } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		falseScope: true,
	};

	await t.throwsAsync(verifyScope(ctx, scopes, 'falseScope', 'path'), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope resolvers function scopes', async (t) => {
	const { ctx } = createCtx();
	const scopes: ScopeRules<TestScopes, TestGrants> = {
		trueFnScope: true,
	};

	const result = await verifyScope(ctx, scopes, 'trueFnScope', 'path');
	t.is(result, true);
});

test('verifyScope throws for function scopes', async (t) => {
	const { ctx } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		falseFnScope: true,
	};

	await t.throwsAsync(verifyScope(ctx, scopes, 'falseFnScope', 'path'), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScope resolves lazy scopes', async (t) => {
	const { ctx } = createCtx();
	const scopes: ScopeRules<TestScopes, TestGrants> = {
		trueLazyScope: true,
	};

	const result = await verifyScope(ctx, scopes, 'trueLazyScope', 'path');
	t.is(result, true);
});

test('verifyScope throws for failed lazy scopes', async (t) => {
	const { ctx } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		falseLazyScope: true,
	};

	await t.throwsAsync(verifyScope(ctx, scopes, 'falseLazyScope', 'path'), {
		instanceOf: ForbiddenError,
	});
});

test('verifyScopes resolves for all logic rules', async (t) => {
	const { ctx } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		trueScope: true,
		trueFnScope: true,
		trueLazyScope: true,
	};

	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$chain', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$race', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$or', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$and', 'path'));
});

test('verifyScopes throws for all logic rules', async (t) => {
	const { ctx } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		falseScope: true,
		falseFnScope: true,
		falseLazyScope: true,
	};

	await t.throwsAsync(verifyScopes(ctx, scopes, '$chain', 'path'), {
		instanceOf: ForbiddenError,
	});
	await t.throwsAsync(verifyScopes(ctx, scopes, '$race', 'path'), {
		instanceOf: ForbiddenError,
	});
	await t.throwsAsync(verifyScopes(ctx, scopes, '$or', 'path'), {
		instanceOf: AggregateError,
	});
	await t.throwsAsync(verifyScopes(ctx, scopes, '$and', 'path'), {
		instanceOf: ForbiddenError,
	});
});

test('verifyChainScopes executes scopes in sequence', async (t) => {
	const { ctx, executionOrder } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		trueLazyScope: true,
		trueFnScope: true,
	};

	const result = await verifyChainScopes(ctx, scopes, ['trueLazyScope', 'trueFnScope'], 'path');

	t.is(result, true);
	t.deepEqual(executionOrder, ['trueLazyScope', 'trueFnScope']);
});

test('verifyChainScopes throws on first failure', async (t) => {
	const { ctx, executionOrder } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		trueLazyScope: true,
		falseLazyScope: true,
	};

	await t.throwsAsync(verifyChainScopes(ctx, scopes, ['falseLazyScope', 'trueLazyScope'], 'path'), {
		instanceOf: ForbiddenError,
	});

	t.deepEqual(executionOrder, ['falseLazyScope']);
});

test('verifyRaceScopes resolves on first success', async (t) => {
	const { ctx, executionOrder } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		falseLazyScope: true,
		trueLazyScope: true,
		trueFnScope: true,
		trueScope: true,
	};

	const result = await verifyRaceScopes(
		ctx,
		scopes,
		['falseLazyScope', 'trueLazyScope', 'trueFnScope', 'trueScope'],
		'path',
	);

	t.is(result, true);
	t.deepEqual(executionOrder, ['falseLazyScope', 'trueLazyScope']);
});

test('verifyRaceScopes throws if all scopes fail', async (t) => {
	const { ctx, executionOrder } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		falseLazyScope: true,
		falseFnScope: true,
	};

	await t.throwsAsync(verifyRaceScopes(ctx, scopes, ['falseLazyScope', 'falseFnScope'], 'path'), {
		instanceOf: ForbiddenError,
	});

	t.deepEqual(executionOrder, ['falseLazyScope', 'falseFnScope']);
});

test('verifyOrScopes resolves true when as soon as any scope succeeds', async (t) => {
	const { ctx, executionOrder } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		trueLazyScope: true,
		falseLazyScope: true,
		falseFnScope: true,
	};

	const result = await verifyOrScopes(
		ctx,
		scopes,
		['trueLazyScope', 'falseLazyScope', 'falseFnScope'],
		'path',
	);

	t.is(result, true);
	t.deepEqual(executionOrder, ['falseFnScope', 'trueLazyScope']);
});

test('verifyOrScopes throws if all scopes fail', async (t) => {
	const { ctx, executionOrder } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		falseLazyScope: true,
		falseFnScope: true,
	};

	await t.throwsAsync(verifyOrScopes(ctx, scopes, ['falseFnScope', 'falseLazyScope'], 'path'), {
		instanceOf: AggregateError,
	});

	t.deepEqual(executionOrder, ['falseFnScope', 'falseLazyScope']);
});

test('verifyAndScopes resolves  when all scopes succeed', async (t) => {
	const { ctx, executionOrder } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		trueScope: true,
		trueFnScope: true,
		trueLazyScope: true,
	};

	const result = await verifyAndScopes(
		ctx,
		scopes,
		['trueScope', 'trueLazyScope', 'trueFnScope'],
		'path',
	);

	t.is(result, true);
	// inline scopes don't appear in execution order
	t.deepEqual(executionOrder, ['trueFnScope', 'trueLazyScope']);
});

test('verifyAndScopes throws if any scope fails', async (t) => {
	const { ctx, executionOrder } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		trueFnScope: true,
		trueLazyScope: true,
		falseLazyScope: true,
	};

	await t.throwsAsync(
		verifyAndScopes(ctx, scopes, ['trueFnScope', 'trueLazyScope', 'falseLazyScope'], 'path'),
		{
			instanceOf: ForbiddenError,
		},
	);

	t.deepEqual(executionOrder, ['trueFnScope', 'trueLazyScope', 'falseLazyScope']);
});

test('verifyScopes handles complex combinations of scopes', async (t) => {
	const { ctx } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		falseFnScope: true,
		$and: {
			trueLazyScope: true,
			$or: {
				trueFnScope: true,
				falseFnScope: true,
			},
		},
	};

	await t.throwsAsync(verifyScopes(ctx, scopes, '$and', 'path'));
	await t.throwsAsync(verifyScopes(ctx, scopes, '$chain', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$or', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$race', 'path'));
});

test('verifyScopes handles nested combinations of all logic rules', async (t) => {
	const { ctx } = createCtx();

	const scopes: ScopeRules<TestScopes, TestGrants> = {
		falseLazyScope: true,
		$and: {
			trueFnScope: true,
			$or: {
				trueLazyScope: true,
				$chain: {
					falseLazyScope: true,
					trueLazyScope: true,
				},
			},
			$race: {
				falseLazyScope: true,
				trueFnScope: true,
			},
		},
	};

	await t.throwsAsync(verifyScopes(ctx, scopes, '$and', 'path'));
	await t.throwsAsync(verifyScopes(ctx, scopes, '$chain', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$or', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$race', 'path'));
});
