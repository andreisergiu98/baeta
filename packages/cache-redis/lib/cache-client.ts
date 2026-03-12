import type { ItemCacheKey, QueryCacheIndexKey, QueryCacheKey } from '@baeta/cache';
import { CacheClient, type CacheClientArgs, type CacheClientOptions } from '@baeta/cache';
import type Redis from 'ioredis';
import type { Cluster } from 'ioredis';
import { createRedisScript, type RedisScriptFunction } from './redis-script.ts';

const INDEX_BUFFER_MS = 1_000;

export class RedisCacheClient extends CacheClient {
	redis: Redis | Cluster;
	protected saveWithDiffScript: RedisScriptFunction;
	protected deleteWithDiffScript: RedisScriptFunction;
	protected deleteQueriesScript: RedisScriptFunction;

	constructor(redis: Redis | Cluster, options?: CacheClientOptions) {
		super(options);
		this.redis = redis;
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
		const values = await this.redis.mget(keys);
		return values.map((value) => (value === null ? null : options.parse(value)));
	}

	async saveItems<Item>(
		items: Array<[ItemCacheKey, Item]>,
		options: CacheClientArgs<Item>,
	): Promise<void> {
		if (items.length === 0) {
			return;
		}
		const pipeline = this.redis.pipeline();
		for (const [key, value] of items) {
			pipeline.set(key, options.serialize(value), 'PX', options.ttlMs);
		}
		const result = await pipeline.exec();
		assertNoPipelineErrors(result);
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
		await this.redis.unlink(keys);
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
		const meta = await this.redis.get(key);
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
		pipeline.set(key, options.serialize(metadata), 'PXAT', expiresAt);
		for (const indexKey of indexes) {
			pipeline.zadd(indexKey, expiresAt, key);
			pipeline.zremrangebyscore(indexKey, '-inf', now - INDEX_BUFFER_MS);
			pipeline.pexpireat(indexKey, expiresAt + INDEX_BUFFER_MS);
		}
		const result = await pipeline.exec();
		assertNoPipelineErrors(result);
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

function assertNoPipelineErrors(
	result: [error: Error | null, result: unknown][] | null,
): asserts result is [error: null, result: unknown][] {
	if (result == null) {
		throw new Error('Unexpected null result from Redis pipeline');
	}
	const errors: Error[] = [];
	for (const [error] of result) {
		if (error) {
			errors.push(error);
		}
	}
	if (errors.length > 0) {
		throw new AggregateError(errors, 'One or more Redis operations failed');
	}
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
