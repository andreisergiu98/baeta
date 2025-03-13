import {
	CacheRef,
	type Serializer,
	type StoreAdapter,
	type StoreOptions,
} from '@baeta/extension-cache';
import type { TestFn } from '@baeta/testing';

export interface TestItem {
	id: string;
	value: string;
}

export interface StoreAdapterTestOptions {
	name: string;
	serializer: Serializer;
	testTtl: boolean;
}

export function runTestsForStoreAdapter(
	createStore: (options: StoreOptions<TestItem>, serialzier: Serializer) => StoreAdapter<TestItem>,
	test: TestFn,
	options: StoreAdapterTestOptions,
) {
	const createTestAdapter = (opt?: { ttl?: number }) => {
		const adapter = createStore(
			{
				getRef: (item: TestItem) => item.id,
				ttl: opt?.ttl,
			},
			options.serializer,
		);
		return { adapter };
	};

	test.serial(`${options.name}.save and get`, async (t) => {
		const { adapter } = createTestAdapter();
		const item: TestItem = { id: '1', value: 'test' };

		await adapter.save(item);
		const result = await adapter.get('1');
		t.deepEqual(result, item);
	});

	test.serial(`${options.name}.getPartialMany`, async (t) => {
		const { adapter } = createTestAdapter();
		const items = [
			{ id: '1', value: 'test1' },
			{ id: '2', value: 'test2' },
		];

		await adapter.saveMany(items);
		const results = await adapter.getPartialMany(['1', '3', '2']);
		t.deepEqual(results, [items[0], null, items[1]]);
	});

	test.serial(`${options.name}.delete`, async (t) => {
		const { adapter } = createTestAdapter();
		const item: TestItem = { id: '1', value: 'test' };

		await adapter.save(item);
		await adapter.delete('1');
		const result = await adapter.get('1');
		t.is(result, null);
	});

	test.serial(`${options.name}.saveMany and deleteMany`, async (t) => {
		const { adapter } = createTestAdapter();
		const items = [
			{ id: '1', value: 'test1' },
			{ id: '2', value: 'test2' },
		];

		await adapter.saveMany(items);
		const results = await adapter.getPartialMany(['1', '2']);
		t.deepEqual(results, [items[0], items[1]]);

		await adapter.deleteMany(['1', '2']);
		const deletedResults = await adapter.getPartialMany(['1', '2']);
		t.deepEqual(deletedResults, [null, null]);
	});

	test.serial(`${options.name}.saveQueryResult and getQueryResult`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const item = { id: '1', value: 'test1' };

		await adapter.saveQueryResult(queryRef, item);
		const result = await adapter.getQueryResult(queryRef);
		t.deepEqual(result?.query, item);
	});

	test.serial(`${options.name}.saveQueryResult and getQueryResult list`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const items = [
			{ id: '1', value: 'test1' },
			{ id: '2', value: 'test2' },
		];

		await adapter.saveQueryResult(queryRef, items);
		const result = await adapter.getQueryResult(queryRef);
		t.deepEqual(result?.query, items);
	});

	test.serial(`${options.name} query with parent ref and args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const parentRef = 'parent1';
		const args = { filter: 'test' };
		const item = { id: '1', value: 'test1' };

		// Test saving and loading with parent ref and args
		await adapter.saveQueryResult(queryRef, item, { parentRef, args });
		const result = await adapter.getQueryResult(queryRef, { parentRef, args });
		t.deepEqual(result?.query, item);

		// Test that different args produce different results
		const differentArgs = { filter: 'other' };
		const differentResult = await adapter.getQueryResult(queryRef, {
			parentRef,
			args: differentArgs,
		});
		t.is(differentResult, null);

		// Test that different parent ref produces different results
		const differentParentRef = 'parent2';
		const differentParentResult = await adapter.getQueryResult(queryRef, {
			parentRef: differentParentRef,
			args,
		});
		t.is(differentParentResult, null);
	});

	test.serial(`${options.name} deleteQueries with pattern matching`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const items = [
			{ id: '1', value: 'test1' },
			{ id: '2', value: 'test2' },
			{ id: '3', value: 'test3' },
		];

		// Save multiple query results with different parent refs and args
		await adapter.saveQueryResult(queryRef, items[0], {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});
		await adapter.saveQueryResult(queryRef, items[1], {
			parentRef: 'parent2',
			args: { filter: 'test2' },
		});
		await adapter.saveQueryResult(queryRef, items[2], {
			parentRef: 'parent3',
			args: { filter: 'test3' },
		});

		// Delete queries matching a specific parent
		await adapter.deleteQueries(queryRef, { parentRef: 'parent1' });
		await adapter.deleteQueries(queryRef, { args: { filter: 'test3' } });

		// Verify that only the matching query was deleted
		const result1 = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});
		const result2 = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent2',
			args: { filter: 'test2' },
		});
		const result3 = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent3',
			args: { filter: 'test3' },
		});

		t.is(result1, null);
		t.deepEqual(result2?.query, items[1]);
		t.is(result3, null);

		// Delete all queries
		await adapter.deleteQueries();

		const finalResult = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent2',
			args: { filter: 'test2' },
		});
		t.is(finalResult, null);
	});

	test.serial(`${options.name} query with URL args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const parentRef = 'parent1';
		const item = { id: '1', value: 'test1' };

		const urlArg = new URL('https://example.com/test?query=value');
		const urlArgs = { url: urlArg };

		await adapter.saveQueryResult(queryRef, item, { parentRef, args: urlArgs });
		const urlResult = await adapter.getQueryResult(queryRef, { parentRef, args: urlArgs });
		t.deepEqual(urlResult?.query, item);
	});

	test.serial(`${options.name} query with Buffer args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const parentRef = 'parent1';
		const item = { id: '1', value: 'test1' };

		const bufferArg = Buffer.from('test buffer');
		const bufferArgs = { buffer: bufferArg };

		await adapter.saveQueryResult(queryRef, item, { parentRef, args: bufferArgs });
		const bufferResult = await adapter.getQueryResult(queryRef, { parentRef, args: bufferArgs });
		t.deepEqual(bufferResult?.query, item);
	});

	test.serial(`${options.name} query with nested objects`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const parentRef = 'parent1';
		const item = { id: '1', value: 'test1' };

		const nestedArgs = {
			nested: { a: 1, b: [2, 3], c: { d: 4 } },
		};

		await adapter.saveQueryResult(queryRef, item, { parentRef, args: nestedArgs });
		const result = await adapter.getQueryResult(queryRef, { parentRef, args: nestedArgs });
		t.deepEqual(result?.query, item);
	});

	test.serial(`${options.name} query with array args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const parentRef = 'parent1';
		const item = { id: '1', value: 'test1' };

		const arrayArgs = {
			array: [5, { e: 6 }],
		};

		await adapter.saveQueryResult(queryRef, item, { parentRef, args: arrayArgs });
		const result = await adapter.getQueryResult(queryRef, { parentRef, args: arrayArgs });
		t.deepEqual(result?.query, item);
	});

	test.serial(`${options.name} delete queries by parent ref`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const item = { id: '1', value: 'test1' };

		await adapter.saveQueryResult(queryRef, item, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});

		await adapter.deleteQueries(queryRef, { parentRef: 'parent1' });
		const result = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});
		t.is(result, null);
	});

	test.serial(`${options.name} delete queries by args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const item = { id: '1', value: 'test1' };

		await adapter.saveQueryResult(queryRef, item, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});

		await adapter.deleteQueries(queryRef, { args: { filter: 'test1' } });
		const result = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});
		t.is(result, null);
	});

	test.serial(`${options.name} delete queries by partial args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const parentRef = 'parent1';
		const item = { id: '1', value: 'test1' };

		const complexArgs = {
			nested: { a: 1, b: [2, 3], c: { d: 4 } },
		};

		await adapter.saveQueryResult(queryRef, item, { parentRef, args: complexArgs });
		await adapter.deleteQueries(queryRef, { args: { nested: { a: 1 } } });
		const result = await adapter.getQueryResult(queryRef, { parentRef, args: complexArgs });
		t.is(result, null);
	});

	test.serial(`${options.name} delete all queries`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const item = { id: '1', value: 'test1' };

		await adapter.saveQueryResult(queryRef, item, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});

		await adapter.deleteQueries();

		const result = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});

		t.is(result, null);
	});

	if (!options.testTtl) {
		return;
	}

	test.serial(`${options.name} respects TTL for cached items`, async (t) => {
		const { adapter } = createTestAdapter({ ttl: 1 }); // 1s TTL
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const item = { id: '1', value: 'test1' };

		await adapter.saveQueryResult(queryRef, item, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});

		// Item should be available immediately
		const immediateItem = await adapter.get('1');
		const immediateResult = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});

		t.deepEqual(immediateItem, item);
		t.deepEqual(immediateResult?.query, item);

		// Wait for TTL to expire
		await new Promise((resolve) => setTimeout(resolve, 1100));

		// Item should be expired now
		const expiredItem = await adapter.get('1');
		const expiredResult = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});

		t.is(expiredItem, null);
		t.is(expiredResult, null);
	});

	test.serial(`${options.name} updates TTL when saving the same item`, async (t) => {
		const { adapter } = createTestAdapter({ ttl: 1 }); // 1s TTL
		const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
		const item = { id: '1', value: 'test1' };
		const updatedItem = { id: '1', value: 'test1-updated' };

		await adapter.saveQueryResult(queryRef, item, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});

		// Wait for half the TTL
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Save the updated item with the same key
		await adapter.saveQueryResult(queryRef, updatedItem, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});

		// Wait for the original TTL to expire
		await new Promise((resolve) => setTimeout(resolve, 600));

		// Item should still be available with updated value
		const result = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: { filter: 'test1' },
		});
		t.deepEqual(result?.query, updatedItem);
	});
}
