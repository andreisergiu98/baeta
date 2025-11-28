import {
	type CacheRef,
	type ItemRef,
	type ParentRef,
	StoreAdapter,
	type StoreAdapterOptions,
} from '@baeta/extension-cache';
import type Redis from 'ioredis';
import { collectPipelineErrors } from '../utils/pipeline.ts';

export class RedisStoreAdapter<Item> extends StoreAdapter<Item> {
	private readonly client: Redis;

	constructor(client: Redis, options: StoreAdapterOptions<Item>) {
		super(options);
		this.client = client;
	}

	getPartialMany = async (refs: ItemRef[]): Promise<Array<Item | null> | null> => {
		if (refs.length === 0) {
			return null;
		}
		const keys = refs.map((ref) => this.createItemKeyByRef(ref));
		const results = await this.client.mget(keys);
		return results.map((result) => (result == null ? null : this.parseItem(result)));
	};

	saveMany = async (items: Item[]) => {
		if (items.length === 0) {
			return;
		}

		const pipeline = this.client.pipeline();

		for (const item of items) {
			const key = this.createItemKey(item);
			pipeline.set(key, this.stringifyItem(item));
			if (this.options?.ttl) {
				pipeline.expire(key, this.options.ttl);
			}
		}

		const result = await pipeline.exec();
		const err = collectPipelineErrors(result ?? []);

		if (err) {
			throw err;
		}
	};

	deleteMany = async (refs: ItemRef[], evictQueries = true) => {
		if (refs.length === 0) {
			return;
		}

		const keys = refs.map((ref) => this.createItemKeyByRef(ref));
		await this.client.unlink(keys);

		if (evictQueries) {
			await this.deleteQueries();
		}
	};

	protected saveQueryMetadata = async (
		queryRef: CacheRef<unknown, unknown, unknown>,
		meta: string[],
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => {
		const key = this.createQueryKey(queryRef, parentRef, args);

		const pipeline = this.client.pipeline();
		pipeline.unlink(key);
		pipeline.rpush(key, ...meta);

		if (this.options?.ttl) {
			pipeline.expire(key, this.options.ttl);
		}

		const result = await pipeline.exec();
		const err = collectPipelineErrors(result ?? []);

		if (err) {
			throw err;
		}
	};

	protected loadQueryMetadata = async (
		queryRef: CacheRef<unknown, unknown, unknown>,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => {
		const key = this.createQueryKey(queryRef, parentRef, args);
		const meta = await this.client.lrange(key, 0, -1);
		if (meta.length === 0) {
			return null;
		}
		return meta;
	};

	protected deleteQueriesByRef = async (
		queryRef?: CacheRef<unknown, unknown, unknown>,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => {
		const keys = await this.searchQueries(queryRef, parentRef ?? undefined, args);
		if (keys.length > 0) {
			await this.client.unlink(keys);
		}
	};

	protected async searchQueries(
		queryRef?: CacheRef<unknown, unknown, unknown>,
		parentRef?: NonNullable<ParentRef>,
		args?: Record<string, unknown>,
	) {
		const matcher =
			queryRef == null
				? this.createQueryKeyGlobMatcher()
				: this.createQueryKeyGlobMatcher(queryRef, parentRef, args);

		return new Promise<string[]>((resolve, reject) => {
			const keys: string[] = [];

			const stream = this.client.scanStream({
				match: matcher,
			});

			stream.on('data', (result) => {
				keys.push(...result);
			});

			stream.on('error', (err) => {
				reject(err);
			});

			stream.on('end', () => {
				resolve(keys);
			});
		});
	}
}
