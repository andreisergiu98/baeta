// import { randomUUID } from 'node:crypto';
import { CacheRef, type StoreAdapter, type StoreAdapterOptions } from '@baeta/extension-cache';
import { sleep, type TestFn } from '@baeta/testing';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ByteResolver, DateTimeResolver, EmailAddressResolver, URLResolver } from 'graphql-scalars';
import gql from 'graphql-tag';
import { z } from 'zod';

const global = globalThis as typeof globalThis & {
	Buffer: any;
	URL: any;
	crypto: {
		randomUUID: () => string;
	};
};

const randomUUID = () => global.crypto.randomUUID();
const Buffer = global.Buffer;
const URL = global.URL;

type URL = typeof URL;
type Buffer = typeof Buffer;

export interface StoreAdapterTestOptions {
	name: string;
	testTtl: boolean;
}

interface TestItemInput {
	id?: string;
	email?: string;
	url?: URL;
	byte?: Buffer;
	dateTime?: Date;
	value?: string;
	nested?: TestItemInput;
	array?: TestItemInput[];
}

export interface TestItemArgs {
	input?: TestItemInput;
	byte?: Buffer;
}

const typeDefs = gql`
	scalar Byte
	scalar Email
	scalar URL
	scalar DateTime

	type TestItem {
		id: ID!
		email: Email
		url: URL
		byte: Byte
		dateTime: DateTime
		value: String
	}

	input TestItemInput {
		id: ID
		email: Email
		url: URL
		byte: Byte
		value: String
		dateTime: DateTime
		nested: TestItemInput
		array: [TestItemInput]
	}

	type Query {
		item(input: TestItemInput, byte: Byte): TestItem
		items(input: [TestItemInput], bytes: [Byte]): [TestItem]
	}
`;

const BufferSchema = z.codec(
	z.union([
		z.object({
			type: z.literal('Buffer'),
			data: z.array(z.number()),
		}),
		z.string(),
	]),
	z.instanceof(Buffer),
	{
		decode: (value) => {
			if (typeof value === 'string') {
				return Buffer.from(value, 'base64');
			}
			return Buffer.from(value.data);
		},
		encode: (value) => ({
			type: 'Buffer' as const,
			data: Array.from(value) as number[],
		}),
	},
);

export const TestItemSchema = z.object({
	id: z.string(),
	email: z.optional(z.string()),
	url: z.optional(z.url()),
	byte: z.optional(BufferSchema),
	dateTime: z.optional(z.date()),
	value: z.optional(z.string()),
});

export const TestItemStaleSchema = z.object({
	id: z.string(),
	v2: z.number(),
	email: z.optional(z.string()),
	url: z.optional(z.url()),
	byte: z.optional(BufferSchema),
	dateTime: z.optional(z.date()),
	value: z.optional(z.string()),
});

export type TestItem = z.infer<typeof TestItemSchema>;

export const testCacheSchema = makeExecutableSchema({
	typeDefs,
	resolvers: {
		Byte: ByteResolver,
		Email: EmailAddressResolver,
		URL: URLResolver,
		DateTime: DateTimeResolver,
		Query: {
			item: () => ({ id: '1', value: 'test' }),
			items: () => [{ id: '1', value: 'test' }, null, { id: '2', value: 'test2' }],
		},
	},
});

function makeArgsById(id: string): TestItemArgs {
	return { input: { id } };
}

export function runTestsForStoreAdapter(
	createStore: (options: StoreAdapterOptions<TestItem>) => StoreAdapter<TestItem>,
	test: TestFn,
	options: StoreAdapterTestOptions,
) {
	const createTestAdapter = (opt?: { ttl?: number }, withStaleItem?: boolean) => {
		const adapter = createStore({
			options: {
				getRef: (item: TestItem) => item.id,
				ttl: opt?.ttl,
				parse(value) {
					if (withStaleItem) {
						return TestItemStaleSchema.parse(JSON.parse(value));
					}
					return TestItemSchema.parse(JSON.parse(value));
				},
				serialize(value) {
					if (withStaleItem) {
						return JSON.stringify(TestItemStaleSchema.or(TestItemSchema).encode(value));
					}
					return JSON.stringify(TestItemSchema.encode(value));
				},
			},
			type: 'TestItem',
			getSchema: () => testCacheSchema,
		});
		return { adapter };
	};

	test.serial(`${options.name}.save and get`, async (t) => {
		const { adapter } = createTestAdapter();
		const id = randomUUID();
		const item: TestItem = { id, value: 'test' };
		await adapter.save(item);
		const result = await adapter.get(id);
		t.deepEqual(result, item);
	});

	test.serial(`${options.name}.save and get with stale item`, async (t) => {
		const { adapter } = createTestAdapter(undefined, true);
		const id = randomUUID();
		const item: TestItem = { id, value: 'test' };
		await adapter.save(item);
		const result = await adapter.get(id);
		t.deepEqual(result, null);
	});

	test.serial(`${options.name}.getPartialMany`, async (t) => {
		const { adapter } = createTestAdapter();
		const id1 = randomUUID();
		const id2 = randomUUID();
		const items = [
			{ id: id1, value: 'test1' },
			{ id: id2, value: 'test2' },
		];
		await adapter.saveMany(items);
		const results = await adapter.getPartialMany([id1, randomUUID(), id2]);
		t.deepEqual(results, [items[0], null, items[1]]);
	});

	test.serial(`${options.name}.getPartialMany with stale item`, async (t) => {
		const { adapter } = createTestAdapter(undefined, true);
		const id1 = randomUUID();
		const id2 = randomUUID();
		const items = [
			{ id: id1, value: 'test1' },
			{ id: id2, value: 'test2', v2: 1 },
		];
		await adapter.saveMany(items);
		const results = await adapter.getPartialMany([id1, randomUUID(), id2]);
		t.deepEqual(results, [null, null, items[1]]);
	});

	test.serial(`${options.name}.delete`, async (t) => {
		const { adapter } = createTestAdapter();
		const id = randomUUID();
		const item: TestItem = { id, value: 'test' };

		await adapter.save(item);
		await adapter.delete(id);
		const result = await adapter.get(id);
		t.is(result, null);
	});

	test.serial(`${options.name}.saveMany and deleteMany`, async (t) => {
		const { adapter } = createTestAdapter();
		const id1 = randomUUID();
		const id2 = randomUUID();
		const items = [
			{ id: id1, value: 'test1' },
			{ id: id2, value: 'test2' },
		];

		await adapter.saveMany(items);
		const results = await adapter.getPartialMany([id1, id2]);
		t.deepEqual(results, [items[0], items[1]]);

		await adapter.deleteMany([id1, id2]);
		const deletedResults = await adapter.getPartialMany([id1, id2]);
		t.deepEqual(deletedResults, [null, null]);
	});

	test.serial(`${options.name}.saveQueryResult and getQueryResult`, async (t) => {
		const { adapter } = createTestAdapter();
		const id = randomUUID();
		const queryRef = new CacheRef('Query', 'item');
		const item = { id, value: 'test1' };

		await adapter.saveQueryResult(queryRef, item);
		const result = await adapter.getQueryResult(queryRef);
		t.deepEqual(result?.query, item);
	});

	test.serial(`${options.name}.saveQueryResult and getQueryResult list`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('Query', 'items');
		const items = [
			{ id: randomUUID(), value: 'test1' },
			null,
			{ id: randomUUID(), value: 'test2' },
		];
		await adapter.saveQueryResult(queryRef, items);
		const result = await adapter.getQueryResult(queryRef);
		t.deepEqual(result?.query, items);
	});

	test.serial(`${options.name}.saveQueryResult and getQueryResult with stale item`, async (t) => {
		const { adapter } = createTestAdapter(undefined, true);
		const queryRef = new CacheRef('Query', 'item');
		const item = { id: randomUUID(), value: 'test1' };
		await adapter.saveQueryResult(queryRef, item);
		const result = await adapter.getQueryResult(queryRef);
		t.deepEqual(result, null);
	});

	// test.serial(`${options.name}.saveQueryResult and getQueryResult list with null`, async (t) => {
	// 	const { adapter } = createTestAdapter();
	// 	const queryRef = new CacheRef('Query', 'items');
	// 	const items = null;
	// 	await adapter.saveQueryResult(queryRef, items);
	// 	const result = await adapter.getQueryResult(queryRef);
	// 	console.log('------result', result);
	// 	t.deepEqual(result?.query, items);
	// });

	test.serial(`${options.name} query with parent ref and args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('Query', 'item');
		const parentRef = 'parent1';
		const id1 = randomUUID();
		const id2 = randomUUID();
		const item = { id: id1, value: 'test1' };

		// Test saving and loading with parent ref and args
		await adapter.saveQueryResult(queryRef, item, { parentRef, args: makeArgsById(id1) });
		const result = await adapter.getQueryResult(queryRef, { parentRef, args: makeArgsById(id1) });
		t.deepEqual(result?.query, item);

		// Test that different args produce different results
		const differentResult = await adapter.getQueryResult(queryRef, {
			parentRef,
			args: makeArgsById(id2),
		});
		t.is(differentResult, null);

		// Test that different parent ref produces different results
		const differentParentRef = 'parent2';
		const differentParentResult = await adapter.getQueryResult(queryRef, {
			parentRef: differentParentRef,
			args: makeArgsById(id1),
		});
		t.is(differentParentResult, null);
	});

	test.serial(`${options.name} deleteQueries with pattern matching`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('Query', 'item');
		const items = [
			{ id: '1', value: 'test1' },
			{ id: '2', value: 'test2' },
			{ id: '3', value: 'test3' },
		];

		// Save multiple query results with different parent refs and args
		await adapter.saveQueryResult(queryRef, items[0], {
			parentRef: 'parent1',
			args: makeArgsById('1'),
		});
		await adapter.saveQueryResult(queryRef, items[1], {
			parentRef: 'parent2',
			args: makeArgsById('2'),
		});
		await adapter.saveQueryResult(queryRef, items[2], {
			parentRef: 'parent3',
			args: makeArgsById('3'),
		});

		// Delete queries matching a specific parent
		await adapter.deleteQueries(queryRef, { parentRef: 'parent1' });
		await adapter.deleteQueries(queryRef, { args: makeArgsById('3') });

		// Verify that only the matching query was deleted
		const result1 = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: makeArgsById('1'),
		});
		const result2 = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent2',
			args: makeArgsById('2'),
		});
		const result3 = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent3',
			args: makeArgsById('3'),
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
		const queryRef = new CacheRef('Query', 'item');
		const parentRef = 'parent1';
		const item = { id: '1', value: 'test1' };

		const urlArg = new URL('https://example.com/test?query=value');
		const urlArgs: TestItemArgs = { input: { url: urlArg } };

		await adapter.saveQueryResult(queryRef, item, { parentRef, args: urlArgs });
		const urlResult = await adapter.getQueryResult(queryRef, { parentRef, args: urlArgs });
		t.deepEqual(urlResult?.query, item);
	});

	test.serial(`${options.name} query with Buffer args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('Query', 'item');
		const parentRef = 'parent1';
		const item = { id: randomUUID(), value: 'test1' };

		const bufferArg = Buffer.from('test buffer');
		const bufferArgs: TestItemArgs = { byte: bufferArg };

		await adapter.saveQueryResult(queryRef, item, { parentRef, args: bufferArgs });
		const bufferResult = await adapter.getQueryResult(queryRef, { parentRef, args: bufferArgs });
		t.deepEqual(bufferResult?.query, item);
	});

	test.serial(`${options.name} query with nested objects`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('Query', 'item');
		const parentRef = 'parent1';
		const item = { id: randomUUID(), value: 'test1' };

		const nestedArgs: TestItemArgs = {
			input: {
				nested: { id: randomUUID(), value: 'test2', byte: Buffer.from('test buffer') },
				byte: Buffer.from('test buffer'),
			},
		};

		await adapter.saveQueryResult(queryRef, item, { parentRef, args: nestedArgs });
		const result = await adapter.getQueryResult(queryRef, { parentRef, args: nestedArgs });
		t.deepEqual(result?.query, item);
	});

	test.serial(`${options.name} query with array args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('Query', 'item');
		const parentRef = 'parent1';
		const item = { id: randomUUID(), value: 'test1' };

		const arrayArgs: TestItemArgs = {
			input: {
				array: [
					{ id: randomUUID(), value: 'test2' },
					{ id: randomUUID(), value: 'test3' },
				],
			},
		};

		await adapter.saveQueryResult(queryRef, item, { parentRef, args: arrayArgs });
		const result = await adapter.getQueryResult(queryRef, { parentRef, args: arrayArgs });
		t.deepEqual(result?.query, item);
	});

	test.serial(`${options.name} delete queries by parent ref`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('Query', 'item');
		const id = randomUUID();
		const item = { id, value: 'test1' };

		await adapter.saveQueryResult(queryRef, item, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});

		await adapter.deleteQueries(queryRef, { parentRef: 'parent1' });
		const result = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});
		t.is(result, null);
	});

	test.serial(`${options.name} delete queries by args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('Query', 'item');
		const id = randomUUID();
		const item = { id, value: 'test1' };

		await adapter.saveQueryResult(queryRef, item, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});

		await adapter.deleteQueries(queryRef, { args: makeArgsById(id) });
		const result = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});
		t.is(result, null);
	});

	test.serial(`${options.name} delete queries by partial args`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('Query', 'item');
		const parentRef = 'parent1';
		const item = { id: randomUUID(), value: 'test1' };

		const nestedArgs: TestItemArgs = {
			input: {
				nested: { id: randomUUID(), value: 'test1', byte: Buffer.from('test buffer') },
				byte: Buffer.from('test buffer'),
			},
		};
		const partialArgs: TestItemArgs = {
			input: {
				nested: { value: 'test1' },
			},
		};

		await adapter.saveQueryResult(queryRef, item, { parentRef, args: nestedArgs });
		await adapter.deleteQueries(queryRef, { args: partialArgs });
		const result = await adapter.getQueryResult(queryRef, { parentRef, args: nestedArgs });
		t.is(result, null);
	});

	test.serial(`${options.name} delete all queries`, async (t) => {
		const { adapter } = createTestAdapter();
		const queryRef = new CacheRef('Query', 'item');
		const id = randomUUID();
		const item = { id, value: 'test1' };

		await adapter.saveQueryResult(queryRef, item, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});

		await adapter.deleteQueries();

		const result = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});

		t.is(result, null);
	});

	if (!options.testTtl) {
		return;
	}

	test.serial(`${options.name} respects TTL for cached items`, async (t) => {
		const { adapter } = createTestAdapter({ ttl: 1 }); // 1s TTL
		const queryRef = new CacheRef('Query', 'item');
		const id = randomUUID();
		const item = { id, value: 'test1' };

		await adapter.saveQueryResult(queryRef, item, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});

		// Item should be available immediately
		const immediateItem = await adapter.get(id);
		const immediateResult = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});

		t.deepEqual(immediateItem, item);
		t.deepEqual(immediateResult?.query, item);

		// Wait for TTL to expire
		await sleep(1100);

		// Item should be expired now
		const expiredItem = await adapter.get(id);
		const expiredResult = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});

		t.is(expiredItem, null);
		t.is(expiredResult, null);
	});

	test.serial(`${options.name} updates TTL when saving the same item`, async (t) => {
		const { adapter } = createTestAdapter({ ttl: 1 }); // 1s TTL
		const queryRef = new CacheRef('Query', 'item');
		const id = randomUUID();
		const item = { id, value: 'test1' };
		const updatedItem = { id, value: 'test1-updated' };

		await adapter.saveQueryResult(queryRef, item, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});

		// Wait for half the TTL
		await sleep(500);

		// Save the updated item with the same key
		await adapter.saveQueryResult(queryRef, updatedItem, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});

		// Wait for the original TTL to expire
		await sleep(600);

		// Item should still be available with updated value
		const result = await adapter.getQueryResult(queryRef, {
			parentRef: 'parent1',
			args: makeArgsById(id),
		});
		t.deepEqual(result?.query, updatedItem);
	});
}
