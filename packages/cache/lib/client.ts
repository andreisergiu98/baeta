import type { ItemCacheKey, QueryCacheIndexKey, QueryCacheKey } from './key.ts';

export interface CacheClientArgs<Item> {
	ttlMs: number;
	parse: (value: string) => Item | null;
	serialize: (item: Item) => string;
}

export interface CacheClientOptions {
	/**
	 * Revision number for cache invalidation.
	 * Incrementing this number will invalidate all existing cache entries for this store.
	 * @defaultValue "default"
	 */
	revision?: number;
	/**
	 * Time-to-live in milliseconds
	 * @defaultValue 3_600_000 (1 hour)
	 */
	ttlMs?: number;
	/**
	 *  Optional namespace to prefix all cache keys
	 *  @defaultValue "baeta"
	 */
	namespace?: string;
}

export abstract class CacheClient {
	options?: CacheClientOptions;

	constructor(options?: CacheClientOptions) {
		this.options = options;
	}

	abstract getPartialItems<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>>;

	abstract saveItems<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<void>;

	abstract saveItemsWithDiff<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>>;

	abstract deleteItems<Item>(keys: ItemCacheKey[], options: CacheClientArgs<Item>): Promise<void>;

	abstract deleteItemsWithDiff<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>>;

	abstract getQuery<QueryMetadata>(
		key: QueryCacheKey,
		options: CacheClientArgs<QueryMetadata>,
	): Promise<QueryMetadata | null>;

	abstract saveQuery<QueryMetadata>(
		key: QueryCacheKey,
		indexes: QueryCacheIndexKey[],
		metadata: QueryMetadata,
		options: CacheClientArgs<QueryMetadata>,
	): Promise<void>;

	abstract deleteQueries<QueryMetadata>(
		indexes: QueryCacheIndexKey[],
		options: CacheClientArgs<QueryMetadata>,
	): Promise<void>;
}
