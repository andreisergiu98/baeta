import './lib/global-types.ts';

import { CacheExtension } from './lib/cache-extension.ts';
import type { DefaultStoreOptions } from './lib/store-options.ts';
import type { Store } from './lib/store.ts';

export { CacheExtension } from './lib/cache-extension.ts';
export { Store } from './lib/store.ts';
export { StoreAdapter } from './lib/store-adapter.ts';
export { CacheRef, type ItemRef, type ParentRef } from './lib/ref.ts';
export type { DefaultStoreOptions, StoreOptions } from './lib/store-options.ts';

export function cacheExtension(store: Store, options?: DefaultStoreOptions) {
	return () => new CacheExtension(store, options);
}
