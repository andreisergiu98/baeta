/** biome-ignore-all lint/correctness/noUnusedVariables: arguments used for inference */
import type { FieldBuilder, TypeBuilder } from '@baeta/core/sdk';
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
export type CreateCacheArgs<Source> = Source extends RefCompatibleRoot
	? [options?: StoreOptions<Source>]
	: [options: RequiredStoreOptions<Source>];

/** Arguments for $useCache method */
export type UseCacheArgs<Result, Source> = Source extends RefCompatibleRoot
	? [store: StoreAdapter<TypeGetter<Result>>, options?: CacheMiddlewareOptions<Source>]
	: [store: StoreAdapter<TypeGetter<Result>>, options: RequiredCacheMiddlewareOptions<Source>];

declare global {
	export namespace BaetaExtensions {
		export interface TypeExtensions<
			Source,
			Context,
			Info,
			Builder extends TypeBuilder<Source, Context, Info>,
		> {
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
			$createCache: (...args: CreateCacheArgs<Source>) => StoreAdapter<Source>;
		}

		export interface FieldExtensions<
			Result,
			Source,
			Context,
			Args,
			Info,
			Builder extends FieldBuilder<Result, Source, Context, Args, Info>,
		> {
			/**
			 * Reference cache object for a query or type field.
			 */
			$cacheRef: CacheRef<Result, Source, Args>;
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
			$useCache: (...args: UseCacheArgs<Result, Source>) => ReturnType<Builder['toMethods']>;
		}
	}
}

export type { BaetaExtensions as CacheExtensionMethods };
