import './lib/global-types';

import { CacheExtension } from './lib/cache-extension';
import { Store } from './lib/store';
import { StoreAdapterOptions } from './lib/store-adapter';

export { CacheExtension } from './lib/cache-extension';
export * from './lib/store';
export { StoreAdapter } from './lib/store-adapter';
export type { ParentRef, Ref, StoreAdapterOptions, StoreOptions } from './lib/store-adapter';

export function cacheExtension(store: Store, options?: StoreAdapterOptions) {
  return () => new CacheExtension(store, options);
}
