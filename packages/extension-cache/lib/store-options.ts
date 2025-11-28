import type { ItemRef, RefCompatibleRoot } from './ref.ts';

/**
 * Default options for cache stores
 */
export interface DefaultStoreOptions {
	/**
	 * Time-to-live in seconds
	 * @defaultValue 3600
	 */
	ttl?: number;
}

/**
 * Configuration options for cache stores
 */
export type StoreOptions<Source> = {
	/** Manual cache version for invalidation */
	revision?: number;
	ttl?: number;
	serialize: (value: Source) => string;
	parse: (value: string) => Source;
} & (Source extends RefCompatibleRoot
	? {
			getRef?: (source: Source) => ItemRef;
		}
	: {
			getRef: (source: Source) => ItemRef;
		});
