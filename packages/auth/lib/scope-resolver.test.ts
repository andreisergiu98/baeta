import { ForbiddenError } from '@baeta/errors';
import test from '@baeta/testing';
import { createScopeCache } from './scope-cache.ts';
import {
	createScopeResolver,
	createScopeResolverMap,
	resolveBoolean,
	type ScopeLoaderMap,
} from './scope-resolver.ts';

declare function setTimeout(callback: () => void, ms: number): void;
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

test('resolveBoolean returns true for true input', (t) => {
	t.is(resolveBoolean(true), true);
});

test('resolveBoolean throws ForbiddenError for false input', (t) => {
	t.throws(() => resolveBoolean(false), { instanceOf: ForbiddenError });
});

test('createScopeResolver handles boolean loader', async (t) => {
	const scopeCache = createScopeCache({});

	const trueResolver = createScopeResolver(scopeCache, 'fn-true', true);
	// eslint-disable-next-line @typescript-eslint/await-thenable
	await t.notThrows(() => trueResolver(null));

	const falseResolver = createScopeResolver(scopeCache, 'fn-false', false);
	// eslint-disable-next-line @typescript-eslint/await-thenable
	await t.throws(() => falseResolver(null), { instanceOf: ForbiddenError });
});

test('createScopeResolver handles function loader', async (t) => {
	const scopeCache = createScopeCache({});

	const trueResolver = createScopeResolver(scopeCache, 'fn-true', async () => {
		await delay(10);
		return true;
	});
	await t.notThrowsAsync(async () => await trueResolver(null));

	const falseResolver = createScopeResolver(scopeCache, 'fn-false', async () => {
		await delay(10);
		return false;
	});
	await t.throwsAsync(async () => await falseResolver(null), { instanceOf: ForbiddenError });
});

test('createScopeResolver memoizes function loaders by argument', async (t) => {
	const scopeCache = createScopeCache({});

	let calls = 0;
	const resolver = createScopeResolver(scopeCache, 'role', async (param: unknown) => {
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
	const resolverMap = createScopeResolverMap(createScopeCache({}), scopeMap);
	t.true(resolverMap.has('scope1'));
	t.true(resolverMap.has('scope2'));
	t.is(typeof resolverMap.get('scope1'), 'function');
	t.is(typeof resolverMap.get('scope2'), 'function');
});
