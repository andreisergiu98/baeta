import { log } from '@baeta/util-log';
import DataLoader from 'dataloader';
import type { CacheClient, CacheClientArgs } from './client.ts';
import { assertValidRefType, type ItemRef } from './item.ts';
import {
	buildCacheRevisionId,
	buildItemCacheKeyId,
	buildQueryCacheIndexKeyId,
	buildQueryCacheIndexKeysIds,
	buildQueryCacheKeyId,
	type CacheRevisionId,
	type ItemCacheKey,
	type ItemCacheKeyPrefix,
	type QueryCacheIndexKey,
	type QueryCacheKey,
	type QueryCacheKeyPrefix,
} from './key.ts';
import { DEFAULT_NAMESPACE, DEFAULT_REVISION, DEFAULT_TTL_MS } from './options.ts';
import type { QueryTag, QueryTagWithArgs, QueryTagWithData, QueryTagWithIndexes } from './query.ts';
import { alignItemsWithRefs, arrayIsComplete, toArray } from './utils.ts';

export interface CacheStoreOptions<Item> {
	name: string;
	client: CacheClient;
	namespace?: string;
	revision?: string | number;
	ttlMs?: number;
	parse: (value: string) => Item;
	serialize: (item: Item) => string;
	getRef?: (source: Item) => ItemRef;
}

type QueryMetadata = { refs: Array<null | string>; isList: boolean };

export class CacheStore<Item> {
	protected readonly name: string;
	protected readonly namespace: string;
	protected readonly revision: string;

	protected readonly client: CacheClient;
	protected readonly itemCacheArgs: CacheClientArgs<Item>;
	protected readonly queryCacheArgs: CacheClientArgs<QueryMetadata>;

	protected readonly getRef?: (source: Item) => ItemRef;

	constructor({
		name,
		client,
		namespace,
		revision,
		ttlMs,
		parse,
		serialize,
		getRef,
	}: CacheStoreOptions<Item>) {
		this.name = name;
		this.namespace = namespace ?? DEFAULT_NAMESPACE;
		this.revision = revision?.toString() ?? DEFAULT_REVISION;
		this.client = client;
		this.getRef = getRef;
		this.itemCacheArgs = {
			ttlMs: ttlMs ?? DEFAULT_TTL_MS,
			parse: (value: string) => parseItemSafely(value, parse),
			serialize: (item: Item) => serialize(item),
		};
		this.queryCacheArgs = {
			ttlMs: ttlMs ?? DEFAULT_TTL_MS,
			parse: (value: string) => JSON.parse(value) as QueryMetadata,
			serialize: (meta: QueryMetadata) => JSON.stringify(meta),
		};
	}

	protected loadAndParse = async (refs: ReadonlyArray<ItemRef>): Promise<Array<Item | null>> => {
		const keys = refs.map((ref) => this.getItemKeyByRef(ref));
		return await this.client.getPartialItems(keys, this.itemCacheArgs);
	};

	protected loader = new DataLoader<ItemRef, Item | null>(this.loadAndParse, {
		cache: false,
	});

	async get(ref: ItemRef): Promise<Item | null> {
		return await this.loader.load(ref);
	}

	async getMany(refs: ItemRef[]): Promise<Item[] | null> {
		const results = await Promise.all(refs.map((r) => this.get(r)));
		if (!arrayIsComplete(results)) {
			return null;
		}
		return results;
	}

	async getPartial(refs: ItemRef[]): Promise<Array<Item | null>> {
		return await Promise.all(refs.map((ref) => this.get(ref)));
	}

	async save(item: Item | Item[]) {
		const values = toArray(item);
		const entries: Array<[ItemCacheKey, Item]> = values.map((item) => [
			this.getItemKey(item),
			item,
		]);
		return this.client.saveItems(entries, this.itemCacheArgs);
	}

	async saveIfNotExists(item: Item | Item[]) {
		const values = toArray(item);
		const entries: Array<[ItemCacheKey, Item]> = values.map((item) => [
			this.getItemKey(item),
			item,
		]);
		return this.client.saveItems(entries, this.itemCacheArgs, {
			disableOverwrite: true,
		});
	}

	async saveWithDiff(item: Item | Item[]): Promise<Array<Item | null>> {
		const values = toArray(item);
		const entries: Array<[ItemCacheKey, Item]> = values.map((item) => [
			this.getItemKey(item),
			item,
		]);
		return await this.client.saveItemsWithDiff(entries, this.itemCacheArgs);
	}

	async delete(ref: ItemRef | ItemRef[]) {
		const refs = toArray(ref);
		const keys = refs.map((r) => this.getItemKeyByRef(r));
		await this.client.deleteItems(keys, this.itemCacheArgs);
	}

	async deleteWithDiff(ref: ItemRef | ItemRef[]): Promise<Array<Item | null>> {
		const refs = toArray(ref);
		const keys = refs.map((r) => this.getItemKeyByRef(r));
		return await this.client.deleteItemsWithDiff(keys, this.itemCacheArgs);
	}

	async getQuery(query: QueryTagWithArgs): Promise<{ query: unknown } | null> {
		const queryKey = this.getQueryKey(query);
		const meta = await this.client.getQuery(queryKey, this.queryCacheArgs);

		if (meta == null) {
			return null;
		}

		const isList = meta.isList;
		const nullableRefs = meta.refs;
		const refs = nullableRefs.filter((ref) => ref != null);
		const items = await this.getMany(refs);

		if (items == null) {
			return null;
		}

		const aligned = alignItemsWithRefs(nullableRefs, items);
		const result = isList ? aligned : (aligned.at(0) ?? null);

		return { query: result };
	}

	async saveQuery(query: QueryTagWithData<Item>, replaceExistingItems = false): Promise<void> {
		const data = query.data;
		const queryKey = this.getQueryKey(query);
		const queryIndexes = this.getQueryIndexes(query, true);

		const isList = Array.isArray(data);
		const nullableItems = isList ? data : [data];
		const items = nullableItems.filter((item) => item != null);

		if (items.length > 0) {
			if (replaceExistingItems) {
				await this.save(items);
			} else {
				await this.saveIfNotExists(items);
			}
		}

		const encodedRefs = nullableItems.map((item) => {
			if (item == null) {
				return null;
			}
			return this.getRefWithFallback(item).toString();
		});

		const metadata = {
			refs: encodedRefs,
			isList,
		};

		return this.client.saveQuery(queryKey, queryIndexes, metadata, this.queryCacheArgs);
	}

	deleteQueries(query: QueryTagWithIndexes): Promise<void> {
		const queryIndexes = this.getQueryIndexes(query);
		return this.client.deleteQueries(queryIndexes, this.queryCacheArgs);
	}

	getRefWithFallback(root: Item): ItemRef {
		if (this.getRef) {
			return this.getRef(root);
		}
		if (root == null) {
			throw new Error('Object is null or undefined, cannot get ref');
		}
		if (typeof root === 'object' && 'id' in root) {
			assertValidRefType(root.id);
			return root.id.toString();
		}
		throw new Error('Object does not have id. Define "getRef" function in cache options');
	}

	getItemKey(item: Item): ItemCacheKey {
		const ref = this.getRefWithFallback(item);
		return this.getItemKeyByRef(ref);
	}

	getItemKeyByRef(ref: ItemRef): ItemCacheKey {
		const prefix: ItemCacheKeyPrefix = `${this.namespace}:{${this.name}:item:${buildCacheRevisionId(this.revision)}}`;
		const keyId = buildItemCacheKeyId(ref.toString());
		return `${prefix}:${keyId}`;
	}

	getQueryKey(query: QueryTagWithArgs): QueryCacheKey {
		const prefix = this.getQueryKeyPrefix(query);
		return `${prefix}:${buildQueryCacheKeyId(query.args)}`;
	}

	getQueryIndexes(query: QueryTagWithIndexes, ensureCatchAll = false): QueryCacheIndexKey[] {
		const prefix = this.getQueryKeyPrefix(query);
		const keyIndexes = buildQueryCacheIndexKeysIds(query.indexes);
		if (ensureCatchAll && query.indexes.length > 0) {
			keyIndexes.push(buildQueryCacheIndexKeyId());
		}
		return keyIndexes.map((keyIndex) => `${prefix}:${keyIndex}` as const);
	}

	getQueryKeyPrefix(query: QueryTag): QueryCacheKeyPrefix {
		return `${this.namespace}:{${this.name}:query:${query.name}:${this.getQueryKeyRevision(query)}}`;
	}

	getQueryKeyRevision(query: QueryTag): CacheRevisionId {
		const combinedRevision = `${this.revision}_${query.revision?.toString() ?? DEFAULT_REVISION}`;
		return buildCacheRevisionId(combinedRevision);
	}
}

function parseItemSafely<T>(value: string, parseItem: (value: string) => T): T | null {
	try {
		return parseItem(value);
	} catch (err) {
		log.warn(err, 'Failed to parse item, returning null', {
			value,
		});
		return null;
	}
}
