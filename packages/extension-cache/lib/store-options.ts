import type { ItemRef } from './ref.ts';

/**
 * Default options for cache stores
 */
export interface DefaultStoreOptions {
	/**
	 * Time-to-live in seconds
	 * @default 3600
	 */
	ttl?: number;
}

/**
 * Configuration options for cache stores
 */
export interface StoreOptions<Root> extends DefaultStoreOptions {
	/** Manual cache version for invalidation */
	revision?: number;
	/** Function to extract object reference id */
	getRef?: (root: Root) => ItemRef;
}

/**
 * Required configuration options for cache stores
 */
export interface RequiredStoreOptions<Root> extends StoreOptions<Root> {
	/** Function to extract object reference id */
	getRef: (root: Root) => ItemRef;
}
