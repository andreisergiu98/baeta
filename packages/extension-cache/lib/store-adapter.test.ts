import test from '@baeta/testing';
import { minimatch } from 'minimatch';
import { CacheRef, type ItemRef, type ParentRef } from './ref.ts';
import { createSerializer } from './serializer.ts';
import { StoreAdapter } from './store-adapter.ts';
import type { StoreOptions } from './store-options.ts';

test('StoreAdapter.save and get', async (t) => {
	const adapter = createTestAdapter();
	const item: TestItem = { id: '1', value: 'test' };

	await adapter.save(item);
	const result = await adapter.get('1');

	t.deepEqual(result, item);
});

test('StoreAdapter.getMany with partial results', async (t) => {
	const adapter = createTestAdapter();
	const items: TestItem[] = [
		{ id: '1', value: 'test1' },
		{ id: '2', value: 'test2' },
	];

	await adapter.saveMany(items);
	const results = await adapter.getMany(['1', '3', '2']);

	t.is(results, null);
});

test('StoreAdapter.getMany with fallback', async (t) => {
	const adapter = createTestAdapter();
	const items: TestItem[] = [
		{ id: '1', value: 'test1' },
		{ id: '2', value: 'test2' },
	];

	await adapter.saveMany([items[0]]); // Save only first item

	const fallback = async (refs: string[]) => {
		return refs
			.map((ref) => items.find((i) => i.id === ref))
			.filter((i): i is TestItem => i != null);
	};

	const results = await adapter.getMany(['1', '2'], fallback);

	t.deepEqual(results, items);
});

test('StoreAdapter.delete', async (t) => {
	const adapter = createTestAdapter();
	const item: TestItem = { id: '1', value: 'test' };

	await adapter.save(item);
	await adapter.delete('1');
	const result = await adapter.get('1');

	t.is(result, null);
});

test('StoreAdapter.saveQueryResult and getQueryResult', async (t) => {
	const adapter = createTestAdapter();
	const item: TestItem = { id: '2', value: 'test2' };

	const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');

	await adapter.saveQueryResult(queryRef, item);
	const result = await adapter.getQueryResult(queryRef);

	t.deepEqual(result?.query, item);
});

test('StoreAdapter.saveQueryResult and getQueryResult with list', async (t) => {
	const adapter = createTestAdapter();
	const items: TestItem[] = [
		{ id: '1', value: 'test1' },
		{ id: '2', value: 'test2' },
	];

	const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');

	await adapter.saveQueryResult(queryRef, items);
	const result = await adapter.getQueryResult(queryRef);

	t.deepEqual(result?.query, items);
});

test('StoreAdapter.saveQueryResult with parent ref and args', async (t) => {
	const adapter = createTestAdapter();
	const item: TestItem = { id: '1', value: 'test1' };
	const parentRef = 'parent1';
	const args = { filter: 'test' };

	const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');

	await adapter.saveQueryResult(queryRef, item, { parentRef, args });
	const result = await adapter.getQueryResult(queryRef, { parentRef, args });

	t.deepEqual(result?.query, item);
});

test('StoreAdapter.deleteQueries', async (t) => {
	const adapter = createTestAdapter();
	const item: TestItem = { id: '1', value: 'test1' };

	const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');

	await adapter.saveQueryResult(queryRef, item);
	await adapter.deleteQueries(queryRef);
	const result = await adapter.getQueryResult(queryRef);

	t.is(result, null);
});

test('StoreAdapter handles null values in lists', async (t) => {
	const adapter = createTestAdapter();
	const items: Array<TestItem | null> = [
		{ id: '1', value: 'test1' },
		null,
		{ id: '2', value: 'test2' },
	];

	const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');

	await adapter.saveQueryResult(queryRef, items);
	const result = await adapter.getQueryResult(queryRef);

	t.deepEqual(result?.query, items);
});

test('StoreAdapter handles empty query results', async (t) => {
	const adapter = createTestAdapter();
	const queryRef = new CacheRef('TestQuery', 'test', 'test-hash');
	await adapter.saveQueryResult(queryRef, []);
	const result = await adapter.getQueryResult(queryRef);
	t.deepEqual(result?.query, []);
});

test('StoreAdapter respects revision option', async (t) => {
	const adapter = new MockStoreAdapter<TestItem>(
		createSerializer(),
		{ getRef: (item) => item.id, revision: 2 },
		'test',
		'test-hash',
	);
	const key = adapter.exposeCreateKey('1');
	t.is(key, 'test:items:r2_test-hash:1');
});

test('Protected methods - key generation', async (t) => {
	const adapter = createTestAdapter();
	const item: TestItem = { id: '1', value: 'test' };

	const key = adapter.exposeCreateKey('1');
	t.is(key, 'test:items:r0_test-hash:1');

	const itemKey = adapter.exposeCreateKeyByItem(item);
	t.is(itemKey, 'test:items:r0_test-hash:1');
});

test('Protected methods - query key generation', async (t) => {
	const adapter = createTestAdapter();
	const parentRef = 'parent1';
	const args = { filter: 'test' };
	const queryKey = adapter.exposeCreateKeyByQuery('TestQuery', parentRef, args);
	t.is(queryKey, 'test:TestQuery:r0_test-hash:parent#_parent1#args#_filter#_test');
});

test('Protected methods - ref handling', async (t) => {
	const adapter = createTestAdapter();
	const item: TestItem = { id: '1', value: 'test' };

	const ref = adapter.exposeGetRef(item);
	t.is(ref, '1');

	const encodedRef = adapter.exposeEncodeQueryItemRef(item);
	t.is(encodedRef, 'ref_1');

	const decodedRef = adapter.exposeDecodeQueryItemRef(encodedRef);
	t.is(decodedRef, '1');

	t.throws(() => adapter.exposeGetRef({ ref: '1' } as unknown as TestItem));

	const adapter2 = createTestAdapter<{ key: string }>({
		getRef: (item) => item.key,
	});

	const ref2 = adapter2.exposeGetRef({ key: '1' });
	t.is(ref2, '1');
});

test('Protected methods - null ref handling', async (t) => {
	const adapter = createTestAdapter();

	const encodedRef = adapter.exposeEncodeQueryItemRef(null);
	t.is(encodedRef, 'null');

	const decodedRef = adapter.exposeDecodeQueryItemRef('null');
	t.is(decodedRef, null);
});

test('Protected methods - query key RegExp matcher', async (t) => {
	const adapter = createTestAdapter();
	const parentRef = 'parent1';
	//@ts-expect-error URL is a node global
	const urlArg = new URL('https://example.com/test?arg1=test1&arg2=test2');
	//@ts-expect-error Buffer is a node global
	const bufferArg = Buffer.from('test buffer data');
	const args = { arg1: 'test1', arg2: 'test2', arg3: urlArg, arg4: bufferArg };

	const queryKey = adapter.exposeCreateKeyByQuery('TestQuery', parentRef, args);

	const partialMatcher = adapter.exposeCreateQueryKeyRegExpMatcher('TestQuery', parentRef, {});
	t.true(partialMatcher.test(queryKey));

	const partialMatcher2 = adapter.exposeCreateQueryKeyRegExpMatcher('TestQuery', parentRef, {
		arg1: 'test1',
	});
	t.true(partialMatcher2.test(queryKey));

	const exactMatcher = adapter.exposeCreateQueryKeyRegExpMatcher('TestQuery', parentRef, args);
	t.true(exactMatcher.test(queryKey));

	const differentMatcher = adapter.exposeCreateQueryKeyRegExpMatcher('TestQuery', parentRef, {
		arg1: 'other',
	});
	t.false(differentMatcher.test(queryKey));

	const differentMatcher2 = adapter.exposeCreateQueryKeyRegExpMatcher('TestQuery', parentRef, {
		arg1: 'test1',
		arg2: 'other',
	});
	t.false(differentMatcher2.test(queryKey));

	const urlMatcher = adapter.exposeCreateQueryKeyRegExpMatcher('TestQuery', parentRef, {
		arg3: urlArg,
	});
	t.true(urlMatcher.test(queryKey));

	const bufferMatcher = adapter.exposeCreateQueryKeyRegExpMatcher('TestQuery', parentRef, {
		arg4: bufferArg,
	});
	t.true(bufferMatcher.test(queryKey));

	const starMatcher = adapter.exposeCreateQueryKeyRegExpMatcher('TestQuery', parentRef, {
		arg1: '*',
	});
	t.true(starMatcher.test(queryKey));

	const starMatcher2 = adapter.exposeCreateQueryKeyRegExpMatcher('TestQuery', parentRef, {
		arg1: '*',
		arg2: '*',
	});
	t.true(starMatcher2.test(queryKey));

	const partialStarMatcher = adapter.exposeCreateQueryKeyRegExpMatcher('TestQuery', parentRef, {
		arg1: 'other',
		arg2: '*',
	});
	t.false(partialStarMatcher.test(queryKey));
});

test('Protected methods - query key Glob matcher', async (t) => {
	const adapter = createTestAdapter();
	const parentRef = 'parent1';
	//@ts-expect-error URL is a node global
	const urlArg = new URL('https://example.com/test?query=value');
	//@ts-expect-error Buffer is a node global
	const bufferArg = Buffer.from('test buffer');
	const args = { arg1: 'test1', arg2: 'test2', arg3: urlArg, arg4: bufferArg };

	const queryKey = adapter.exposeCreateKeyByQuery('TestQuery', parentRef, args);

	const partialMatcher = adapter.exposeCreateQueryKeyGlobMatcher('TestQuery', parentRef, {});
	t.true(minimatch(queryKey, partialMatcher));

	const partialMatcher2 = adapter.exposeCreateQueryKeyGlobMatcher('TestQuery', parentRef, {
		arg1: 'test1',
	});
	t.true(minimatch(queryKey, partialMatcher2));

	const exactMatcher = adapter.exposeCreateQueryKeyGlobMatcher('TestQuery', parentRef, args);
	t.true(minimatch(queryKey, exactMatcher));

	const differentMatcher = adapter.exposeCreateQueryKeyGlobMatcher('TestQuery', parentRef, {
		arg1: 'other',
	});
	t.false(minimatch(queryKey, differentMatcher));

	const differentMatcher2 = adapter.exposeCreateQueryKeyGlobMatcher('TestQuery', parentRef, {
		arg1: 'test1',
		arg2: 'other',
	});
	t.false(minimatch(queryKey, differentMatcher2));

	const urlMatcher = adapter.exposeCreateQueryKeyGlobMatcher('TestQuery', parentRef, {
		arg3: urlArg,
	});
	t.true(minimatch(queryKey, urlMatcher));

	const bufferMatcher = adapter.exposeCreateQueryKeyGlobMatcher('TestQuery', parentRef, {
		arg4: bufferArg,
	});
	t.true(minimatch(queryKey, bufferMatcher));

	const starMatcher = adapter.exposeCreateQueryKeyGlobMatcher('TestQuery', parentRef, {
		arg1: '*',
	});
	t.true(minimatch(queryKey, starMatcher));

	const starMatcher2 = adapter.exposeCreateQueryKeyGlobMatcher('TestQuery', parentRef, {
		arg1: '*',
		arg2: '*',
	});
	t.true(minimatch(queryKey, starMatcher2));

	const partialStarMatcher = adapter.exposeCreateQueryKeyGlobMatcher('TestQuery', parentRef, {
		arg1: 'other',
		arg2: '*',
	});
	t.false(minimatch(queryKey, partialStarMatcher));
});

interface TestItem {
	id: string;
	value: string;
}

class MockStoreAdapter<T> extends StoreAdapter<T> {
	private store = new Map<string, T>();
	private queryStore = new Map<string, string[]>();

	getPartialMany = async (refs: ItemRef[]): Promise<Array<T | null> | null> => {
		return refs.map((ref) => this.store.get(this.createKey(ref)) || null);
	};

	saveMany = async (items: T[]): Promise<void> => {
		for (const item of items) {
			this.store.set(this.createKeyByItem(item), item);
		}
	};

	deleteMany = async (refs: ItemRef[], _evictQueries?: boolean): Promise<void> => {
		for (const ref of refs) {
			this.store.delete(this.createKey(ref));
		}
	};

	protected saveQueryMetadata = async (
		queryRef: string,
		meta: string[],
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	): Promise<void> => {
		const key = this.createKeyByQuery(queryRef, parentRef, args);
		this.queryStore.set(key, meta);
	};

	protected loadQueryMetadata = async (
		queryRef: string,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	): Promise<string[] | null> => {
		const key = this.createKeyByQuery(queryRef, parentRef, args);
		return this.queryStore.get(key) || null;
	};

	protected deleteQueriesByRef = async (): Promise<void> => {
		this.queryStore.clear();
	};

	// Expose protected methods for testing
	public exposeCreateKey(ref: ItemRef): string {
		return this.createKey(ref);
	}

	public exposeCreateKeyByItem(item: T): string {
		return this.createKeyByItem(item);
	}

	public exposeCreateKeyByQuery(
		queryRef: string,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	): string {
		return this.createKeyByQuery(queryRef, parentRef, args);
	}

	public exposeCreateQueryKeyNamespace(queryRef: string): string {
		return this.createQueryKeyNamespace(queryRef);
	}

	public exposeCreateQueryKeyHeader(parentRef: ParentRef, args?: Record<string, unknown>): string {
		return this.createQueryKeyHeader(parentRef, args);
	}

	public exposeCreateQueryKeyRegExpMatcher(
		queryRef: string,
		parentRef: NonNullable<ParentRef>,
		args: Record<string, unknown>,
	): RegExp {
		return this.createQueryKeyRegExpMatcher(queryRef, parentRef, args);
	}

	public exposeCreateQueryKeyGlobMatcher(
		queryRef: string,
		parentRef: NonNullable<ParentRef>,
		args: Record<string, unknown>,
	): string {
		return this.createQueryKeyGlobMatcher(queryRef, parentRef, args);
	}

	public exposeGetRef(item: T): ItemRef {
		return this.getRef(item);
	}

	public exposeEncodeQueryItemRef(item: T | null): string {
		return this.encodeQueryItemRef(item);
	}

	public exposeDecodeQueryItemRef(encodedRef: string): ItemRef | null {
		return this.decodeQueryItemRef(encodedRef);
	}
}

// Test setup helper
function createTestAdapter<T = TestItem>(options: StoreOptions<T> = {}) {
	const serializer = createSerializer();
	return new MockStoreAdapter<T>(serializer, options, 'test', 'test-hash');
}
