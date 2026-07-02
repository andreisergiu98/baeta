import test from '@baeta/testing';
import { hash } from 'ohash';
import {
	buildCacheRevisionId,
	buildItemCacheKeyId,
	buildQueryCacheIndexKeyId,
	buildQueryCacheIndexKeysIds,
	buildQueryCacheKeyId,
} from './key.ts';
import type { QueryIndexValue } from './query.ts';

test('buildCacheRevisionId - prefixes with rev_', (t) => {
	t.is(buildCacheRevisionId('1'), 'rev_1');
});

test('buildItemCacheKeyId - prefixes with id:', (t) => {
	t.is(buildItemCacheKeyId('user-1'), 'id:user-1');
});

test('buildQueryCacheKeyId - deterministic for same args', (t) => {
	const a = buildQueryCacheKeyId({ name: 'Alice' });
	const b = buildQueryCacheKeyId({ name: 'Alice' });
	t.is(a, b);
});

test('buildQueryCacheKeyId - different for different args', (t) => {
	const a = buildQueryCacheKeyId({ name: 'Alice' });
	const b = buildQueryCacheKeyId({ name: 'Bob' });
	t.not(a, b);
});

test('buildQueryCacheKeyId - starts with id:', (t) => {
	const result = buildQueryCacheKeyId({ x: 1 });
	const argsHash = hash({ x: 1 });
	t.is(result, `id:${argsHash}`);
});

test('buildQueryCacheIndexKeyId - returns idx: for undefined', (t) => {
	t.is(buildQueryCacheIndexKeyId(undefined), 'idx:');
});

test('buildQueryCacheIndexKeyId - returns proper id for all types', (t) => {
	const indexes: [string, QueryIndexValue][] = [
		['null', null],
		['number', 1],
		['true', true],
		['false', false],
		['str', 'value'],
		['empty', ''],
	];
	const expectedHashes = indexes.map((idx) => hash(idx));
	const results = indexes.map((idx) => buildQueryCacheIndexKeyId(idx));
	t.deepEqual(
		results,
		expectedHashes.map((h) => `idx:${h}`),
	);
});

test('buildQueryCacheIndexKeyId - distinguishes value types', (t) => {
	t.not(buildQueryCacheIndexKeyId(['userId', 1]), buildQueryCacheIndexKeyId(['userId', '1']));
	t.not(buildQueryCacheIndexKeyId(['flag', true]), buildQueryCacheIndexKeyId(['flag', 'true']));
	t.not(buildQueryCacheIndexKeyId(['value', null]), buildQueryCacheIndexKeyId(['value', 'null']));
});

test('buildQueryCacheIndexKeysIds - empty array returns [idx:]', (t) => {
	t.deepEqual(buildQueryCacheIndexKeysIds([]), ['idx:']);
});

test('buildQueryCacheIndexKeysIds - maps each index', (t) => {
	const result = buildQueryCacheIndexKeysIds([
		['name', 'Alice'],
		['age', 30],
	]);
	t.is(result.length, 2);
	t.true(result.every((r) => r.startsWith('idx:')));
});
