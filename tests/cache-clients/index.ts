import type {
	CacheClient,
	CacheClientArgs,
	ItemCacheKey,
	QueryCacheIndexKey,
	QueryCacheKey,
} from '@baeta/cache';
import { randomUUID, sleep, type TestFn } from '@baeta/testing';

const TTL_MS = 10_000;

type TestItem = { id: string; name: string };

function itemKey(id: string): ItemCacheKey {
	return `t:{s:item:rev_1}:id:${id}` as ItemCacheKey;
}

function queryKey(name: string, id: string): QueryCacheKey {
	return `t:{s:query:${name}:rev_1}:id:${id}` as QueryCacheKey;
}

function indexKey(name: string, idx: string): QueryCacheIndexKey {
	return `t:{s:query:${name}:rev_1}:idx:${idx}` as QueryCacheIndexKey;
}

const itemArgs: CacheClientArgs<TestItem> = {
	ttlMs: TTL_MS,
	serialize: (value) => JSON.stringify(value),
	parse: (value) => JSON.parse(value) as TestItem,
};

const queryArgs: CacheClientArgs<string[]> = {
	ttlMs: TTL_MS,
	serialize: (value) => JSON.stringify(value),
	parse: (value) => JSON.parse(value),
};

function shortItemArgs(ttlMs: number): CacheClientArgs<TestItem> {
	return { ...itemArgs, ttlMs };
}

function shortQueryArgs(ttlMs: number): CacheClientArgs<string[]> {
	return { ...queryArgs, ttlMs };
}

function mockItem(data?: Partial<TestItem>): TestItem {
	return {
		id: data?.id ?? randomUUID(),
		name: data?.name ?? 'Test Item',
	};
}

export function runTestsForClient(
	createClient: () => Promise<CacheClient>,
	test: TestFn,
	name: string,
) {
	test(`${name} getPartialItems returns empty array for empty keys`, async (t) => {
		const client = await createClient();
		const results = await client.getPartialItems([], itemArgs);
		t.deepEqual(results, []);
	});

	test(`${name} saveItems with empty array is a no-op`, async (t) => {
		const client = await createClient();
		await client.saveItems([], itemArgs);
		t.pass();
	});

	test(`${name} saveItemsWithDiff returns empty array for empty items`, async (t) => {
		const client = await createClient();
		const results = await client.saveItemsWithDiff([], itemArgs);
		t.deepEqual(results, []);
	});

	test(`${name} deleteItems with empty array is a no-op`, async (t) => {
		const client = await createClient();
		await client.deleteItems([], itemArgs);
		t.pass();
	});

	test(`${name} deleteItemsWithDiff returns empty array for empty keys`, async (t) => {
		const client = await createClient();
		const results = await client.deleteItemsWithDiff([], itemArgs);
		t.deepEqual(results, []);
	});

	test(`${name} deleteQueries with empty indexes is a no-op`, async (t) => {
		const client = await createClient();
		await client.deleteQueries([], queryArgs);
		t.pass();
	});

	test(`${name} saveItems and getPartialItems round-trip`, async (t) => {
		const client = await createClient();
		const item1 = mockItem();
		const item2 = mockItem();
		const item3 = mockItem();
		await client.saveItems(
			[
				[itemKey(item1.id), item1],
				[itemKey(item2.id), item2],
				[itemKey(item3.id), item3],
			],
			itemArgs,
		);
		const results = await client.getPartialItems(
			[itemKey(item1.id), itemKey(item2.id), itemKey(item3.id)],
			itemArgs,
		);
		t.deepEqual(results, [
			{ id: item1.id, name: item1.name },
			{ id: item2.id, name: item2.name },
			{ id: item3.id, name: item3.name },
		]);
	});

	test(`${name} getPartialItems returns nulls for missing keys`, async (t) => {
		const client = await createClient();
		const item1 = mockItem();
		const item2 = mockItem();
		const item3 = mockItem();
		await client.saveItems(
			[
				[itemKey(item1.id), item1],
				[itemKey(item2.id), item2],
			],
			itemArgs,
		);
		const results = await client.getPartialItems(
			[itemKey(item1.id), itemKey(item2.id), itemKey(item3.id)],
			itemArgs,
		);
		t.deepEqual(results, [item1, item2, null]);
	});

	test(`${name} deleteItems removes items`, async (t) => {
		const client = await createClient();
		const item1 = mockItem();
		const item2 = mockItem();
		const item3 = mockItem();
		await client.saveItems(
			[
				[itemKey(item1.id), item1],
				[itemKey(item2.id), item2],
				[itemKey(item3.id), item3],
			],
			itemArgs,
		);
		await client.deleteItems([itemKey(item1.id), itemKey(item2.id)], itemArgs);
		const results = await client.getPartialItems(
			[itemKey(item1.id), itemKey(item2.id), itemKey(item3.id)],
			itemArgs,
		);
		t.deepEqual(results, [null, null, item3]);
	});

	test(`${name} saveQuery + getQuery round-trip`, async (t) => {
		const client = await createClient();
		const item1 = mockItem();
		const item2 = mockItem();
		const item3 = mockItem();
		const name = randomUUID();
		const key = queryKey(name, randomUUID());
		const idx = indexKey(name, randomUUID());
		const queryData = [item1.id, item2.id, item3.id];

		await client.saveQuery(key, [idx], queryData, queryArgs);
		const result = await client.getQuery(key, queryArgs);

		t.deepEqual(result, queryData);
	});

	test(`${name} getQuery returns null for missing query`, async (t) => {
		const client = await createClient();
		const key = queryKey(randomUUID(), randomUUID());
		const result = await client.getQuery(key, queryArgs);
		t.is(result, null);
	});

	test(`${name} queries with different names are independent`, async (t) => {
		const client = await createClient();
		const qName = randomUUID();
		const key1 = queryKey(qName, randomUUID());
		const key2 = queryKey(qName, randomUUID());
		await client.saveQuery(key1, [], ['first'], queryArgs);
		await client.saveQuery(key2, [], ['second'], queryArgs);
		const result1 = await client.getQuery(key1, queryArgs);
		const result2 = await client.getQuery(key2, queryArgs);
		t.deepEqual(result1, ['first']);
		t.deepEqual(result2, ['second']);
	});

	test(`${name} deleteQueries removes queries by index`, async (t) => {
		const client = await createClient();
		const qName = randomUUID();
		const idx = indexKey(qName, 'shared');
		const key1 = queryKey(qName, randomUUID());
		const key2 = queryKey(qName, randomUUID());
		const key3 = queryKey(qName, randomUUID());
		await client.saveQuery(key1, [idx], ['a'], queryArgs);
		await client.saveQuery(key2, [idx], ['b'], queryArgs);
		await client.saveQuery(key3, [idx], ['c'], queryArgs);

		await client.deleteQueries([idx], queryArgs);

		const result1 = await client.getQuery(key1, queryArgs);
		const result2 = await client.getQuery(key2, queryArgs);
		const result3 = await client.getQuery(key3, queryArgs);
		t.is(result1, null);
		t.is(result2, null);
		t.is(result3, null);
	});

	test(`${name} deleteQueries by specific index leaves unrelated queries`, async (t) => {
		const client = await createClient();
		const qName = randomUUID();
		const idxAll = indexKey(qName, '');
		const idxA = indexKey(qName, 'groupA');
		const idxB = indexKey(qName, 'groupB');
		const queryA = queryKey(qName, randomUUID());
		const queryB = queryKey(qName, randomUUID());
		await client.saveQuery(queryA, [idxA, idxAll], ['fromA'], queryArgs);
		await client.saveQuery(queryB, [idxB, idxAll], ['fromB'], queryArgs);
		await client.deleteQueries([idxA], queryArgs);

		const resultA = await client.getQuery(queryA, queryArgs);
		let resultB = await client.getQuery(queryB, queryArgs);
		t.is(resultA, null);
		t.deepEqual(resultB, ['fromB']);

		await client.deleteQueries([idxAll], queryArgs);
		resultB = await client.getQuery(queryB, queryArgs);
		t.is(resultB, null);
	});

	test(`${name} items and queries expire after TTL`, async (t) => {
		const client = await createClient();
		const id = randomUUID();
		const key = itemKey(id);
		const qName = randomUUID();
		const qKey = queryKey(qName, randomUUID());
		const idx = indexKey(qName, '');
		const shortLivedItemArgs = shortItemArgs(500);
		const shortLivedQueryArgs = shortQueryArgs(500);

		await client.saveItems([[key, { id, name: 'ephemeral' }]], shortLivedItemArgs);
		const items = await client.getPartialItems([key], shortLivedItemArgs);
		t.deepEqual(items, [{ id, name: 'ephemeral' }]);
		await client.saveQuery(qKey, [idx], ['ephemeral-query'], shortLivedQueryArgs);
		const query = await client.getQuery(qKey, shortLivedQueryArgs);
		t.deepEqual(query, ['ephemeral-query']);

		await sleep(600);

		const expiredItems = await client.getPartialItems([key], shortLivedItemArgs);
		t.deepEqual(expiredItems, [null]);
		const expiredQuery = await client.getQuery(qKey, shortLivedQueryArgs);
		t.is(expiredQuery, null);
	});

	test(`${name} items expire after TTL`, async (t) => {
		const client = await createClient();
		const item = mockItem();
		const key = itemKey(item.id);
		const shortLivedArgs = shortItemArgs(500);
		await client.saveItems([[key, item]], shortLivedArgs);
		const items = await client.getPartialItems([key], shortLivedArgs);
		t.deepEqual(items, [item]);
		await sleep(600);
		const expired = await client.getPartialItems([key], shortLivedArgs);
		t.deepEqual(expired, [null]);
	});

	test(`${name} re-saving items extends TTL`, async (t) => {
		const client = await createClient();
		const args = shortItemArgs(500);
		const item = mockItem();
		const key = itemKey(item.id);
		await client.saveItems([[key, item]], args);
		await sleep(300);
		await client.saveItems([[key, item]], args);
		await sleep(300);
		const results = await client.getPartialItems([key], args);
		t.deepEqual(results, [item]);
	});

	test(`${name} saveItemsWithDiff returns nulls for new items`, async (t) => {
		const client = await createClient();
		const id1 = randomUUID();
		const id2 = randomUUID();
		const key1 = itemKey(id1);
		const key2 = itemKey(id2);
		const result = await client.saveItemsWithDiff(
			[
				[key1, { id: id1, name: 'Alice' }],
				[key2, { id: id2, name: 'Bob' }],
			],
			itemArgs,
		);
		t.deepEqual(result, [null, null]);
		const saved = await client.getPartialItems([key1, key2], itemArgs);
		t.deepEqual(saved, [
			{ id: id1, name: 'Alice' },
			{ id: id2, name: 'Bob' },
		]);
	});

	test(`${name} saveItemsWithDiff returns previous values when overwriting`, async (t) => {
		const client = await createClient();
		const id1 = randomUUID();
		const id2 = randomUUID();
		const key1 = itemKey(id1);
		const key2 = itemKey(id2);
		await client.saveItems(
			[
				[key1, { id: id1, name: 'old1' }],
				[key2, { id: id2, name: 'old2' }],
			],
			itemArgs,
		);
		const result = await client.saveItemsWithDiff(
			[
				[key1, { id: id1, name: 'new1' }],
				[key2, { id: id2, name: 'new2' }],
			],
			itemArgs,
		);
		t.deepEqual(result, [
			{ id: id1, name: 'old1' },
			{ id: id2, name: 'old2' },
		]);
	});

	test(`${name} saveItemsWithDiff mix of new and existing`, async (t) => {
		const client = await createClient();
		const id1 = randomUUID();
		const id2 = randomUUID();
		const key1 = itemKey(id1);
		const key2 = itemKey(id2);
		await client.saveItems([[key1, { id: id1, name: 'existing' }]], itemArgs);
		const result = await client.saveItemsWithDiff(
			[
				[key1, { id: id1, name: 'updated' }],
				[key2, { id: id2, name: 'brand-new' }],
			],
			itemArgs,
		);
		t.deepEqual(result, [{ id: id1, name: 'existing' }, null]);
	});

	test(`${name} saveItemsWithDiff items expire after TTL`, async (t) => {
		const client = await createClient();
		const shortLivedArgs = shortItemArgs(500);
		const id = randomUUID();
		const key = itemKey(id);
		await client.saveItemsWithDiff([[key, { id, name: 'ephemeral' }]], shortLivedArgs);
		const items = await client.getPartialItems([key], shortLivedArgs);
		t.deepEqual(items, [{ id, name: 'ephemeral' }]);
		await sleep(600);
		const expired = await client.getPartialItems([key], shortLivedArgs);
		t.deepEqual(expired, [null]);
	});

	test(`${name} saveItemsWithDiff extends TTL on re-save`, async (t) => {
		const client = await createClient();
		const shortLivedArgs = shortItemArgs(500);
		const id = randomUUID();
		const key = itemKey(id);
		await client.saveItemsWithDiff([[key, { id, name: 'original' }]], shortLivedArgs);
		await sleep(300);
		await client.saveItemsWithDiff([[key, { id, name: 'refreshed' }]], shortLivedArgs);
		await sleep(300);
		const results = await client.getPartialItems([key], shortLivedArgs);
		t.deepEqual(results, [{ id, name: 'refreshed' }]);
	});

	test(`${name} deleteItemsWithDiff returns previous values for existing items`, async (t) => {
		const client = await createClient();
		const id1 = randomUUID();
		const id2 = randomUUID();
		const key1 = itemKey(id1);
		const key2 = itemKey(id2);
		await client.saveItems(
			[
				[key1, { id: id1, name: 'Alice' }],
				[key2, { id: id2, name: 'Bob' }],
			],
			itemArgs,
		);
		const result = await client.deleteItemsWithDiff([key1, key2], itemArgs);
		t.deepEqual(result, [
			{ id: id1, name: 'Alice' },
			{ id: id2, name: 'Bob' },
		]);
		const gone = await client.getPartialItems([key1, key2], itemArgs);
		t.deepEqual(gone, [null, null]);
	});

	test(`${name} deleteItemsWithDiff returns nulls for missing items`, async (t) => {
		const client = await createClient();
		const key = itemKey(randomUUID());
		const result = await client.deleteItemsWithDiff([key], itemArgs);
		t.deepEqual(result, [null]);
	});

	test(`${name} deleteItemsWithDiff mix of existing and missing`, async (t) => {
		const client = await createClient();
		const id1 = randomUUID();
		const id2 = randomUUID();
		const key1 = itemKey(id1);
		const key2 = itemKey(id2);
		await client.saveItems([[key1, { id: id1, name: 'existing' }]], itemArgs);
		const result = await client.deleteItemsWithDiff([key1, key2], itemArgs);
		t.deepEqual(result, [{ id: id1, name: 'existing' }, null]);
	});

	test(`${name} concurrent saveItemsWithDiff on the same key`, async (t) => {
		const client = await createClient();
		const id = randomUUID();
		const key = itemKey(id);
		await client.saveItems([[key, { id, name: 'v0' }]], itemArgs);

		const [diff1, diff2] = await Promise.all([
			client.saveItemsWithDiff([[key, { id, name: 'v1' }]], itemArgs),
			client.saveItemsWithDiff([[key, { id, name: 'v2' }]], itemArgs),
		]);

		const previousFirst = diff1[0];
		const previousSecond = diff2[0];
		const prevNames = [previousFirst?.name, previousSecond?.name];
		t.true(prevNames.includes('v0'), 'at least one diff should return v0 as previous value');

		const final = await client.getPartialItems([key], itemArgs);
		t.true(
			final[0]?.name === 'v1' || final[0]?.name === 'v2',
			`final value should be v1 or v2, got ${final[0]?.name}`,
		);
	});

	test(`${name} concurrent deleteItemsWithDiff on the same key`, async (t) => {
		const client = await createClient();
		const id = randomUUID();
		const key = itemKey(id);
		await client.saveItems([[key, { id, name: 'v0' }]], itemArgs);

		const [diff1, diff2] = await Promise.all([
			client.deleteItemsWithDiff([key], itemArgs),
			client.deleteItemsWithDiff([key], itemArgs),
		]);

		const previousFirst = diff1[0];
		const previousSecond = diff2[0];

		const returned = [previousFirst, previousSecond].filter((item) => item != null);
		t.is(returned.length, 1, 'exactly one delete should return the value');
		t.deepEqual(returned[0], { id, name: 'v0' });

		const final = await client.getPartialItems([key], itemArgs);
		t.deepEqual(final, [null]);
	});

	test(`${name} concurrent saveItemsWithDiff + deleteItemsWithDiff on the same key`, async (t) => {
		const client = await createClient();
		const id = randomUUID();
		const key = itemKey(id);
		await client.saveItems([[key, { id, name: 'v0' }]], itemArgs);

		const [saveDiff, deleteDiff] = await Promise.all([
			client.saveItemsWithDiff([[key, { id, name: 'v1' }]], itemArgs),
			client.deleteItemsWithDiff([key], itemArgs),
		]);

		const prevNames = [saveDiff[0]?.name, deleteDiff[0]?.name];
		t.true(prevNames.includes('v0'), 'at least one diff should return v0 as previous value');

		const final = await client.getPartialItems([key], itemArgs);
		t.true(
			final[0] == null || final[0]?.name === 'v1',
			`final value should be null or v1, got ${JSON.stringify(final[0])}`,
		);
	});

	test(`${name} saveQuery indexes remain valid after deleteQueries + re-save cycle`, async (t) => {
		const client = await createClient();
		const qName = randomUUID();
		const idx = indexKey(qName, 'i1');
		const keyQ1 = queryKey(qName, randomUUID());
		const keyQ2 = queryKey(qName, randomUUID());

		await client.saveQuery(keyQ1, [idx], ['q1-data'], queryArgs);
		await client.deleteQueries([idx], queryArgs);

		const afterDelete = await client.getQuery(keyQ1, queryArgs);
		t.is(afterDelete, null);

		await client.saveQuery(keyQ2, [idx], ['q2-data'], queryArgs);
		const q2Result = await client.getQuery(keyQ2, queryArgs);
		t.deepEqual(q2Result, ['q2-data']);

		await client.deleteQueries([idx], queryArgs);
		const q2AfterDelete = await client.getQuery(keyQ2, queryArgs);
		t.is(q2AfterDelete, null);
	});

	test(`${name} deleteQueries cleans up shared indexes correctly`, async (t) => {
		const client = await createClient();
		const qName = randomUUID();
		const idxA = indexKey(qName, 'a');
		const idxB = indexKey(qName, 'b');
		const idxShared = indexKey(qName, 'shared');
		const keyQ1 = queryKey(qName, randomUUID());
		const keyQ2 = queryKey(qName, randomUUID());
		const keyQ3 = queryKey(qName, randomUUID());

		await client.saveQuery(keyQ1, [idxA, idxShared], ['q1'], queryArgs);
		await client.saveQuery(keyQ2, [idxB, idxShared], ['q2'], queryArgs);

		await client.deleteQueries([idxA], queryArgs);
		const q1After = await client.getQuery(keyQ1, queryArgs);
		const q2After = await client.getQuery(keyQ2, queryArgs);
		t.is(q1After, null);
		t.deepEqual(q2After, ['q2']);

		await client.deleteQueries([idxShared], queryArgs);
		const q2AfterShared = await client.getQuery(keyQ2, queryArgs);
		t.is(q2AfterShared, null);

		await client.saveQuery(keyQ3, [idxShared], ['q3'], queryArgs);
		const q3Result = await client.getQuery(keyQ3, queryArgs);
		t.deepEqual(q3Result, ['q3']);

		await client.deleteQueries([idxShared], queryArgs);
		const q3AfterDelete = await client.getQuery(keyQ3, queryArgs);
		t.is(q3AfterDelete, null);
	});

	test(`${name} concurrent saveQuery to the same index`, async (t) => {
		const client = await createClient();
		const qName = randomUUID();
		const idx = indexKey(qName, 'shared');
		const keyQ1 = queryKey(qName, randomUUID());
		const keyQ2 = queryKey(qName, randomUUID());

		await Promise.all([
			client.saveQuery(keyQ1, [idx], ['q1'], queryArgs),
			client.saveQuery(keyQ2, [idx], ['q2'], queryArgs),
		]);

		const result1 = await client.getQuery(keyQ1, queryArgs);
		const result2 = await client.getQuery(keyQ2, queryArgs);
		t.deepEqual(result1, ['q1']);
		t.deepEqual(result2, ['q2']);

		await client.deleteQueries([idx], queryArgs);
		const q1After = await client.getQuery(keyQ1, queryArgs);
		const q2After = await client.getQuery(keyQ2, queryArgs);
		t.is(q1After, null);
		t.is(q2After, null);
	});

	test(`${name} concurrent deleteQueries on different indexes`, async (t) => {
		const client = await createClient();
		const qName = randomUUID();
		const idxA = indexKey(qName, 'a');
		const idxB = indexKey(qName, 'b');
		const keyQ1 = queryKey(qName, randomUUID());
		const keyQ2 = queryKey(qName, randomUUID());

		await client.saveQuery(keyQ1, [idxA], ['q1'], queryArgs);
		await client.saveQuery(keyQ2, [idxB], ['q2'], queryArgs);

		await Promise.all([
			client.deleteQueries([idxA], queryArgs),
			client.deleteQueries([idxB], queryArgs),
		]);

		const result1 = await client.getQuery(keyQ1, queryArgs);
		const result2 = await client.getQuery(keyQ2, queryArgs);
		t.is(result1, null);
		t.is(result2, null);
	});

	test.serial(`${name} item operations don't fail for large volumes`, async (t) => {
		t.timeout(30_000);

		const client = await createClient();
		const args = shortItemArgs(30_000);
		const idPrefix = randomUUID();

		const items = Array.from({ length: 200_000 }).map((_, i) => {
			const item = mockItem({ id: `${idPrefix}-${i}` });
			const key: ItemCacheKey = itemKey(item.id);
			return [key, item] as [ItemCacheKey, TestItem];
		});
		const keys = items.map(([key]) => key);
		await client.saveItems(items, args);

		const result = await client.getPartialItems(keys, args);
		t.is(result.length, items.length);
		for (let i = 0; i < items.length; i++) {
			const expected = items[i][1];
			const actual = result[i];
			t.is(actual?.id, expected.id);
		}

		await client.deleteItems(keys, args);
		const afterDelete = await client.getPartialItems(keys, args);
		for (const item of afterDelete) {
			t.is(item, null);
		}
	});

	test.serial(`${name} query operations don't fail for large volumes`, async (t) => {
		t.timeout(10_000);

		const client = await createClient();
		const qName = randomUUID();
		const idxPrefix = randomUUID();

		const items = Array.from({ length: 100_000 }, (_, i) => `item-${i}`);

		await client.saveQuery(
			queryKey(qName, 'q1'),
			[indexKey(qName, `${idxPrefix}-1`)],
			items,
			queryArgs,
		);

		let result = await client.getQuery(queryKey(qName, 'q1'), queryArgs);
		t.deepEqual(result, items);

		await client.deleteQueries([indexKey(qName, `${idxPrefix}-1`)], queryArgs);

		result = await client.getQuery(queryKey(qName, 'q1'), queryArgs);
		t.deepEqual(result, null);
	});
}
