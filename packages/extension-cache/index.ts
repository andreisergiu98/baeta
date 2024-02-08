import './lib/global-types';

import { CacheExtension } from './lib/cache-extension';
import { Store } from './lib/store';
import { Options } from './lib/store-adapter';

export { CacheExtension } from './lib/cache-extension';

export function cacheExtension(store: Store, options?: Options) {
  return () => new CacheExtension(store, options);
}

export * from './lib/store';
