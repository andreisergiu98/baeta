import type { ItemCacheKey, QueryCacheIndexKey, QueryCacheKey } from '@baeta/cache';
import { CacheClient, type CacheClientArgs, type CacheClientOptions } from '@baeta/cache';
import { type Pipeline, Redis, type RedisConfigNodejs } from '@upstash/redis';
import { createRedisScript, type RedisScriptFunction } from './redis-script.ts';

const INDEX_BUFFER_MS = 1_000;
const MAX_PIPELINE_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB
const MAX_PIPELINE_COMMAND_LIMIT = 50_000;
const MAX_COMMAND_KEYS_LIMIT = 50_000;

interface UpstashCacheClientOptions extends CacheClientOptions {
	/**
	 * Maximum total size of commands in a single pipeline batch. If the batch exceeds this size, it will be executed immediately.
	 * @defaultValue 10 * 1024 * 1024 (10MB)
	 */
	maxPipelineSizeLimit?: number;
	/**
	 * Maximum number of commands in a single pipeline batch. If the batch exceeds this number, it will be executed immediately.
	 * @defaultValue 50_000
	 */
	maxPipelineCommandLimit?: number;
	/**
	 * Maximum number of keys in a single command. If the number of keys exceeds this limit, multiple commands will be executed.
	 * @defaultValue 50_000
	 */
	maxCommandKeysLimit?: number;
}

export class UpstashCacheClient extends CacheClient {
	redis: Redis;
	protected maxPipelineSizeLimit: number;
	protected maxPipelineCommandLimit: number;
	protected maxCommandKeysLimit: number;
	protected saveWithDiffScript: RedisScriptFunction;
	protected deleteWithDiffScript: RedisScriptFunction;
	protected deleteQueriesScript: RedisScriptFunction;

	constructor(
		redisOptions: Omit<RedisConfigNodejs, 'automaticDeserialization'>,
		options?: UpstashCacheClientOptions,
	) {
		super({
			namespace: options?.namespace,
			revision: options?.revision,
			ttlMs: options?.ttlMs,
		});
		const redis = new Redis({
			...redisOptions,
			automaticDeserialization: false,
		});
		this.redis = redis;
		this.maxPipelineSizeLimit = options?.maxPipelineSizeLimit ?? MAX_PIPELINE_SIZE_LIMIT;
		this.maxPipelineCommandLimit = options?.maxPipelineCommandLimit ?? MAX_PIPELINE_COMMAND_LIMIT;
		this.maxCommandKeysLimit = options?.maxCommandKeysLimit ?? MAX_COMMAND_KEYS_LIMIT;
		this.saveWithDiffScript = createRedisScript(redis, SAVE_WITH_DIFF_SCRIPT);
		this.deleteWithDiffScript = createRedisScript(redis, DELETE_WITH_DIFF_SCRIPT);
		this.deleteQueriesScript = createRedisScript(redis, DELETE_QUERIES_SCRIPT);
	}

	async getPartialItems<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (keys.length === 0) {
			return [];
		}
		const values = await batchMget(this.redis, keys, this.maxCommandKeysLimit);
		return values.map((value) => (value === null ? null : options.parse(value)));
	}

	async saveItems<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<void> {
		if (items.length === 0) {
			return;
		}
		const expiresAt = Date.now() + options.ttlMs;
		const serialized = items.map(([key, value]) => ({
			key,
			value: options.serialize(value),
			ttl: options.ttlMs,
		}));
		await batchPipeline(
			this.redis,
			serialized,
			(pipeline, item) => pipeline.set(item.key, item.value, { pxat: expiresAt }),
			(item) => item.key.length + item.value.length + 100,
			this.maxPipelineSizeLimit,
			this.maxPipelineCommandLimit,
		);
	}

	async saveItemsWithDiff<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (items.length === 0) {
			return [];
		}
		const keys: ItemCacheKey[] = new Array(items.length);
		const values: string[] = new Array(items.length);
		for (let i = 0; i < items.length; i++) {
			keys[i] = items[i][0];
			values[i] = options.serialize(items[i][1]);
		}
		const result = await this.saveWithDiffScript(keys, [...values, options.ttlMs.toString()]);
		if (!Array.isArray(result)) {
			throw new Error(`Unexpected non-array result from Redis script: ${typeof result}`);
		}
		return result.map((value) => {
			if (typeof value === 'string') {
				return options.parse(value);
			}
			return null;
		});
	}

	async deleteItems(keys: ItemCacheKey[]): Promise<void> {
		if (keys.length === 0) {
			return;
		}
		await batchUnlink(this.redis, keys, this.maxCommandKeysLimit);
	}

	async deleteItemsWithDiff<Item>(
		keys: ItemCacheKey[],
		options: CacheClientArgs<Item>,
	): Promise<Array<Item | null>> {
		if (keys.length === 0) {
			return [];
		}
		const result = await this.deleteWithDiffScript(keys, []);
		if (!Array.isArray(result)) {
			throw new Error(`Unexpected non-array result from Redis script: ${typeof result}`);
		}
		return result.map((value) => {
			if (typeof value === 'string') {
				return options.parse(value);
			}
			return null;
		});
	}

	async getQuery<QueryMetadata>(
		key: QueryCacheKey,
		options: CacheClientArgs<QueryMetadata>,
	): Promise<QueryMetadata | null> {
		const meta = await this.redis.get<string>(key);
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
		const pipeline = this.redis.pipeline();
		pipeline.set(key, options.serialize(metadata), { pxat: expiresAt });
		for (const indexKey of indexes) {
			pipeline.zadd(indexKey, { score: expiresAt, member: key });
			pipeline.pexpireat(indexKey, expiresAt + INDEX_BUFFER_MS);
			pipeline.zremrangebyscore(indexKey, '-inf', now - INDEX_BUFFER_MS);
		}
		await pipeline.exec();
	}

	async deleteQueries(indexes: QueryCacheIndexKey[]): Promise<void> {
		if (indexes.length === 0) {
			return;
		}
		const result = await this.deleteQueriesScript(indexes, []);
		if (typeof result !== 'number') {
			throw new Error(`Unexpected non-number result from Redis script: ${typeof result}`);
		}
	}
}

async function batchMget(
	client: Redis,
	keys: ItemCacheKey[],
	batchSize: number,
): Promise<Array<string | null>> {
	const results: Array<string | null> = [];
	for (let i = 0; i < keys.length; i += batchSize) {
		const batchKeys = keys.slice(i, i + batchSize);
		const batchResults = await client.mget<Array<string | null>>(...batchKeys);
		results.push(...batchResults);
	}
	return results;
}

async function batchUnlink(client: Redis, keys: ItemCacheKey[], batchSize: number): Promise<void> {
	for (let i = 0; i < keys.length; i += batchSize) {
		const batchKeys = keys.slice(i, i + batchSize);
		await client.unlink(...batchKeys);
	}
}

async function batchPipeline<T>(
	client: Redis,
	items: T[],
	addCommand: (pipeline: Pipeline, item: T) => void,
	estimateSize: (item: T) => number,
	maxBatchBytes: number,
	maxBatchCount: number,
): Promise<unknown[]> {
	let pipeline = client.pipeline();
	let currentSize = 0;
	let currentCount = 0;
	const results: unknown[] = [];

	for (const item of items) {
		const size = estimateSize(item);
		if (currentCount > 0 && (currentSize + size > maxBatchBytes || currentCount >= maxBatchCount)) {
			const batchResults = await pipeline.exec();
			results.push(...batchResults);
			pipeline = client.pipeline();
			currentSize = 0;
			currentCount = 0;
		}
		addCommand(pipeline, item);
		currentSize += size;
		currentCount++;
	}

	if (currentCount > 0) {
		const batchResults = await pipeline.exec();
		results.push(...batchResults);
	}

	return results;
}

const SAVE_WITH_DIFF_SCRIPT = `
local results = {}
local numKeys = #KEYS
for i, key in ipairs(KEYS) do
  results[i] = redis.call('GET', key)
  redis.call('SET', key, ARGV[i])
  redis.call('PEXPIRE', key, tonumber(ARGV[numKeys + 1]))
end
return results
`;

const DELETE_WITH_DIFF_SCRIPT = `
local results = {}
for i, key in ipairs(KEYS) do
  results[i] = redis.call('GET', key)
  redis.call('UNLINK', key)
end
return results
`;

const DELETE_QUERIES_SCRIPT = `
local toDelete = {}
for _, indexKey in ipairs(KEYS) do
  local members = redis.call('ZRANGE', indexKey, 0, -1)
  for _, member in ipairs(members) do
    toDelete[#toDelete + 1] = member
  end
  toDelete[#toDelete + 1] = indexKey
end
for i = 1, #toDelete, 7000 do
  local j = math.min(i + 6999, #toDelete)
  redis.call('UNLINK', unpack(toDelete, i, j))
end
return #toDelete
`;
