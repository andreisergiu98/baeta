import test, { randomUUID, sinon } from '@baeta/testing';
import { log } from '@baeta/util-log';
import { MockCacheClient } from '../__test__/mock-client.ts';
import { createCache } from './create-cache.ts';
import { defineQuery } from './define-query.ts';

log.error = () => {};
log.warn = () => {};

type TestItem = { id: string; name: string; orgId: string };

function createTestCache() {
	const client = new MockCacheClient();
	const cache = createCache<TestItem>(client, {
		name: 'TestItem',
		parse: (v: string) => {
			const parsed = JSON.parse(v);
			if (typeof parsed !== 'object' || parsed === null) {
				throw new Error(`Parsed value is not an object: ${v}`);
			}
			if (
				typeof parsed.id !== 'string' ||
				typeof parsed.name !== 'string' ||
				typeof parsed.orgId !== 'string'
			) {
				throw new Error(`Parsed value does not have expected shape: ${v}`);
			}
			return parsed as TestItem;
		},
		serialize: (v) => JSON.stringify(v),
	}).build();
	return { client, cache };
}

function mockItem(data?: Partial<TestItem>): TestItem {
	return {
		id: randomUUID(),
		name: 'Some name',
		orgId: 'org1',
		...data,
	};
}

function stubResolver<Args, Result>(fn: (args: Args) => Result) {
	return sinon.stub().callsFake(fn) as sinon.SinonStub<[args: Args], Result>;
}

function createTestCacheWithQueries() {
	const database = [
		{ id: '1', name: 'Name 1', orgId: 'org1' },
		{ id: '2', name: 'Name 2', orgId: 'org2' },
		{ id: '3', name: 'Name 3', orgId: 'org1' },
		{ id: '4', name: 'Name 4', orgId: 'org2' },
		{ id: '5', name: 'Name 5', orgId: 'org3' },
		{ id: '6', name: 'Name 1', orgId: 'org3' },
	];
	const client = new MockCacheClient();
	const resolvers = {
		findUser: stubResolver(async (args: { id: string }) => {
			const item = database.find((item) => item.id === args.id);
			return item ?? null;
		}),
		findUsersByName: stubResolver(async (args: { name: string }) => {
			return database.filter((item) => item.name === args.name);
		}),
		findUsersByOrg: stubResolver(async (args: { orgId: string }) => {
			return database.filter((item) => item.orgId === args.orgId);
		}),
		findUsersByOrgWithGaps: stubResolver(async (args: { orgId: string }) => {
			return database.map((item) => (item.orgId === args.orgId ? item : null));
		}),
	};
	const cache = createCache<TestItem>(client, {
		name: 'test',
		parse: (v) => JSON.parse(v) as TestItem,
		serialize: (v) => JSON.stringify(v),
		getRef: (item) => item.id,
	})
		.withQueries({
			/**
			 * Single item results, indexed by id.
			 * onUpdate - since the id cannot change, it should update the cache automatically.
			 * onInsert - invalidates queries that queried with the same id as the inserted item.
			 * onDelete - invalidates queries that queried with the same id as the deleted item.
			 */
			findUser: defineQuery({
				resolve: resolvers.findUser,
				indexArgsBy: { id: true },
				onInsert(values, helpers) {
					return helpers.invalidateByArgs(values.map(({ id }) => ({ id })));
				},
				onDelete(refs, helpers) {
					return helpers.invalidateByArgs(refs.map(({ ref }) => ({ id: ref.toString() })));
				},
			}),
			/**
			 * List results filtered and indexes caches by "name" arg.
			 * onInsert - invalidates all queries with the same name as the inserted item.
			 * onUpdate - invalidates all queries with the same name as the updated item, both for the old and new name.
			 * onDelete - invalidates all queries with the same name as the deleted item.
			 */
			findUsersByName: defineQuery({
				resolve: resolvers.findUsersByName,
				indexArgsBy: { name: true },
				onInsert(values, helpers) {
					return helpers.invalidateByArgs(values.map((v) => ({ name: v.name })));
				},
				onUpdate(pairs, helpers) {
					const args = pairs
						.flatMap(({ next, previous }) => [
							{ name: next.name },
							previous ? { name: previous.name } : null,
						])
						.filter((el) => el != null);
					return helpers.invalidateByArgs(args);
				},
				onDelete(pairs, helpers) {
					const args = pairs
						.flatMap(({ previous }) => (previous ? { name: previous.name } : null))
						.filter((el) => el != null);
					return helpers.invalidateByArgs(args);
				},
			}),
			/**
			 * List results filtered by "orgId" arg.
			 * All queries are invalidated for any operation kind.
			 */
			findUsersByOrg: defineQuery({
				resolve: resolvers.findUsersByOrg,
				indexArgsBy: { orgId: true },
				onUpdate(_, helpers) {
					return helpers.invalidateAll();
				},
				onInsert(_, helpers) {
					return helpers.invalidateAll();
				},
				onDelete(_, helpers) {
					return helpers.invalidateAll();
				},
			}),
			/**
			 * List results filtered by "orgId" arg, but with nulls for non-matching items instead of filtering them out.
			 */
			findUsersByOrgWithGaps: defineQuery({
				resolve: resolvers.findUsersByOrgWithGaps,
				indexArgsBy: { orgId: true },
				onInsert(values, helpers) {
					return helpers.invalidateByArgs(values.map((v) => ({ orgId: v.orgId })));
				},
				onDelete(pairs, helpers) {
					const args = pairs
						.flatMap(({ previous }) => (previous ? { orgId: previous.orgId } : null))
						.filter((el) => el != null);
					return helpers.invalidateByArgs(args);
				},
			}),
		})
		.build();
	return { client, cache, resolvers, database };
}

/**
 * Testing basic operations against the item caching functionality
 */

test('get - returns null for missing item', async (t) => {
	const { cache } = createTestCache();

	const result = await cache.get(randomUUID());
	t.is(result, null);
});

test('get - returns existing item', async (t) => {
	const { cache } = createTestCache();

	const item = mockItem();
	await cache.insert(item);

	const result = await cache.get(item.id);
	t.deepEqual(result, item);
});

test('get - returns null for deleted items', async (t) => {
	const { cache } = createTestCache();

	const item = mockItem();
	await cache.insert(item);
	await cache.delete(item.id);

	const result = await cache.get(item.id);
	t.is(result, null);
});

test('getMany - returns items if present in cache', async (t) => {
	const { cache } = createTestCache();

	const items = Array.from({ length: 30 }, () => mockItem());
	await cache.insert(items);

	const result = await cache.getMany(items.map((item) => item.id));
	t.deepEqual(result, items);
});

test('getMany - returns null if any item is missing', async (t) => {
	const { cache } = createTestCache();

	const items = Array.from({ length: 30 }, () => mockItem());
	await cache.insert(items);

	const keys = items.map((item) => item.id);
	keys.push(randomUUID());

	const result = await cache.getMany(keys);
	t.is(result, null);
});

test('getPartial - returns items or nulls for missing items', async (t) => {
	const { cache } = createTestCache();

	const items = Array.from({ length: 30 }, () => mockItem());
	await cache.insert(items);

	const keys = items.map((item, idx) => (idx % 5 === 0 ? randomUUID() : item.id));
	const result = await cache.getPartial(keys);

	t.is(result.length, keys.length);
	t.deepEqual(
		result,
		items.map((item, idx) => (idx % 5 === 0 ? null : item)),
	);
});

test('insert - adds item to cache', async (t) => {
	const { cache } = createTestCache();

	const item = mockItem();
	await cache.insert(item);

	const result = await cache.get(item.id);
	t.deepEqual(result, item);
});

test('insert - also updates if item with same ref exists', async (t) => {
	const { cache } = createTestCache();

	const item = mockItem({ name: 'Original' });
	await cache.insert(item);

	const updated = { ...item, name: 'Updated' };
	await cache.insert(updated);

	const result = await cache.get(item.id);
	t.deepEqual(result, updated);
});

test('update - modifies existing item', async (t) => {
	const { cache } = createTestCache();

	const item = mockItem({ name: 'Original' });
	await cache.insert(item);

	const updated = { ...item, name: 'Updated' };
	await cache.update(updated);

	const result = await cache.get(item.id);
	t.deepEqual(result, updated);
});

test('update - also inserts if item does not exist', async (t) => {
	const { cache } = createTestCache();

	const item = mockItem({ name: 'New Item' });
	await cache.update(item);

	const result = await cache.get(item.id);
	t.deepEqual(result, item);
});

test('delete removes item', async (t) => {
	const { cache } = createTestCache();

	const item = mockItem();
	await cache.insert(item);
	t.deepEqual(await cache.get(item.id), item);

	await cache.delete(item.id);
	t.is(await cache.get(item.id), null);
});

/**
 * Testing query caching behavior, including cache hits, misses, and invalidation on updates/inserts/deletes
 */

test('queries.findUser - caches existing item', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();
	const item = database[0];
	for (let i = 0; i < 3; i++) {
		const result = await cache.queries.findUser({ id: item.id });
		t.deepEqual(result, item);
	}
	t.is(resolvers.findUser.callCount, 1);
});

test('queries.findUser - caches null for non-existing item', async (t) => {
	const { cache, resolvers } = createTestCacheWithQueries();
	const nonExistingId = randomUUID();
	for (let i = 0; i < 3; i++) {
		const result = await cache.queries.findUser({ id: nonExistingId });
		t.is(result, null);
	}
	t.is(resolvers.findUser.callCount, 1);
});

test('queries.findUser - skips cache for new args', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < database.length; j++) {
			const result = await cache.queries.findUser({ id: database[j].id });
			t.deepEqual(result, database[j]);
		}
	}
	t.is(resolvers.findUser.callCount, database.length);
});

test('queries.findUser - updates cache on update', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();
	for (let i = 0; i < 3; i++) {
		let result = await cache.queries.findUser({ id: database[0].id });
		t.deepEqual(result, database[0]);
		database[0] = { ...database[0], name: `Updated Name ${i}` };
		await cache.update(database[0]);
		result = await cache.queries.findUser({ id: database[0].id });
		t.deepEqual(result, database[0]);
	}
	t.is(resolvers.findUser.callCount, 1);
});

test('queries.findUser - invalidates cache on insert', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();
	for (let i = 0; i < 3; i++) {
		const item = mockItem();
		let result = await cache.queries.findUser({ id: item.id });
		t.is(result, null);
		database.push(item);
		await cache.insert(item, { waitForHooks: true });
		result = await cache.queries.findUser({ id: item.id });
		t.deepEqual(result, item);
	}
	t.is(resolvers.findUser.callCount, 6);
});

test('queries.findUser - invalidates cache on delete', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();
	for (let i = 0; i < 3; i++) {
		const item = mockItem();
		database.push(item);
		let result = await cache.queries.findUser({ id: item.id });
		t.deepEqual(result, item);
		database.pop();
		await cache.delete(item.id, { waitForHooks: true });
		result = await cache.queries.findUser({ id: item.id });
		t.is(result, null);
	}
	t.is(resolvers.findUser.callCount, 6);
});

test('queries.findUsersByName - resolves list', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();
	for (let i = 0; i < 3; i++) {
		const result = await cache.queries.findUsersByName({ name: 'Name 1' });
		t.is(result.length, 2);
		t.deepEqual(
			result,
			database.filter((item) => item.name === 'Name 1'),
		);
	}
	t.is(resolvers.findUsersByName.callCount, 1);
});

test('queries.findUsersByName - invalidates caches on insert', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();
	let result = await cache.queries.findUsersByName({ name: 'Name 1' });
	t.is(result.length, 2);
	const item = mockItem({ name: 'Name 1' });
	database.push(item);
	await cache.insert(item, { waitForHooks: true });
	result = await cache.queries.findUsersByName({ name: 'Name 1' });
	t.is(result.length, 3);
	t.is(resolvers.findUsersByName.callCount, 2);
});

test('queries.findUsersByName - invalidates caches for both old and new name on update', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();
	let result = await cache.queries.findUsersByName({ name: 'Name 1' });
	t.is(result.length, 2);
	database[0] = { ...database[0], name: 'Updated Name' };
	await cache.update(database[0], { waitForHooks: true });
	result = await cache.queries.findUsersByName({ name: 'Name 1' });
	result = await cache.queries.findUsersByName({ name: 'Updated Name' });
	t.is(resolvers.findUsersByName.callCount, 3);
});

test("queries.findUsersByName - is invalidated if it can't find its items in cache", async (t) => {
	const { client, cache, resolvers, database } = createTestCacheWithQueries();

	const expectedItems = database.filter((item) => item.name === 'Name 1');
	let result = await cache.queries.findUsersByName({ name: 'Name 1' });
	t.deepEqual(result, expectedItems);
	t.is(resolvers.findUsersByName.callCount, 1);

	result = await cache.queries.findUsersByName({ name: 'Name 1' });
	t.deepEqual(result, expectedItems);
	t.is(resolvers.findUsersByName.callCount, 1);

	client.flushItems();

	result = await cache.queries.findUsersByName({ name: 'Name 1' });
	t.deepEqual(result, expectedItems);
	t.is(resolvers.findUsersByName.callCount, 2);
});

test('queries.findUsersByName - invalidates caches on delete', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();
	let result = await cache.queries.findUsersByName({ name: 'Name 1' });
	t.is(result.length, 2);
	const popped = database.pop();
	if (popped) {
		await cache.delete(popped.id, { waitForHooks: true });
	}
	result = await cache.queries.findUsersByName({ name: 'Name 1' });
	t.is(result.length, 1);
	t.is(resolvers.findUsersByName.callCount, 2);
});

test('queries.findUsersByOrg - invalidates all on update', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();
	let result = await cache.queries.findUsersByOrg({ orgId: 'org1' });
	result = await cache.queries.findUsersByOrg({ orgId: 'org1' });
	t.is(result.length, 2);
	t.is(resolvers.findUsersByOrg.callCount, 1);

	result = await cache.queries.findUsersByOrg({ orgId: 'org2' });
	result = await cache.queries.findUsersByOrg({ orgId: 'org2' });
	t.is(result.length, 2);
	t.is(resolvers.findUsersByOrg.callCount, 2);

	database[0] = { ...database[0], orgId: 'newOrg' };
	await cache.update(database[0], { waitForHooks: true });

	result = await cache.queries.findUsersByOrg({ orgId: 'org1' });
	t.is(result.length, 1);
	result = await cache.queries.findUsersByOrg({ orgId: 'org2' });
	t.is(result.length, 2);
	t.is(resolvers.findUsersByOrg.callCount, 4);
});

test('queries.findUsersByOrg - invalidates all on insert', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();

	let result = await cache.queries.findUsersByOrg({ orgId: 'org1' });
	result = await cache.queries.findUsersByOrg({ orgId: 'org1' });
	t.is(result.length, 2);
	t.is(resolvers.findUsersByOrg.callCount, 1);

	result = await cache.queries.findUsersByOrg({ orgId: 'org2' });
	result = await cache.queries.findUsersByOrg({ orgId: 'org2' });
	t.is(result.length, 2);
	t.is(resolvers.findUsersByOrg.callCount, 2);

	database.push({ id: 'new', name: 'New User', orgId: 'org1' });
	await cache.update(database[0], { waitForHooks: true });

	result = await cache.queries.findUsersByOrg({ orgId: 'org1' });
	t.is(result.length, 3);
	result = await cache.queries.findUsersByOrg({ orgId: 'org2' });
	t.is(result.length, 2);
	t.is(resolvers.findUsersByOrg.callCount, 4);
});

test('queries.findUsersByOrg - invalidates all on delete', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();

	let result = await cache.queries.findUsersByOrg({ orgId: 'org1' });
	result = await cache.queries.findUsersByOrg({ orgId: 'org1' });
	t.is(result.length, 2);
	t.is(resolvers.findUsersByOrg.callCount, 1);

	result = await cache.queries.findUsersByOrg({ orgId: 'org3' });
	result = await cache.queries.findUsersByOrg({ orgId: 'org3' });
	t.is(result.length, 2);
	t.is(resolvers.findUsersByOrg.callCount, 2);

	const popped = database.pop();
	if (popped) {
		await cache.delete(popped.id, { waitForHooks: true });
	}

	result = await cache.queries.findUsersByOrg({ orgId: 'org1' });
	t.is(result.length, 2);
	result = await cache.queries.findUsersByOrg({ orgId: 'org3' });
	t.is(result.length, 1);
	t.is(resolvers.findUsersByOrg.callCount, 4);
});

test('queries.findUsersByOrgWithGaps - returns nulls for non-matching items', async (t) => {
	const { cache, resolvers, database } = createTestCacheWithQueries();

	const itemsOrNull = database.map((item) => (item.orgId === 'org1' ? item : null));
	let result = await cache.queries.findUsersByOrgWithGaps({ orgId: 'org1' });
	t.is(result.length, database.length);
	t.deepEqual(result, itemsOrNull);
	result = await cache.queries.findUsersByOrgWithGaps({ orgId: 'org1' });
	t.is(result.length, database.length);
	t.deepEqual(result, itemsOrNull);
	t.is(resolvers.findUsersByOrgWithGaps.callCount, 1);
});

test('multiple queries with different indexes coexist independently', async (t) => {
	const { cache, resolvers } = createTestCacheWithQueries();

	await cache.queries.findUser({ id: '1' });
	await cache.queries.findUsersByName({ name: 'Name 2' });
	await cache.queries.findUsersByOrg({ orgId: 'org1' });

	t.is(resolvers.findUser.callCount, 1);
	t.is(resolvers.findUsersByName.callCount, 1);
	t.is(resolvers.findUsersByOrg.callCount, 1);

	await cache.insert({ id: '3', name: 'New User', orgId: 'org1' }, { waitForHooks: true });

	await cache.queries.findUser({ id: '1' });
	t.is(resolvers.findUser.callCount, 1);

	await cache.queries.findUsersByName({ name: 'Name 2' });
	t.is(resolvers.findUsersByName.callCount, 1);

	await cache.queries.findUsersByOrg({ orgId: 'org1' });
	t.is(resolvers.findUsersByOrg.callCount, 2);
});

/**
 * Error handling
 * Queries should still return data if the client throws an error during get or save operations
 * Insert, update and delete operations should reject if the client throws an error during save or delete operations
 */

test('query falls back to resolver when client.getQuery throws', async (t) => {
	const { client, cache, resolvers } = createTestCacheWithQueries();
	const stub = sinon.stub(client, 'getQuery').rejects(new Error('getQuery failed'));
	const result = await cache.queries.findUser({ id: '1' });
	t.deepEqual(result, { id: '1', name: 'Name 1', orgId: 'org1' });
	t.is(resolvers.findUser.callCount, 1);
	stub.restore();
});

test('query returns data even when client.saveQuery throws', async (t) => {
	const { client, cache, resolvers } = createTestCacheWithQueries();
	const stub = sinon.stub(client, 'saveQuery').rejects(new Error('saveQuery failed'));
	const result = await cache.queries.findUser({ id: '2' });
	t.deepEqual(result, { id: '2', name: 'Name 2', orgId: 'org2' });
	t.is(resolvers.findUser.callCount, 1);
	stub.restore();
});

test('insert rejects when client.saveItems throws', async (t) => {
	const { client, cache } = createTestCache();
	const stub = sinon.stub(client, 'saveItems').rejects(new Error('saveItems failed'));
	await t.throwsAsync(() => cache.insert(mockItem()), { message: 'saveItems failed' });
	stub.restore();
});

test('update rejects when client.saveItemsWithDiff throws', async (t) => {
	const { client, cache } = createTestCacheWithQueries();
	const stub = sinon
		.stub(client, 'saveItemsWithDiff')
		.rejects(new Error('saveItemsWithDiff failed'));
	await t.throwsAsync(() => cache.update({ id: '1', name: 'Updated', orgId: 'org1' }), {
		message: 'saveItemsWithDiff failed',
	});
	stub.restore();
});

test('delete rejects when client.deleteItemsWithDiff throws', async (t) => {
	const { client, cache } = createTestCacheWithQueries();
	const stub = sinon
		.stub(client, 'deleteItemsWithDiff')
		.rejects(new Error('deleteItemsWithDiff failed'));
	await t.throwsAsync(() => cache.delete('1'), { message: 'deleteItemsWithDiff failed' });
	stub.restore();
});

test('deleteQueries - clears all cached queries', async (t) => {
	const { cache, resolvers } = createTestCacheWithQueries();

	await cache.queries.findUser({ id: '1' });
	await cache.queries.findUsersByName({ name: 'Name 1' });
	t.is(resolvers.findUser.callCount, 1);
	t.is(resolvers.findUsersByName.callCount, 1);

	await cache.deleteQueries();

	await cache.queries.findUser({ id: '1' });
	await cache.queries.findUsersByName({ name: 'Name 1' });
	t.is(resolvers.findUser.callCount, 2);
	t.is(resolvers.findUsersByName.callCount, 2);
});

test('get - returns null when cached data is corrupt', async (t) => {
	const { client, cache } = createTestCache();

	const item = mockItem();
	await cache.insert(item);
	t.deepEqual(await cache.get(item.id), item);

	client.corruptItems();

	const result = await cache.get(item.id);
	t.is(result, null);
});
