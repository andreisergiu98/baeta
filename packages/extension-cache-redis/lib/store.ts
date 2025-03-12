import {
	type Serializer,
	Store,
	type StoreAdapter,
	type StoreOptions,
} from '@baeta/extension-cache';
import type Redis from 'ioredis';
import { RedisStoreAdapter } from './redis-store-adapter.ts';

/**
 * Redis-based cache store implementation.
 * Provides a high-performance caching solution recommended for production environments.
 *
 * @example
 * ```typescript
 * import { RedisStore } from '@baeta/extension-cache-redis';
 * import Redis from 'ioredis';
 *
 * const redis = new Redis("redis://localhost:6379");
 * const store = new RedisStore(redis);
 *
 * // Use with cache extension
 * const cacheExt = cacheExtension(store, {
 *   ttl: 3600
 * });
 * ```
 */
export class RedisStore extends Store {
	constructor(protected client: Redis) {
		super();
	}

	createStoreAdapter<T>(
		serialzier: Serializer,
		options: StoreOptions<T>,
		type: string,
		hash: string,
	): StoreAdapter<T> {
		return new RedisStoreAdapter<T>(this.client, serialzier, options, type, hash);
	}
}
