import type { ItemRef } from './ref.ts';

/**
 * Options for cache middleware
 */
export interface CacheMiddlewareOptions<Root> {
	/** Function to extract object reference id */
	getRootRef?: (root: Root) => ItemRef;
}

/** Required options for cache middleware */
export interface RequiredCacheMiddlewareOptions<Root> extends CacheMiddlewareOptions<Root> {
	/** Function to extract object reference id */
	getRootRef: (root: Root) => ItemRef;
}
