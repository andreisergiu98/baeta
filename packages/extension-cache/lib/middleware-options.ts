import type { ItemRef } from './ref.ts';

export interface CacheMiddlewareOptions<Root> {
	getRootRef?: (root: Root) => ItemRef;
}

export interface RequiredCacheMiddlewareOptions<Root> extends CacheMiddlewareOptions<Root> {
	getRootRef: (root: Root) => ItemRef;
}
