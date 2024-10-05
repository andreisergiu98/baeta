import { type ParentRef, type Ref, StoreAdapter, type StoreOptions } from '@baeta/extension-cache';
import type Redis from 'ioredis';
import { collectPipelineErrors } from '../utils/pipeline.ts';

export class RedisStoreAdapter<Item> extends StoreAdapter<Item> {
	constructor(
		private client: Redis,
		options: StoreOptions<Item> | undefined,
		type: string,
		hash: string,
	) {
		super(options, type, hash);
	}

	saveMany = async (items: Item[]) => {
		if (items.length === 0) {
			return;
		}

		if (items.length === 1) {
			const item = items[0];
			const key = this.createKeyByItem(item);
			const ttl = this.options?.ttl ?? -1;
			return this.client.set(key, JSON.stringify(item), 'EX', ttl).then(() => {});
		}

		const pipeline = this.client.pipeline();

		for (const item of items) {
			const key = this.createKeyByItem(item);
			const ttl = this.options?.ttl ?? -1;
			pipeline.set(key, JSON.stringify(item), 'EX', ttl);
		}

		const result = await pipeline.exec();
		const err = collectPipelineErrors(result ?? []);

		if (err) {
			throw err;
		}
	};

	deleteMany = async (refs: Ref[], evictQueries = true) => {
		if (refs.length === 0) {
			return;
		}

		const keys = refs.map((ref) => this.createKey(ref));
		await this.client.unlink(keys);

		if (evictQueries) {
			await this.deleteQueries();
		}
	};

	protected saveQueryMetadata = async (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
		meta: string[],
	) => {
		const key = this.createKeyByQuery(queryRef, parentRef, args);

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
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
	) => {
		const key = this.createKeyByQuery(queryRef, parentRef, args);
		const meta = await this.client.lrange(key, 0, -1);
		if (meta.length === 0) {
			return null;
		}
		return meta;
	};

	deleteQueries = async (
		queryRef?: string,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => {
		const keys = await this.searchQueries(queryRef, parentRef ?? undefined, args);
		if (keys.length > 0) {
			await this.client.unlink(keys);
		}
	};

	protected loadMany = async (refs: Ref[]): Promise<Array<Item | null> | null> => {
		if (refs.length === 0) {
			return null;
		}
		const keys = refs.map((ref) => this.createKey(ref));
		const results = await this.client.mget(keys);
		return results.map((result) => (result == null ? null : (JSON.parse(result) as Item)));
	};

	protected async searchQueries(
		queryRef = '*',
		parentRef: NonNullable<ParentRef> = '*',
		args: Record<string, unknown> = {},
	) {
		const matcher = this.createQueryKeyGlobMatcher(queryRef, parentRef, args);

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