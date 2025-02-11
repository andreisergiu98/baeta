import { ForbiddenError } from '@baeta/errors';
import test from 'ava';
import { createScopeResolver, createScopeResolverMap, resolveBoolean } from './scope-resolver.ts';
import { loadAuthStore } from './store-loader.ts';

declare function setTimeout(callback: () => void, ms: number): void;
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function createCtx() {
	const ctx = {};
	const scopes = {};
	loadAuthStore<typeof scopes, typeof ctx>(ctx, async () => ({}));
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
	await t.notThrows(() => trueResolver(null));

	const falseResolver = createScopeResolver({}, 'fn-false', false);
	await t.throws(() => falseResolver(null), { instanceOf: ForbiddenError });
});

test('createScopeResolver handles function loader', async (t) => {
	const { ctx } = createCtx();

	const trueResolver = createScopeResolver(ctx, 'fn-true', async () => {
		await delay(10);
		return true;
	});
	await t.notThrowsAsync(async () => trueResolver(null));

	const falseResolver = createScopeResolver(ctx, 'fn-false', async () => {
		await delay(10);
		return false;
	});
	await t.throwsAsync(async () => falseResolver(null), { instanceOf: ForbiddenError });
});

test('createScopeResolver caches function loaders', async (t) => {
	const { ctx } = createCtx();

	const trueResolver = createScopeResolver(ctx, 'fn-true', async () => {
		await delay(10);
		return true;
	});
	await t.notThrowsAsync(async () => trueResolver(null));

	const falseResolver = createScopeResolver(ctx, 'fn-true', async () => {
		await delay(10);
		return false;
	});
	await t.notThrowsAsync(async () => falseResolver(null));
});

test('createScopeResolverMap creates resolver for each scope', (t) => {
	const scopeMap = {
		scope1: true,
		scope2: () => true,
	};

	const resolverMap = createScopeResolverMap({}, scopeMap);

	t.true('scope1' in resolverMap);
	t.true('scope2' in resolverMap);
	t.is(typeof resolverMap.scope1, 'function');
	t.is(typeof resolverMap.scope2, 'function');
});
