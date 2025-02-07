import { ForbiddenError } from '@baeta/errors';
import test from 'ava';
import type { LogicRule } from './rule.ts';
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
import { loadAuthStore } from './store-loader.ts';
import { getAuthStore } from './store.ts';

declare function setTimeout(callback: () => void, ms: number): void;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

test('verifyGrant throws when grant is undefined', async (t) => {
	const ctx = {};
	loadAuthStore(ctx, async () => ({}));

	await t.throwsAsync(verifyGrant(ctx, undefined, 'path'), {
		instanceOf: Error,
	});
});

test('verifyGrant throws ForbiddenError when grant is not included', async (t) => {
	const ctx = {};
	loadAuthStore(ctx, async () => ({}));

	await t.throwsAsync(verifyGrant(ctx, 'test-grant', 'path'), {
		instanceOf: ForbiddenError,
	});
});

test('verifyGrant returns true when grant is included', async (t) => {
	const ctx = {};
	loadAuthStore(ctx, async () => ({}));

	const store = await getAuthStore(ctx);
	store.grantCache.setGrants('path', ['test-grant']);

	const result = await verifyGrant(ctx, 'test-grant', 'path');
	t.is(result, true);
});

test('verifyScope handles logic rules correctly', async (t) => {
	const ctx = {};
	const scopes = {
		$and: {
			scopeA: true,
			scopeB: true,
		},
		$or: {
			scopeA: true,
			scopeC: true,
		},
		$chain: {
			scopeA: true,
			scopeB: true,
		},
		$race: {
			scopeC: true,
			scopeB: true,
		},
	};

	loadAuthStore(ctx, async () => ({
		scopeA: () => Promise.resolve(true),
		scopeB: () => Promise.resolve(true),
		scopeC: () => Promise.resolve(false),
	}));

	t.is(await verifyScope(ctx, scopes, '$and', 'path'), true);
	t.is(await verifyScope(ctx, scopes, '$or', 'path'), true);
	t.is(await verifyScope(ctx, scopes, '$chain', 'path'), true);
	t.is(await verifyScope(ctx, scopes, '$race', 'path'), true);
});

test('verifyScope handles granted keys correctly', async (t) => {
	const ctx = {};
	const scopes = {
		$granted: 'test-grant',
	};

	loadAuthStore(ctx, async () => ({}));
	const store = await getAuthStore(ctx);
	store.grantCache.setGrants('path', ['test-grant']);

	const result = await verifyScope(ctx, scopes as unknown as ScopeRules, '$granted', 'path');
	t.is(result, true);
});

test('verifyScope handles regular scopes correctly', async (t) => {
	const ctx = {};
	const scopes = {
		scopeA: true,
	};

	loadAuthStore(ctx, async () => ({
		scopeA: (value: boolean) => Promise.resolve(value),
	}));

	const result = await verifyScope(ctx, scopes, 'scopeA', 'path');
	t.is(result, true);
});

test('verifyScope throws when scope resolver fails', async (t) => {
	const ctx = {};
	const scopes = {
		scopeA: true,
	};

	loadAuthStore(ctx, async () => ({
		scopeA: () => {
			throw new ForbiddenError();
		},
	}));

	await t.throwsAsync(verifyScope(ctx, scopes, 'scopeA', 'path'), {
		instanceOf: ForbiddenError,
	});
});

test('verifyChainScopes executes scopes in sequence', async (t) => {
	const ctx = {};
	const executionOrder: string[] = [];

	const scopes = {
		scopeA: true,
		scopeB: true,
	};

	loadAuthStore(ctx, async () => ({
		scopeA: async () => {
			await wait(10);
			executionOrder.push('scopeA');
			return Promise.resolve(true);
		},
		scopeB: async () => {
			await wait(1);
			executionOrder.push('scopeB');
			return Promise.resolve(true);
		},
	}));

	const result = await verifyChainScopes(ctx, scopes, ['scopeA', 'scopeB'], 'path');

	t.is(result, true);
	t.deepEqual(executionOrder, ['scopeA', 'scopeB']);
});

test('verifyChainScopes stops on first failure', async (t) => {
	const ctx = {};
	const executionOrder: string[] = [];

	const scopes = {
		scopeA: true,
		scopeB: true,
	};

	loadAuthStore(ctx, async () => ({
		scopeA: async () => {
			await wait(10);
			executionOrder.push('scopeA');
			throw new ForbiddenError();
		},
		scopeB: () => {
			executionOrder.push('scopeB');
			return Promise.resolve(true);
		},
	}));

	await t.throwsAsync(verifyChainScopes(ctx, scopes, ['scopeA', 'scopeB'], 'path'), {
		instanceOf: ForbiddenError,
	});

	t.deepEqual(executionOrder, ['scopeA']);
});

test('verifyRaceScopes returns true on first success', async (t) => {
	const ctx = {};
	const executionOrder: string[] = [];

	const scopes = {
		scopeA: true,
		scopeB: true,
		scopeC: true,
	};

	loadAuthStore(ctx, async () => ({
		scopeA: async () => {
			await wait(10);
			executionOrder.push('scopeA');
			throw new ForbiddenError();
		},
		scopeB: async () => {
			await wait(1);
			executionOrder.push('scopeB');
			return Promise.resolve(true);
		},
		scopeC: async () => {
			await wait(1);
			executionOrder.push('scopeC');
			return Promise.resolve(true);
		},
	}));

	const result = await verifyRaceScopes(ctx, scopes, ['scopeA', 'scopeB', 'scopeC'], 'path');

	t.is(result, true);
	t.deepEqual(executionOrder, ['scopeA', 'scopeB']);
});

test('verifyRaceScopes throws if all scopes fail', async (t) => {
	const ctx = {};
	const executionOrder: string[] = [];

	const scopes = {
		scopeA: true,
		scopeB: true,
	};

	loadAuthStore(ctx, async () => ({
		scopeA: async () => {
			await wait(10);
			executionOrder.push('scopeA');
			throw new ForbiddenError();
		},
		scopeB: async () => {
			await wait(1);
			executionOrder.push('scopeB');
			throw new ForbiddenError();
		},
	}));

	await t.throwsAsync(verifyRaceScopes(ctx, scopes, ['scopeA', 'scopeB'], 'path'), {
		instanceOf: ForbiddenError,
	});

	t.deepEqual(executionOrder, ['scopeA', 'scopeB']);
});

test('verifyOrScopes returns true when any scope succeeds', async (t) => {
	const ctx = {};
	const executionOrder: string[] = [];

	const scopes = {
		scopeA: true,
		scopeB: true,
	};

	loadAuthStore(ctx, async () => ({
		scopeA: async () => {
			await wait(10);
			executionOrder.push('scopeA');
			throw new ForbiddenError();
		},
		scopeB: async () => {
			await wait(1);
			executionOrder.push('scopeB');
			return Promise.resolve(true);
		},
	}));

	const result = await verifyOrScopes(ctx, scopes, ['scopeA', 'scopeB'], 'path');

	t.is(result, true);
	t.deepEqual(executionOrder, ['scopeB']);
});

test('verifyOrScopes throws if all scopes fail', async (t) => {
	const ctx = {};
	const executionOrder: string[] = [];

	const scopes = {
		scopeA: true,
		scopeB: true,
	};

	loadAuthStore(ctx, async () => ({
		scopeA: async () => {
			await wait(10);
			executionOrder.push('scopeA');
			throw new ForbiddenError();
		},
		scopeB: async () => {
			await wait(1);
			executionOrder.push('scopeB');
			throw new ForbiddenError();
		},
	}));

	await t.throwsAsync(verifyOrScopes(ctx, scopes, ['scopeA', 'scopeB'], 'path'), {
		instanceOf: AggregateError,
	});

	t.deepEqual(executionOrder, ['scopeB', 'scopeA']);
});

test('verifyAndScopes returns true when all scopes succeed', async (t) => {
	const ctx = {};
	const executionOrder: string[] = [];

	const scopes = {
		scopeA: true,
		scopeB: true,
	};

	loadAuthStore(ctx, async () => ({
		scopeA: async () => {
			await wait(10);
			executionOrder.push('scopeA');
			return Promise.resolve(true);
		},
		scopeB: async () => {
			await wait(1);
			executionOrder.push('scopeB');
			return Promise.resolve(true);
		},
	}));

	const result = await verifyAndScopes(ctx, scopes, ['scopeA', 'scopeB'], 'path');

	t.is(result, true);
	t.deepEqual(executionOrder, ['scopeB', 'scopeA']);
});

test('verifyAndScopes throws if any scope fails', async (t) => {
	const ctx = {};
	const executionOrder: string[] = [];

	const scopes = {
		scopeA: true,
		scopeB: true,
	};

	loadAuthStore(ctx, async () => ({
		scopeA: async () => {
			await wait(10);
			executionOrder.push('scopeA');
			return Promise.resolve(true);
		},
		scopeB: async () => {
			await wait(1);
			executionOrder.push('scopeB');
			throw new ForbiddenError();
		},
	}));

	await t.throwsAsync(verifyAndScopes(ctx, scopes, ['scopeA', 'scopeB'], 'path'), {
		instanceOf: ForbiddenError,
	});

	t.deepEqual(executionOrder, ['scopeB']);
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
	const scopes = { scopeA: true };
	await t.throwsAsync(verifyScopes(ctx, scopes, '$invalid' as LogicRule, 'path'), {
		message: "Invalid logic rule! Must be one of '$chain', '$race', '$or', or '$and'.",
	});
});

test('verifyScopes handles all valid logic rules', async (t) => {
	const ctx = {};
	const scopes = { scopeA: true };
	loadAuthStore(ctx, async () => ({
		scopeA: () => Promise.resolve(true),
	}));

	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$chain', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$race', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$or', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$and', 'path'));
});

test('verifyScopes handles complex combinations of scopes', async (t) => {
	const ctx = {};
	const scopes = {
		scopeA: true,
		scopeB: true,
		scopeC: true,
		$and: {
			scopeD: true,
			$or: {
				scopeE: true,
				scopeF: true,
			},
		},
	};

	loadAuthStore(ctx, async () => ({
		scopeA: () => Promise.resolve(true),
		scopeB: () => Promise.resolve(false),
		scopeC: () => Promise.resolve(true),
		scopeD: () => Promise.resolve(true),
		scopeE: () => Promise.resolve(false),
		scopeF: () => Promise.resolve(true),
	}));

	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$race', 'path'));
	await t.throwsAsync(verifyScopes(ctx, scopes, '$and', 'path'));
	await t.notThrowsAsync(verifyScopes(ctx, scopes, '$or', 'path'));
});

test('verifyScopes handles nested combinations of all logic rules', async (t) => {
	const ctx = {};
	const scopes = {
		$and: {
			scopeA: true,
			$or: {
				scopeB: true,
				$chain: {
					scopeC: true,
					scopeD: true,
				},
			},
			$race: {
				scopeE: true,
				scopeF: true,
			},
		},
	};

	loadAuthStore(ctx, async () => ({
		scopeA: () => Promise.resolve(true),
		scopeB: () => Promise.resolve(false),
		scopeC: () => Promise.resolve(true),
		scopeD: () => Promise.resolve(true),
		scopeE: async () => {
			await wait(10);
			return false;
		},
		scopeF: async () => {
			await wait(1);
			return true;
		},
	}));

	const result = await verifyScopes(ctx, scopes, '$and', 'path');
	t.is(result, true);
});
