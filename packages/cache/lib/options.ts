import type { ItemRef } from './item.ts';

export const DEFAULT_REVISION = 'default';
export const DEFAULT_NAMESPACE = 'baeta';
export const DEFAULT_TTL_MS = 3_600_000; // 1 hour

/**
 * Configuration options for cache stores
 */
export type CacheOptions<Item> = {
	/**
	 * Unique name for the cache store. Used as a prefix for cache keys to avoid collisions.
	 */
	name: string;
	/**
	 * Revision number for cache invalidation.
	 * Incrementing this number will invalidate all existing cache entries for this store.
	 * @defaultValue CacheClient options or "default"
	 */
	revision?: number;
	/**
	 * Time-to-live in milliseconds
	 * @defaultValue CacheClient options or 3_600_000 (1 hour)
	 */
	ttlMs?: number;
	/**
	 *  Optional namespace to prefix all cache keys
	 *  @defaultValue CacheClient options or "baeta"
	 */
	namespace?: string;
	/**
	 * Function to parse stored strings back into source objects.
	 * If it throws an error, the cache will be treated as a miss and the value will be deleted.
	 */
	parse: (value: string) => Item;
	/**
	 * Function to serialize source objects into strings for cache storage.
	 */
	serialize: (value: Item) => string;
	/**
	 * Hook that gets called with the updated items after an update operation.
	 */
	onUpdate?: (item: Item[]) => void | Promise<void>;
	/**
	 * Hook that gets called with the inserted items after an insert operation.
	 */
	onInsert?: (item: Item[]) => void | Promise<void>;
	/**
	 * Hook that gets called with the refs of deleted items after a delete operation.
	 */
	onDelete?: (ref: ItemRef[]) => void | Promise<void>;
};

export type OptionalGetRef<Item> = {
	/*
	 * Optional function to extract a string reference from source objects.
	 * Will use "id" property by default.
	 */
	getRef?: (source: Item) => ItemRef;
};

export type RequiredGetRef<Item> = {
	/*
	 * Function to extract a string reference from source objects.
	 */
	getRef: (source: Item) => ItemRef;
};
