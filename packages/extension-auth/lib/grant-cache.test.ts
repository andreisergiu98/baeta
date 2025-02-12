import test from '@baeta/testing';
import { createGrantCache } from './grant-cache.ts';

test('setGrants: should ignore empty paths', (t) => {
	const grantCache = createGrantCache();
	grantCache.setGrants('', 'grant1');
	t.deepEqual(grantCache.getGrants(''), undefined);
});

test('setGrants: should set and get grants for a path', (t) => {
	const grantCache = createGrantCache();
	grantCache.setGrants('path1', 'grant1');
	t.deepEqual(grantCache.getGrants('path1'), ['grant1']);
});

test('setGrants: should overwrite existing grants for a path', (t) => {
	const grantCache = createGrantCache();
	grantCache.setGrants('path1', 'grant1');
	grantCache.setGrants('path1', 'grant2');
	t.deepEqual(grantCache.getGrants('path1'), ['grant2']);
});

test('setGrants: should handle array of grants', (t) => {
	const grantCache = createGrantCache();
	grantCache.setGrants('path1', ['grant1', 'grant2']);
	t.deepEqual(grantCache.getGrants('path1'), ['grant1', 'grant2']);
});

test('setGrants: should handle empty array of grants', (t) => {
	const grantCache = createGrantCache();
	grantCache.setGrants('path1', []);
	t.deepEqual(grantCache.getGrants('path1'), []);
});
