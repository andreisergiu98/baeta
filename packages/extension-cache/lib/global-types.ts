import type { MiddlewareOptions, RequiredMiddlewareOptions } from './middleware-options.ts';
import type { CacheRef, RefCompatibleRoot } from './ref.ts';
import type { QueryMatching, StoreAdapter } from './store-adapter.ts';
import type { RequiredStoreOptions, StoreOptions } from './store-options.ts';

export type TypeGetter<T> = NonNullable<T> extends Array<infer G> ? NonNullable<G> : NonNullable<T>;

export type CreateCacheArgs<Root> = Root extends RefCompatibleRoot
	? [options?: StoreOptions<Root>]
	: [options: RequiredStoreOptions<Root>];

export type UseCacheArgs<Result, Root> = Root extends RefCompatibleRoot
	? [store: StoreAdapter<TypeGetter<Result>>, options?: MiddlewareOptions<Root>]
	: [store: StoreAdapter<TypeGetter<Result>>, options: RequiredMiddlewareOptions<Root>];

declare global {
	export namespace BaetaExtensions {
		export interface TypeExtensions<Root, Context> {
			$createCache: (...args: CreateCacheArgs<Root>) => StoreAdapter<Root>;
		}

		export interface ResolverExtensions<Result, Root, Context, Args> {
			$cacheRef: CacheRef<Result, Root, Args>;
			$cacheRevision: (number: number) => void;
			$cacheClear: (
				store: StoreAdapter<TypeGetter<Result>>,
				matcher?: QueryMatching<Args>,
			) => Promise<void>;
			$useCache: (...args: UseCacheArgs<Result, Root>) => void;
		}
	}
}
