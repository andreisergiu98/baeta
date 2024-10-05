import type { ParentRef, StoreAdapter, StoreOptions } from './store-adapter.ts';

export type TypeGetter<T> = NonNullable<T> extends Array<infer G> ? G : NonNullable<T>;

declare global {
	export namespace BaetaExtensions {
		export interface TypeExtensions<Root, Context> {
			$createCache: (options?: StoreOptions<Root>) => StoreAdapter<Root>;
		}

		export interface ResolverExtensions<Result, Root, Context, Args> {
			$cacheRef: string;
			$useCache: (store: StoreAdapter<TypeGetter<Result>>) => void;
			$clearCache: (
				store: StoreAdapter<TypeGetter<Result>>,
				parentRef?: ParentRef,
				args?: Partial<Args>,
			) => void;
		}
	}
}
