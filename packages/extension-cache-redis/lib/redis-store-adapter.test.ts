import { CacheRef, createSerializer } from '@baeta/extension-cache';
import test from '@baeta/testing';
import Redis from 'ioredis';
import { RedisStoreAdapter } from './redis-store-adapter.ts';

if (!process.env.REDIS_HOST) {
	throw new Error('REDIS_HOST is not set');
}

if (!process.env.REDIS_PORT) {
	throw new Error('REDIS_PORT is not set');
}

interface TestItem {
	id: string;
	value: string;
}

const client = new Redis({
	host: process.env.REDIS_HOST,
	port: Number(process.env.REDIS_PORT),
	maxRetriesPerRequest: 0, // Fail fast in tests
});

function createTestAdapter() {
	const serializer = createSerializer();

	const options = {
		getRef: (item: TestItem) => item.id,
		ttl: 3600,
	};
	return {
		adapter: new RedisStoreAdapter(client, serializer, options, 'test', 'test-hash'),
	};
}

test.beforeEach(async () => {
	await client.flushall();
});

test.after(async () => {
	await client.quit();
});

test.serial('RedisStoreAdapter.save and get', async (t) => {
	const { adapter } = createTestAdapter();
	const item: TestItem = { id: '1', value: 'test' };

	await adapter.save(item);
	const result = await adapter.get('1');
	t.deepEqual(result, item);
});

test.serial('RedisStoreAdapter.getPartialMany', async (t) => {
	const { adapter } = createTestAdapter();
	const items = [
		{ id: '1', value: 'test1' },
		{ id: '2', value: 'test2' },
	];

	await adapter.saveMany(items);
	const results = await adapter.getPartialMany(['1', '3', '2']);
	t.deepEqual(results, [items[0], null, items[1]]);
});

test.serial('RedisStoreAdapter.delete', async (t) => {
	const { adapter } = createTestAdapter();
	const item: TestItem = { id: '1', value: 'test' };

	await adapter.save(item);
	await adapter.delete('1');
	const result = await adapter.get('1');
	t.is(result, null);
});

test.serial('RedisStoreAdapter.saveMany and deleteMany', async (t) => {
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

test.serial('RedisStoreAdapter.saveQueryResult and getQueryResult', async (t) => {
	const { adapter } = createTestAdapter();
	const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
	const item = { id: '1', value: 'test1' };

	await adapter.saveQueryResult(queryRef, item);
	const result = await adapter.getQueryResult(queryRef);
	t.deepEqual(result?.query, item);
});

test.serial('RedisStoreAdapter.saveQueryResult and getQueryResult list', async (t) => {
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

test.serial('RedisStoreAdapter query with parent ref and args', async (t) => {
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

test.serial('RedisStoreAdapter deleteQueries with pattern matching', async (t) => {
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

test.serial('RedisStoreAdapter query with complex args', async (t) => {
	const { adapter } = createTestAdapter();
	const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
	const parentRef = 'parent1';
	const item = { id: '1', value: 'test1' };

	// Test with URL object in args
	const urlArg = new URL('https://example.com/test?query=value');
	const urlArgs = { url: urlArg };

	await adapter.saveQueryResult(queryRef, item, { parentRef, args: urlArgs });
	const urlResult = await adapter.getQueryResult(queryRef, { parentRef, args: urlArgs });
	t.deepEqual(urlResult?.query, item);

	// Test with Buffer in args
	const bufferArg = Buffer.from('test buffer');
	const bufferArgs = { buffer: bufferArg };
	await adapter.saveQueryResult(queryRef, item, { parentRef, args: bufferArgs });
	const bufferResult = await adapter.getQueryResult(queryRef, { parentRef, args: bufferArgs });
	t.deepEqual(bufferResult?.query, item);

	// Test with nested objects and arrays
	const complexArgs = {
		nested: { a: 1, b: [2, 3], c: { d: 4 } },
		array: [5, { e: 6 }],
		url: urlArg,
		buffer: bufferArg,
	};
	await adapter.saveQueryResult(queryRef, item, { parentRef, args: complexArgs });
	const complexResult = await adapter.getQueryResult(queryRef, { parentRef, args: complexArgs });
	t.deepEqual(complexResult?.query, item);

	// Test deletion with complex args
	await adapter.deleteQueries(queryRef, { parentRef, args: urlArgs });
	const deletedUrlResult = await adapter.getQueryResult(queryRef, { parentRef, args: urlArgs });
	t.is(deletedUrlResult, null);

	// Verify other queries still exist
	const bufferResultAfterDeletion = await adapter.getQueryResult(queryRef, {
		parentRef,
		args: bufferArgs,
	});
	t.deepEqual(bufferResultAfterDeletion?.query, item);

	// Delete with partial complex args matching
	await adapter.deleteQueries(queryRef, { args: { nested: { a: 1 } } });
	const deletedComplexResult = await adapter.getQueryResult(queryRef, {
		parentRef,
		args: complexArgs,
	});
	t.is(deletedComplexResult, null);

	// Delete all remaining queries
	await adapter.deleteQueries();
	const finalResult = await adapter.getQueryResult(queryRef, { parentRef, args: bufferArgs });
	t.is(finalResult, null);
});
