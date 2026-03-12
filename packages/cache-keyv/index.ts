import type {
	CacheClientArgs,
	ItemCacheKey,
	QueryCacheIndexKey,
	QueryCacheKey,
} from '@baeta/cache';
import { CacheClient, type CacheClientOptions } from '@baeta/cache';
import type Keyv from 'keyv';

const INDEX_BUFFER_MS = 1_000;

export class KeyvCacheClient extends CacheClient {
	keyv: Keyv<string>;

	constructor(keyv: Keyv, options?: CacheClientOptions) {
		super(options);
		this.keyv = keyv;
		// if (this.keyv.iterator == null) {
		// 	throw new Error('Keyv client does not support iterator.');
		// }
	}

	async getPartialItems<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (keys.length === 0) {
			return [];
		}
		const results = await this.keyv.getMany(keys);
		return results.map((res) => (res == null ? null : options.parse(res)));
	}

	async saveItems<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<void> {
		if (items.length === 0) {
			return;
		}
		await this.keyv.setMany(
			items.map(([key, value]) => ({ key, value: options.serialize(value), ttl: options.ttlMs })),
		);
	}

	async saveItemsWithDiff<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (items.length === 0) {
			return [];
		}
		const keys = items.map(([k]) => k);
		const currentValues = await this.getPartialItems(keys, options);
		await this.saveItems(items, options);
		return currentValues;
	}

	async deleteItems(keys: ItemCacheKey[]): Promise<void> {
		if (keys.length === 0) {
			return;
		}
		await this.keyv.deleteMany(keys);
	}

	async deleteItemsWithDiff<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (keys.length === 0) {
			return [];
		}
		const currentValues = await this.getPartialItems(keys, options);
		await this.deleteItems(keys);
		return currentValues;
	}

	async getQuery<QueryMetadata>(
		key: QueryCacheKey,
		options: CacheClientArgs<QueryMetadata>,
	): Promise<QueryMetadata | null> {
		const result = await this.keyv.get(key);
		return result == null ? null : options.parse(result);
	}

	async saveQuery<QueryMetadata>(
		key: QueryCacheKey,
		indexKeys: QueryCacheIndexKey[],
		metadata: QueryMetadata,
		options: CacheClientArgs<QueryMetadata>,
	): Promise<void> {
		await Promise.all(
			indexKeys.map((indexKey) =>
				this.appendToIndex(indexKey, key, options.ttlMs + INDEX_BUFFER_MS),
			),
		);
		await this.keyv.set(key, options.serialize(metadata), options.ttlMs);
	}

	async deleteQueries(indexes: QueryCacheIndexKey[]): Promise<void> {
		if (indexes.length === 0) {
			return;
		}
		const keysList = await Promise.all(indexes.map((indexKey) => this.getIndex(indexKey)));
		const keysToDelete = new Set<string>(keysList.flat());
		if (keysToDelete.size === 0) {
			return;
		}
		await this.keyv.deleteMany([...keysToDelete]);
	}

	async appendToIndex(
		indexKey: QueryCacheIndexKey,
		key: QueryCacheKey,
		ttlMs: number,
	): Promise<void> {
		const result = await this.getIndex(indexKey);
		if (!result.includes(key)) {
			result.push(key);
			await this.keyv.set(indexKey, JSON.stringify(result), ttlMs + INDEX_BUFFER_MS);
		}
	}

	async getIndex(indexKey: QueryCacheIndexKey): Promise<string[]> {
		const result = await this.keyv.get(indexKey);
		return result ? JSON.parse(result) : [];
	}
}
