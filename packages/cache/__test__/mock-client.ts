import test from '@baeta/testing';
import type { CacheClientArgs, CacheClientSaveOptions } from '../lib/client.ts';
import { CacheClient } from '../lib/client.ts';
import type { ItemCacheKey, QueryCacheIndexKey, QueryCacheKey } from '../lib/key.ts';

test('mock cache client', async (t) => {
	t.pass();
});

export class MockCacheClient extends CacheClient {
	items = new Map<string, unknown>();
	queryMeta = new Map<string, unknown>();
	queryIndexes = new Map<string, Set<string>>();

	async getPartialItems<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		return keys.map((key) => {
			const value = this.items.get(key);
			if (value == null) return null;
			return options.parse(value as string);
		});
	}

	async saveItems<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
		saveOptions?: CacheClientSaveOptions,
	): Promise<void> {
		for (const [key, value] of items) {
			if (saveOptions?.disableOverwrite && this.items.has(key)) {
				continue;
			}
			this.items.set(key, options.serialize(value));
		}
	}

	async saveItemsWithDiff<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		const prev = await this.getPartialItems(
			items.map(([key]) => key),
			options,
		);
		await this.saveItems(items, options);
		return prev;
	}

	async deleteItems(keys: ItemCacheKey[]): Promise<void> {
		for (const key of keys) {
			this.items.delete(key);
		}
	}

	async deleteItemsWithDiff<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		const prev = await this.getPartialItems(keys, options);
		await this.deleteItems(keys);
		return prev;
	}

	async getQuery<QueryMetadata>(key: QueryCacheKey): Promise<QueryMetadata | null> {
		return (this.queryMeta.get(key) as QueryMetadata) ?? null;
	}

	async saveQuery<QueryMetadata>(
		key: QueryCacheKey,
		indexes: QueryCacheIndexKey[],
		metadata: QueryMetadata,
	): Promise<void> {
		this.queryMeta.set(key, metadata);
		for (const idx of indexes) {
			let set = this.queryIndexes.get(idx);
			if (set == null) {
				set = new Set();
				this.queryIndexes.set(idx, set);
			}
			set.add(key);
		}
	}

	async deleteQueries(indexes: QueryCacheIndexKey[]): Promise<void> {
		for (const idx of indexes) {
			const keys = this.queryIndexes.get(idx);
			if (keys) {
				for (const key of keys) {
					this.queryMeta.delete(key);
				}
				this.queryIndexes.delete(idx);
			}
		}
	}

	flushItems() {
		this.items.clear();
	}

	corruptItems() {
		for (const key of this.items.keys()) {
			this.items.set(key, 'corrupted');
		}
	}
}
