import type { MiddlewareOptions } from './middleware-options.ts';
import type { CacheRef } from './ref.ts';
import type { QueryMatching, StoreAdapter } from './store-adapter.ts';
import type { StoreOptions } from './store-options.ts';

export type TypeGetter<T> = NonNullable<T> extends Array<infer G> ? NonNullable<G> : NonNullable<T>;

declare global {
	export namespace BaetaExtensions {
		export interface TypeExtensions<Root, Context> {
			$createCache: (options: StoreOptions<Root>) => StoreAdapter<Root>;
		}

		export interface ResolverExtensions<Result, Root, Context, Args> {
			$cacheRef: CacheRef<Result, Root, Args>;
			$cacheRevision: (number: number) => void;
			$cacheClear: (store: StoreAdapter<TypeGetter<Result>>, matcher?: QueryMatching<Args>) => void;
			$useCache: (
				store: StoreAdapter<TypeGetter<Result>>,
				options: MiddlewareOptions<Root>,
			) => void;
		}
	}
}
