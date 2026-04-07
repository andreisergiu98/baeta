import test, { sinon } from '@baeta/testing';
import { hash } from 'ohash';
import { MockCacheClient } from '../__test__/mock-client.ts';
import { buildQueryCacheIndexKeysIds } from './key.ts';
import type { QueryTagWithIndexes } from './query.ts';
import { CacheStore } from './store.ts';

type TestItem = { id: string; name: string };

function createTestStore(overrides?: Partial<{ getRef: (item: TestItem) => string }>) {
	const client = new MockCacheClient();
	const store = new CacheStore<TestItem>({
		name: 'test',
		client,
		namespace: 'ns',
		revision: 1,
		parse: (v) => JSON.parse(v) as TestItem,
		serialize: (v) => JSON.stringify(v),
		...overrides,
	});
	return { client, store };
}

test('getItemKeyByRef - has proper format', (t) => {
	const { store } = createTestStore();
	const key = store.getItemKeyByRef('abc');
	const parts = key.split(':');
	t.deepEqual(parts, ['ns', '{test', 'item', 'rev_1}', 'id', 'abc']);
});

test('getQueryKey - has proper format', (t) => {
	const { store } = createTestStore();
	const key = store.getQueryKey({ name: 'findUser', revision: undefined, args: { name: 'A' } });
	const argsHash = hash({ name: 'A' });
	const parts = key.split(':');
	t.deepEqual(parts, ['ns', '{test', 'query', 'findUser', 'rev_1_default}', 'id', argsHash]);
});

test('getQueryKeyPrefix - has proper format', (t) => {
	const { store } = createTestStore();
	const prefix = store.getQueryKeyPrefix({ name: 'findUser', revision: undefined });
	const parts = prefix.split(':');
	t.deepEqual(parts, ['ns', '{test', 'query', 'findUser', 'rev_1_default}']);
});

test('getQueryIndexes - has proper format for all indexes', (t) => {
	const { store } = createTestStore();
	const query: QueryTagWithIndexes = {
		name: 'q',
		revision: undefined,
		indexes: [
			['null', null],
			['number', 1],
			['true', true],
			['false', false],
			['str', 'value'],
			['empty', ''],
		],
	};
	const indexes = store.getQueryIndexes(query);
	const prefix = store.getQueryKeyPrefix(query);
	const indexIds = buildQueryCacheIndexKeysIds(query.indexes);
	const expectedIndexes = indexIds.map((h) => `${prefix}:${h}`);
	t.deepEqual(indexes, expectedIndexes);
});

test('getQueryIndexes - has proper format for no indexes', (t) => {
	const { store } = createTestStore();
	const query: QueryTagWithIndexes = {
		name: 'q',
		revision: undefined,
		indexes: [],
	};
	const indexes = store.getQueryIndexes(query);
	const prefix = store.getQueryKeyPrefix(query);
	t.deepEqual(indexes, [`${prefix}:idx:`]);
});

test('getQueryKeyRevision - combines store and query revision', (t) => {
	const { store } = createTestStore();
	const rev = store.getQueryKeyRevision({ name: 'q', revision: 2 });
	t.is(rev, 'rev_1_2');
});

test('getQueryKeyRevision - uses default when query revision is undefined', (t) => {
	const { store } = createTestStore();
	const rev = store.getQueryKeyRevision({ name: 'q', revision: undefined });
	t.is(rev, 'rev_1_default');
});

test('getRefWithFallback - uses custom getRef when provided', (t) => {
	const { store } = createTestStore({ getRef: (item) => item.name });
	const ref = store.getRefWithFallback({ id: '1', name: 'Alice' });
	t.is(ref, 'Alice');
});

test('getRefWithFallback - falls back to id property', (t) => {
	const { store } = createTestStore();
	const ref = store.getRefWithFallback({ id: '42', name: 'Bob' });
	t.is(ref, '42');
});

test('getRefWithFallback - throws for null', (t) => {
	const { store } = createTestStore();
	t.throws(() => store.getRefWithFallback(null as any));
});

test('getRefWithFallback - throws for object without id', (t) => {
	const { store } = createTestStore();
	t.throws(() => store.getRefWithFallback({ name: 'no-id' } as any));
});

test('save - submits one item', async (t) => {
	const { store } = createTestStore();
	const item = { id: '1', name: 'Alice' };
	await store.save(item);
	const result = await store.get('1');
	t.deepEqual(result, item);
});

test('save - submits many items', async (t) => {
	const { store } = createTestStore();
	await store.save([
		{ id: '1', name: 'Alice' },
		{ id: '2', name: 'Bob' },
	]);
	const result = await store.getMany(['1', '2']);
	t.deepEqual(result, [
		{ id: '1', name: 'Alice' },
		{ id: '2', name: 'Bob' },
	]);
});

test('getMany - returns null if not all items are found', async (t) => {
	const { store } = createTestStore();
	await store.save({ id: '1', name: 'Alice' });
	const result = await store.getMany(['1', '999']);
	t.is(result, null);
});

test('getPartial - returns nulls for missing items', async (t) => {
	const { store } = createTestStore();
	await store.save({ id: '1', name: 'Alice' });
	const result = await store.getPartial(['1', '999', '1']);
	t.is(result.length, 3);
	t.deepEqual(result, [{ id: '1', name: 'Alice' }, null, { id: '1', name: 'Alice' }]);
});

test('delete - item no longer retrievable', async (t) => {
	const { store } = createTestStore();
	await store.save({ id: '1', name: 'Alice' });
	await store.delete('1');
	const result = await store.get('1');
	t.is(result, null);
});

test('saveIfNotExists - saves new items', async (t) => {
	const { store } = createTestStore();
	await store.saveIfNotExists([
		{ id: '1', name: 'Alice' },
		{ id: '2', name: 'Bob' },
	]);
	const result = await store.getMany(['1', '2']);
	t.deepEqual(result, [
		{ id: '1', name: 'Alice' },
		{ id: '2', name: 'Bob' },
	]);
});

test('saveIfNotExists - does not overwrite existing items', async (t) => {
	const { store } = createTestStore();
	await store.save({ id: '1', name: 'Alice' });
	await store.saveIfNotExists({ id: '1', name: 'Updated Alice' });
	const result = await store.get('1');
	t.deepEqual(result, { id: '1', name: 'Alice' });
});

test('saveIfNotExists - handles mix of new and existing items', async (t) => {
	const { store } = createTestStore();
	await store.save({ id: '1', name: 'Alice' });
	await store.saveIfNotExists([
		{ id: '1', name: 'Updated Alice' },
		{ id: '2', name: 'Bob' },
	]);
	const result = await store.getMany(['1', '2']);
	t.deepEqual(result, [
		{ id: '1', name: 'Alice' },
		{ id: '2', name: 'Bob' },
	]);
});

test('saveQuery - submits query with single item', async (t) => {
	const { store } = createTestStore();
	const item = { id: '1', name: 'Alice' };
	await store.saveQuery({
		name: 'findUser',
		revision: undefined,
		args: { name: 'Alice' },
		indexes: [],
		data: item,
	});
	const result = await store.getQuery({
		name: 'findUser',
		revision: undefined,
		args: { name: 'Alice' },
	});
	t.truthy(result);
	if (result) {
		t.deepEqual(result.query, item);
	}
});

test('saveQuery - submits query with single null item', async (t) => {
	const { store } = createTestStore();
	await store.saveQuery({
		name: 'findUser',
		revision: undefined,
		args: { name: 'Alice' },
		indexes: [],
		data: null,
	});
	const result = await store.getQuery({
		name: 'findUser',
		revision: undefined,
		args: { name: 'Alice' },
	});
	t.truthy(result);
	if (result) {
		t.deepEqual(result.query, null);
	}
});

test('saveQuery - submits query with nullable items', async (t) => {
	const { store } = createTestStore();
	const data = [{ id: '1', name: 'Alice' }, null, { id: '2', name: 'Bob' }];
	await store.saveQuery({
		name: 'listUsers',
		revision: undefined,
		args: {},
		indexes: [],
		data,
	});
	const result = await store.getQuery({
		name: 'listUsers',
		revision: undefined,
		args: {},
	});
	t.truthy(result);
	if (result) {
		t.deepEqual(result.query, data);
	}
});

test('saveQuery - does not overwrite existing items by default', async (t) => {
	const { store } = createTestStore();
	await store.save({ id: '1', name: 'Updated Alice' });
	await store.saveQuery({
		name: 'findUser',
		revision: undefined,
		args: { name: 'Alice' },
		indexes: [],
		data: { id: '1', name: 'Alice' },
	});
	const result = await store.get('1');
	t.deepEqual(result, { id: '1', name: 'Updated Alice' });
});

test('saveQuery - overwrites existing items when replaceExistingItems is true', async (t) => {
	const { store } = createTestStore();
	await store.save({ id: '1', name: 'Updated Alice' });
	await store.saveQuery(
		{
			name: 'findUser',
			revision: undefined,
			args: { name: 'Alice' },
			indexes: [],
			data: { id: '1', name: 'Alice' },
		},
		true,
	);
	const result = await store.get('1');
	t.deepEqual(result, { id: '1', name: 'Alice' });
});

test('getQuery - returns null for cache miss', async (t) => {
	const { store } = createTestStore();
	const result = await store.getQuery({
		name: 'missing',
		revision: undefined,
		args: { x: 1 },
	});
	t.is(result, null);
});

test('deleteQueries - clears matching queries', async (t) => {
	const { store } = createTestStore();
	const tag = { name: 'findUser', revision: undefined };
	const indexes: Array<[string, string]> = [['name', 'Alice']];
	await store.saveQuery({
		...tag,
		args: { name: 'Alice' },
		indexes,
		data: { id: '1', name: 'Alice' },
	});
	const beforeDelete = await store.getQuery({
		...tag,
		args: { name: 'Alice' },
	});
	t.truthy(beforeDelete);
	if (beforeDelete) {
		t.deepEqual(beforeDelete.query, { id: '1', name: 'Alice' });
	}
	await store.deleteQueries({ ...tag, indexes });
	const afterDelete = await store.getQuery({ ...tag, args: { name: 'Alice' } });
	t.is(afterDelete, null);
});

test('saveWithDiff - returns null for previously uncached items', async (t) => {
	const { store } = createTestStore();
	const result = await store.saveWithDiff({ id: '1', name: 'Alice' });
	t.deepEqual(result, [null]);
	const saved = await store.get('1');
	t.deepEqual(saved, { id: '1', name: 'Alice' });
});

test('saveWithDiff - returns previous values when overwriting', async (t) => {
	const { store } = createTestStore();
	await store.save([
		{ id: '1', name: 'Alice' },
		{ id: '2', name: 'Bob' },
	]);
	const result = await store.saveWithDiff([
		{ id: '1', name: 'Alice2' },
		{ id: '2', name: 'Bob2' },
	]);
	t.deepEqual(result, [
		{ id: '1', name: 'Alice' },
		{ id: '2', name: 'Bob' },
	]);
	const updated = await store.getMany(['1', '2']);
	t.deepEqual(updated, [
		{ id: '1', name: 'Alice2' },
		{ id: '2', name: 'Bob2' },
	]);
});

test('saveWithDiff - handles mix of new and existing items', async (t) => {
	const { store } = createTestStore();
	await store.save({ id: '1', name: 'Alice' });
	const result = await store.saveWithDiff([
		{ id: '1', name: 'Alice2' },
		{ id: '2', name: 'Bob' },
	]);
	t.deepEqual(result, [{ id: '1', name: 'Alice' }, null]);
});

test('deleteWithDiff - returns previous values for existing items', async (t) => {
	const { store } = createTestStore();
	await store.save([
		{ id: '1', name: 'Alice' },
		{ id: '2', name: 'Bob' },
	]);
	const result = await store.deleteWithDiff(['1', '2']);
	t.deepEqual(result, [
		{ id: '1', name: 'Alice' },
		{ id: '2', name: 'Bob' },
	]);
	const gone = await store.get('1');
	t.is(gone, null);
});

test('deleteWithDiff - returns null for non-existent items', async (t) => {
	const { store } = createTestStore();
	const result = await store.deleteWithDiff('999');
	t.deepEqual(result, [null]);
});

test('deleteWithDiff - handles mix of existing and missing refs', async (t) => {
	const { store } = createTestStore();
	await store.save({ id: '1', name: 'Alice' });
	const result = await store.deleteWithDiff(['1', '999']);
	t.deepEqual(result, [{ id: '1', name: 'Alice' }, null]);
});

test('get rejects when client.getPartialItems throws', async (t) => {
	const { client, store } = createTestStore();
	const stub = sinon.stub(client, 'getPartialItems').rejects(new Error('getPartialItems failed'));
	await t.throwsAsync(() => store.get('1'), { message: 'getPartialItems failed' });
	stub.restore();
});

test('save rejects when client.saveItems throws', async (t) => {
	const { client, store } = createTestStore();
	const stub = sinon.stub(client, 'saveItems').rejects(new Error('saveItems failed'));
	await t.throwsAsync(() => store.save({ id: '1', name: 'Alice' }), {
		message: 'saveItems failed',
	});
	stub.restore();
});

test('saveWithDiff rejects when client.saveItemsWithDiff throws', async (t) => {
	const { client, store } = createTestStore();
	const stub = sinon
		.stub(client, 'saveItemsWithDiff')
		.rejects(new Error('saveItemsWithDiff failed'));
	await t.throwsAsync(() => store.saveWithDiff({ id: '1', name: 'Alice' }), {
		message: 'saveItemsWithDiff failed',
	});
	stub.restore();
});

test('delete rejects when client.deleteItems throws', async (t) => {
	const { client, store } = createTestStore();
	const stub = sinon.stub(client, 'deleteItems').rejects(new Error('deleteItems failed'));
	await t.throwsAsync(() => store.delete('1'), { message: 'deleteItems failed' });
	stub.restore();
});

test('deleteWithDiff rejects when client.deleteItemsWithDiff throws', async (t) => {
	const { client, store } = createTestStore();
	const stub = sinon
		.stub(client, 'deleteItemsWithDiff')
		.rejects(new Error('deleteItemsWithDiff failed'));
	await t.throwsAsync(() => store.deleteWithDiff('1'), {
		message: 'deleteItemsWithDiff failed',
	});
	stub.restore();
});

test('getQuery rejects when client.getQuery throws', async (t) => {
	const { client, store } = createTestStore();
	const stub = sinon.stub(client, 'getQuery').rejects(new Error('getQuery failed'));
	await t.throwsAsync(() => store.getQuery({ name: 'findUser', revision: undefined, args: {} }), {
		message: 'getQuery failed',
	});
	stub.restore();
});

test('saveQuery rejects when client.saveQuery throws', async (t) => {
	const { client, store } = createTestStore();
	const stub = sinon.stub(client, 'saveQuery').rejects(new Error('saveQuery failed'));
	await t.throwsAsync(
		() =>
			store.saveQuery({
				name: 'findUser',
				revision: undefined,
				args: {},
				indexes: [],
				data: { id: '1', name: 'Alice' },
			}),
		{ message: 'saveQuery failed' },
	);
	stub.restore();
});

test('deleteQueries rejects when client.deleteQueries throws', async (t) => {
	const { client, store } = createTestStore();
	const stub = sinon.stub(client, 'deleteQueries').rejects(new Error('deleteQueries failed'));
	await t.throwsAsync(
		() => store.deleteQueries({ name: 'findUser', revision: undefined, indexes: [] }),
		{ message: 'deleteQueries failed' },
	);
	stub.restore();
});
