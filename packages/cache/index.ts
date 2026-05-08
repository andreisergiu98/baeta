export {
	CacheClient,
	type CacheClientArgs,
	type CacheClientOptions,
	type CacheClientSaveOptions,
} from './lib/client.ts';
export {
	type Cache,
	type CacheHooksOptions,
	type CacheWithQueries,
	type CreateCacheFactory,
	createCache,
} from './lib/create-cache.ts';
export { defineQuery } from './lib/define-query.ts';
export type { ItemRef, RefCompatibleItem } from './lib/item.ts';
export type { ItemCacheKey, QueryCacheIndexKey, QueryCacheKey } from './lib/key.ts';
export type { CacheOptions, OptionalGetRef, RequiredGetRef } from './lib/options.ts';
export type { QueryArgs, QueryArgsIndexes, QueryIndexValue, QueryOptions } from './lib/query.ts';
