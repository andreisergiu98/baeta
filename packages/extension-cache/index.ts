import './lib/global-types.ts';

import { CacheExtension } from './lib/cache-extension.ts';
import type { Store } from './lib/store.ts';
import type { DefaultStoreOptions } from './lib/store-options.ts';

export type { CacheArgsMatcher } from './lib/cache-args.ts';
export type {
	CacheMiddlewareOptions,
	RequiredCacheMiddlewareOptions,
} from './lib/middleware-options.ts';
export { CacheRef, type ItemRef, type ParentRef, type RefCompatibleRoot } from './lib/ref.ts';
export { Store } from './lib/store.ts';
export {
	type CacheQueryMatcher,
	StoreAdapter,
	type StoreAdapterOptions,
} from './lib/store-adapter.ts';
export type {
	DefaultStoreOptions,
	StoreOptions,
} from './lib/store-options.ts';

/**
 * Creates a cache extension
 *
 * @param store - Storage adapter implementation
 * @param options - Default caching options
 * @param transformers - Serializer transformers for custom scalars that are not serializable by default
 * @returns Extension factory function
 *
 * @example
 * ```typescript
 * import { cacheExtension } from "@baeta/extension-cache";
 * import { RedisStore } from "@baeta/extension-cache-redis";
 * import Redis from "ioredis";
 *
 * const redis = new Redis("redis://localhost:6379");
 * const redisStore = new RedisStore(redis);
 *
 * export const cacheExt = cacheExtension(redisStore, {
 *   ttl: 3600, // TTL in seconds (defaults to 1 hour)
 * });
 * ```
 */
export function cacheExtension(store: Store, options?: DefaultStoreOptions) {
	return new CacheExtension(store, options);
}
