import { Store, type StoreAdapter, type StoreOptions } from '@baeta/extension-cache';
import type Keyv from 'keyv';
import { KeyvStoreAdapter } from './keyv-store-adapter.ts';

/**
 * Keyv-based cache store implementation.
 *
 * @remarks
 * Not recommended for production environments with high query volumes.
 * Consider using Redis or Upstash for production deployments.
 *
 * @example
 * ```typescript
 * import { KeyvStore } from '@baeta/extension-cache-keyv';
 * import Keyv from 'keyv';
 *
 * const keyv = new Keyv();
 * const store = new KeyvStore(keyv);
 *
 * // Use with cache extension
 * const cacheExt = cacheExtension(store, {
 *   ttl: 3600
 * });
 * ```
 */
export class KeyvStore extends Store {
	constructor(protected keyv: Keyv) {
		super();
	}

	createStoreAdapter<T>(options: StoreOptions<T>, type: string, hash: string): StoreAdapter<T> {
		return new KeyvStoreAdapter<T>(this.keyv, options, type, hash);
	}
}
