import {
	type Serializer,
	Store,
	type StoreAdapter,
	type StoreOptions,
} from '@baeta/extension-cache';
import type { UpstashClient } from './upstash-client.ts';
import { UpstashStoreAdapter } from './upstash-store-adapter.ts';

/**
 * Upstash Redis-based cache store implementation.
 * Provides a serverless-optimized caching solution ideal for edge and serverless environments.
 *
 * @remarks
 * This implementation uses Upstash Redis and is designed for serverless architectures.
 *
 * @example
 * ```typescript
 * import { UpstashClient, UpstashStore } from '@baeta/extension-cache-upstash';
 *
 * const redis = new UpstashClient({
 *   url: "UPSTASH_REDIS_URL",
 *   token: "UPSTASH_REDIS_TOKEN",
 * });
 * const store = new UpstashStore(redis);
 *
 * // Use with cache extension
 * const cacheExt = cacheExtension(store, {
 *   ttl: 3600
 * });
 * ```
 */
export class UpstashStore extends Store {
	protected client: UpstashClient;
	constructor(client: UpstashClient) {
		super();
		this.client = client;
	}

	createStoreAdapter<T>(
		serializer: Serializer,
		options: StoreOptions<T>,
		type: string,
	): StoreAdapter<T> {
		return new UpstashStoreAdapter<T>(this.client, serializer, options, type);
	}
}
