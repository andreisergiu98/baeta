import { ForbiddenError } from '@baeta/errors';
import test from '@baeta/testing';
import {
	createScopeResolver,
	createScopeResolverMap,
	resolveBoolean,
	type ScopeLoaderMap,
} from './scope-resolver.ts';
import { loadAuthStore } from './store-loader.ts';

declare function setTimeout(callback: () => void, ms: number): void;
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type CtxScopes = { isAdmin: boolean; role: string };

function createCtx() {
	const ctx = {};
	loadAuthStore<CtxScopes, typeof ctx>(ctx, async () => ({ isAdmin: true, role: () => true }), {});
	return { ctx };
}

test('resolveBoolean returns true for true input', (t) => {
	t.is(resolveBoolean(true), true);
});

test('resolveBoolean throws ForbiddenError for false input', (t) => {
	t.throws(() => resolveBoolean(false), { instanceOf: ForbiddenError });
});

test('createScopeResolver handles boolean loader', async (t) => {
	const { ctx } = createCtx();

	const trueResolver = createScopeResolver(ctx, 'fn-true', true);
	// eslint-disable-next-line @typescript-eslint/await-thenable
	await t.notThrows(() => trueResolver(null));

	const falseResolver = createScopeResolver({}, 'fn-false', false);
	// eslint-disable-next-line @typescript-eslint/await-thenable
	await t.throws(() => falseResolver(null), { instanceOf: ForbiddenError });
});

test('createScopeResolver handles function loader', async (t) => {
	const { ctx } = createCtx();

	const trueResolver = createScopeResolver(ctx, 'fn-true', async () => {
		await delay(10);
		return true;
	});
	await t.notThrowsAsync(async () => await trueResolver(null));

	const falseResolver = createScopeResolver(ctx, 'fn-false', async () => {
		await delay(10);
		return false;
	});
	await t.throwsAsync(async () => await falseResolver(null), { instanceOf: ForbiddenError });
});

test('createScopeResolver memoizes function loaders by argument', async (t) => {
	const { ctx } = createCtx();

	let calls = 0;
	const resolver = createScopeResolver(ctx, 'role', async (param: unknown) => {
		calls++;
		await delay(5);
		return param === 'admin';
	});

	await resolver('admin');
	await resolver('admin');
	t.is(calls, 1, 'second call with same arg should hit cache');

	await t.throwsAsync(async () => await resolver('user'), { instanceOf: ForbiddenError });
	t.is(calls, 2, 'different arg should re-invoke');
});

test('createScopeResolverMap creates resolver for each scope', (t) => {
	const scopeMap: ScopeLoaderMap<{ scope1: boolean; scope2: string }> = {
		scope1: true,
		scope2: () => true,
	};
	const resolverMap = createScopeResolverMap({}, scopeMap);
	t.true(resolverMap.has('scope1'));
	t.true(resolverMap.has('scope2'));
	t.is(typeof resolverMap.get('scope1'), 'function');
	t.is(typeof resolverMap.get('scope2'), 'function');
});
