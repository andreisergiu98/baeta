/** biome-ignore-all lint/correctness/noUnusedVariables: arguments used for inference */
import type {
	CacheMiddlewareOptions,
	RequiredCacheMiddlewareOptions,
} from './middleware-options.ts';
import type { CacheRef, RefCompatibleRoot } from './ref.ts';
import type { CacheQueryMatching, StoreAdapter } from './store-adapter.ts';
import type { RequiredStoreOptions, StoreOptions } from './store-options.ts';

/** Utility type to infer the base type of a resolver */
export type TypeGetter<T> = NonNullable<T> extends Array<infer G> ? NonNullable<G> : NonNullable<T>;

/** Arguments for $createCache method */
export type CreateCacheArgs<Root> = Root extends RefCompatibleRoot
	? [options?: StoreOptions<Root>]
	: [options: RequiredStoreOptions<Root>];

/** Arguments for $useCache method */
export type UseCacheArgs<Result, Root> = Root extends RefCompatibleRoot
	? [store: StoreAdapter<TypeGetter<Result>>, options?: CacheMiddlewareOptions<Root>]
	: [store: StoreAdapter<TypeGetter<Result>>, options: RequiredCacheMiddlewareOptions<Root>];

declare global {
	export namespace BaetaExtensions {
		export interface TypeExtensions<Root, Context> {
			/**
			 * Creates a cache store for a specific type.
			 *
			 * @param args - Cache configuration arguments
			 * @returns Store for type
			 *
			 * @example
			 * ```typescript
			 * const userCache = User.$createCache();
			 * ```
			 */
			$createCache: (...args: CreateCacheArgs<Root>) => StoreAdapter<Root>;
		}

		export interface ResolverExtensions<Result, Root, Context, Args> {
			/**
			 * Reference cache object for a query or type field.
			 */
			$cacheRef: CacheRef<Result, Root, Args>;
			/**
			 * Updates the cache revision for a certain resolver.
			 *
			 * @param number - New revision number
			 *
			 * @example
			 * ```typescript
			 * Query.users.$cacheRevision(2);
			 * ```
			 */
			$cacheRevision: (number: number) => void;
			/**
			 * Clears cached results for the resolver
			 *
			 * @param store - Cache store adapter
			 * @param matcher - Optional criteria for selective clearing
			 *
			 * @example
			 * ```typescript
			 * // Clear all cached users
			 * await Query.users.$cacheClear(userCache);
			 *
			 * // Clear cached users for specific organization
			 * await Query.users.$cacheClear(userCache, {
			 *   args: { organizationId: "org-1" }
			 * });
			 * ```
			 */
			$cacheClear: (
				store: StoreAdapter<TypeGetter<Result>>,
				matcher?: CacheQueryMatching<Args>,
			) => Promise<void>;
			/**
			 * Enables caching for the resolver
			 *
			 * @param args - Cache configuration arguments
			 *
			 * @example
			 * ```typescript
			 * // Simple caching
			 * Query.user.$useCache(userCache);
			 *
			 * // With custom options
			 * Query.user.$useCache(userCache, {
			 *   getRootRef: (root) => root.userId
			 * });
			 * ```
			 */
			$useCache: (...args: UseCacheArgs<Result, Root>) => void;
		}
	}
}

export type { BaetaExtensions as CacheExtensionMethods };
