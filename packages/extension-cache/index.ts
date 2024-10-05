import './lib/global-types.ts';

import { CacheExtension } from './lib/cache-extension.ts';
import type { StoreAdapterOptions } from './lib/store-adapter.ts';
import type { Store } from './lib/store.ts';

export { CacheExtension } from './lib/cache-extension.ts';
export * from './lib/store.ts';
export { StoreAdapter } from './lib/store-adapter.ts';
export type { ParentRef, Ref, StoreAdapterOptions, StoreOptions } from './lib/store-adapter.ts';

export function cacheExtension(store: Store, options?: StoreAdapterOptions) {
	return () => new CacheExtension(store, options);
}
