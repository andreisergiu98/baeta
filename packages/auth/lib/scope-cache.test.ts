import test from '@baeta/testing';
import { createScopeCache } from './scope-cache.ts';

declare function setTimeout(arg0: () => void, arg1: number): number;

type TestScopes = { isAdmin: boolean; role: string; filter: { kind: string } };

test('get returns undefined for unknown scope', (t) => {
	const cache = createScopeCache<TestScopes>({});
	t.is(cache.getScopeValue('isAdmin', true), undefined);
});

test('set and get round-trip a boolean value', (t) => {
	const cache = createScopeCache<TestScopes>({});
	cache.setScopeValue('isAdmin', true, true);
	t.is(cache.getScopeValue('isAdmin', true), true);
});

test('set and get round-trip a promise value', async (t) => {
	const cache = createScopeCache<TestScopes>({});
	const promise = new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 10));
	cache.setScopeValue('isAdmin', true, promise);
	t.is(await cache.getScopeValue('isAdmin', true), true);
});

test('different params on the same scope are kept apart', (t) => {
	const cache = createScopeCache<TestScopes>({});
	cache.setScopeValue('role', 'admin', true);
	cache.setScopeValue('role', 'user', false);

	t.is(cache.getScopeValue('role', 'admin'), true);
	t.is(cache.getScopeValue('role', 'user'), false);
});

test('different scopes with the same params are kept apart', (t) => {
	const cache = createScopeCache<TestScopes>({});
	cache.setScopeValue('role', 'admin', true);
	cache.setScopeValue('isAdmin', 'admin', false);

	t.is(cache.getScopeValue('role', 'admin'), true);
	t.is(cache.getScopeValue('isAdmin', 'admin'), false);
});

test('serializable args produce stable cache hits across distinct objects', (t) => {
	const cache = createScopeCache<TestScopes>({});
	cache.setScopeValue('filter', { kind: 'admin' }, true);

	t.is(cache.getScopeValue('filter', { kind: 'admin' }), true);
});

test('cacheKeyMap entry overrides the built-in serializer', (t) => {
	const keyFn = (filter: { kind: string }) => filter.kind;
	const cache = createScopeCache<TestScopes>({ filter: keyFn });

	cache.setScopeValue('filter', { kind: 'admin', irrelevant: 'noise' }, true);

	t.is(cache.getScopeValue('filter', { kind: 'admin', other: 'thing' }), true);
});

test('non-serializable args fall back to reference identity', (t) => {
	const cache = createScopeCache<TestScopes>({});
	const ref = new Map([['a', 1]]);
	cache.setScopeValue('filter', ref, true);

	t.is(cache.getScopeValue('filter', ref), true);
	t.is(cache.getScopeValue('filter', new Map([['a', 1]])), undefined);
});

test('parameter-less lazy loaders share a single cache entry', (t) => {
	const cache = createScopeCache<TestScopes>({});
	cache.setScopeValue('isAdmin', undefined, true);
	t.is(cache.getScopeValue('isAdmin'), true);
	t.is(cache.getScopeValue('isAdmin', undefined), true);
});
