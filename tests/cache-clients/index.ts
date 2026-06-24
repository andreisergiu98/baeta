import type {
	CacheClient,
	CacheClientArgs,
	ItemCacheKey,
	QueryCacheIndexKey,
	QueryCacheKey,
} from '@baeta/cache';
import { randomUUID, sleep, type TestFn } from '@baeta/testing';

const TTL_MS = 10_000;
const SHORT_TTL_MS = 500;
const SHORT_TTL_DELAY_MS = SHORT_TTL_MS + 100;

type TestItem = { id: string; name: string };

function itemKey(id: string): ItemCacheKey {
	return `t:{s:item:rev_1}:id:${id}`;
}

function queryKey(name: string, id: string): QueryCacheKey {
	return `t:{s:query:${name}:rev_1}:id:${id}`;
}

function indexKey(name: string, idx: string): QueryCacheIndexKey {
	return `t:{s:query:${name}:rev_1}:idx:${idx}`;
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

function makeItemArgs(ttlMs: number): CacheClientArgs<TestItem> {
	return { ...itemArgs, ttlMs };
}

function makeQueryArgs(ttlMs: number): CacheClientArgs<string[]> {
	return { ...queryArgs, ttlMs };
}

function mockItem(data?: Partial<TestItem>): TestItem {
	return {
		id: data?.id ?? randomUUID(),
		name: data?.name ?? 'Test Item',
	};
}

function mockItems(count = 10): {
	values: TestItem[];
	keys: ItemCacheKey[];
	valueTuples: [ItemCacheKey, TestItem][];
} {
	const values = Array.from({ length: count }, () => mockItem());
	return {
		values,
		keys: values.map((item) => itemKey(item.id)),
		valueTuples: values.map((item) => [itemKey(item.id), item] as const),
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
		const { values, keys, valueTuples } = mockItems();
		await client.saveItems(valueTuples, itemArgs);
		const results = await client.getPartialItems(keys, itemArgs);
		t.deepEqual(results, values);
	});

	test(`${name} getPartialItems returns nulls for missing keys`, async (t) => {
		const client = await createClient();
		const { values, keys, valueTuples } = mockItems();
		await client.saveItems(valueTuples, itemArgs);
		const results = await client.getPartialItems(
			[...keys, itemKey(randomUUID()), itemKey(randomUUID())],
			itemArgs,
		);
		t.deepEqual(results, [...values, null, null]);
	});

	test(`${name} deleteItems removes items`, async (t) => {
		const client = await createClient();
		const { values, keys, valueTuples } = mockItems(4);
		await client.saveItems(valueTuples, itemArgs);
		await client.deleteItems(keys.slice(0, 2), itemArgs);
		const results = await client.getPartialItems(keys, itemArgs);
		t.deepEqual(results, [null, null, ...values.slice(2)]);
	});

	test(`${name} saveQuery + getQuery round-trip`, async (t) => {
		const client = await createClient();
		const { values } = mockItems();
		const key = queryKey('TestQuery', randomUUID());
		const idx = indexKey('TestQuery', randomUUID());
		const queryData = values.map((v) => v.id);
		await client.saveQuery(key, [idx], queryData, queryArgs);
		const result = await client.getQuery(key, queryArgs);
		t.deepEqual(result, queryData);
	});

	test(`${name} getQuery returns null for missing query`, async (t) => {
		const client = await createClient();
		const key = queryKey('TestQuery', randomUUID());
		const result = await client.getQuery(key, queryArgs);
		t.is(result, null);
	});

	test(`${name} queries with different ids are independent`, async (t) => {
		const client = await createClient();
		const key1 = queryKey('TestQuery', randomUUID());
		const key2 = queryKey('TestQuery', randomUUID());
		await client.saveQuery(key1, [], ['value1'], queryArgs);
		await client.saveQuery(key2, [], ['value2'], queryArgs);
		t.deepEqual(await client.getQuery(key1, queryArgs), ['value1']);
		t.deepEqual(await client.getQuery(key2, queryArgs), ['value2']);
	});

	test(`${name} deleteQueries removes queries by index`, async (t) => {
		const client = await createClient();

		const queryName = `TestQuery_${randomUUID()}`;
		const idx = indexKey(queryName, 'shared');
		const keys = Array.from({ length: 10 }, () => queryKey(queryName, randomUUID()));

		await Promise.all(keys.map((key) => client.saveQuery(key, [idx], ['data'], queryArgs)));
		await client.deleteQueries([idx], queryArgs);

		t.deepEqual(
			await Promise.all(keys.map((key) => client.getQuery(key, queryArgs))),
			keys.map(() => null),
		);
	});

	test(`${name} deleteQueries by specific index leaves unrelated queries`, async (t) => {
		const client = await createClient();
		const queryName = `TestQuery_${randomUUID()}`;
		const idxAll = indexKey(queryName, '');
		const idxA = indexKey(queryName, 'a');
		const idxB = indexKey(queryName, 'b');
		const queries = Array.from({ length: 10 }, (_, i) => ({
			query: queryKey(queryName, randomUUID()),
			index: i % 2 === 0 ? idxA : idxB,
		}));

		await Promise.all(
			queries.map(({ query, index }) =>
				client.saveQuery(query, [index, idxAll], ['data'], queryArgs),
			),
		);

		let results = await Promise.all(queries.map(({ query }) => client.getQuery(query, queryArgs)));
		t.deepEqual(
			results,
			queries.map(() => ['data']),
		);

		await client.deleteQueries([idxA], queryArgs);
		results = await Promise.all(queries.map(({ query }) => client.getQuery(query, queryArgs)));
		t.deepEqual(
			results,
			queries.map(({ index }) => (index === idxA ? null : ['data'])),
		);

		await client.deleteQueries([idxAll], queryArgs);
		results = await Promise.all(queries.map(({ query }) => client.getQuery(query, queryArgs)));
		t.deepEqual(
			results,
			queries.map(() => null),
		);
	});

	test.serial(`${name} items expire after TTL`, async (t) => {
		const client = await createClient();
		const item = mockItem();
		const key = itemKey(item.id);

		const shortLivedArgs = makeItemArgs(SHORT_TTL_MS);
		const delay = sleep(SHORT_TTL_DELAY_MS);

		await client.saveItems([[key, item]], shortLivedArgs);
		const items = await client.getPartialItems([key], shortLivedArgs);
		t.deepEqual(items, [item]);

		await delay;

		const expired = await client.getPartialItems([key], shortLivedArgs);
		t.deepEqual(expired, [null]);
	});

	test.serial(`${name} re-saving items extends TTL`, async (t) => {
		const client = await createClient();
		const args = makeItemArgs(SHORT_TTL_MS);
		const item = mockItem();
		const key = itemKey(item.id);

		const delay = sleep(SHORT_TTL_DELAY_MS);
		await client.saveItems([[key, item]], args);

		await sleep(SHORT_TTL_MS / 2);
		await client.saveItems([[key, item]], args);
		await delay;

		const results = await client.getPartialItems([key], args);
		t.deepEqual(results, [item]);
	});

	test.serial(`${name} queries expire after TTL`, async (t) => {
		const client = await createClient();
		const queryName = `TestQuery_${randomUUID()}`;
		const query = queryKey(queryName, randomUUID());
		const shortLivedQueryArgs = makeQueryArgs(SHORT_TTL_MS);

		const delay = sleep(SHORT_TTL_DELAY_MS);
		await client.saveQuery(query, [indexKey(queryName, '')], ['data'], shortLivedQueryArgs);
		let result = await client.getQuery(query, shortLivedQueryArgs);
		t.deepEqual(result, ['data']);

		await delay;

		result = await client.getQuery(query, shortLivedQueryArgs);
		t.is(result, null);
	});

	test.serial(`${name} saveItemsWithDiff items expire after TTL`, async (t) => {
		const client = await createClient();
		const shortLivedArgs = makeItemArgs(SHORT_TTL_MS);
		const { values, keys, valueTuples } = mockItems();

		const delay = sleep(SHORT_TTL_DELAY_MS);
		await client.saveItemsWithDiff(valueTuples, shortLivedArgs);
		let results = await client.getPartialItems(keys, shortLivedArgs);
		t.deepEqual(results, values);

		await delay;
		results = await client.getPartialItems(keys, shortLivedArgs);
		t.deepEqual(
			results,
			values.map(() => null),
		);
	});

	test.serial(`${name} saveItemsWithDiff extends TTL on re-save`, async (t) => {
		const client = await createClient();
		const shortLivedArgs = makeItemArgs(SHORT_TTL_MS);
		const { values, keys, valueTuples } = mockItems();

		const delay = sleep(SHORT_TTL_DELAY_MS);
		await client.saveItemsWithDiff(valueTuples, shortLivedArgs);

		await sleep(SHORT_TTL_MS / 2);
		await client.saveItemsWithDiff(valueTuples, shortLivedArgs);

		await delay;
		const results = await client.getPartialItems(keys, shortLivedArgs);
		t.deepEqual(results, values);
	});

	test(`${name} saveItemsWithDiff returns nulls for new items`, async (t) => {
		const client = await createClient();
		const { values, keys, valueTuples } = mockItems();
		const result = await client.saveItemsWithDiff(valueTuples, itemArgs);
		t.deepEqual(
			result,
			values.map(() => null),
		);
		const saved = await client.getPartialItems(keys, itemArgs);
		t.deepEqual(saved, values);
	});

	test(`${name} saveItemsWithDiff returns previous values when overwriting`, async (t) => {
		const client = await createClient();
		const { values, valueTuples } = mockItems();
		await client.saveItems(valueTuples, itemArgs);
		const result = await client.saveItemsWithDiff(valueTuples, itemArgs);
		t.deepEqual(result, values);
	});

	test(`${name} saveItemsWithDiff mix of new and existing`, async (t) => {
		const client = await createClient();
		const { values, valueTuples } = mockItems();
		await client.saveItems(valueTuples.slice(0, 2), itemArgs);
		const result = await client.saveItemsWithDiff(valueTuples, itemArgs);
		t.deepEqual(result, [...values.slice(0, 2), ...values.slice(2).map(() => null)]);
	});

	test(`${name} deleteItemsWithDiff returns previous values for existing items`, async (t) => {
		const client = await createClient();
		const { values, keys, valueTuples } = mockItems();

		await client.saveItems(valueTuples, itemArgs);
		let result = await client.deleteItemsWithDiff(keys, itemArgs);
		t.deepEqual(result, values);

		result = await client.getPartialItems(keys, itemArgs);
		t.deepEqual(
			result,
			values.map(() => null),
		);
	});

	test(`${name} deleteItemsWithDiff returns nulls for missing items`, async (t) => {
		const client = await createClient();
		const { keys } = mockItems();
		const result = await client.deleteItemsWithDiff(keys, itemArgs);
		t.deepEqual(
			result,
			keys.map(() => null),
		);
	});

	test(`${name} deleteItemsWithDiff mix of existing and missing`, async (t) => {
		const client = await createClient();
		const { keys, values, valueTuples } = mockItems();
		await client.saveItems(valueTuples.slice(0, 2), itemArgs);
		const result = await client.deleteItemsWithDiff(keys, itemArgs);
		t.deepEqual(result, [...values.slice(0, 2), ...values.slice(2).map(() => null)]);
	});

	test(`${name} concurrent saveItemsWithDiff on the same key`, async (t) => {
		const client = await createClient();

		const item = {
			...mockItem(),
			name: 'v0',
		};
		const key = itemKey(item.id);

		await client.saveItems([[key, item]], itemArgs);
		const [diff1, diff2] = await Promise.all([
			client.saveItemsWithDiff([[key, { ...item, name: 'v1' }]], itemArgs),
			client.saveItemsWithDiff([[key, { ...item, name: 'v2' }]], itemArgs),
		]);

		const itemDiff1 = diff1.at(0);
		const itemDiff2 = diff2.at(0);

		if (itemDiff1 == null || itemDiff2 == null) {
			t.fail('Both diffs should return a value');
			return;
		}

		const names = [itemDiff1.name, itemDiff2.name].sort((a, b) => a.localeCompare(b, 'en', {}));
		t.deepEqual(names, ['v0', 'v1']);

		const [final] = await client.getPartialItems([key], itemArgs);
		if (final == null) {
			t.fail('Final value should not be null');
			return;
		}
		t.true(
			final.name === 'v1' || final.name === 'v2',
			`Final value should be v1 or v2, got ${final.name}`,
		);
	});

	test(`${name} concurrent deleteItemsWithDiff on the same key`, async (t) => {
		const client = await createClient();
		const item = mockItem();
		const key = itemKey(item.id);
		await client.saveItems([[key, item]], itemArgs);

		const [diff1, diff2] = await Promise.all([
			client.deleteItemsWithDiff([key], itemArgs),
			client.deleteItemsWithDiff([key], itemArgs),
		]);

		const itemDiff1 = diff1.at(0);
		const itemDiff2 = diff2.at(0);

		const returned = [itemDiff1, itemDiff2].filter((item) => item != null);
		t.is(returned.length, 1, 'exactly one delete should return the value');
		t.deepEqual(returned[0], { id: item.id, name: item.name });

		const final = await client.getPartialItems([key], itemArgs);
		t.deepEqual(final, [null]);
	});

	test(`${name} concurrent saveItemsWithDiff + deleteItemsWithDiff on the same key`, async (t) => {
		const client = await createClient();
		const item = {
			...mockItem(),
			name: 'v0',
		};
		const itemUpdate = { ...item, name: 'v1' };
		const key = itemKey(item.id);
		await client.saveItems([[key, item]], itemArgs);

		const [saveDiff, deleteDiff] = await Promise.all([
			client.saveItemsWithDiff([[key, itemUpdate]], itemArgs),
			client.deleteItemsWithDiff([key], itemArgs),
		]);

		const saveDiffItem = saveDiff.at(0);
		const deleteDiffItem = deleteDiff.at(0);

		if (saveDiffItem == null && deleteDiffItem == null) {
			t.fail('One operation should return the previous value');
			return;
		}

		if (saveDiffItem == null || deleteDiffItem == null) {
			// Delete happened first
			t.is(saveDiffItem, null);
			t.deepEqual(deleteDiffItem, item);
			const final = await client.getPartialItems([key], itemArgs);
			t.deepEqual(final, [itemUpdate]);
		} else {
			// Save happened first
			t.deepEqual(saveDiffItem, item);
			t.deepEqual(deleteDiffItem, itemUpdate);
			const final = await client.getPartialItems([key], itemArgs);
			t.deepEqual(final, [null]);
		}
	});

	test(`${name} saveItems with disableOverwrite does not overwrite existing items`, async (t) => {
		const client = await createClient();
		const { values, keys, valueTuples } = mockItems(5);
		await client.saveItems(valueTuples, itemArgs);

		const updatedTuples = valueTuples.map(
			([key, item]) => [key, { ...item, name: 'Updated' }] as [ItemCacheKey, TestItem],
		);
		await client.saveItems(updatedTuples, itemArgs, { disableOverwrite: true });

		const results = await client.getPartialItems(keys, itemArgs);
		t.deepEqual(results, values);
	});

	test(`${name} saveItems with disableOverwrite saves new items`, async (t) => {
		const client = await createClient();
		const { values, keys, valueTuples } = mockItems(5);
		await client.saveItems(valueTuples, itemArgs, { disableOverwrite: true });

		const results = await client.getPartialItems(keys, itemArgs);
		t.deepEqual(results, values);
	});

	test(`${name} saveItems with disableOverwrite handles mix of new and existing`, async (t) => {
		const client = await createClient();
		const { values, valueTuples } = mockItems(6);

		// Save first 3 items normally
		await client.saveItems(valueTuples.slice(0, 3), itemArgs);

		// Try to save all 6 with disableOverwrite — first 3 should be preserved, last 3 saved
		const updatedTuples = valueTuples.map(
			([key, item]) => [key, { ...item, name: 'Updated' }] as [ItemCacheKey, TestItem],
		);
		await client.saveItems(updatedTuples, itemArgs, { disableOverwrite: true });

		const allKeys = valueTuples.map(([key]) => key);
		const results = await client.getPartialItems(allKeys, itemArgs);

		// First 3 should be original values, last 3 should be the "Updated" values
		t.deepEqual(results, [
			...values.slice(0, 3),
			...values.slice(3).map((v) => ({ ...v, name: 'Updated' })),
		]);
	});

	test.serial(`${name} item operations don't fail for large volumes`, async (t) => {
		t.timeout(60_000);

		const client = await createClient();
		const args = makeItemArgs(60_000);

		const { values, valueTuples, keys } = mockItems(200_000);
		await client.saveItems(valueTuples, args);

		const result = await client.getPartialItems(keys, args);

		t.is(result.length, values.length);
		for (let i = 0; i < values.length; i++) {
			t.is(result[i]?.id, values[i].id);
		}

		await client.deleteItems(keys, args);
		const afterDelete = await client.getPartialItems(keys, args);
		t.is(afterDelete.length, keys.length);
		t.is(
			afterDelete.every((item) => item === null),
			true,
		);
	});

	test.serial(`${name} query operations don't fail for large volumes`, async (t) => {
		const client = await createClient();

		const queryName = `TestQuery_${randomUUID()}`;
		const query = queryKey(queryName, randomUUID());
		const idx = indexKey(queryName, 'idx1');
		const items = Array.from({ length: 100_000 }, (_, i) => `item-${i}`);

		await client.saveQuery(query, [idx], items, queryArgs);

		let result = await client.getQuery(query, queryArgs);
		t.deepEqual(result, items);

		await client.deleteQueries([idx], queryArgs);

		result = await client.getQuery(query, queryArgs);
		t.deepEqual(result, null);
	});
}
