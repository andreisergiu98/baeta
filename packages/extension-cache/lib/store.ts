import type { StoreAdapter, StoreAdapterOptions } from './store-adapter.ts';

/**
 * Base class for cache storage implementations
 */
export abstract class Store {
	/**
	 * Creates a new store adapter for a specific type
	 * @param serializer - Serializer instance
	 * @param options - Store configuration options
	 * @param type - Type name for the cached items
	 * @param hash - Unique hash for the type
	 */
	abstract createStoreAdapter<T>(options: StoreAdapterOptions<T>): StoreAdapter<T>;
}
