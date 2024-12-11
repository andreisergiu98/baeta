import './lib/global-types.ts';

import type { Extension } from '@baeta/core/sdk';
import { CacheExtension } from './lib/cache-extension.ts';
import type { DefaultStoreOptions } from './lib/store-options.ts';
import type { Store } from './lib/store.ts';

export { Store } from './lib/store.ts';
export { StoreAdapter } from './lib/store-adapter.ts';
export { CacheRef, type ItemRef, type ParentRef, type RefCompatibleRoot } from './lib/ref.ts';
export type { DefaultStoreOptions, StoreOptions } from './lib/store-options.ts';
export type { CacheQueryMatching } from './lib/store-adapter.ts';
export type {
	RequiredCacheMiddlewareOptions,
	CacheMiddlewareOptions,
} from './lib/middleware-options.ts';
export type { CacheArgs } from './lib/cache-args.ts';

export function cacheExtension(store: Store, options?: DefaultStoreOptions) {
	return (): Extension => new CacheExtension(store, options);
}
