import type { StoreAdapter } from './store-adapter.ts';
import type { StoreOptions } from './store-options.ts';

/**
 * Base class for cache storage implementations
 */
export abstract class Store {
	/**
	 * Creates a new store adapter for a specific type
	 * @param options - Store configuration options
	 * @param type - Type name for the cached items
	 * @param hash - Unique hash for the type
	 */
	abstract createStoreAdapter<T>(
		options: StoreOptions<T>,
		type: string,
		hash: string,
	): StoreAdapter<T>;
}
