import type {
	CacheClientArgs,
	ItemCacheKey,
	QueryCacheIndexKey,
	QueryCacheKey,
} from '@baeta/cache';
import { CacheClient, type CacheClientOptions } from '@baeta/cache';
import { actions } from './actions.ts';
import { type ActionClientMap, buildClient } from './actions-client.ts';

export class CloudflareCacheClient extends CacheClient {
	client: ActionClientMap<typeof actions>;

	constructor(durableObject: DurableObjectNamespace, options?: CacheClientOptions) {
		super(options);
		this.client = buildClient(durableObject, actions);
	}

	async getPartialItems<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (keys.length === 0) {
			return [];
		}
		const values = await this.client.getPartialItems({ keys });
		return values.map((value) => (value === null ? null : options.parse(value)));
	}

	async saveItems<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<void> {
		if (items.length === 0) {
			return;
		}
		const serialized: Array<[ItemCacheKey, string]> = items.map(([key, value]) => [
			key,
			options.serialize(value),
		]);
		await this.client.saveItems({ items: serialized, ttlMs: options.ttlMs });
	}

	async saveItemsWithDiff<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (items.length === 0) {
			return [];
		}
		const serialized: Array<[ItemCacheKey, string]> = items.map(([key, value]) => [
			key,
			options.serialize(value),
		]);
		const result = await this.client.saveItemsWithDiff({
			items: serialized,
			ttlMs: options.ttlMs,
		});
		return result.map((value) => (value === null ? null : options.parse(value)));
	}

	async deleteItems(keys: ItemCacheKey[]): Promise<void> {
		if (keys.length === 0) {
			return;
		}
		await this.client.deleteItems({ keys });
	}

	async deleteItemsWithDiff<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (keys.length === 0) {
			return [];
		}
		const result = await this.client.deleteItemsWithDiff({ keys });
		return result.map((value) => (value === null ? null : options.parse(value)));
	}

	async getQuery<QueryMetadata>(
		key: QueryCacheKey,
		options: CacheClientArgs<QueryMetadata>,
	): Promise<QueryMetadata | null> {
		const value = await this.client.getQuery({ key });
		return value === null ? null : options.parse(value);
	}

	async saveQuery<QueryMetadata>(
		key: QueryCacheKey,
		indexes: QueryCacheIndexKey[],
		metadata: QueryMetadata,
		options: CacheClientArgs<QueryMetadata>,
	): Promise<void> {
		await this.client.saveQuery({
			key,
			indexes,
			metadata: options.serialize(metadata),
			ttlMs: options.ttlMs,
		});
	}

	async deleteQueries(indexes: QueryCacheIndexKey[]): Promise<void> {
		if (indexes.length === 0) {
			return;
		}
		await this.client.deleteQueries({ indexes });
	}
}
