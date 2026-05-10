import test from '@baeta/testing';
import { createScopeCache } from './scope-cache.ts';

declare function setTimeout(arg0: () => void, arg1: number): number;

test('creates correct scope key', (t) => {
	const cache = createScopeCache();
	const key = cache.createKey('test', { foo: 'bar' });
	t.is(key, 'scope:test:{"foo":"bar"}');
});

test('get returns undefined for non-existent key', (t) => {
	const cache = createScopeCache();
	const value = cache.getScopeValue('nonexistent');
	t.is(value, undefined);
});

test('can set and get boolean value', (t) => {
	const cache = createScopeCache();
	const key = cache.createKey('test', {});
	cache.setScopeValue(key, true);
	t.is(cache.getScopeValue(key), true);
});

test('can set and get promise value', async (t) => {
	const cache = createScopeCache();
	const key = cache.createKey('test', {});
	const promise = new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 10));
	cache.setScopeValue(key, promise);
	t.is(await cache.getScopeValue(key), true);
});

test('different params create different keys', (t) => {
	const cache = createScopeCache();
	const key1 = cache.createKey('test', { a: 1 });
	const key2 = cache.createKey('test', { a: 2 });
	t.not(key1, key2);
});
