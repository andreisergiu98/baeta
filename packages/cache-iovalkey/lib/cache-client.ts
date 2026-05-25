import {
	CacheClient,
	type CacheClientSaveOptions,
	type ItemCacheKey,
	type QueryCacheIndexKey,
	type QueryCacheKey,
	type CacheClientArgs,
	type CacheClientOptions,
} from '@baeta/cache';
import {
	assertNoPipelineErrors,
	batchPipeline,
	createRedisScripts,
	type RedisScripts,
} from '@baeta/cache-redis-common';
import { doBatched } from '@baeta/cache/sdk';
import type Valkey from 'iovalkey';
import type { Cluster as ValkeyCluster } from 'iovalkey';

const INDEX_BUFFER_MS = 1_000;
const MAX_PIPELINE_SIZE_LIMIT = 50 * 1024 * 1024; // 50MB
const MAX_PIPELINE_COMMAND_LIMIT = 100_000;
const MAX_COMMAND_KEYS_LIMIT = 100_000;

export interface ValkeyCacheClientOptions extends CacheClientOptions {
	/**
	 * Maximum total size of commands in a single pipeline batch. If the batch exceeds this size, it will be executed immediately.
	 * @defaultValue 50 * 1024 * 1024 (50MB)
	 */
	maxPipelineSizeLimit?: number;
	/**
	 * Maximum number of commands in a single pipeline batch. If the batch exceeds this number, it will be executed immediately.
	 * @defaultValue 100_000
	 */
	maxPipelineCommandLimit?: number;
	/**
	 * Maximum number of keys in a single command. If the number of keys exceeds this limit, multiple commands will be executed.
	 * @defaultValue 100_000
	 */
	maxCommandKeysLimit?: number;
}

export class ValkeyCacheClient extends CacheClient {
	valkey: Valkey | ValkeyCluster;
	protected maxPipelineSizeLimit: number;
	protected maxPipelineCommandLimit: number;
	protected maxCommandKeysLimit: number;
	protected scripts: RedisScripts;

	constructor(valkey: Valkey | ValkeyCluster, options?: ValkeyCacheClientOptions) {
		super({
			namespace: options?.namespace,
			revision: options?.revision,
			ttlMs: options?.ttlMs,
		});
		this.valkey = valkey;
		this.maxPipelineSizeLimit = options?.maxPipelineSizeLimit ?? MAX_PIPELINE_SIZE_LIMIT;
		this.maxPipelineCommandLimit = options?.maxPipelineCommandLimit ?? MAX_PIPELINE_COMMAND_LIMIT;
		this.maxCommandKeysLimit = options?.maxCommandKeysLimit ?? MAX_COMMAND_KEYS_LIMIT;
		const loadScript = async (script: string) => {
			return await this.valkey.script('LOAD', script);
		};
		const evalSha = async (sha: string, keys: string[], args: string[]) => {
			return await this.valkey.evalsha(sha, keys.length, ...keys, ...args);
		};
		this.scripts = createRedisScripts(loadScript, evalSha);
	}

	async getPartialItems<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (keys.length === 0) {
			return [];
		}
		const values: Array<Item | null> = [];
		await doBatched(keys, this.maxCommandKeysLimit, async (batch) => {
			const batchValues = await this.valkey.mget(batch);
			for (const value of batchValues) {
				values.push(value == null ? null : options.parse(value));
			}
		});
		return values;
	}

	async saveItems<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
		saveOptions: CacheClientSaveOptions = {},
	): Promise<void> {
		if (items.length === 0) {
			return;
		}
		const expiresAt = Date.now() + options.ttlMs;
		const serialized = items.map(([key, value]) => ({
			key,
			value: options.serialize(value),
		}));
		await batchPipeline({
			makePipeline: () => this.valkey.pipeline(),
			addCommand: (pipeline, item) => {
				if (saveOptions.disableOverwrite !== true) {
					pipeline.set(item.key, item.value, 'PXAT', expiresAt);
				} else {
					pipeline.set(item.key, item.value, 'PXAT', expiresAt, 'NX');
				}
			},
			executePipeline: async (pipeline) => {
				const result = await pipeline.exec();
				if (result == null) {
					throw new Error('Unexpected null result from Valkey pipeline');
				}
				assertNoPipelineErrors(result, 'Valkey');
				return [];
			},
			estimateSize: (item) => {
				return item.key.length + item.value.length;
			},
			items: serialized,
			maxBatchBytes: this.maxPipelineSizeLimit,
			maxBatchCount: this.maxPipelineCommandLimit,
		});
	}

	async saveItemsWithDiff<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (items.length === 0) {
			return [];
		}
		const expiresAt = Date.now() + options.ttlMs;
		const tx = this.valkey.multi();
		for (const item of items) {
			tx.get(item[0]);
			tx.set(item[0], options.serialize(item[1]), 'PXAT', expiresAt);
		}
		const result = await tx.exec();
		assertNoPipelineErrors(result, 'Valkey');
		const results: Array<Item | null> = [];
		for (let i = 0; i < result.length; i += 2) {
			const value = result[i][1];
			results.push(value == null ? null : options.parse(value as string));
		}
		return results;
	}

	async deleteItems(keys: ItemCacheKey[]): Promise<void> {
		if (keys.length === 0) {
			return;
		}
		await doBatched(keys, this.maxCommandKeysLimit, async (batch) => {
			await this.valkey.unlink(batch);
		});
	}

	async deleteItemsWithDiff<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (keys.length === 0) {
			return [];
		}
		const tx = this.valkey.multi();
		for (const key of keys) {
			tx.get(key);
			tx.unlink(key);
		}
		const result = await tx.exec();
		assertNoPipelineErrors(result, 'Valkey');
		const results: Array<Item | null> = [];
		for (let i = 0; i < result.length; i += 2) {
			const value = result[i][1];
			results.push(value == null ? null : options.parse(value as string));
		}
		return results;
	}

	async getQuery<QueryMetadata>(
		key: QueryCacheKey,
		options: CacheClientArgs<QueryMetadata>,
	): Promise<QueryMetadata | null> {
		const meta = await this.valkey.get(key);
		return meta == null ? null : options.parse(meta);
	}

	async saveQuery<QueryMetadata>(
		key: QueryCacheKey,
		indexes: QueryCacheIndexKey[],
		metadata: QueryMetadata,
		options: CacheClientArgs<QueryMetadata>,
	): Promise<void> {
		const now = Date.now();
		const expiresAt = now + options.ttlMs;
		const tx = this.valkey.multi();
		tx.set(key, options.serialize(metadata), 'PXAT', expiresAt);
		for (const indexKey of indexes) {
			tx.zadd(indexKey, expiresAt, key);
			tx.zremrangebyscore(indexKey, '-inf', now - INDEX_BUFFER_MS);
			tx.pexpireat(indexKey, expiresAt + INDEX_BUFFER_MS);
		}
		const result = await tx.exec();
		assertNoPipelineErrors(result, 'Valkey');
	}

	async deleteQueries(indexes: QueryCacheIndexKey[]): Promise<void> {
		if (indexes.length === 0) {
			return;
		}
		const result = await this.scripts.deleteQueriesScript(indexes, []);
		if (typeof result !== 'number') {
			throw new Error(`Unexpected non-number result from Valkey script: ${typeof result}`);
		}
	}
}
